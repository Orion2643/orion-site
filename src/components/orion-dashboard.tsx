import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BriefcaseBusiness,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import { company } from "../config/company";
import { Starfield } from "./space-visuals";
import ProjectTrackingLookup from "./project-tracking-lookup";

type PortalItem = {
  title: string;
  description: string;
  icon: typeof Plus;
  to?: "/briefing" | "/admin";
  badge?: string;
};

const portalItems: PortalItem[] = [
  {
    title: "Novo Projeto",
    description: "Inicie um novo levantamento de requisitos e gere o briefing do cliente.",
    icon: Plus,
    to: "/briefing",
  },
  {
    title: "Projetos",
    description: "Consulte os projetos cadastrados e acompanhe as informações recebidas.",
    icon: BriefcaseBusiness,
    to: "/admin",
  },
  {
    title: "Arquivos",
    description: "Central de logos, fachadas e galerias vinculadas aos projetos.",
    icon: FolderOpen,
    badge: "V3.4",
  },
  {
    title: "Clientes",
    description: "Cadastro, histórico e relacionamento com os clientes da Orion.",
    icon: Users,
    badge: "Em breve",
  },
  {
    title: "Contratos",
    description: "Propostas, contratos e documentos organizados em um único lugar.",
    icon: FileText,
    badge: "Em breve",
  },
  {
    title: "Configurações",
    description: "Preferências, integrações e parâmetros administrativos da plataforma.",
    icon: Settings,
    badge: "Em breve",
  },
];

export default function OrionDashboard() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 bg-nebula opacity-60" />
      <div className="absolute inset-0">
        <Starfield density={90} />
      </div>

      <header className="relative z-10 border-b border-white/10 bg-background/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link to="/" className="flex items-center gap-3" aria-label="Voltar ao site da Orion">
            <img
              src={company.icon}
              alt="Símbolo da Orion"
              className="h-11 w-11 rounded-full object-cover shadow-[0_0_24px_rgba(59,130,246,0.45)]"
            />
            <div>
              <span className="block font-display text-lg font-bold">Portal Orion</span>
              <span className="block text-xs text-muted-foreground">Gestão de projetos</span>
            </div>
          </Link>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm transition hover:bg-white/[0.08]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Voltar ao site</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:py-20">
        <section className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-xl">
            <LayoutDashboard className="h-3.5 w-3.5" />
            Central de operações
          </div>

          <h1 className="mt-6 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Bem-vindo ao <span className="text-gradient">Portal Orion</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Inicie novos projetos, consulte briefings e acompanhe a evolução da plataforma em um
            ambiente centralizado.
          </p>
        </section>

        <ProjectTrackingLookup />

        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {portalItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/20 ring-1 ring-primary/30">
                    <Icon className="h-6 w-6 text-[oklch(0.82_0.14_200)]" />
                  </div>
                  {item.badge && (
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h2 className="mt-5 font-display text-xl font-semibold">{item.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                <div className="mt-6 text-sm font-medium text-[oklch(0.82_0.14_200)]">
                  {item.to ? "Acessar agora →" : "Funcionalidade planejada"}
                </div>
              </>
            );

            if (item.to) {
              return (
                <Link
                  key={item.title}
                  to={item.to}
                  className="glass-card group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:ring-1 hover:ring-primary/40"
                >
                  {content}
                </Link>
              );
            }

            return (
              <article
                key={item.title}
                aria-disabled="true"
                className="glass-card rounded-2xl p-6 opacity-65"
              >
                {content}
              </article>
            );
          })}
        </section>
      </main>
    </div>
  );
}
