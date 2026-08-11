const projects = [
  {
    code: "OR-01",
    tag: "Sistema Web",
    title: "Plataforma Orion",
    desc: "Gestão de clientes e projetos com acompanhamento de andamento em tempo real.",
  },
  {
    code: "OR-02",
    tag: "Site Profissional",
    title: "Sites Corporativos",
    desc: "Presença digital de alto impacto para empresas que querem crescer.",
  },
  {
    code: "OR-03",
    tag: "Automação + IA",
    title: "Automações Inteligentes",
    desc: "Processos repetitivos rodando sozinhos, com inteligência artificial.",
  },
  {
    code: "OR-04",
    tag: "Dashboards",
    title: "Painéis Executivos",
    desc: "Decisões guiadas por dados claros, em dashboards sob medida.",
  },
];

export function StackedProjects() {
  return (
    <section id="projetos" className="px-5 py-24 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow">Projetos</p>
        <h2 className="mt-3 text-3xl font-bold md:text-5xl">
          Missões que já <span className="text-gradient">decolaram</span>
        </h2>

        <div className="mt-14 space-y-8 pb-8">
          {projects.map((p, i) => (
            <article
              key={p.code}
              className="card-space sticky p-8 md:p-12"
              style={{ top: `calc(5.5rem + ${i * 1.5}rem)` }}
            >
              <div className="flex items-center justify-between">
                <span className="orion-process-number">Missão {p.code}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-muted-foreground">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-4 text-2xl font-bold md:text-4xl">{p.title}</h3>
              <p className="mt-3 max-w-xl text-muted-foreground md:text-lg">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
