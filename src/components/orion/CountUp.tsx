import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const c = animate(0, to, {
      duration: 1.6,
      onUpdate: (v) => {
        ref.current!.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

export function MetricsBand() {
  const metrics = [
    { to: 100, suffix: "%", label: "Compromisso com cada missão" },
    { to: 5, suffix: "", label: "Etapas claras do briefing ao suporte" },
    { to: 7, suffix: "/7", label: "Acompanhamento do projeto online" },
  ];
  return (
    <section className="px-5 py-16 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {metrics.map((m) => (
          <div key={m.label} className="card-space p-8 text-center">
            <p className="text-gradient text-4xl font-bold md:text-5xl">
              <CountUp to={m.to} suffix={m.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{m.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
