import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import { OrionMark } from "./OrionMark";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal, StaggerGroup, StaggerItem, EASE_ORION } from "./motion";

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
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function ProjectTrackingSection() {
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

    const { data, error: lookupError } = await supabase.rpc(
      "get_project_tracking",
      { p_project_code: normalized },
    );

    if (lookupError) {
      setError(`Não foi possível consultar o projeto. ${lookupError.message}`);
    } else if (!data) {
      setError("Protocolo não encontrado. Confira o código recebido da Orion.");
    } else {
      setTracking(data as PublicTracking);
    }

    setLoading(false);
  };

  return (
    <section id="acompanhar" className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal as="div" y={36} className="card-space overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
            <div className="relative hidden h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border/60 bg-space-deep lg:flex">
              <div
                aria-hidden
                className="absolute inset-0 opacity-70"
                style={{
                  background:
                    "radial-gradient(circle at center, oklch(0.35 0.15 275 / 0.6), transparent 70%)",
                }}
              />
              <OrionMark className="relative h-full w-full" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-orion-cyan" />
                <span className="eyebrow">Acompanhe seu projeto</span>
              </div>
              <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl">
                Consulte seu andamento{" "}
                <span className="text-gradient">pelo protocolo</span>
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Digite o código recebido ao finalizar o briefing. A consulta mostra somente o andamento e as atualizações liberadas pela Orion.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="protocol" className="sr-only">
                  Código do protocolo
                </label>
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="protocol"
                    type="text"
                    value={code}
                    onChange={(event) => {
                      setCode(event.target.value.toUpperCase());
                      if (error) setError("");
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") void searchProject();
                    }}
                    placeholder="Ex.: ORION-K7M4Q9"
                    className="w-full rounded-full border border-border bg-space-deep/80 py-3.5 pl-11 pr-4 font-mono text-sm uppercase text-foreground placeholder:normal-case placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/30"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => void searchProject()}
                  disabled={loading}
                  className="btn-primary-glow inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold disabled:opacity-60"
                >
                  {loading ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                  {loading ? "Consultando..." : "Consultar projeto"}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-4 rounded-2xl border border-red-400/25 bg-red-500/[0.07] p-4 text-sm text-red-200"
                >
                  {error}
                </p>
              )}
            </div>
          </div>

          <AnimatePresence>
            {tracking && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: EASE_ORION }}
                className="overflow-hidden"
              >
                <div className="grid gap-5 border-t border-border/50 p-6 sm:p-10 lg:grid-cols-[1fr_360px]">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: EASE_ORION }}
                    className="rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.05] p-5"
                  >
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
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-violet-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${tracking.progress}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: EASE_ORION }}
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
                  </motion.div>

                  <motion.aside
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: EASE_ORION }}
                    className="rounded-2xl border border-white/10 bg-black/15 p-5"
                  >
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <h3 className="font-semibold">Timeline</h3>
                      <span className="text-xs text-muted-foreground">
                        {tracking.timeline?.length ?? 0} evento(s)
                      </span>
                    </div>
                    {tracking.timeline?.length ? (
                      <StaggerGroup className="max-h-[430px] space-y-3 overflow-y-auto pr-1" stagger={0.08}>
                        {tracking.timeline.map((item) => (
                          <StaggerItem key={item.id} y={12}>
                            <article className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
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
                          </StaggerItem>
                        ))}
                      </StaggerGroup>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Nenhuma atualização pública registrada.
                      </p>
                    )}
                  </motion.aside>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
