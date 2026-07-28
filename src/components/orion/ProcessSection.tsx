import { Code2, FileText, LineChart, MessageSquare, Rocket } from "lucide-react";
import { Reveal, StaggerGroup, StaggerItem } from "./motion";

const PROCESS_STEPS = [
  {
    title: "Briefing",
    text: "Entendemos sua ideia, seus objetivos e as necessidades do negócio.",
    Icon: MessageSquare,
  },
  {
    title: "Planejamento",
    text: "Criamos uma estratégia clara e o plano ideal para o seu projeto.",
    Icon: FileText,
  },
  {
    title: "Desenvolvimento",
    text: "Transformamos o planejamento em uma solução tecnológica de ponta.",
    Icon: Code2,
  },
  {
    title: "Entrega",
    text: "Testamos, ajustamos e entregamos tudo com excelência.",
    Icon: Rocket,
  },
  {
    title: "Suporte",
    text: "Acompanhamos, otimizamos e evoluímos a solução sempre que necessário.",
    Icon: LineChart,
  },
] as const;

export function ProcessSection() {
  return (
    <section id="como-funciona" lang="pt-BR" translate="no" className="notranslate relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,oklch(0.3_0.12_280/0.2),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Como funciona</span>
          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Um processo claro, simples e <span className="text-gradient-violet">eficiente.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Entendemos, planejamos, desenvolvemos e entregamos com excelência — do primeiro contato ao suporte.
          </p>
        </Reveal>

        <StaggerGroup
          className="orion-process"
          stagger={0.14}
          amount={0.15}
          aria-label="Etapas do processo Orion"
          lang="pt-BR"
        >
          <div className="orion-process-track" aria-hidden="true">
            <span className="orion-process-energy" />
          </div>

          {PROCESS_STEPS.map((step, index) => (
            <StaggerItem key={step.title} y={32} className="orion-process-step-wrap">
              <article
                className="orion-process-step"
                style={{ "--step-index": index } as React.CSSProperties}
              >
                <div className="orion-process-icon">
                  <step.Icon aria-hidden="true" />
                </div>
                <div className="orion-process-copy">
                  <span className="orion-process-number">Etapa {index + 1}</span>
                  <h3 translate="no">{step.title}</h3>
                  <p translate="no">{step.text}</p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
