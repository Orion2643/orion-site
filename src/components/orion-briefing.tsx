import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  FileText,
  ImagePlus,
  Upload,
  X,
  Home,
  MessageCircle,
  Palette,
  RefreshCw,
  Rocket,
  Save,
  Sparkles,
} from "lucide-react";
import { company } from "../config/company";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { uploadProjectAssets } from "../lib/project-storage";

type BriefingData = {
  companyName: string;
  tradeName: string;
  segment: string;
  yearsInBusiness: string;
  city: string;
  state: string;
  contactName: string;
  whatsapp: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  currentSite: string;
  story: string;
  differentials: string;
  values: string;
  targetAudience: string;
  mainObjective: string[];
  services: string;
  serviceArea: string;
  businessHours: string;
  paymentMethods: string;
  warranty: string;
  attendanceModel: string;
  hasLogo: string;
  hasPhotos: string;
  visualReferences: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  visualStyle: string;
  communicationTone: string;
  features: string[];
  googleBusiness: string;
  googleMaps: string;
  reviewLink: string;
  domainStatus: string;
  desiredDomain: string;
  deadline: string;
  budgetRange: string;
  observations: string;
  competitors: string;
  seoKeywords: string;
  websiteReferences: string;
  tiktok: string;
  youtube: string;
};

const initialData: BriefingData = {
  companyName: "",
  tradeName: "",
  segment: "",
  yearsInBusiness: "",
  city: "",
  state: "SP",
  contactName: "",
  whatsapp: "",
  phone: "",
  email: "",
  instagram: "",
  facebook: "",
  linkedin: "",
  currentSite: "",
  story: "",
  differentials: "",
  values: "",
  targetAudience: "",
  mainObjective: [],
  services: "",
  serviceArea: "",
  businessHours: "",
  paymentMethods: "",
  warranty: "",
  attendanceModel: "",
  hasLogo: "Não informado",
  hasPhotos: "Não informado",
  visualReferences: "",
  primaryColor: "#2563EB",
  secondaryColor: "#7C3AED",
  accentColor: "#06B6D4",
  visualStyle: "Moderno",
  communicationTone: "Profissional e próximo",
  features: [],
  googleBusiness: "Não informado",
  googleMaps: "",
  reviewLink: "",
  domainStatus: "Não possui",
  desiredDomain: "",
  deadline: "",
  budgetRange: "",
  observations: "",
  competitors: "",
  seoKeywords: "",
  websiteReferences: "",
  tiktok: "",
  youtube: "",
};

const steps = [
  "Empresa",
  "Contato",
  "Essência",
  "Serviços",
  "Identidade visual",
  "Recursos",
  "Google e projeto",
  "Resumo",
];

const objectives = [
  "Conseguir mais clientes",
  "Passar credibilidade",
  "Mostrar portfólio",
  "Receber orçamentos",
  "Vender produtos",
  "Permitir agendamentos",
  "Divulgar serviços",
];

const featureOptions = [
  "WhatsApp",
  "Formulário de orçamento",
  "Botão para ligar",
  "Google Maps",
  "Galeria de fotos",
  "Depoimentos",
  "FAQ",
  "Perfil oficial do Google",
  "Link para avaliações",
  "Agendamento",
  "Catálogo de serviços",
  "Blog",
  "Área do cliente",
  "Redes sociais",
];

function Field({ label, required, children, hint }: { label: string; required?: boolean; children: ReactNode; hint?: string }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">
        {label} {required && <span className="text-cyan-300">*</span>}
      </span>
      {children}
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15";

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 font-mono text-xs uppercase">{value}</span>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value.toUpperCase())}
          className="h-12 w-16 cursor-pointer rounded-lg border border-white/10 bg-transparent p-1"
          aria-label={`Escolher ${label.toLowerCase()}`}
        />
        <input
          value={value}
          maxLength={7}
          onChange={(event) => {
            const next = event.target.value.toUpperCase();
            if (/^#[0-9A-F]{6}$/.test(next)) onChange(next);
          }}
          className={inputClass}
          aria-label={`Código hexadecimal da ${label.toLowerCase()}`}
        />
      </div>
    </div>
  );
}


type UploadItem = {
  id: string;
  file: File;
  preview?: string;
  category: string;
};

function UploadBox({
  title,
  description,
  category,
  multiple = true,
  accept = "image/png,image/jpeg,image/webp",
  items,
  onAdd,
  onRemove,
}: {
  title: string;
  description: string;
  category: string;
  multiple?: boolean;
  accept?: string;
  items: UploadItem[];
  onAdd: (category: string, files: FileList | null, multiple: boolean) => void;
  onRemove: (id: string) => void;
}) {
  const categoryItems = items.filter((item) => item.category === category);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-3 flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-400/10 text-cyan-200"><ImagePlus className="h-5 w-5" /></div>
        <div><p className="font-medium">{title}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{description}</p></div>
      </div>
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-cyan-400/30 bg-cyan-400/[0.04] px-4 py-6 text-center transition hover:bg-cyan-400/[0.08]">
        <Upload className="mb-2 h-6 w-6 text-cyan-300" />
        <span className="text-sm font-medium">Clique para selecionar {multiple ? "arquivos" : "um arquivo"}</span>
        <span className="mt-1 text-xs text-muted-foreground">PNG, JPG ou WEBP · até 10 MB por imagem</span>
        <input className="sr-only" type="file" accept={accept} multiple={multiple} onChange={(event) => { onAdd(category, event.target.files, multiple); event.currentTarget.value = ""; }} />
      </label>
      {categoryItems.length > 0 && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {categoryItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-2">
              {item.preview ? <img src={item.preview} alt="Prévia" className="h-14 w-14 rounded-lg object-cover" /> : <FileText className="h-8 w-8 text-muted-foreground" />}
              <div className="min-w-0 flex-1"><p className="truncate text-xs font-medium">{item.file.name}</p><p className="text-[11px] text-muted-foreground">{(item.file.size / 1024 / 1024).toFixed(2)} MB</p></div>
              <button type="button" onClick={() => onRemove(item.id)} className="rounded-full p-2 text-muted-foreground hover:bg-white/10 hover:text-foreground" aria-label="Remover arquivo"><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function OrionBriefing() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<BriefingData>(initialData);
  const [saved, setSaved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [projectCode, setProjectCode] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("orion-briefing-v1");
    if (stored) {
      try {
        setData({ ...initialData, ...JSON.parse(stored) });
      } catch {
        window.localStorage.removeItem("orion-briefing-v1");
      }
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.localStorage.setItem("orion-briefing-v1", JSON.stringify(data));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1200);
    }, 500);
    return () => window.clearTimeout(timer);
  }, [data]);

  const update = <K extends keyof BriefingData>(key: K, value: BriefingData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
  };

  const toggleList = (key: "mainObjective" | "features", value: string) => {
    const current = data[key];
    update(key, current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const addUploads = (category: string, files: FileList | null, multiple: boolean) => {
    if (!files?.length) return;
    setUploadError("");

    const selected = Array.from(files);
    const invalidType = selected.find((file) => !["image/png", "image/jpeg", "image/webp"].includes(file.type));
    if (invalidType) {
      setUploadError(`O arquivo ${invalidType.name} não é uma imagem PNG, JPG ou WEBP.`);
      return;
    }

    const oversized = selected.find((file) => file.size > 10 * 1024 * 1024);
    if (oversized) {
      setUploadError(`A imagem ${oversized.name} ultrapassa o limite de 10 MB.`);
      return;
    }

    const limited = category === "galeria" ? selected.slice(0, 20) : selected.slice(0, 1);
    if (category === "galeria" && selected.length > 20) {
      setUploadError("Foram adicionadas apenas as primeiras 20 imagens da galeria.");
    }

    const next = limited.map((file) => ({
      id: `${category}-${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      category,
      preview: URL.createObjectURL(file),
    }));

    setUploads((current) => {
      if (!multiple) {
        current.filter((item) => item.category === category).forEach((item) => item.preview && URL.revokeObjectURL(item.preview));
        return [...current.filter((item) => item.category !== category), ...next];
      }
      return [...current, ...next];
    });
  };

  const removeUpload = (id: string) => {
    setUploads((current) => {
      const item = current.find((entry) => entry.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return current.filter((entry) => entry.id !== id);
    });
  };

  const companyLabel = data.tradeName || data.companyName || "Novo cliente";

  const briefing = useMemo(
    () => `LEVANTAMENTO DE REQUISITOS — ORION SOLUÇÕES EM TECNOLOGIA

1. EMPRESA
Nome empresarial: ${data.companyName || "Não informado"}
Nome fantasia: ${data.tradeName || "Não informado"}
Segmento: ${data.segment || "Não informado"}
Tempo de mercado: ${data.yearsInBusiness || "Não informado"}
Localização: ${[data.city, data.state].filter(Boolean).join(" - ") || "Não informada"}

2. CONTATO
Responsável: ${data.contactName || "Não informado"}
WhatsApp: ${data.whatsapp || "Não informado"}
Telefone: ${data.phone || "Não informado"}
E-mail: ${data.email || "Não informado"}
Instagram: ${data.instagram || "Não informado"}
Facebook: ${data.facebook || "Não informado"}
LinkedIn: ${data.linkedin || "Não informado"}
TikTok: ${data.tiktok || "Não informado"}
YouTube: ${data.youtube || "Não informado"}
Site atual: ${data.currentSite || "Não possui"}

3. ESSÊNCIA E OBJETIVO
História: ${data.story || "Não informada"}
Diferenciais: ${data.differentials || "Não informados"}
Valores: ${data.values || "Não informados"}
Público-alvo: ${data.targetAudience || "Não informado"}
Objetivos: ${data.mainObjective.join(", ") || "Não informados"}

4. SERVIÇOS E OPERAÇÃO
Serviços/produtos:\n${data.services || "Não informados"}
Área de atendimento: ${data.serviceArea || "Não informada"}
Horário: ${data.businessHours || "Não informado"}
Formas de pagamento: ${data.paymentMethods || "Não informadas"}
Garantia: ${data.warranty || "Não informada"}
Modelo de atendimento: ${data.attendanceModel || "Não informado"}

5. DNA VISUAL
Possui logo: ${data.hasLogo}
Possui fotos próprias: ${data.hasPhotos}
Cor principal: ${data.primaryColor}
Cor secundária: ${data.secondaryColor}
Cor de destaque: ${data.accentColor}
Estilo: ${data.visualStyle}
Tom de comunicação: ${data.communicationTone}
Referências visuais: ${data.visualReferences || "Não informadas"}
Sites de referência: ${data.websiteReferences || "Não informados"}
Concorrentes: ${data.competitors || "Não informados"}
Palavras-chave para SEO: ${data.seoKeywords || "Não informadas"}
Arquivos selecionados nesta sessão: ${uploads.length}

6. FUNCIONALIDADES
${data.features.length ? data.features.map((item) => `• ${item}`).join("\n") : "Não informadas"}

7. GOOGLE, DOMÍNIO E PRAZO
Perfil da Empresa no Google: ${data.googleBusiness}
Google Maps: ${data.googleMaps || "Não informado"}
Link para avaliações: ${data.reviewLink || "Não informado"}
Situação do domínio: ${data.domainStatus}
Domínio desejado: ${data.desiredDomain || "Não informado"}
Prazo desejado: ${data.deadline || "Não informado"}
Faixa de investimento: ${data.budgetRange || "Não informada"}

8. OBSERVAÇÕES
${data.observations || "Nenhuma observação adicional."}`,
    [data, uploads.length],
  );

  const promptMaster = useMemo(
    () => `PROMPT MASTER ORION — PROJETO ${companyLabel.toUpperCase()}

Crie um site profissional, responsivo, moderno e orientado à conversão para a empresa ${companyLabel}, do segmento ${data.segment || "informado no briefing"}, localizada em ${[data.city, data.state].filter(Boolean).join(" - ") || "localização a confirmar"}.

OBJETIVO PRINCIPAL
${data.mainObjective.join(", ") || "Fortalecer a presença digital e gerar novos contatos."}

IDENTIDADE VISUAL
- Cor principal: ${data.primaryColor}
- Cor secundária: ${data.secondaryColor}
- Cor de destaque: ${data.accentColor}
- Estilo visual: ${data.visualStyle}
- Tom de comunicação: ${data.communicationTone}
- Aplicar contraste acessível, hierarquia visual clara e efeitos discretos.
- Usar botões responsivos, com estados de hover e toque no celular.

CONTEÚDO DA EMPRESA
História: ${data.story || "Criar texto inicial profissional sem inventar dados específicos."}
Diferenciais: ${data.differentials || "Destacar qualidade, confiança e atendimento."}
Valores: ${data.values || "Não informados."}
Público-alvo: ${data.targetAudience || "Clientes interessados nos serviços da empresa."}

SERVIÇOS
${data.services || "Organizar os serviços informados posteriormente em cards objetivos."}

ESTRUTURA RECOMENDADA
1. Splash/abertura leve com identidade da marca.
2. Cabeçalho fixo e navegação responsiva.
3. Hero com proposta de valor, CTA para WhatsApp e CTA secundário.
4. Sobre a empresa e diferenciais.
5. Serviços em cards.
6. Área de atuação e processo de atendimento.
7. Galeria/portfólio, caso existam imagens.
8. Bloco de informações do Google com botões para mapa e avaliações.
9. Perfil oficial do Google, quando aplicável.
10. Depoimentos, caso disponíveis.
11. FAQ com dúvidas comerciais reais.
12. Formulário de orçamento que envia mensagem estruturada ao WhatsApp e limpa os campos após o envio.
13. Rodapé completo com contatos, horários, redes sociais, política de privacidade e crédito discreto para a Orion.

FUNCIONALIDADES SELECIONADAS
${data.features.length ? data.features.map((item) => `- ${item}`).join("\n") : "- WhatsApp\n- Formulário de orçamento\n- Responsividade completa"}

DADOS COMERCIAIS
- WhatsApp: ${data.whatsapp || "a confirmar"}
- Telefone: ${data.phone || "a confirmar"}
- E-mail: ${data.email || "a confirmar"}
- Instagram: ${data.instagram || "a confirmar"}
- Horário: ${data.businessHours || "a confirmar"}
- Área de atendimento: ${data.serviceArea || "a confirmar"}
- Formas de pagamento: ${data.paymentMethods || "a confirmar"}
- Garantia: ${data.warranty || "a confirmar"}

SEO E ENTREGA TÉCNICA
- React + TypeScript + Vite/TanStack, conforme padrão Orion.
- HTML semântico e acessibilidade básica.
- SEO local com title, description, canonical, Open Graph e Twitter Card.
- robots.txt, sitemap.xml e favicon.
- Imagens otimizadas e carregamento eficiente.
- Design mobile-first e testes em desktop, tablet e celular.
- Links externos seguros e mensagens de WhatsApp codificadas corretamente.

RESTRIÇÕES IMPORTANTES
- Não inventar certificações, números, clientes, avaliações, endereços ou garantias.
- Marcar dados ausentes como pendentes para validação.
- Manter o conteúdo em português do Brasil.
- Priorizar clareza, confiança e conversão sem exageros publicitários.

BRIEFING COMPLETO
${briefing}`,
    [briefing, companyLabel, data],
  );

  const reset = () => {
    if (!window.confirm("Deseja apagar todo o briefing e começar novamente?")) return;
    setData(initialData);
    setStep(0);
    setSubmitted(false);
    uploads.forEach((item) => item.preview && URL.revokeObjectURL(item.preview));
    setUploads([]);
    window.localStorage.removeItem("orion-briefing-v1");
  };

  const createWhatsappLink = (code?: string) => {
    const whatsappSummary = `Olá, Orion! Finalizei uma solicitação de projeto pelo Portal Orion.\n\nProtocolo: ${code || "aguardando geração"}\nEmpresa: ${companyLabel}\nResponsável: ${data.contactName || "Não informado"}\nSegmento: ${data.segment || "Não informado"}\nCidade: ${data.city || "Não informada"}\nObjetivos: ${data.mainObjective.join(", ") || "Não informados"}\n\nOs dados completos foram registrados com segurança pela Orion.`;
    return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(whatsappSummary)}`;
  };

  const validateSubmission = () => {
    const missing: string[] = [];
    if (!companyLabel.trim() || companyLabel === "Novo cliente") missing.push("nome da empresa");
    if (!data.segment.trim()) missing.push("segmento");
    if (!data.city.trim()) missing.push("cidade");
    if (!data.contactName.trim()) missing.push("nome do responsável");
    if (!data.whatsapp.trim()) missing.push("WhatsApp");
    return missing;
  };

  const submitRequest = async () => {
    if (isSubmitting) return;

    const missing = validateSubmission();
    if (missing.length > 0) {
      setSubmitError(`Confira os campos obrigatórios: ${missing.join(", ")}.`);
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setSubmitError("A conexão com o Orion Admin ainda não foi configurada neste ambiente.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    // Abrimos a guia durante o clique para evitar o bloqueio de pop-up após a resposta assíncrona.
    const whatsappWindow = window.open("", "_blank");

    try {
      const { data: result, error } = await supabase.rpc("create_project_submission", {
        submission: {
          company_name: companyLabel,
          contact_name: data.contactName,
          phone: data.whatsapp || data.phone,
          email: data.email,
          city: data.city,
          state: data.state,
          segment: data.segment,
          project_type: "website",
          answers: {
            ...data,
            briefing_text: briefing,
            selected_files: uploads.map((item) => ({
              category: item.category,
              file_name: item.file.name,
              mime_type: item.file.type,
              size_bytes: item.file.size,
              upload_status: "pending",
            })),
          },
        },
      });

      if (error) throw error;

      const firstResult = Array.isArray(result) ? result[0] : result;
      const generatedCode = firstResult?.project_code;
      if (!generatedCode) throw new Error("O banco não retornou o código do projeto.");

      if (uploads.length > 0) {
        await uploadProjectAssets(supabase, generatedCode, uploads);
      }

      setProjectCode(generatedCode);
      setSubmitted(true);
      window.localStorage.removeItem("orion-briefing-v1");

      const whatsappLink = createWhatsappLink(generatedCode);
      if (whatsappWindow) {
        whatsappWindow.location.href = whatsappLink;
      } else {
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
      }
    } catch (error) {
      whatsappWindow?.close();
      const message = error instanceof Error ? error.message : "Não foi possível registrar a solicitação.";
      setSubmitError(`Não conseguimos salvar seu projeto. ${message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nome empresarial / razão social"><input className={inputClass} value={data.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="Ex.: Empresa Silva Ltda." /></Field>
          <Field label="Nome fantasia" required><input className={inputClass} value={data.tradeName} onChange={(e) => update("tradeName", e.target.value)} placeholder="Ex.: Silva Auto Center" /></Field>
          <Field label="Segmento de atuação" required><input className={inputClass} value={data.segment} onChange={(e) => update("segment", e.target.value)} placeholder="Ex.: Oficina mecânica" /></Field>
          <Field label="Tempo de mercado"><input className={inputClass} value={data.yearsInBusiness} onChange={(e) => update("yearsInBusiness", e.target.value)} placeholder="Ex.: 8 anos" /></Field>
          <Field label="Cidade" required><input className={inputClass} value={data.city} onChange={(e) => update("city", e.target.value)} placeholder="Ex.: Sorocaba" /></Field>
          <Field label="Estado"><input className={inputClass} value={data.state} onChange={(e) => update("state", e.target.value)} placeholder="SP" /></Field>
        </div>
      );
    }
    if (step === 1) {
      return (
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Nome do responsável" required><input className={inputClass} value={data.contactName} onChange={(e) => update("contactName", e.target.value)} /></Field>
          <Field label="WhatsApp" required><input className={inputClass} value={data.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="(15) 99999-9999" /></Field>
          <Field label="Telefone alternativo"><input className={inputClass} value={data.phone} onChange={(e) => update("phone", e.target.value)} /></Field>
          <Field label="E-mail"><input className={inputClass} type="email" value={data.email} onChange={(e) => update("email", e.target.value)} /></Field>
          <Field label="Instagram"><input className={inputClass} value={data.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="@empresa" /></Field>
          <Field label="Facebook"><input className={inputClass} value={data.facebook} onChange={(e) => update("facebook", e.target.value)} /></Field>
          <Field label="LinkedIn"><input className={inputClass} value={data.linkedin} onChange={(e) => update("linkedin", e.target.value)} /></Field>
          <Field label="TikTok"><input className={inputClass} value={data.tiktok} onChange={(e) => update("tiktok", e.target.value)} /></Field>
          <Field label="YouTube"><input className={inputClass} value={data.youtube} onChange={(e) => update("youtube", e.target.value)} /></Field>
          <Field label="Site atual"><input className={inputClass} value={data.currentSite} onChange={(e) => update("currentSite", e.target.value)} placeholder="https://..." /></Field>
        </div>
      );
    }
    if (step === 2) {
      return (
        <div className="space-y-5">
          <Field label="Conte a história da empresa" hint="Como começou, experiência, trajetória e contexto atual."><textarea className={`${inputClass} min-h-32 resize-y`} value={data.story} onChange={(e) => update("story", e.target.value)} /></Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Principais diferenciais"><textarea className={`${inputClass} min-h-28 resize-y`} value={data.differentials} onChange={(e) => update("differentials", e.target.value)} placeholder="Qualidade, rapidez, experiência..." /></Field>
            <Field label="Valores que deseja transmitir"><textarea className={`${inputClass} min-h-28 resize-y`} value={data.values} onChange={(e) => update("values", e.target.value)} placeholder="Confiança, inovação, segurança..." /></Field>
          </div>
          <Field label="Público-alvo"><input className={inputClass} value={data.targetAudience} onChange={(e) => update("targetAudience", e.target.value)} placeholder="Quem são os clientes ideais?" /></Field>
          <div>
            <p className="mb-3 text-sm font-medium">Objetivos principais do site</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {objectives.map((item) => (
                <label key={item} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-sm transition ${data.mainObjective.includes(item) ? "border-cyan-400/50 bg-cyan-400/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`}>
                  <input type="checkbox" checked={data.mainObjective.includes(item)} onChange={() => toggleList("mainObjective", item)} className="accent-cyan-400" /> {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    }
    if (step === 3) {
      return (
        <div className="space-y-5">
          <Field label="Serviços ou produtos" required hint="Informe um por linha. Acrescente uma breve explicação quando possível."><textarea className={`${inputClass} min-h-52 resize-y`} value={data.services} onChange={(e) => update("services", e.target.value)} placeholder={"Troca de óleo — manutenção preventiva\nFreios — revisão e substituição\nSuspensão — diagnóstico e reparo"} /></Field>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Área de atendimento"><input className={inputClass} value={data.serviceArea} onChange={(e) => update("serviceArea", e.target.value)} placeholder="Sorocaba e região / Todo o Brasil" /></Field>
            <Field label="Horário de funcionamento"><input className={inputClass} value={data.businessHours} onChange={(e) => update("businessHours", e.target.value)} placeholder="Segunda a sexta, 08h às 18h" /></Field>
            <Field label="Formas de pagamento"><input className={inputClass} value={data.paymentMethods} onChange={(e) => update("paymentMethods", e.target.value)} placeholder="PIX, cartão, dinheiro..." /></Field>
            <Field label="Garantia oferecida"><input className={inputClass} value={data.warranty} onChange={(e) => update("warranty", e.target.value)} /></Field>
            <Field label="Modelo de atendimento"><input className={inputClass} value={data.attendanceModel} onChange={(e) => update("attendanceModel", e.target.value)} placeholder="Agendamento, ordem de chegada..." /></Field>
          </div>
        </div>
      );
    }
    if (step === 4) {
      return (
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Possui logotipo?"><select className={inputClass} value={data.hasLogo} onChange={(e) => update("hasLogo", e.target.value)}><option>Não informado</option><option>Sim, em boa qualidade</option><option>Sim, mas precisa melhorar</option><option>Não possui</option></select></Field>
            <Field label="Possui fotos próprias?"><select className={inputClass} value={data.hasPhotos} onChange={(e) => update("hasPhotos", e.target.value)}><option>Não informado</option><option>Sim, profissionais</option><option>Sim, feitas pelo celular</option><option>Não possui</option></select></Field>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <UploadBox title="Enviar logotipo" description="Envie a melhor versão disponível. Preferencialmente PNG com fundo transparente ou arquivo em alta resolução." category="logo" multiple={false} accept="image/png,image/jpeg,image/webp" items={uploads} onAdd={addUploads} onRemove={removeUpload} />
            <UploadBox title="Fotos para o site" description="Envie as imagens preferidas para galeria, banners, serviços, fachada, equipe ou produtos." category="galeria" items={uploads} onAdd={addUploads} onRemove={removeUpload} />
            <UploadBox title="Fachada e ambiente" description="Fotos externas e internas ajudam a transmitir confiança e localização real." category="fachada" items={uploads} onAdd={addUploads} onRemove={removeUpload} />
          </div>
          {uploadError && <div role="alert" className="rounded-2xl border border-amber-400/25 bg-amber-500/[0.07] p-4 text-sm text-amber-100">{uploadError}</div>}
          <div className="grid gap-4 md:grid-cols-3">
            <ColorField label="Cor principal" value={data.primaryColor} onChange={(value) => update("primaryColor", value)} />
            <ColorField label="Cor secundária" value={data.secondaryColor} onChange={(value) => update("secondaryColor", value)} />
            <ColorField label="Cor de destaque" value={data.accentColor} onChange={(value) => update("accentColor", value)} />
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <div className="grid h-24 grid-cols-3" aria-label="Prévia da paleta escolhida">
              <div style={{ backgroundColor: data.primaryColor }} />
              <div style={{ backgroundColor: data.secondaryColor }} />
              <div style={{ backgroundColor: data.accentColor }} />
            </div>
            <div className="grid grid-cols-3 bg-black/30 px-3 py-2 text-center font-mono text-xs">
              <span>{data.primaryColor}</span><span>{data.secondaryColor}</span><span>{data.accentColor}</span>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Estilo visual"><select className={inputClass} value={data.visualStyle} onChange={(e) => update("visualStyle", e.target.value)}>{["Moderno", "Premium", "Minimalista", "Industrial", "Elegante", "Luxuoso", "Tecnológico", "Rústico", "Criativo"].map((item) => <option key={item}>{item}</option>)}</select></Field>
            <Field label="Tom de comunicação"><select className={inputClass} value={data.communicationTone} onChange={(e) => update("communicationTone", e.target.value)}>{["Profissional e próximo", "Formal e técnico", "Amigável e simples", "Sofisticado", "Direto e comercial", "Inspirador"].map((item) => <option key={item}>{item}</option>)}</select></Field>
          </div>
          <Field label="Sites, marcas ou referências visuais"><textarea className={`${inputClass} min-h-24 resize-y`} value={data.visualReferences} onChange={(e) => update("visualReferences", e.target.value)} placeholder="Cole links ou descreva o que agradou." /></Field>
        </div>
      );
    }
    if (step === 5) {
      return (
        <div>
          <p className="mb-4 text-sm text-muted-foreground">Selecione tudo que poderá fazer parte do projeto. A Orion avaliará a necessidade e o escopo final.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featureOptions.map((item) => (
              <label key={item} className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition ${data.features.includes(item) ? "border-violet-400/50 bg-violet-400/10" : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"}`}>
                <input type="checkbox" checked={data.features.includes(item)} onChange={() => toggleList("features", item)} className="accent-violet-400" /> {item}
              </label>
            ))}
          </div>
        </div>
      );
    }
    if (step === 6) {
      return (
        <div className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Possui Perfil da Empresa no Google?"><select className={inputClass} value={data.googleBusiness} onChange={(e) => update("googleBusiness", e.target.value)}><option>Não informado</option><option>Sim, completo e ativo</option><option>Sim, mas precisa atualizar</option><option>Não possui</option><option>Não sabe</option></select></Field>
            <Field label="Situação do domínio"><select className={inputClass} value={data.domainStatus} onChange={(e) => update("domainStatus", e.target.value)}><option>Não possui</option><option>Já possui domínio</option><option>Precisa registrar</option><option>Não sabe</option></select></Field>
            <Field label="Link do Google Maps"><input className={inputClass} value={data.googleMaps} onChange={(e) => update("googleMaps", e.target.value)} placeholder="https://maps.google.com/..." /></Field>
            <Field label="Link para avaliações"><input className={inputClass} value={data.reviewLink} onChange={(e) => update("reviewLink", e.target.value)} placeholder="https://g.page/.../review" /></Field>
            <Field label="Domínio desejado"><input className={inputClass} value={data.desiredDomain} onChange={(e) => update("desiredDomain", e.target.value)} placeholder="empresa.com.br" /></Field>
            <Field label="Prazo desejado"><input className={inputClass} value={data.deadline} onChange={(e) => update("deadline", e.target.value)} placeholder="Ex.: até 30 dias" /></Field>
            <Field label="Faixa de investimento"><select className={inputClass} value={data.budgetRange} onChange={(e) => update("budgetRange", e.target.value)}><option value="">Selecione</option><option>Até R$ 1.000</option><option>R$ 1.000 a R$ 2.000</option><option>R$ 2.000 a R$ 4.000</option><option>Acima de R$ 4.000</option><option>Prefere receber uma proposta</option></select></Field>
          </div>
          <Field label="Observações finais"><textarea className={`${inputClass} min-h-32 resize-y`} value={data.observations} onChange={(e) => update("observations", e.target.value)} placeholder="Tudo que ainda não foi perguntado e pode ser importante." /></Field>
        </div>
      );
    }
    if (submitted) {
      return (
        <div className="space-y-6 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full border border-emerald-400/30 bg-emerald-500/10">
            <MessageCircle className="h-10 w-10 text-emerald-300" />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Solicitação registrada</p>
            <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">Seu projeto foi enviado com sucesso! :)</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">Recebemos sua solicitação e ela já está em nossa fila de atendimento. Em breve entraremos em contato para dar continuidade ao seu projeto.</p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.05] p-5 text-left">
            <p className="text-xs uppercase tracking-[0.18em] text-emerald-300">Protocolo de atendimento</p>
            <p className="mt-2 font-mono text-2xl font-bold text-foreground">{projectCode}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Guarde este protocolo. Os dados do briefing já estão salvos. As {uploads.length} imagem(ns) selecionada(s) foram armazenadas com segurança junto ao seu projeto.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={() => setSubmitted(false)} className="rounded-2xl border border-white/10 px-5 py-4 font-semibold transition hover:bg-white/[0.06]">Voltar e revisar</button>
            <button type="button" onClick={() => window.open(createWhatsappLink(projectCode), "_blank", "noopener,noreferrer")} className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 font-semibold text-white transition hover:bg-emerald-400"><MessageCircle className="h-5 w-5" /> Abrir WhatsApp novamente</button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-xs text-muted-foreground">Cliente</p><p className="mt-1 font-semibold">{companyLabel}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-xs text-muted-foreground">Segmento</p><p className="mt-1 font-semibold">{data.segment || "Não informado"}</p></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"><p className="text-xs text-muted-foreground">Arquivos selecionados</p><p className="mt-1 font-semibold">{uploads.length}</p></div>
        </div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/[0.05] p-5">
          <div className="mb-4 flex items-center justify-between gap-3"><h3 className="font-display text-lg font-semibold">Confira antes de enviar</h3><FileText className="h-5 w-5 text-cyan-300" /></div>
          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">{briefing}</pre>
        </div>
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.05] p-4 text-sm text-amber-100/90">
          <p className="font-medium">Integração com o Orion Admin</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Ao enviar, os dados, o briefing e as imagens serão registrados no Orion Admin. Logo, fachada e galeria ficarão vinculadas ao protocolo oficial do projeto.</p>
        </div>
        {submitError && <div role="alert" className="rounded-2xl border border-red-400/25 bg-red-500/[0.07] p-4 text-sm text-red-200">{submitError}</div>}
        <button type="button" onClick={submitRequest} disabled={isSubmitting} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-4 font-semibold text-white transition hover:bg-emerald-400 disabled:cursor-wait disabled:opacity-60"><MessageCircle className="h-5 w-5" /> {isSubmitting ? "Salvando projeto e imagens..." : "Enviar solicitação"}</button>
      </div>
    );
  };

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-hero opacity-80" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
      <header className="relative z-10 border-b border-white/10 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
          <a href="/" className="flex items-center gap-3">
            <img src={company.icon} alt="Orion" className="orion-nav-logo h-10 w-10 rounded-full object-cover" />
            <div><p className="font-display font-bold">Orion</p><p className="text-xs text-muted-foreground">Portal de Projetos</p></div>
          </a>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex"><Save className="h-4 w-4" /> {saved ? "Progresso salvo" : "Salvamento automático"}</span>
            <a href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/[0.06]"><Home className="h-4 w-4" /> <span className="hidden sm:inline">Voltar ao site</span></a>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto max-w-7xl px-5 py-10 md:py-14">
        <div className="mb-8 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1.5 text-xs text-cyan-200"><Rocket className="h-3.5 w-3.5" /> Primeiro módulo do Orion Hub</div>
          <h1 className="font-display text-3xl font-bold tracking-tight md:text-5xl">Levantamento de <span className="text-gradient">Requisitos</span></h1>
          <p className="mt-4 text-muted-foreground">Preencha as informações do projeto, envie a logo e as fotos, defina a identidade visual e revise tudo antes de solicitar o desenvolvimento.</p>
        </div>

        <div className="mb-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-3 flex items-center justify-between text-xs"><span>Etapa {step + 1} de {steps.length}</span><span className="text-muted-foreground">{Math.round(((step + 1) / steps.length) * 100)}%</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 transition-all duration-500" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div>
          <div className="mt-4 hidden grid-cols-8 gap-2 lg:grid">{steps.map((item, index) => <button type="button" key={item} onClick={() => setStep(index)} className={`rounded-lg px-2 py-2 text-center text-[11px] transition ${index === step ? "bg-white/10 text-foreground" : index < step ? "text-cyan-300" : "text-muted-foreground hover:bg-white/[0.04]"}`}>{index < step ? "✓ " : ""}{item}</button>)}</div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-background/65 p-5 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="mb-7 flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 text-cyan-200">{step === 4 ? <Palette className="h-5 w-5" /> : step === 7 ? <FileText className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}</div>
            <div><p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Etapa {step + 1}</p><h2 className="font-display text-xl font-semibold md:text-2xl">{steps[step]}</h2></div>
          </div>
          {renderStep()}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
            <button type="button" onClick={reset} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-muted-foreground hover:bg-white/[0.05] hover:text-foreground"><RefreshCw className="h-4 w-4" /> Limpar tudo</button>
            <div className="flex gap-3">
              <button type="button" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))} className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm disabled:cursor-not-allowed disabled:opacity-30 hover:bg-white/[0.06]"><ArrowLeft className="h-4 w-4" /> Voltar</button>
              {step < steps.length - 1 && <button type="button" onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 py-2.5 text-sm font-medium text-white transition hover:scale-[1.02]">Continuar <ArrowRight className="h-4 w-4" /></button>}
            </div>
          </div>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">O preenchimento é salvo neste navegador durante a edição. Após o envio, os dados e as imagens são registrados com segurança no Orion Admin.</p>
      </section>
    </main>
  );
}
