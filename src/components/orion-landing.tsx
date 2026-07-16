import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowRight,
  Rocket,
  Code2,
  Layout,
  LayoutDashboard,
  Search,
  Compass,
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
  Package,
} from "lucide-react";
import { ParticleSphere, Starfield, IntroOverlay } from "./space-visuals";
import { company, emailUrl, whatsappUrl } from "../config/company";
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
            className="orion-nav-logo h-10 w-10 rounded-full object-cover shadow-[0_0_24px_rgba(59,130,246,0.45)]"
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
            A Orion desenvolve sites profissionais, sistemas personalizados e soluções digitais
            sob medida para empresas que desejam organizar processos, fortalecer sua presença online
            e crescer com tecnologia.
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
              <Users className="h-4 w-4 text-[oklch(0.82_0.14_200)]" /> Atendimento próximo
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
    { icon: Globe, title: "Presença digital", desc: "Sites profissionais alinhados à identidade do seu negócio." },
    { icon: LayoutDashboard, title: "Sistemas sob medida", desc: "Ferramentas desenvolvidas conforme a rotina de cada empresa." },
    { icon: Palette, title: "Design responsivo", desc: "Experiências claras e modernas em computadores e celulares." },
    { icon: Compass, title: "Consultoria", desc: "Orientação prática para escolher e aplicar a tecnologia certa." },
  ];
  return (
    <section id="sobre" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Quem somos"
          title="Tecnologia que impulsiona negócios"
          subtitle="A Orion cria soluções digitais personalizadas com proximidade, clareza e foco nas necessidades reais de cada cliente."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="glass-card rounded-2xl p-6"
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
      desc: "Presença digital profissional, responsiva e alinhada à identidade da sua empresa.",
    },
    {
      icon: Rocket,
      title: "Landing Pages",
      desc: "Páginas objetivas para apresentar serviços, campanhas e oportunidades de negócio.",
    },
    {
      icon: LayoutDashboard,
      title: "Sistemas Web Personalizados",
      desc: "Ferramentas sob medida para organizar rotinas e facilitar o trabalho da sua empresa.",
    },
    {
      icon: Search,
      title: "SEO e Google Business",
      desc: "Configuração técnica para melhorar sua presença no Google e nas buscas locais.",
    },
    {
      icon: Compass,
      title: "Consultoria em Tecnologia",
      desc: "Orientação prática para escolher soluções compatíveis com seus objetivos e orçamento.",
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
    { icon: Sparkles, title: "Sistema para Manicure", tag: "Agenda e clientes", device: "smartphone" },
    { icon: Wrench, title: "Sistema para Oficina Mecânica", tag: "Ordens de serviço", device: "desktop" },
    { icon: Hammer, title: "Sistema para Serralheria", tag: "Orçamentos", device: "tablet" },
    { icon: Package, title: "Gestão de Estoque", tag: "Inventário", device: "tablet" },
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
          subtitle="Ideias de sistemas que podem ser desenvolvidos sob medida para diferentes segmentos."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    { icon: Terminal, name: "Python" },
    { icon: Server, name: "FastAPI" },
    { icon: Cpu, name: "Node.js" },
    { icon: Database, name: "SQLite" },
    { icon: LineChart, name: "Streamlit" },
    { icon: Cloud, name: "Cloudflare" },
    { icon: Github, name: "GitHub" },
    { icon: GitBranch, name: "Git" },
    { icon: Globe, name: "HTML5" },
    { icon: Palette, name: "CSS3" },
    { icon: Brain, name: "OpenAI" },
  ];
  return (
    <section id="tecnologias" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Stack" title="Tecnologias que utilizamos" subtitle="Ferramentas que já fazem parte do nosso processo de desenvolvimento e aprendizado contínuo." />
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
            Tecnologia com <span className="text-gradient">Inteligência Artificial</span> aplicada com propósito
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            A Inteligência Artificial já faz parte das ferramentas que utilizamos para apoiar o
            desenvolvimento, organizar informações e criar soluções digitais mais eficientes. Cada
            aplicação é avaliada conforme a necessidade e a viabilidade do projeto.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "Apoio na criação e organização de conteúdos",
              "Recursos inteligentes em soluções personalizadas",
              "Análise de possibilidades para cada projeto",
              "Uso responsável e alinhado à necessidade do cliente",
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
    { icon: Target, title: "Desenvolvimento personalizado", desc: "Cada projeto nasce das necessidades reais do seu negócio." },
    { icon: MessageCircle, title: "Comunicação transparente", desc: "Você acompanha as etapas e entende o que está sendo desenvolvido." },
    { icon: CheckCircle2, title: "Entrega organizada", desc: "Planejamento, testes e publicação seguindo um processo claro." },
    { icon: Smartphone, title: "Design responsivo", desc: "Experiência bem apresentada em computadores, tablets e celulares." },
    { icon: Search, title: "SEO desde o início", desc: "Estrutura preparada para facilitar a descoberta do site nos buscadores." },
    { icon: ShieldCheck, title: "Segurança e backup", desc: "Boas práticas e cópias de segurança durante o desenvolvimento." },
    { icon: Users, title: "Atendimento próximo", desc: "Contato direto, escuta ativa e suporte compatível com o projeto." },
    { icon: LineChart, title: "Soluções que podem evoluir", desc: "Estrutura pensada para receber melhorias conforme o negócio cresce." },
    { icon: Sparkles, title: "Aprendizado contínuo", desc: "Acompanhamos novas tecnologias para oferecer soluções cada vez melhores." },
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

/* ---------- COMPROMISSOS ---------- */
function Metrics() {
  const commitments = [
    { icon: Target, title: "Projetos sob medida", desc: "Soluções pensadas para a realidade de cada cliente." },
    { icon: Code2, title: "13 tecnologias", desc: "Ferramentas utilizadas em nosso processo de desenvolvimento." },
    { icon: Users, title: "Atendimento humanizado", desc: "Contato direto e acompanhamento durante o projeto." },
    { icon: ShieldCheck, title: "Compromisso com a qualidade", desc: "Cuidado com testes, organização e entrega." },
  ];
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {commitments.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -5 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <div className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-white/10">
                <item.icon className="h-5 w-5 text-[oklch(0.82_0.14_200)]" />
              </div>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    {
      q: "Quais serviços a Orion oferece?",
      a: "Desenvolvemos sites profissionais, landing pages, sistemas personalizados, consultoria em tecnologia, SEO e configuração do Google Business.",
    },
    {
      q: "O site será responsivo para celular?",
      a: "Sim. Todos os sites são preparados para funcionar em computadores, tablets e smartphones.",
    },
    {
      q: "Quanto tempo leva para desenvolver um site?",
      a: "O prazo depende da complexidade e do conteúdo fornecido. Antes de iniciar, definimos o escopo e uma previsão de entrega para o projeto.",
    },
    {
      q: "Vocês oferecem suporte após a entrega?",
      a: "Sim. Após a publicação, oferecemos um período de suporte para correções relacionadas ao escopo e podemos combinar manutenção contínua quando necessário.",
    },
    {
      q: "Como funciona a precificação?",
      a: "Após entender a necessidade do cliente, apresentamos uma proposta clara com escopo, etapas, prazo e valor do serviço.",
    },
    {
      q: "É possível desenvolver algo totalmente personalizado?",
      a: "Sim. A proposta da Orion é desenvolver soluções adaptadas à rotina, aos objetivos e ao orçamento de cada negócio.",
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

/* ---------- FORMULÁRIO DE AVALIAÇÃO ---------- */
function EvaluationForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
    service: "",
    description: "",
  });
  const [error, setError] = useState("");

  const services = [
    "Site institucional",
    "Landing page",
    "Sistema web personalizado",
    "Solução com recursos de IA",
    "SEO e presença no Google",
    "Consultoria em tecnologia",
    "Outro serviço",
  ];

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.service || !form.description.trim()) {
      setError("Preencha nome, telefone, tipo de serviço e descrição do projeto.");
      return;
    }

    const message = [
      "Olá! Vim pelo site da Orion e gostaria de solicitar uma avaliação.",
      "",
      `*Nome:* ${form.name.trim()}`,
      `*Telefone:* ${form.phone.trim()}`,
      `*Cidade ou bairro:* ${form.location.trim() || "Não informado"}`,
      `*Tipo de serviço:* ${form.service}`,
      `*Descrição do projeto:* ${form.description.trim()}`,
    ].join("\n");
    
    const whatsappLink = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
  message,
)}`;

window.open(whatsappLink, "_blank", "noopener,noreferrer");

    setForm({
      name: "",
      phone: "",
      location: "",
      service: "",
      description: "",
    });
    setError("");
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary/70 focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60";

  return (
    <section id="avaliacao" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-card p-6 md:p-10">
          <div className="absolute inset-0 bg-nebula opacity-35 pointer-events-none" />
          <div className="relative">
            <SectionHeader
              eyebrow="Contato rápido"
              title="Solicite sua avaliação"
              subtitle="Preencha os campos e envie sua solicitação diretamente pelo WhatsApp."
            />

            <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-5" noValidate>
              <div className="grid gap-5 md:grid-cols-2">
                <label className="space-y-2 text-sm font-medium">
                  <span>Nome *</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    className={inputClass}
                    autoComplete="name"
                    placeholder="Seu nome"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium">
                  <span>Telefone *</span>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    className={inputClass}
                    autoComplete="tel"
                    placeholder="(15) 99999-9999"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium">
                  <span>Cidade ou bairro</span>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(event) => updateField("location", event.target.value)}
                    className={inputClass}
                    autoComplete="address-level2"
                    placeholder="Ex.: Sorocaba - SP"
                  />
                </label>

                <label className="space-y-2 text-sm font-medium">
                  <span>Tipo de serviço *</span>
                  <select
                    value={form.service}
                    onChange={(event) => updateField("service", event.target.value)}
                    className={inputClass}
                  >
                    <option value="" className="bg-background">Selecione</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-background">
                        {service}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="block space-y-2 text-sm font-medium">
                <span>Descrição do projeto *</span>
                <textarea
                  value={form.description}
                  onChange={(event) => updateField("description", event.target.value)}
                  className={`${inputClass} min-h-36 resize-y`}
                  placeholder="Conte brevemente o que sua empresa precisa, seus objetivos e prazo desejado."
                />
              </label>

              {error && (
                <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Ao enviar, você será direcionado ao WhatsApp da Orion com as informações preenchidas.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-medium text-white shadow-[var(--shadow-glow-purple)] transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Enviar pelo WhatsApp
                </button>
              </div>
            </form>
          </div>
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
        <EvaluationForm />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
