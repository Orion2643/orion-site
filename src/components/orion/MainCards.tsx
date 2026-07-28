import { ArrowRight, Radar, Cpu, Signal, Wifi, Activity } from "lucide-react";
import { MessageSquare, FileText, Code2, Rocket, LineChart } from "lucide-react";
import cardProjects from "@/assets/card-projects.jpg";
import { StaggerGroup, StaggerItem, motion, EngineFlame } from "./motion";

const PROCESS_ICONS = [
  { key: "briefing", Icon: MessageSquare, cx: 150, cy: 40, label: "Briefing" },
  { key: "plan", Icon: FileText, cx: 240, cy: 110, label: "Planejamento" },
  { key: "dev", Icon: Code2, cx: 210, cy: 200, label: "Desenvolvimento" },
  { key: "deliver", Icon: Rocket, cx: 90, cy: 200, label: "Entrega" },
  { key: "support", Icon: LineChart, cx: 60, cy: 110, label: "Suporte" },
];

function ServicesHologram() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-primary/20 bg-space-deep/80">
      {/* Grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.7 0.18 250 / 0.15) 1px, transparent 1px), linear-gradient(90deg, oklch(0.7 0.18 250 / 0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      {/* Radar sweep */}
      <div className="absolute inset-6 grid place-items-center">
        <div className="relative h-32 w-32">
          <div className="absolute inset-0 rounded-full border border-primary/40" />
          <div className="absolute inset-3 rounded-full border border-primary/30" />
          <div className="absolute inset-6 rounded-full border border-primary/20" />
          <div
            aria-hidden
            className="absolute inset-0 rounded-full animate-[radar-spin_5s_linear_infinite]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, oklch(0.7 0.2 260 / 0.5) 60deg, transparent 90deg)",
            }}
          />
          <Radar className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-primary" strokeWidth={1.5} />
        </div>
      </div>
      {/* Blinking indicators */}
      <div className="absolute inset-0 p-3">
        {[
          { Icon: Cpu, top: "8%", left: "8%", delay: "0s" },
          { Icon: Signal, top: "10%", right: "10%", delay: "0.6s" },
          { Icon: Wifi, bottom: "10%", left: "12%", delay: "1.2s" },
          { Icon: Activity, bottom: "8%", right: "8%", delay: "0.3s" },
        ].map((i, k) => (
          <span
            key={k}
            className="absolute inline-flex h-7 w-7 items-center justify-center rounded-md border border-primary/40 bg-card/60 text-primary backdrop-blur animate-[node-blink_2.4s_ease-in-out_infinite]"
            style={{ ...i, animationDelay: i.delay } as React.CSSProperties}
          >
            <i.Icon className="h-3.5 w-3.5" strokeWidth={1.6} />
          </span>
        ))}
      </div>
      {/* Horizontal scan line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 h-16 animate-[scan-vert_4.5s_linear_infinite]"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(0.75 0.18 260 / 0.25), transparent)",
        }}
      />
    </div>
  );
}

function ProjectsScene() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {/* Twinkling stars overlay */}
      <div aria-hidden className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-white animate-twinkle"
            style={{
              top: `${(i * 47) % 100}%`,
              left: `${(i * 71) % 100}%`,
              width: `${1 + (i % 2)}px`,
              height: `${1 + (i % 2)}px`,
              opacity: 0.5 + ((i % 5) / 10),
              animationDelay: `${(i % 4) * 0.7}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
      {/* Nebula pulse */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 animate-[nebula-drift_10s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 60%, oklch(0.4 0.2 300 / 0.4), transparent 60%)",
        }}
      />
      {/* Chamas das turbinas — mesma nave do Hero, duas turbinas (acima do painel inferior, senão fica escondida atrás dele) */}
      <EngineFlame top="58%" left="25%" size={46} angle={26} />
      <EngineFlame top="65%" left="44%" size={36} angle={24} scale={0.9} delay={0.35} />
      <div className="pointer-events-none absolute inset-x-3 top-3 z-20 flex items-center justify-between rounded-lg border border-cyan-300/20 bg-space-deep/55 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-cyan-200 backdrop-blur-md">
        <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" /> Missão ativa</span>
        <span>OR-07</span>
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 right-3 z-20 rounded-lg border border-primary/20 bg-space-deep/60 p-2.5 backdrop-blur-md">
        <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          <span>Desenvolvimento</span><span className="text-cyan-200">78%</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 animate-[project-progress_3.5s_ease-in-out_infinite]" />
        </div>
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 z-10 rounded-xl border border-cyan-300/10 shadow-[inset_0_0_35px_oklch(0.72_0.18_250/0.12)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-cyan-300/10 to-transparent animate-[scan-vert_5s_linear_infinite]" />
      <img
        src={cardProjects}
        alt="Nave futurista avançando pelo espaço"
        loading="lazy"
        width={1024}
        height={900}
        className="relative h-full w-full object-cover opacity-90 animate-float"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 65%, transparent 95%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 65%, transparent 95%)",
        }}
      />
    </div>
  );
}

function ProcessDiagram() {
  return (
    <svg viewBox="0 0 300 270" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="diag-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.72 0.18 250)" />
          <stop offset="100%" stopColor="oklch(0.66 0.22 295)" />
        </linearGradient>
        <filter id="diag-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {/* Connecting lines with energized dashes */}
      {PROCESS_ICONS.map((n, i, arr) => {
        const next = arr[(i + 1) % arr.length];
        return (
          <path
            key={`p-${i}`}
            d={`M ${n.cx} ${n.cy} Q 150 120 ${next.cx} ${next.cy}`}
            stroke="url(#diag-grad)"
            strokeWidth="1.2"
            fill="none"
            opacity="0.55"
            strokeDasharray="3 4"
            className="animate-[dash-flow_3.8s_linear_infinite]"
          />
        );
      })}

      {/* Nodes */}
      {PROCESS_ICONS.map((n, index) => (
        <g key={n.key} className="group cursor-default animate-[process-node_3.2s_ease-in-out_infinite]" style={{ animationDelay: `${index * 0.42}s` }}>
          <circle
            cx={n.cx}
            cy={n.cy}
            r="26"
            fill="oklch(0.15 0.03 265)"
            stroke="url(#diag-grad)"
            strokeWidth="1.5"
            className="transition-all duration-300 group-hover:[r:29]"
          />
          <circle
            cx={n.cx}
            cy={n.cy}
            r="26"
            fill="oklch(0.55 0.2 275 / 0.15)"
            filter="url(#diag-glow)"
            className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
          <foreignObject x={n.cx - 12} y={n.cy - 12} width="24" height="24">
            <div className="grid h-6 w-6 place-items-center text-primary transition-transform duration-500 group-hover:rotate-12">
              <n.Icon className="h-4 w-4" strokeWidth={1.6} />
            </div>
          </foreignObject>
          <text
            x={n.cx}
            y={n.cy + 44}
            textAnchor="middle"
            className="fill-muted-foreground text-[9px] font-semibold uppercase tracking-widest"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

const CARDS = [
  {
    id: "servicos",
    eyebrow: "Serviços",
    title: (
      <>
        Soluções completas
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>em <span className="text-gradient-blue">tecnologia</span>
      </>
    ),
    text: "Da ideia à entrega, cuidamos de tudo para você focar no que importa: seu negócio.",
    cta: "Ver serviços",
    href: "#servicos-detalhes",
    render: "services" as const,
  },
  {
    id: "projetos",
    eyebrow: "Projetos",
    title: (
      <>
        Transformamos ideias
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>em <span className="text-gradient">resultados reais.</span>
      </>
    ),
    text: "Cada projeto é uma nova missão. Veja alguns dos que já decolaram com a Orion.",
    cta: "Ver projetos",
    href: "#projetos-detalhes",
    render: "projects" as const,
  },
  {
    id: "como-funciona-card",
    eyebrow: "Como funciona",
    title: (
      <>
        Um processo claro,
        <br className="hidden sm:block" />
        <span className="sm:hidden"> </span>simples e <span className="text-gradient-violet">eficiente.</span>
      </>
    ),
    text: "Entendemos, planejamos, desenvolvemos e entregamos com excelência.",
    cta: "Ver etapas",
    href: "#como-funciona",
    render: "diagram" as const,
  },
];

export function MainCards() {
  return (
    <section id="servicos" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <StaggerGroup className="grid gap-6 lg:grid-cols-3" stagger={0.15} amount={0.15}>
          {CARDS.map((c) => (
            <StaggerItem key={c.id} y={40}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="card-space group flex h-full flex-col overflow-hidden p-7"
              >
                <span className="eyebrow">{c.eyebrow}</span>
                <h3 className="mt-4 text-[1.6rem] font-bold leading-[1.16] text-foreground sm:text-[1.72rem]">
                  {c.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-7 text-muted-foreground">
                  {c.text}
                </p>

                <div className="relative my-6 flex h-52 items-center justify-center overflow-hidden rounded-xl">
                  {c.render === "services" && <ServicesHologram />}
                  {c.render === "projects" && <ProjectsScene />}
                  {c.render === "diagram" && <ProcessDiagram />}
                </div>

                <a
                  href={c.href}
                  className="mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 hover:text-primary hover:shadow-[0_10px_28px_oklch(0.55_0.22_275/0.25)] group-hover:border-primary/40"
                >
                  {c.cta}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
