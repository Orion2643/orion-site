import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  ChevronRight,
  Check,
  CircleAlert,
  ClipboardCopy,
  Download,
  FileText,
  Eye,
  Images,
  LoaderCircle,
  LogOut,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Search,
  Sparkles,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { downloadProjectAsset, listProjectAssets, type ProjectAsset } from "../lib/project-storage";
import ProjectTrackingAdmin from "./project-tracking-admin";

type Project = {
  id: string;
  project_code: string;
  company_name: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  state: string | null;
  segment: string | null;
  project_type: string | null;
  status: string | null;
  progress: number | null;
  next_step: string | null;
  status_updated_at: string | null;
  created_at: string;
  updated_at: string | null;
};

type Briefing = {
  id: string;
  project_id: string;
  answers: Record<string, unknown>;
  completion_percentage: number | null;
  created_at: string;
};

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15";

function formatDate(value?: string | null) {
  if (!value) return "Não informado";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function readableKey(key: string) {
  const labels: Record<string, string> = {
    companyName: "Razão social",
    tradeName: "Nome fantasia",
    segment: "Segmento",
    yearsInBusiness: "Tempo de mercado",
    city: "Cidade",
    state: "Estado",
    contactName: "Responsável",
    whatsapp: "WhatsApp",
    phone: "Telefone",
    email: "E-mail",
    story: "História da empresa",
    differentials: "Diferenciais",
    values: "Valores",
    targetAudience: "Público-alvo",
    mainObjective: "Objetivos",
    services: "Serviços",
    serviceArea: "Área de atendimento",
    businessHours: "Horário de funcionamento",
    paymentMethods: "Formas de pagamento",
    warranty: "Garantia",
    attendanceModel: "Modelo de atendimento",
    hasLogo: "Possui logo",
    hasPhotos: "Possui fotos",
    visualReferences: "Referências visuais",
    primaryColor: "Cor principal",
    secondaryColor: "Cor secundária",
    accentColor: "Cor de destaque",
    visualStyle: "Estilo visual",
    communicationTone: "Tom de comunicação",
    features: "Recursos desejados",
    googleBusiness: "Perfil da Empresa no Google",
    googleMaps: "Google Maps",
    reviewLink: "Link de avaliações",
    domainStatus: "Situação do domínio",
    desiredDomain: "Domínio desejado",
    deadline: "Prazo",
    budgetRange: "Faixa de investimento",
    observations: "Observações",
    competitors: "Concorrentes",
    seoKeywords: "Palavras-chave",
    websiteReferences: "Sites de referência",
    instagram: "Instagram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    tiktok: "TikTok",
    youtube: "YouTube",
    currentSite: "Site atual",
    selected_files: "Arquivos selecionados",
    briefing_text: "Briefing consolidado",
  };
  return labels[key] ?? key.replaceAll("_", " ");
}

function renderValue(value: unknown) {
  if (value === null || value === undefined || value === "") return "Não informado";
  if (Array.isArray(value)) {
    if (!value.length) return "Não informado";
    if (value.every((item) => typeof item === "string")) return value.join(", ");
    return JSON.stringify(value, null, 2);
  }
  if (typeof value === "object") return JSON.stringify(value, null, 2);
  return String(value);
}

type SelectedFile = {
  category?: string;
  file_name?: string;
  mime_type?: string;
  size_bytes?: number;
};

function humanFileSize(bytes?: number) {
  if (!bytes || bytes < 1) return "tamanho não informado";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileCategoryLabel(category?: string) {
  const labels: Record<string, string> = {
    logo: "Logo",
    galeria: "Galeria",
    fachada: "Fachada",
  };
  return labels[category ?? ""] ?? (category || "Arquivo");
}

function selectedFiles(value: unknown): SelectedFile[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is SelectedFile => Boolean(item && typeof item === "object"));
}

function renderAnswerValue(key: string, value: unknown) {
  if (key === "selected_files") {
    const files = selectedFiles(value);
    if (!files.length) return <span>Não informado</span>;
    return (
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li key={`${file.file_name ?? "arquivo"}-${index}`} className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2">
            <span className="font-medium">{file.file_name || `Arquivo ${index + 1}`}</span>
            <span className="mt-1 block text-xs text-muted-foreground">
              {fileCategoryLabel(file.category)} · {humanFileSize(file.size_bytes)}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  return <span>{renderValue(value)}</span>;
}

const summarySections = [
  { title: "DADOS DO CLIENTE", keys: ["companyName", "tradeName", "segment", "yearsInBusiness", "contactName", "whatsapp", "phone", "email", "city", "state", "currentSite"] },
  { title: "EMPRESA E POSICIONAMENTO", keys: ["story", "differentials", "values", "targetAudience", "competitors"] },
  { title: "OBJETIVOS E ESCOPO", keys: ["mainObjective", "services", "serviceArea", "businessHours", "paymentMethods", "warranty", "attendanceModel", "features"] },
  { title: "IDENTIDADE VISUAL E COMUNICAÇÃO", keys: ["hasLogo", "hasPhotos", "primaryColor", "secondaryColor", "accentColor", "visualStyle", "communicationTone", "visualReferences", "websiteReferences"] },
  { title: "PRESENÇA DIGITAL E SEO", keys: ["googleBusiness", "googleMaps", "reviewLink", "instagram", "facebook", "linkedin", "tiktok", "youtube", "seoKeywords"] },
  { title: "DOMÍNIO, PRAZO E INVESTIMENTO", keys: ["domainStatus", "desiredDomain", "deadline", "budgetRange"] },
  { title: "OBSERVAÇÕES", keys: ["observations"] },
];

function buildTechnicalSummary(project: Project, briefing: Briefing | null) {
  const answers = briefing?.answers ?? {};
  const lines = [
    "============================================================",
    "ORION SOLUÇÕES EM TECNOLOGIA",
    "RESUMO TÉCNICO DO PROJETO",
    "============================================================",
    `Protocolo: ${project.project_code}`,
    `Gerado em: ${new Intl.DateTimeFormat("pt-BR", { dateStyle: "long", timeStyle: "short" }).format(new Date())}`,
    `Status: ${project.status || "novo"}`,
    "",
  ];

  const included = new Set<string>();
  for (const section of summarySections) {
    const sectionLines: string[] = [];
    for (const key of section.keys) {
      const value = answers[key];
      if (value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) continue;
      included.add(key);
      sectionLines.push(`${readableKey(key)}: ${renderValue(value)}`);
    }
    if (sectionLines.length) {
      lines.push("------------------------------------------------------------", section.title, "------------------------------------------------------------", ...sectionLines, "");
    }
  }

  const files = selectedFiles(answers.selected_files);
  included.add("selected_files");
  lines.push("------------------------------------------------------------", "ARQUIVOS INFORMADOS", "------------------------------------------------------------");
  if (files.length) {
    files.forEach((file, index) => lines.push(`${index + 1}. ${file.file_name || "Arquivo sem nome"} | Categoria: ${fileCategoryLabel(file.category)} | Tipo: ${file.mime_type || "não informado"} | Tamanho: ${humanFileSize(file.size_bytes)}`));
  } else {
    lines.push("Nenhum arquivo informado.");
  }
  lines.push("");

  const extras = Object.entries(answers).filter(([key, value]) =>
    key !== "briefing_text" && !included.has(key) && value !== null && value !== undefined && value !== "" && !(Array.isArray(value) && value.length === 0),
  );
  if (extras.length) {
    lines.push("------------------------------------------------------------", "INFORMAÇÕES COMPLEMENTARES", "------------------------------------------------------------");
    extras.forEach(([key, value]) => lines.push(`${readableKey(key)}: ${renderValue(value)}`));
    lines.push("");
  }

  lines.push("============================================================", "FIM DO RESUMO TÉCNICO", "============================================================");
  return lines.join("\n");
}

export default function OrionAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [briefing, setBriefing] = useState<Briefing | null>(null);
  const [query, setQuery] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [projectAssets, setProjectAssets] = useState<ProjectAsset[]>([]);
  const [assetsLoading, setAssetsLoading] = useState(false);
  const [assetFeedback, setAssetFeedback] = useState("");

  useEffect(() => {
    if (!supabase) {
      setCheckingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setAuthenticated(Boolean(data.session));
      setCheckingSession(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(Boolean(session));
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const loadProjects = async () => {
    if (!supabase) return;
    setLoading(true);
    setError("");
    const { data, error: loadError } = await supabase
      .from("projects")
      .select("id, project_code, company_name, contact_name, phone, email, city, state, segment, project_type, status, progress, next_step, status_updated_at, created_at, updated_at")
      .order("created_at", { ascending: false });

    if (loadError) {
      setError(`Não foi possível carregar os projetos. ${loadError.message}`);
    } else {
      setProjects((data ?? []) as Project[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) void loadProjects();
    else {
      setProjects([]);
      setSelectedProject(null);
      setBriefing(null);
    }
  }, [authenticated]);

  const openProject = async (project: Project) => {
    if (!supabase) return;
    setSelectedProject(project); setBriefing(null); setProjectAssets([]); setLoading(true); setAssetsLoading(true); setError("");
    const [briefingResult, assetsResult] = await Promise.allSettled([
      supabase.from("briefings").select("id, project_id, answers, completion_percentage, created_at").eq("project_id", project.id).maybeSingle(),
      listProjectAssets(supabase, project.project_code),
    ]);
    if (briefingResult.status === "fulfilled") {
      const { data, error: briefingError } = briefingResult.value;
      if (briefingError) setError(`Não foi possível abrir o briefing. ${briefingError.message}`); else setBriefing((data as Briefing | null) ?? null);
    } else setError("Não foi possível abrir o briefing deste projeto.");
    if (assetsResult.status === "fulfilled") setProjectAssets(assetsResult.value);
    else setError((current) => `${current ? `${current} ` : ""}Não foi possível carregar as imagens.`);
    setAssetsLoading(false); setLoading(false);
  };

  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return projects;
    return projects.filter((project) =>
      [project.project_code, project.company_name, project.contact_name, project.segment, project.city]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [projects, query]);

  const login = async () => {
    if (!supabase) return;
    if (!email.trim() || !password) {
      setError("Informe o e-mail e a senha do administrador.");
      return;
    }
    setAuthLoading(true);
    setError("");
    const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (loginError) setError(`Não foi possível entrar. ${loginError.message}`);
    setAuthLoading(false);
  };

  const logout = async () => {
    await supabase?.auth.signOut();
  };

  if (!isSupabaseConfigured || !supabase) {
    return (
      <main className="grid min-h-dvh place-items-center bg-background px-5 text-foreground">
        <div className="max-w-lg rounded-3xl border border-amber-400/20 bg-amber-400/[0.05] p-7 text-center">
          <CircleAlert className="mx-auto h-10 w-10 text-amber-300" />
          <h1 className="mt-4 text-2xl font-bold">Supabase não configurado</h1>
          <p className="mt-3 text-sm text-muted-foreground">Confira as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY.</p>
        </div>
      </main>
    );
  }

  if (checkingSession) {
    return <main className="grid min-h-dvh place-items-center bg-background text-foreground"><LoaderCircle className="h-8 w-8 animate-spin text-cyan-300" /></main>;
  }

  if (!authenticated) {
    return (
      <main className="relative grid min-h-dvh place-items-center overflow-hidden bg-background px-5 py-10 text-foreground">
        <div className="pointer-events-none absolute inset-0 bg-hero opacity-80" />
        <section className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-background/80 p-7 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10"><ShieldCheck className="h-6 w-6 text-cyan-300" /></div>
            <div><p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Acesso restrito</p><h1 className="text-2xl font-bold">Orion Admin</h1></div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">Entre com seu usuário administrativo para visualizar os projetos.</p>
          <div className="mt-6 space-y-4">
            <label className="block space-y-2"><span className="text-sm font-medium">E-mail</span><input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label>
            <label className="block space-y-2"><span className="text-sm font-medium">Senha</span><input className={inputClass} type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" onKeyDown={(event) => event.key === "Enter" && void login()} /></label>
          </div>
          {error && <div role="alert" className="mt-4 rounded-2xl border border-red-400/25 bg-red-500/[0.07] p-4 text-sm text-red-200">{error}</div>}
          <button type="button" onClick={login} disabled={authLoading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60">{authLoading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />} {authLoading ? "Entrando..." : "Entrar no painel"}</button>
          <a href="/" className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Voltar ao site</a>
        </section>
      </main>
    );
  }

  const answerEntries = Object.entries(briefing?.answers ?? {}).filter(([key]) => key !== "briefing_text");
  const technicalSummary = selectedProject ? buildTechnicalSummary(selectedProject, briefing) : "";

  const copySummary = async () => {
    if (!technicalSummary) return;
    const prompt = `Crie o Prompt Master completo para o desenvolvimento deste projeto seguindo o padrão profissional da Orion Soluções em Tecnologia. Analise o resumo técnico abaixo, preserve todas as informações fornecidas e indique claramente qualquer dado que ainda esteja ausente.

${technicalSummary}`;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(prompt);
      else {
        const textarea = document.createElement("textarea"); textarea.value = prompt; textarea.style.position = "fixed"; textarea.style.opacity = "0";
        document.body.appendChild(textarea); textarea.focus(); textarea.select(); const copied = document.execCommand("copy"); textarea.remove();
        if (!copied) throw new Error("Cópia não suportada.");
      }
      setCopyFeedback("Resumo copiado para o ChatGPT!");
    } catch { setCopyFeedback("O navegador bloqueou a cópia. Use o botão Baixar resumo (.txt)."); }
    window.setTimeout(() => setCopyFeedback(""), 3500);
  };

  const downloadSummary = () => {
    if (!selectedProject || !technicalSummary) return;
    const blob = new Blob([technicalSummary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedProject.project_code}-resumo-tecnico.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const downloadAsset = async (asset: ProjectAsset, index: number) => {
    if (!selectedProject || !supabase) return;
    try {
      const categoryIndex = projectAssets.filter((item) => item.category === asset.category).findIndex((item) => item.storagePath === asset.storagePath);
      await downloadProjectAsset(supabase, asset, selectedProject.project_code, categoryIndex >= 0 ? categoryIndex : index);
      setAssetFeedback("Imagem baixada com o nome padrão Orion.");
    } catch (downloadError) { setAssetFeedback(downloadError instanceof Error ? downloadError.message : "Não foi possível baixar a imagem."); }
    window.setTimeout(() => setAssetFeedback(""), 3500);
  };

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <div><p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Painel administrativo</p><h1 className="text-xl font-bold">Orion Admin</h1></div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={loadProjects} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/[0.06]"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Atualizar</button>
            <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/[0.06]"><LogOut className="h-4 w-4" /> Sair</button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8">
        {error && <div role="alert" className="mb-5 rounded-2xl border border-red-400/25 bg-red-500/[0.07] p-4 text-sm text-red-200">{error}</div>}

        {!selectedProject ? (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-sm text-muted-foreground">Projetos cadastrados</p><p className="mt-2 text-3xl font-bold">{projects.length}</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-sm text-muted-foreground">Novos</p><p className="mt-2 text-3xl font-bold">{projects.filter((p) => !p.status || p.status === "new" || p.status === "novo").length}</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-sm text-muted-foreground">Último protocolo</p><p className="mt-2 font-mono text-xl font-bold">{projects[0]?.project_code ?? "—"}</p></div>
            </div>

            <div className="mb-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3"><Search className="h-5 w-5 text-muted-foreground" /><input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Buscar por protocolo, empresa, contato, segmento ou cidade..." /></div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
              {loading && !projects.length ? (
                <div className="flex items-center justify-center gap-2 p-12 text-muted-foreground"><LoaderCircle className="h-5 w-5 animate-spin" /> Carregando projetos...</div>
              ) : filteredProjects.length ? (
                <div className="divide-y divide-white/10">
                  {filteredProjects.map((project) => (
                    <button type="button" key={project.id} onClick={() => void openProject(project)} className="grid w-full gap-4 p-5 text-left transition hover:bg-white/[0.04] md:grid-cols-[150px_1fr_180px_130px_24px] md:items-center">
                      <span className="font-mono text-sm font-semibold text-cyan-300">{project.project_code}</span>
                      <span><strong className="block">{project.company_name}</strong><span className="mt-1 block text-sm text-muted-foreground">{project.segment || "Segmento não informado"}</span></span>
                      <span className="text-sm"><span className="block">{project.contact_name || "Sem responsável"}</span><span className="mt-1 block text-muted-foreground">{project.city ? `${project.city}${project.state ? `/${project.state}` : ""}` : "Cidade não informada"}</span></span>
                      <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">{project.status || "novo"}</span>
                      <ChevronRight className="hidden h-5 w-5 text-muted-foreground md:block" />
                    </button>
                  ))}
                </div>
              ) : <div className="p-12 text-center text-muted-foreground">Nenhum projeto encontrado.</div>}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <button type="button" onClick={() => { setSelectedProject(null); setBriefing(null); setProjectAssets([]); }} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> Voltar aos projetos</button>

            <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.05] p-6">
              <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                <div><p className="font-mono text-sm font-semibold text-cyan-300">{selectedProject.project_code}</p><h2 className="mt-2 text-3xl font-bold">{selectedProject.company_name}</h2><p className="mt-2 text-muted-foreground">{selectedProject.segment || "Segmento não informado"}</p></div>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="button" onClick={() => setSummaryOpen(true)} disabled={!briefing} className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50">
                    <Sparkles className="h-4 w-4" /> Gerar Resumo Técnico
                  </button>
                  <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">{selectedProject.status || "novo"}</span>
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex gap-3"><UserRound className="mt-0.5 h-5 w-5 text-cyan-300" /><div><p className="text-xs text-muted-foreground">Responsável</p><p className="mt-1 text-sm">{selectedProject.contact_name || "Não informado"}</p></div></div>
                <div className="flex gap-3"><Phone className="mt-0.5 h-5 w-5 text-cyan-300" /><div><p className="text-xs text-muted-foreground">Telefone</p><p className="mt-1 text-sm">{selectedProject.phone || "Não informado"}</p></div></div>
                <div className="flex gap-3"><Mail className="mt-0.5 h-5 w-5 text-cyan-300" /><div><p className="text-xs text-muted-foreground">E-mail</p><p className="mt-1 break-all text-sm">{selectedProject.email || "Não informado"}</p></div></div>
                <div className="flex gap-3"><MapPin className="mt-0.5 h-5 w-5 text-cyan-300" /><div><p className="text-xs text-muted-foreground">Localização</p><p className="mt-1 text-sm">{selectedProject.city ? `${selectedProject.city}${selectedProject.state ? `/${selectedProject.state}` : ""}` : "Não informada"}</p></div></div>
              </div>
            </div>

            <ProjectTrackingAdmin
              project={selectedProject}
              onProjectUpdated={(changes) => {
                setSelectedProject((current) => current ? { ...current, ...changes } : current);
                setProjects((current) => current.map((project) =>
                  project.id === selectedProject.id ? { ...project, ...changes } : project,
                ));
              }}
            />

            <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
              <div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Arquivos do projeto</p><h3 className="mt-1 text-xl font-bold">Logo, fachada e galeria</h3><p className="mt-2 text-sm text-muted-foreground">Visualize ou baixe o arquivo original no padrão Orion.</p></div><Images className="h-7 w-7 text-cyan-300" /></div>
              {assetsLoading ? <div className="flex items-center gap-2 py-8 text-muted-foreground"><LoaderCircle className="h-5 w-5 animate-spin" /> Carregando imagens...</div> : projectAssets.length ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projectAssets.map((asset, index) => (
                  <article key={asset.storagePath} className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <button type="button" onClick={() => window.open(asset.signedUrl, "_blank", "noopener,noreferrer")} className="group relative block aspect-video w-full overflow-hidden bg-black/30"><img src={asset.signedUrl} alt={asset.originalName} className="h-full w-full object-cover transition group-hover:scale-105" /><span className="absolute inset-0 grid place-items-center opacity-0 transition group-hover:bg-black/45 group-hover:opacity-100"><Eye className="h-7 w-7 text-white" /></span></button>
                    <div className="p-4"><p className="truncate text-sm font-semibold">{asset.originalName}</p><p className="mt-1 text-xs text-muted-foreground">{fileCategoryLabel(asset.category)} · {humanFileSize(asset.sizeBytes)}</p><div className="mt-4 grid grid-cols-2 gap-2"><button type="button" onClick={() => window.open(asset.signedUrl, "_blank", "noopener,noreferrer")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs"><Eye className="h-4 w-4" /> Visualizar</button><button type="button" onClick={() => void downloadAsset(asset, index)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-3 py-2 text-xs font-semibold text-slate-950"><Download className="h-4 w-4" /> Baixar</button></div></div>
                  </article>))}</div>
              ) : <div className="rounded-2xl border border-dashed border-white/10 px-5 py-8 text-center text-sm text-muted-foreground">Nenhuma imagem armazenada para este projeto.</div>}
              <div className="mt-3 min-h-5 text-sm text-emerald-300">{assetFeedback}</div>
            </section>

            <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
              <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
                <div className="mb-5 flex items-center justify-between gap-3"><div><p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Levantamento de requisitos</p><h3 className="mt-1 text-xl font-bold">Briefing completo</h3></div><FileText className="h-6 w-6 text-cyan-300" /></div>
                {loading && !briefing ? <div className="flex items-center gap-2 py-10 text-muted-foreground"><LoaderCircle className="h-5 w-5 animate-spin" /> Carregando briefing...</div> : briefing ? (
                  <div className="divide-y divide-white/10">
                    {answerEntries.map(([key, value]) => (
                      <div key={key} className="grid gap-2 py-4 md:grid-cols-[220px_1fr]"><dt className="text-sm font-medium text-muted-foreground">{readableKey(key)}</dt><dd className="whitespace-pre-wrap break-words text-sm leading-relaxed">{renderAnswerValue(key, value)}</dd></div>
                    ))}
                  </div>
                ) : <p className="py-10 text-muted-foreground">Nenhum briefing foi encontrado para este projeto.</p>}
              </section>

              <aside className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><div className="flex gap-3"><Building2 className="h-5 w-5 text-cyan-300" /><div><p className="text-xs text-muted-foreground">Tipo de projeto</p><p className="mt-1 text-sm">{selectedProject.project_type || "website"}</p></div></div></div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><div className="flex gap-3"><CalendarDays className="h-5 w-5 text-cyan-300" /><div><p className="text-xs text-muted-foreground">Recebido em</p><p className="mt-1 text-sm">{formatDate(selectedProject.created_at)}</p></div></div></div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"><p className="text-xs text-muted-foreground">Conclusão do briefing</p><p className="mt-2 text-3xl font-bold">{briefing?.completion_percentage ?? 0}%</p><div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${briefing?.completion_percentage ?? 0}%` }} /></div></div>
              </aside>
            </div>
          </div>
        )}
      </section>

      {summaryOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="summary-title">
          <section className="w-full max-w-5xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-background shadow-2xl">
            <header className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Base para o Prompt Master</p>
                <h2 id="summary-title" className="mt-1 text-2xl font-bold">Resumo Técnico · {selectedProject.project_code}</h2>
              </div>
              <button type="button" onClick={() => setSummaryOpen(false)} className="inline-flex h-10 w-10 items-center justify-center self-end rounded-full border border-white/10 hover:bg-white/[0.06] sm:self-auto" aria-label="Fechar resumo"><X className="h-5 w-5" /></button>
            </header>

            <div className="p-5">
              <div className="mb-4 rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-4 text-sm leading-relaxed text-muted-foreground">
                Este texto organiza automaticamente os dados coletados. Use <strong className="text-foreground">Copiar para ChatGPT</strong> para levar o briefing completo e solicitar o Prompt Master da Orion.
              </div>
              <pre className="max-h-[55vh] overflow-auto whitespace-pre-wrap break-words rounded-2xl border border-white/10 bg-black/25 p-5 font-mono text-sm leading-relaxed text-foreground">{technicalSummary}</pre>
              <div aria-live="polite" className="mt-3 min-h-6 text-sm text-emerald-300">{copyFeedback && <span className="inline-flex items-center gap-2"><Check className="h-4 w-4" /> {copyFeedback}</span>}</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button type="button" onClick={() => void copySummary()} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-4 font-semibold text-slate-950 transition hover:bg-cyan-400"><ClipboardCopy className="h-5 w-5" /> Copiar para ChatGPT</button>
                <button type="button" onClick={downloadSummary} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-5 py-4 font-semibold transition hover:bg-white/[0.06]"><Download className="h-5 w-5" /> Baixar resumo (.txt)</button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
