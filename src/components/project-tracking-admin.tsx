import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  History,
  LoaderCircle,
  Save,
  Send,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export const PROJECT_STATUSES = [
  { value: "novo", label: "Novo projeto", progress: 5 },
  { value: "briefing_recebido", label: "Briefing recebido", progress: 15 },
  { value: "aguardando_material", label: "Aguardando material", progress: 25 },
  { value: "material_recebido", label: "Material recebido", progress: 35 },
  { value: "em_desenvolvimento", label: "Em desenvolvimento", progress: 60 },
  { value: "em_revisao", label: "Em revisão", progress: 85 },
  { value: "publicado", label: "Publicado", progress: 100 },
  { value: "finalizado", label: "Finalizado", progress: 100 },
] as const;

type TimelineItem = {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  progress: number | null;
  visible_to_client: boolean;
  created_at: string;
};

type TrackingProject = {
  id: string;
  project_code: string;
  status: string | null;
  progress?: number | null;
  next_step?: string | null;
  status_updated_at?: string | null;
};

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15";

function formatDate(value?: string | null) {
  if (!value) return "Não informado";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusLabel(status?: string | null) {
  return PROJECT_STATUSES.find((item) => item.value === status)?.label ?? "Novo projeto";
}

function statusProgress(status?: string | null) {
  return PROJECT_STATUSES.find((item) => item.value === status)?.progress ?? 5;
}

export default function ProjectTrackingAdmin({
  project,
  onProjectUpdated,
}: {
  project: TrackingProject;
  onProjectUpdated?: (changes: Partial<TrackingProject>) => void;
}) {
  const [status, setStatus] = useState(project.status || "novo");
  const [nextStep, setNextStep] = useState(project.next_step || "");
  const [note, setNote] = useState("");
  const [visibleToClient, setVisibleToClient] = useState(true);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const progress = useMemo(() => statusProgress(status), [status]);

  const loadTimeline = async () => {
    if (!supabase) return;
    setLoading(true);
    setError("");
    const { data, error: timelineError } = await supabase
      .from("project_timeline")
      .select("id, title, description, status, progress, visible_to_client, created_at")
      .eq("project_id", project.id)
      .order("created_at", { ascending: false });

    if (timelineError) setError(`Não foi possível carregar a timeline. ${timelineError.message}`);
    else setTimeline((data ?? []) as TimelineItem[]);
    setLoading(false);
  };

  useEffect(() => {
    setStatus(project.status || "novo");
    setNextStep(project.next_step || "");
    setNote("");
    void loadTimeline();
  }, [project.id]);

  const saveTracking = async () => {
    if (!supabase || saving) return;
    setSaving(true);
    setError("");
    setFeedback("");

    const { data, error: updateError } = await supabase.rpc("update_project_tracking", {
      p_project_id: project.id,
      p_status: status,
      p_next_step: nextStep,
      p_note: note,
      p_visible_to_client: visibleToClient,
    });

    if (updateError) {
      setError(`Não foi possível atualizar o projeto. ${updateError.message}`);
    } else {
      const result = Array.isArray(data) ? data[0] : data;
      onProjectUpdated?.({
        status: result?.status ?? status,
        progress: result?.progress ?? progress,
        next_step: result?.next_step ?? nextStep,
        status_updated_at: result?.status_updated_at ?? new Date().toISOString(),
      });
      setNote("");
      setFeedback("Andamento atualizado e registrado na timeline.");
      await loadTimeline();
    }

    setSaving(false);
    window.setTimeout(() => setFeedback(""), 3500);
  };

  return (
    <section className="rounded-3xl border border-violet-400/20 bg-violet-400/[0.04] p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-violet-300">Acompanhamento V3.4</p>
          <h3 className="mt-1 text-xl font-bold">Status e timeline do projeto</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Atualize o andamento e registre uma mensagem que poderá aparecer para o cliente.
          </p>
        </div>
        <div className="min-w-44 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-right">
          <p className="text-xs text-muted-foreground">Progresso atual</p>
          <p className="mt-1 text-3xl font-bold text-violet-200">{progress}%</p>
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-violet-400 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium">Status do projeto</span>
            <select className={fieldClass} value={status} onChange={(event) => setStatus(event.target.value)}>
              {PROJECT_STATUSES.map((item) => (
                <option key={item.value} value={item.value}>{item.label} · {item.progress}%</option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Próximo passo</span>
            <input
              className={fieldClass}
              value={nextStep}
              onChange={(event) => setNextStep(event.target.value)}
              placeholder="Ex.: enviar primeira versão para aprovação"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Observação da atualização</span>
            <textarea
              className={`${fieldClass} min-h-28 resize-y`}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Ex.: Recebemos as fotos e iniciamos a montagem da página principal."
            />
          </label>

          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
            <input
              type="checkbox"
              checked={visibleToClient}
              onChange={(event) => setVisibleToClient(event.target.checked)}
              className="mt-0.5 accent-violet-400"
            />
            <span>
              <strong className="block">Mostrar esta atualização ao cliente</strong>
              <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
                Desmarque para registrar uma observação interna da Orion.
              </span>
            </span>
          </label>

          {error && <div role="alert" className="rounded-2xl border border-red-400/25 bg-red-500/[0.07] p-4 text-sm text-red-200">{error}</div>}
          <div aria-live="polite" className="min-h-5 text-sm text-emerald-300">{feedback}</div>

          <button
            type="button"
            onClick={() => void saveTracking()}
            disabled={saving}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-500 px-5 py-4 font-semibold text-white transition hover:bg-violet-400 disabled:opacity-60"
          >
            {saving ? <LoaderCircle className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />}
            {saving ? "Salvando..." : "Salvar atualização"}
          </button>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/15 p-4">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2"><History className="h-5 w-5 text-violet-300" /><h4 className="font-semibold">Histórico</h4></div>
            <span className="text-xs text-muted-foreground">{timeline.length} registro(s)</span>
          </div>

          {loading ? (
            <div className="flex items-center gap-2 py-8 text-sm text-muted-foreground"><LoaderCircle className="h-5 w-5 animate-spin" /> Carregando timeline...</div>
          ) : timeline.length ? (
            <div className="max-h-[520px] space-y-3 overflow-y-auto pr-1">
              {timeline.map((item) => (
                <article key={item.id} className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-400/10 text-violet-200">
                        {item.progress === 100 ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        {item.description && <p className="mt-1 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">{item.description}</p>}
                      </div>
                    </div>
                    {typeof item.progress === "number" && <span className="rounded-full bg-white/[0.05] px-2 py-1 text-[10px]">{item.progress}%</span>}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
                    <span>{formatDate(item.created_at)}</span>
                    <span className={item.visible_to_client ? "text-emerald-300" : "text-amber-300"}>
                      {item.visible_to_client ? "Visível ao cliente" : "Somente Orion"}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-muted-foreground">Nenhum evento registrado.</div>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.025] px-4 py-3 text-xs text-muted-foreground">
        <Send className="h-4 w-4 text-violet-300" />
        Status selecionado: <strong className="text-foreground">{statusLabel(status)}</strong>
      </div>
    </section>
  );
}
