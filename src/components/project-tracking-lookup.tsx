import { useState } from "react";
import { CheckCircle2, Clock3, LoaderCircle, Search, ShieldCheck } from "lucide-react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

type PublicTimeline = {
  id: string;
  title: string;
  description: string | null;
  status: string | null;
  progress: number | null;
  created_at: string;
};

type PublicTracking = {
  project_code: string;
  company_name: string;
  segment: string | null;
  status: string;
  status_label: string;
  progress: number;
  next_step: string | null;
  created_at: string;
  updated_at: string;
  timeline: PublicTimeline[];
};

function formatDate(value?: string | null) {
  if (!value) return "Não informado";
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(
    new Date(value),
  );
}

export default function ProjectTrackingLookup() {
  const [code, setCode] = useState("");
  const [tracking, setTracking] = useState<PublicTracking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchProject = async () => {
    if (!supabase || !isSupabaseConfigured) {
      setError("A consulta ainda não está configurada neste ambiente.");
      return;
    }

    const normalized = code.trim().toUpperCase();
    if (!normalized) {
      setError("Informe o protocolo do projeto.");
      return;
    }

    setLoading(true);
    setError("");
    setTracking(null);

    const { data, error: lookupError } = await supabase.rpc("get_project_tracking", {
      p_project_code: normalized,
    });

    if (lookupError) setError(`Não foi possível consultar o projeto. ${lookupError.message}`);
    else if (!data) setError("Protocolo não encontrado. Confira o código recebido da Orion.");
    else setTracking(data as PublicTracking);

    setLoading(false);
  };

  return (
    <section className="relative mt-12 overflow-hidden rounded-[2rem] border border-cyan-300/30 bg-slate-950/72 p-6 shadow-[0_0_60px_rgba(34,211,238,0.08),0_0_100px_rgba(139,92,246,0.06)] backdrop-blur-2xl md:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/90 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-28 -top-28 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
      />
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-cyan-300">
            <ShieldCheck className="h-4 w-4" /> Acompanhamento do projeto
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
            Consulte seu andamento pelo protocolo
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Digite o código recebido ao finalizar o briefing. A consulta mostra apenas o andamento e
            as atualizações liberadas pela Orion.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          onKeyDown={(event) => event.key === "Enter" && void searchProject()}
          placeholder="Ex.: ORION-K7M4Q9"
          className="min-w-0 flex-1 rounded-2xl border border-cyan-300/20 bg-white/[0.04] px-5 py-4 font-mono text-sm uppercase shadow-[inset_0_0_24px_rgba(34,211,238,0.025)] outline-none transition placeholder:normal-case placeholder:text-muted-foreground/60 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-400/20 focus:shadow-[0_0_25px_rgba(34,211,238,0.10)]"
        />
        <button
          type="button"
          onClick={() => void searchProject()}
          disabled={loading}
          className="btn-shine inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 px-6 py-4 font-semibold text-white shadow-[0_0_30px_rgba(59,130,246,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_0_42px_rgba(139,92,246,0.30)] disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          {loading ? "Consultando..." : "Consultar projeto"}
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 rounded-2xl border border-red-400/25 bg-red-500/[0.07] p-4 text-sm text-red-200"
        >
          {error}
        </div>
      )}

      {tracking && (
        <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/[0.08] to-violet-500/[0.04] p-5 shadow-[0_0_32px_rgba(34,211,238,0.06)]">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="font-mono text-sm font-semibold text-cyan-300">
                    {tracking.project_code}
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">{tracking.company_name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tracking.segment || "Projeto Orion"}
                  </p>
                </div>
                <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-300">
                  {tracking.status_label}
                </div>
              </div>

              <div className="mt-6 flex items-end justify-between gap-3">
                <span className="text-sm text-muted-foreground">Progresso do projeto</span>
                <strong className="text-2xl">{tracking.progress}%</strong>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 shadow-[0_0_16px_rgba(34,211,238,0.55)] transition-all duration-700"
                  style={{ width: `${tracking.progress}%` }}
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <p className="text-xs text-muted-foreground">Próximo passo</p>
                  <p className="mt-2 text-sm font-medium">
                    {tracking.next_step || "Aguardar nova atualização da Orion."}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/15 p-4">
                  <p className="text-xs text-muted-foreground">Última atualização</p>
                  <p className="mt-2 text-sm font-medium">{formatDate(tracking.updated_at)}</p>
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-violet-300/20 bg-black/20 p-5 shadow-[0_0_28px_rgba(139,92,246,0.05)]">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-semibold">Timeline</h3>
              <span className="text-xs text-muted-foreground">
                {tracking.timeline?.length ?? 0} evento(s)
              </span>
            </div>
            {tracking.timeline?.length ? (
              <div className="max-h-[430px] space-y-3 overflow-y-auto pr-1">
                {tracking.timeline.map((item) => (
                  <article
                    key={item.id}
                    className="rounded-xl border border-cyan-300/15 bg-white/[0.03] p-4 transition hover:border-cyan-300/35 hover:bg-cyan-300/[0.045] hover:shadow-[0_0_20px_rgba(34,211,238,0.06)]"
                  >
                    <div className="flex gap-3">
                      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-cyan-400/10 text-cyan-200">
                        {item.progress === 100 ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Clock3 className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.title}</p>
                        {item.description && (
                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        )}
                        <p className="mt-2 text-[11px] text-muted-foreground">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Nenhuma atualização pública registrada.
              </p>
            )}
          </aside>
        </div>
      )}
    </section>
  );
}
