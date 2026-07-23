import type { SupabaseClient } from "@supabase/supabase-js";

export const PROJECT_ASSETS_BUCKET = "project-assets";
export const PROJECT_ASSET_CATEGORIES = ["logo", "fachada", "galeria"] as const;

export type ProjectAssetCategory = (typeof PROJECT_ASSET_CATEGORIES)[number];

export type UploadableProjectFile = {
  file: File;
  category: string;
};

export type UploadedProjectAsset = {
  category: ProjectAssetCategory;
  originalName: string;
  storagePath: string;
  mimeType: string;
  sizeBytes: number;
};

export type ProjectAsset = UploadedProjectAsset & {
  signedUrl: string;
};

function normalizeCategory(category: string): ProjectAssetCategory {
  return PROJECT_ASSET_CATEGORIES.includes(category as ProjectAssetCategory)
    ? (category as ProjectAssetCategory)
    : "galeria";
}

function safeFileName(name: string) {
  const extension = name.includes(".") ? `.${name.split(".").pop()?.toLowerCase()}` : "";
  const base = name
    .replace(/\.[^.]+$/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
    .slice(0, 70) || "imagem";
  return `${base}${extension}`;
}

export async function uploadProjectAssets(
  client: SupabaseClient,
  projectCode: string,
  items: UploadableProjectFile[],
): Promise<UploadedProjectAsset[]> {
  const uploaded: UploadedProjectAsset[] = [];

  for (const [index, item] of items.entries()) {
    const category = normalizeCategory(item.category);
    const uniquePrefix = `${Date.now()}-${index + 1}-${crypto.randomUUID().slice(0, 8)}`;
    const storagePath = `${projectCode}/${category}/${uniquePrefix}-${safeFileName(item.file.name)}`;

    const { error } = await client.storage.from(PROJECT_ASSETS_BUCKET).upload(storagePath, item.file, {
      cacheControl: "3600",
      contentType: item.file.type,
      upsert: false,
    });

    if (error) {
      throw new Error(`Falha ao enviar ${item.file.name}: ${error.message}`);
    }

    uploaded.push({
      category,
      originalName: item.file.name,
      storagePath,
      mimeType: item.file.type,
      sizeBytes: item.file.size,
    });
  }

  return uploaded;
}

export async function listProjectAssets(client: SupabaseClient, projectCode: string): Promise<ProjectAsset[]> {
  const assets: ProjectAsset[] = [];

  for (const category of PROJECT_ASSET_CATEGORIES) {
    const folder = `${projectCode}/${category}`;
    const { data, error } = await client.storage.from(PROJECT_ASSETS_BUCKET).list(folder, {
      limit: 100,
      sortBy: { column: "created_at", order: "asc" },
    });

    if (error) {
      if (/not found/i.test(error.message)) continue;
      throw new Error(error.message);
    }

    for (const file of data ?? []) {
      if (!file.name || file.name === ".emptyFolderPlaceholder") continue;
      const storagePath = `${folder}/${file.name}`;
      const { data: signed, error: signedError } = await client.storage
        .from(PROJECT_ASSETS_BUCKET)
        .createSignedUrl(storagePath, 60 * 60);

      if (signedError || !signed?.signedUrl) continue;

      const metadata = (file.metadata ?? {}) as Record<string, unknown>;
      assets.push({
        category,
        originalName: file.name.replace(/^\d+-\d+-[a-f0-9]+-/, ""),
        storagePath,
        mimeType: String(metadata.mimetype ?? "image/*"),
        sizeBytes: Number(metadata.size ?? 0),
        signedUrl: signed.signedUrl,
      });
    }
  }

  return assets;
}

export async function downloadProjectAsset(
  client: SupabaseClient,
  asset: ProjectAsset,
  projectCode: string,
  categoryIndex: number,
) {
  const { data, error } = await client.storage.from(PROJECT_ASSETS_BUCKET).download(asset.storagePath);
  if (error || !data) throw new Error(error?.message || "Não foi possível baixar o arquivo.");

  const extension = asset.originalName.includes(".") ? `.${asset.originalName.split(".").pop()}` : "";
  const categoryName = asset.category === "galeria" ? `galeria_${String(categoryIndex + 1).padStart(2, "0")}` : asset.category;
  const downloadName = `${projectCode}_${categoryName}${extension}`;
  const url = URL.createObjectURL(data);
  const link = document.createElement("a");
  link.href = url;
  link.download = downloadName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
