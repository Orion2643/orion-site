import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const steps = [
  {
    n: "01",
    t: "Briefing",
    d: "Entendemos sua ideia, seus objetivos e as necessidades do negócio.",
  },
  {
    n: "02",
    t: "Planejamento",
    d: "Criamos uma estratégia clara e o plano ideal para o seu projeto.",
  },
  {
    n: "03",
    t: "Desenvolvimento",
    d: "Transformamos o planejamento em uma solução tecnológica de ponta.",
  },
  { n: "04", t: "Entrega", d: "Testamos, ajustamos e entregamos tudo com excelência." },
  {
    n: "05",
    t: "Suporte",
    d: "Acompanhamos, otimizamos e evoluímos a solução sempre que necessário.",
  },
];

function StepBlock({
  step,
  index,
  onActive,
}: {
  step: (typeof steps)[0];
  index: number;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <div ref={ref} className="card-space p-8">
      <span className="orion-process-number">Etapa {step.n}</span>
      <h3 className="mt-2 text-2xl font-bold">{step.t}</h3>
      <p className="mt-3 leading-relaxed text-muted-foreground">{step.d}</p>
    </div>
  );
}

export function ProcessSticky() {
  const [active, setActive] = useState(0);
  return (
    <section id="processo" className="px-5 py-24 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
        <div className="hidden md:block">
          <div className="card-space-static sticky top-28 p-10">
            <p className="eyebrow">Como funciona</p>
            <h3 className="mt-3 text-2xl font-bold">Uma missão, cinco etapas</h3>
            <div className="mt-8 space-y-5">
              {steps.map((s, i) => (
                <div key={s.n} className="flex items-center gap-4">
                  <div
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border text-sm font-bold transition-all duration-500 ${
                      i === active
                        ? "border-orion-cyan bg-white/10 text-white shadow-[0_0_24px_rgba(81,191,255,.5)]"
                        : "border-white/10 text-muted-foreground"
                    }`}
                  >
                    {s.n}
                  </div>
                  <span
                    className={`transition-colors duration-500 ${i === active ? "text-white" : "text-muted-foreground"}`}
                  >
                    {s.t}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-16 md:space-y-32">
          {steps.map((s, i) => (
            <StepBlock key={s.n} step={s} index={i} onActive={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
}
