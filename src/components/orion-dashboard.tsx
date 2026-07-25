import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Plus, Rocket, Sparkles } from "lucide-react";
import { company } from "../config/company";
import { Starfield } from "./space-visuals";

export default function OrionDashboard() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-hero" />
      <div className="pointer-events-none absolute inset-0 bg-nebula opacity-70" />
      <div className="pointer-events-none absolute inset-0"><Starfield density={120} /></div>
      <div className="pointer-events-none absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-[120px]" />

      <header className="relative z-20 border-b border-white/10 bg-background/55 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <Link to="/" className="group flex items-center gap-3" aria-label="Voltar ao site da Orion">
            <img src={company.icon} alt="Símbolo da Orion" className="h-11 w-11 rounded-full object-cover ring-1 ring-white/15" />
            <div><span className="block font-display text-lg font-bold">Área Orion</span><span className="block text-xs text-muted-foreground">Comece um novo projeto</span></div>
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm hover:bg-white/[0.08]"><ArrowLeft className="h-4 w-4" /> Voltar ao site</Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex min-h-[calc(100dvh-78px)] max-w-6xl items-center px-5 py-14 sm:px-6">
        <section className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.08] px-4 py-2 text-xs font-medium text-cyan-200"><Rocket className="h-4 w-4" /> Seu projeto começa aqui</div>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">Transforme sua ideia em um <span className="text-gradient">projeto bem planejado.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">Preencha nosso levantamento guiado. Em poucos minutos, a Orion recebe as informações essenciais para entender sua empresa, seus objetivos e a solução que você precisa.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/briefing" className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-4 font-semibold text-white shadow-[var(--shadow-glow-purple)] transition hover:scale-[1.02]"><Plus className="h-5 w-5" /> Iniciar meu projeto <ArrowRight className="h-5 w-5" /></Link>
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-2xl sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.08] via-transparent to-violet-500/[0.08]" />
            <div className="relative">
              <div className="flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10"><Sparkles className="h-6 w-6 text-cyan-300" /></div><div><p className="text-xs uppercase tracking-[0.18em] text-cyan-300">Método Orion</p><h2 className="text-xl font-bold">Levantamento em 8 etapas</h2></div></div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {["Empresa", "Contato", "Essência", "Serviços", "Identidade visual", "Recursos", "Google e projeto", "Resumo e envio"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/10 px-4 py-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/[0.06] text-xs font-bold text-cyan-200">{String(index + 1).padStart(2, "0")}</span><span className="text-sm">{item}</span></div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
