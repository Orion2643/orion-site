import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import ctaAstronaut from "@/assets/cta-astronaut.jpg";
import { motion, useScroll, useTransform, Reveal, Magnetic, EASE_ORION } from "./motion";

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal
          as="div"
          y={44}
          duration={0.8}
          className="relative overflow-hidden rounded-3xl border border-border/60"
        >
          <div ref={ref} className="absolute inset-0 overflow-hidden">
            <motion.img
              src={ctaAstronaut}
              alt=""
              aria-hidden
              loading="lazy"
              width={1920}
              height={900}
              style={{ y: imageY }}
              animate={{ scale: [1.12, 1.148, 1.12], x: [0, 5, -3, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
          </div>

          {/* Glow behind astronaut */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[15%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full opacity-70 blur-3xl animate-[nebula-drift_14s_ease-in-out_infinite]"
            style={{
              background:
                "radial-gradient(circle, oklch(0.55 0.22 275 / 0.55), transparent 70%)",
            }}
          />

          {/* Arco de luz pulsando atrás do capacete */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute left-[54%] top-[19%] h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-screen blur-2xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.86 0.14 80 / 0.8), oklch(0.7 0.18 60 / 0.35) 45%, transparent 72%)",
            }}
            animate={{ opacity: [0.5, 1, 0.6, 0.9, 0.5], scale: [0.92, 1.12, 0.98, 1.08, 0.92] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Twinkling particles */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {Array.from({ length: 22 }).map((_, i) => (
              <span
                key={i}
                className="absolute block rounded-full bg-white animate-twinkle"
                style={{
                  top: `${(i * 37) % 100}%`,
                  left: `${(i * 59) % 100}%`,
                  width: `${1 + (i % 2)}px`,
                  height: `${1 + (i % 2)}px`,
                  opacity: 0.4 + ((i % 5) / 12),
                  animationDelay: `${(i % 5) * 0.5}s`,
                  animationDuration: `${2 + (i % 4)}s`,
                }}
              />
            ))}
          </div>

          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, oklch(0.09 0.03 265 / 0.95) 0%, oklch(0.11 0.04 265 / 0.7) 50%, oklch(0.11 0.04 265 / 0.2) 100%)",
            }}
          />

          <div className="relative grid gap-8 p-8 sm:p-14 lg:grid-cols-2 lg:gap-16 lg:p-20">
            <div className="max-w-xl">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: EASE_ORION }}
                className="text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl"
              >
                O próximo nível da
                <br />
                sua empresa <span className="text-gradient">começa aqui.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.15, ease: EASE_ORION }}
                className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                Vamos construir juntos uma solução tecnológica inteligente
                para transformar o seu negócio.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, delay: 0.3, ease: EASE_ORION }}
                className="mt-8"
              >
                <Magnetic strength={10} className="inline-block">
                  <a
                    href="/briefing"
                    className="btn-shine group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold btn-primary-glow"
                  >
                    Começar agora
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </Magnetic>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
