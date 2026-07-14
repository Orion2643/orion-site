import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Rocket,
  Code2,
  Layout,
  LayoutDashboard,
  Building2,
  Bot,
  Plug,
  Search,
  Compass,
  Boxes,
  Sparkles,
  ShieldCheck,
  Zap,
  Gauge,
  LineChart,
  Users,
  MessageCircle,
  ChevronDown,
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Cpu,
  Database,
  Cloud,
  GitBranch,
  Workflow,
  Brain,
  Globe,
  Palette,
  Server,
  Terminal,
  CheckCircle2,
  Target,
  Lightbulb,
  PenTool,
  TestTube,
  Rocket as RocketIcon,
  Repeat,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Scissors,
  Wrench,
  Hammer,
  Stethoscope,
  Truck,
  Wallet,
  Package,
  Users2,
} from "lucide-react";
import { ParticleSphere, Starfield, IntroOverlay } from "./space-visuals";
import { company, emailUrl, whatsappUrl } from "@/config/company";

/* ---------- NAV ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["Sobre", "#sobre"],
    ["Serviços", "#servicos"],
    ["Processo", "#processo"],
    ["Projetos", "#projetos"],
    ["Tecnologias", "#tecnologias"],
    ["FAQ", "#faq"],
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-3" aria-label="Voltar ao início">
          <img
            src={company.icon}
            alt="Símbolo da Orion"
            className="h-10 w-10 rounded-full object-cover shadow-[0_0_24px_rgba(59,130,246,0.45)] transition-transform group-hover:scale-105"
          />
          <span className="font-display text-xl font-bold tracking-tight">{company.shortName}</span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map(([label, href]) => (
            <li key={href}>
              <a
                href={href}
                className="relative text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 text-sm font-medium text-white shadow-[var(--shadow-glow-purple)] transition-transform hover:scale-105"
        >
          Fale conosco <ArrowRight className="h-4 w-4" />
        </a>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden glass mt-3 mx-6 rounded-2xl p-4 flex flex-col gap-3">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="text-sm py-1">
              {label}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 text-center rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm text-white"
          >
            Fale conosco
          </a>
        </div>
      )}
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section id="top" className="relative min-h-dvh overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 bg-hero" />
      <div className="absolute inset-0 bg-nebula opacity-70" />
      <div className="absolute inset-0">
        <Starfield density={100} />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.82_0.14_200)] animate-pulse" />
            Soluções digitais inteligentes
          </div>
          <h1 className="mt-6 font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Transformamos ideias em <span className="text-gradient">tecnologia inteligente</span>
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            A Orion desenvolve sites profissionais, sistemas personalizados, automações,
            inteligência artificial e integrações sob medida para empresas que desejam crescer com
            performance e inovação.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-medium text-white shadow-[var(--shadow-glow-purple)] transition-all hover:scale-105"
            >
              Solicitar orçamento
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#projetos"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-medium transition-colors hover:bg-white/10"
            >
              Conheça nossos projetos
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[oklch(0.82_0.14_200)]" /> Segurança
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-[oklch(0.82_0.14_200)]" /> Performance
            </div>
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-[oklch(0.82_0.14_200)]" /> IA aplicada
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative aspect-square w-full max-w-[560px] mx-auto"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-3xl animate-pulse-glow" />
          <div className="relative h-full w-full">
            <ParticleSphere />
          </div>
        </motion.div>
      </div>
      <a
        href="#sobre"
        aria-label="Rolar"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground animate-bounce"
      >
        <ChevronDown className="h-5 w-5" />
      </a>
    </section>
  );
}

/* ---------- SECTION HEADER ---------- */
function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center mb-14">
      <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground">
        {eyebrow}
      </div>
      <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && <p className="mt-4 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

/* ---------- SOBRE ---------- */
function About() {
  const pillars = [
    { icon: Code2, title: "Desenvolvimento", desc: "Software sob medida com arquitetura moderna." },
    { icon: Palette, title: "Design", desc: "Interfaces refinadas com foco em experiência." },
    { icon: Bot, title: "Automação", desc: "Fluxos inteligentes com IA e n8n." },
    { icon: Brain, title: "Inteligência", desc: "IA aplicada para decisões orientadas a dados." },
  ];
  return (
    <section id="sobre" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Quem somos"
          title="Tecnologia que impulsiona negócios"
          subtitle="A Orion é uma empresa especializada em criar soluções tecnológicas que combinam desenvolvimento personalizado, design moderno, automações inteligentes e IA aplicada — com proximidade e competência."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="glass-card rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-primary/30">
                <p.icon className="h-5 w-5 text-[oklch(0.82_0.14_200)]" />
              </div>
              <h3 className="mt-4 font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- SERVIÇOS ---------- */
function Services() {
  const items = [
    {
      icon: Layout,
      title: "Sites Institucionais",
      desc: "Presença digital profissional que representa sua marca.",
    },
    {
      icon: Rocket,
      title: "Landing Pages",
      desc: "Páginas de alta conversão para campanhas e produtos.",
    },
    {
      icon: LayoutDashboard,
      title: "Sistemas Web Personalizados",
      desc: "Software sob medida para operações específicas.",
    },
    {
      icon: Building2,
      title: "Plataformas Empresariais",
      desc: "Soluções robustas para gestão e operação em escala.",
    },
    {
      icon: Bot,
      title: "Automações com IA e n8n",
      desc: "Fluxos inteligentes que economizam tempo e recursos.",
    },
    {
      icon: Plug,
      title: "Integrações via API",
      desc: "Conectamos seus sistemas com qualquer serviço externo.",
    },
    {
      icon: Search,
      title: "SEO e Google Business",
      desc: "Visibilidade orgânica e presença local otimizada.",
    },
    {
      icon: Compass,
      title: "Consultoria em Tecnologia",
      desc: "Direção estratégica para escolhas técnicas certas.",
    },
    {
      icon: Boxes,
      title: "Produtos Digitais",
      desc: "Do MVP ao SaaS escalável com métricas de produto.",
    },
  ];
  return (
    <section id="servicos" className="relative py-28">
      <div className="absolute inset-0 bg-nebula opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Serviços" title="Soluções completas em tecnologia" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-2xl glass-card p-7 transition-all hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_oklch(0.58_0.24_295_/_0.4)]"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-opacity opacity-0 group-hover:opacity-100" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-white/10">
                  <s.icon className="h-6 w-6 text-[oklch(0.82_0.14_200)]" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESSO ---------- */
function Process() {
  const steps = [
    {
      icon: Lightbulb,
      title: "Descoberta",
      desc: "Entendemos o problema e o contexto do negócio.",
    },
    { icon: Target, title: "Planejamento", desc: "Escopo, metas e arquitetura da solução." },
    { icon: PenTool, title: "Design", desc: "Interfaces refinadas e fluxos de uso claros." },
    { icon: Code2, title: "Desenvolvimento", desc: "Código limpo e componentes reutilizáveis." },
    { icon: TestTube, title: "Testes", desc: "Qualidade, performance e segurança validadas." },
    { icon: RocketIcon, title: "Implantação", desc: "Deploy com monitoramento e observabilidade." },
    { icon: Repeat, title: "Evolução Contínua", desc: "Melhorias iterativas guiadas por dados." },
  ];
  return (
    <section id="processo" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Processo" title="Como trabalhamos" />
        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary/40 to-transparent md:block" />
          <div className="space-y-6 md:space-y-12">
            {steps.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                  i % 2 === 0 ? "" : "md:[&>*:first-child]:col-start-2"
                }`}
              >
                <div className={`glass-card rounded-2xl p-6 ${i % 2 === 0 ? "md:text-right" : ""}`}>
                  <div className={`flex items-center gap-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                    <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white">
                      <s.icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-muted-foreground">
                      Etapa {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
                <div className="hidden md:block" />
                <div className="absolute left-1/2 top-1/2 hidden h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_20px_oklch(0.58_0.24_295_/_0.6)] md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PROJETOS ---------- */
function Projects() {
  const projects = [
    { icon: Scissors, title: "Sistema para Barbearia", tag: "Agendamentos", device: "laptop" },
    {
      icon: Wrench,
      title: "Sistema para Oficina Mecânica",
      tag: "Ordens de serviço",
      device: "desktop",
    },
    { icon: Hammer, title: "Sistema para Serralheria", tag: "Orçamentos", device: "tablet" },
    { icon: Stethoscope, title: "Plataforma para Clínicas", tag: "Prontuários", device: "laptop" },
    { icon: Truck, title: "Sistema de Terraplanagem", tag: "Operações", device: "desktop" },
    { icon: Wallet, title: "Controle Financeiro", tag: "Fluxo de caixa", device: "smartphone" },
    { icon: Package, title: "Gestão de Estoque", tag: "Inventário", device: "tablet" },
    { icon: Users2, title: "CRM Empresarial", tag: "Vendas", device: "laptop" },
  ];
  const DeviceIcon = {
    laptop: Laptop,
    desktop: Monitor,
    tablet: Tablet,
    smartphone: Smartphone,
  } as const;

  return (
    <section id="projetos" className="relative py-28">
      <div className="absolute inset-0 bg-nebula opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Projetos"
          title="Soluções que entregam resultado"
          subtitle="Demonstrações conceituais das nossas capacidades em diferentes segmentos."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => {
            const Dev = DeviceIcon[p.device as keyof typeof DeviceIcon];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                className="group glass-card rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-video bg-gradient-to-br from-[oklch(0.16_0.06_265)] to-[oklch(0.14_0.05_268)] flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,oklch(0.58_0.24_295/0.25),transparent_60%)]" />
                  <Dev
                    className="h-16 w-16 text-white/70 relative z-10 transition-transform group-hover:scale-110"
                    strokeWidth={1.2}
                  />
                  <div className="absolute bottom-3 right-3 text-[10px] uppercase tracking-widest text-muted-foreground">
                    Conceito
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-xs text-[oklch(0.82_0.14_200)]">{p.tag}</div>
                  <h3 className="mt-1 font-semibold flex items-center gap-2">
                    <p.icon className="h-4 w-4 opacity-70" /> {p.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- TECNOLOGIAS ---------- */
function Technologies() {
  const techs = [
    { icon: Code2, name: "React" },
    { icon: Code2, name: "TypeScript" },
    { icon: Rocket, name: "Next.js" },
    { icon: Terminal, name: "Python" },
    { icon: Server, name: "FastAPI" },
    { icon: Cpu, name: "Node.js" },
    { icon: Boxes, name: "Docker" },
    { icon: Database, name: "PostgreSQL" },
    { icon: Cloud, name: "Cloudflare" },
    { icon: Github, name: "GitHub" },
    { icon: Workflow, name: "n8n" },
    { icon: Brain, name: "OpenAI" },
    { icon: Plug, name: "APIs REST" },
    { icon: Sparkles, name: "IA" },
    { icon: Globe, name: "HTML5" },
    { icon: Palette, name: "CSS3" },
    { icon: GitBranch, name: "Git" },
    { icon: Layout, name: "Tailwind CSS" },
  ];
  return (
    <section id="tecnologias" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Stack" title="Tecnologias que dominamos" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {techs.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (i % 6) * 0.05, duration: 0.4 }}
              className="glass-card rounded-xl p-4 flex flex-col items-center gap-2 transition-all hover:-translate-y-1 hover:ring-primary/40"
            >
              <t.icon className="h-6 w-6 text-[oklch(0.82_0.14_200)]" />
              <span className="text-xs text-muted-foreground">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- AI ---------- */
function AISection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.58_0.24_295/0.2),transparent_70%)]" />
      <div className="absolute inset-0">
        <Starfield density={70} />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground">
            <Sparkles className="h-3 w-3" /> Inteligência Artificial
          </div>
          <h2 className="mt-5 font-display text-3xl md:text-5xl font-bold leading-tight">
            A <span className="text-gradient">Inteligência Artificial</span> potencializa empresas
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Agentes inteligentes, automações, assistentes virtuais e análise de dados reduzem
            custos, aumentam a produtividade e aprimoram a tomada de decisões. Aplicamos IA de forma
            prática, integrada aos seus processos.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Assistentes virtuais que atendem 24/7",
              "Automação de tarefas repetitivas",
              "Análise preditiva com dados do seu negócio",
              "Integração com ferramentas que você já usa",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[oklch(0.82_0.14_200)]" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative aspect-square max-w-md mx-auto w-full"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl animate-pulse-glow" />
          <div className="relative h-full w-full">
            <ParticleSphere />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- POR QUE ---------- */
function WhyUs() {
  const items = [
    {
      icon: Gauge,
      title: "Performance",
      desc: "Sites e sistemas rápidos, otimizados de ponta a ponta.",
    },
    {
      icon: ShieldCheck,
      title: "Segurança",
      desc: "Boas práticas, criptografia e proteção de dados.",
    },
    {
      icon: LineChart,
      title: "Escalabilidade",
      desc: "Arquitetura preparada para crescer com o seu negócio.",
    },
    {
      icon: Cpu,
      title: "Arquitetura moderna",
      desc: "Stack atual, modular e sustentável no longo prazo.",
    },
    {
      icon: Smartphone,
      title: "Design responsivo",
      desc: "Experiência impecável em qualquer dispositivo.",
    },
    {
      icon: Users,
      title: "Suporte contínuo",
      desc: "Acompanhamento próximo depois do lançamento.",
    },
    {
      icon: Target,
      title: "Foco em resultados",
      desc: "Cada entrega ligada a métricas do seu negócio.",
    },
    {
      icon: Plug,
      title: "Integração de sistemas",
      desc: "Conectamos ferramentas para operar como um só.",
    },
    {
      icon: Sparkles,
      title: "Inovação constante",
      desc: "IA e automações aplicadas aos seus processos.",
    },
  ];
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Diferenciais" title="Por que escolher a Orion?" />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.5 }}
              className="glass-card rounded-2xl p-6 group transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                  <it.icon className="h-5 w-5 text-[oklch(0.82_0.14_200)]" />
                </div>
                <h3 className="font-semibold">{it.title}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- METRICS ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      setVal(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

function Metrics() {
  const stats = [
    { label: "Projetos conceituais", value: 20, suffix: "+" },
    { label: "Tecnologias dominadas", value: 18, suffix: "+" },
    { label: "Disponibilidade de suporte", value: 24, suffix: "/7" },
    { label: "Foco em satisfação", value: 100, suffix: "%" },
  ];
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="glass-card rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-nebula opacity-40 pointer-events-none" />
          {stats.map((s) => (
            <div key={s.label} className="relative text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-muted-foreground/70">
          Indicadores ilustrativos de posicionamento da empresa.
        </p>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    {
      q: "Quais são os prazos para desenvolvimento?",
      a: "Sites institucionais podem levar de 2 a 4 semanas. Sistemas personalizados variam conforme escopo — definimos cronograma detalhado após a descoberta.",
    },
    {
      q: "Como funciona a precificação?",
      a: "Trabalhamos por projeto ou por escopo evolutivo. Após entender suas necessidades, apresentamos uma proposta clara com etapas, valores e entregas.",
    },
    {
      q: "Vocês oferecem manutenção?",
      a: "Sim. Oferecemos planos de manutenção contínua incluindo correções, melhorias, atualizações e suporte técnico.",
    },
    {
      q: "A hospedagem está incluída?",
      a: "Podemos incluir ou orientar você na escolha da melhor infraestrutura, usando Cloudflare, Vercel ou provedores adequados ao projeto.",
    },
    {
      q: "É possível desenvolver algo totalmente personalizado?",
      a: "Sim. Somos especializados em soluções sob medida, do design ao código, adaptadas aos processos únicos do seu negócio.",
    },
    {
      q: "Como funciona o suporte pós-entrega?",
      a: "Todo projeto tem um período de suporte inicial. Depois, oferecemos planos contínuos com SLA definido conforme sua necessidade.",
    },
    {
      q: "Vocês fazem integrações com outros sistemas?",
      a: "Sim. Integramos via APIs REST, webhooks e ferramentas como n8n para conectar tudo o que você já usa.",
    },
    {
      q: "Como aplicam Inteligência Artificial e automações?",
      a: "Criamos agentes, assistentes e fluxos automatizados focados em resultados: redução de custo, ganho de produtividade e melhores decisões.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader eyebrow="Dúvidas" title="Perguntas frequentes" />
        <div className="space-y-3">
          {items.map((it, i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={open === i}
              >
                <span className="font-medium">{it.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{it.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section id="contato" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-card p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-nebula opacity-70" />
          <div className="absolute inset-0">
            <Starfield density={60} />
          </div>
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              Sua empresa está pronta para{" "}
              <span className="text-gradient">dar o próximo passo?</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
              Vamos construir juntos uma solução tecnológica inteligente para transformar o seu
              negócio.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-4 text-sm font-medium text-white shadow-[var(--shadow-glow-purple)] transition-transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              Iniciar conversa no WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24 pb-10 border-t border-white/5">
      <div className="absolute inset-0 bg-nebula opacity-50" />
      <div className="absolute inset-0">
        <Starfield density={80} />
      </div>
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <a href="#top" className="inline-flex items-center gap-3">
              <img
                src={company.icon}
                alt="Símbolo da Orion"
                className="h-12 w-12 rounded-full object-cover shadow-[0_0_24px_rgba(59,130,246,0.4)]"
              />
              <div>
                <span className="block font-display text-xl font-bold">{company.shortName}</span>
                <span className="text-xs text-muted-foreground">Soluções em Tecnologia</span>
              </div>
            </a>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">
              Guiando empresas rumo ao futuro com sites, sistemas, inteligência artificial e
              automações sob medida.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { icon: Github, href: company.github, label: "GitHub da Orion" },
                { icon: Linkedin, href: company.linkedin, label: "LinkedIn da Orion" },
                { icon: Instagram, href: company.instagram, label: "Instagram da Orion" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full glass transition-colors hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                ["Sobre", "#sobre"],
                ["Serviços", "#servicos"],
                ["Projetos", "#projetos"],
                ["FAQ", "#faq"],
              ].map(([l, h]) => (
                <li key={h}>
                  <a href={h} className="hover:text-foreground transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <a href={emailUrl} className="transition-colors hover:text-foreground">
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-foreground"
                >
                  {company.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" /> {company.city}
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0" /> {company.serviceArea}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} {company.name}. Todos os direitos reservados.
          </div>
          <div>{company.slogan}</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- PAGE ---------- */
export default function OrionLanding() {
  return (
    <div className="relative min-h-dvh bg-background text-foreground overflow-hidden">
      <IntroOverlay />
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Projects />
        <Technologies />
        <AISection />
        <WhyUs />
        <Metrics />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
