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

const MAX_PROJECT_ASSET_BYTES = 10 * 1024 * 1024;
const IMAGE_SIGNATURES = [
  { mime: "image/jpeg", extension: "jpg", test: (b: Uint8Array) => b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { mime: "image/png", extension: "png", test: (b: Uint8Array) => b.length >= 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 && b[4] === 0x0d && b[5] === 0x0a && b[6] === 0x1a && b[7] === 0x0a },
  { mime: "image/webp", extension: "webp", test: (b: Uint8Array) => b.length >= 12 && String.fromCharCode(...b.slice(0, 4)) === "RIFF" && String.fromCharCode(...b.slice(8, 12)) === "WEBP" },
] as const;

async function validateImageFile(file: File) {
  if (file.size < 1 || file.size > MAX_PROJECT_ASSET_BYTES) {
    throw new Error(`Arquivo ${file.name} inválido: limite de 10 MB.`);
  }
  const header = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const detected = IMAGE_SIGNATURES.find((signature) => signature.test(header));
  if (!detected) {
    throw new Error(`Arquivo ${file.name} rejeitado: conteúdo não corresponde a JPEG, PNG ou WebP.`);
  }
  return detected;
}

function normalizeCategory(category: string): ProjectAssetCategory {
  return PROJECT_ASSET_CATEGORIES.includes(category as ProjectAssetCategory)
    ? (category as ProjectAssetCategory)
    : "galeria";
}

function shortUniqueId() {
  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID().slice(0, 8);
  }
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`.slice(0, 8);
}

function safeFileName(name: string) {
  const extension = name.includes(".") ? `.${name.split(".").pop()?.toLowerCase()}` : "";
  const base =
    name
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
    const detected = await validateImageFile(item.file);
    const uniquePrefix = `${Date.now()}-${index + 1}-${shortUniqueId()}`;
    const normalizedName = safeFileName(item.file.name).replace(/\.[^.]+$/, "");
    const storagePath = `${projectCode}/${category}/${uniquePrefix}-${normalizedName}.${detected.extension}`;

    const { error } = await client.storage
      .from(PROJECT_ASSETS_BUCKET)
      .upload(storagePath, item.file, {
        cacheControl: "3600",
        contentType: detected.mime,
        upsert: false,
      });

    if (error) {
      throw new Error(`Falha ao enviar ${item.file.name}: ${error.message}`);
    }

    uploaded.push({
      category,
      originalName: item.file.name,
      storagePath,
      mimeType: detected.mime,
      sizeBytes: item.file.size,
    });
  }

  return uploaded;
}

export async function listProjectAssets(
  client: SupabaseClient,
  projectCode: string,
): Promise<ProjectAsset[]> {
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
  const { data, error } = await client.storage
    .from(PROJECT_ASSETS_BUCKET)
    .download(asset.storagePath);
  if (error || !data) throw new Error(error?.message || "Não foi possível baixar o arquivo.");

  const extension = asset.originalName.includes(".")
    ? `.${asset.originalName.split(".").pop()}`
    : "";
  const categoryName =
    asset.category === "galeria"
      ? `galeria_${String(categoryIndex + 1).padStart(2, "0")}`
      : asset.category;
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

export async function deleteProjectAsset(client: SupabaseClient, storagePath: string) {
  const { error } = await client.storage.from(PROJECT_ASSETS_BUCKET).remove([storagePath]);
  if (error) throw new Error(error.message);
}

export async function deleteAllProjectAssets(client: SupabaseClient, projectCode: string) {
  const paths: string[] = [];
  for (const category of PROJECT_ASSET_CATEGORIES) {
    const folder = `${projectCode}/${category}`;
    const { data, error } = await client.storage
      .from(PROJECT_ASSETS_BUCKET)
      .list(folder, { limit: 1000 });
    if (error && !/not found/i.test(error.message)) throw new Error(error.message);
    for (const file of data ?? []) {
      if (file.name && file.name !== ".emptyFolderPlaceholder")
        paths.push(`${folder}/${file.name}`);
    }
  }
  if (paths.length) {
    const { error } = await client.storage.from(PROJECT_ASSETS_BUCKET).remove(paths);
    if (error) throw new Error(error.message);
  }
  return paths.length;
}
