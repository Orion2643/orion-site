import { ArrowRight, Play } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Magnetic, EASE_ORION } from "./motion";

const headline = ["Sites", "profissionais,", "sistemas", "web", "e"];

/**
 * Hero da Orion em duas áreas independentes:
 * 1) vídeo institucional limpo, sem textos ou imagens sobrepostas;
 * 2) bloco de apresentação com título, descrição e ações.
 *
 * Essa separação preserva integralmente o enquadramento do vídeo em
 * computadores e celulares e evita que textos disputem atenção com a marca.
 */
export function HeroSection() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    const play = () => video.play().catch(() => undefined);
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && document.visibilityState === "visible") play();
      else video.pause();
    }, { threshold: 0.08 });
    io.observe(video);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") video.pause();
      else if (video.getBoundingClientRect().bottom > 0) play();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);

  return (
    <>
      <section
        id="top"
        aria-label="Apresentação em vídeo da Orion"
        className="relative isolate overflow-hidden bg-black pt-[72px] sm:pt-[76px] lg:pt-[68px]"
      >
        <div className="relative mx-auto w-full overflow-hidden bg-black">
          <video
            ref={heroVideoRef}
            className="block h-auto w-full object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/orion-top-logo-poster.webp"
            aria-label="Animação institucional da Orion Soluções em Tecnologia"
          >
            <source
              media="(max-width: 767px)"
              src="/video/orion-top-logo-mobile-optimized.mp4"
              type="video/mp4"
            />
            <source src="/video/orion-top-logo.mp4" type="video/mp4" />
            Seu navegador não oferece suporte à reprodução deste vídeo.
          </video>

          {/* Fusão suave do vídeo com o próximo bloco, sem cobrir seu conteúdo. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-12 sm:h-20"
            style={{
              background:
                "linear-gradient(180deg, transparent 0%, oklch(0.12 0.035 265 / 0.45) 55%, var(--background) 100%)",
            }}
          />
        </div>
      </section>

      <section
        aria-labelledby="orion-main-heading"
        className="relative isolate overflow-hidden border-b border-border/35 py-20 sm:py-24 lg:py-28"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.30 0.14 285 / 0.28), transparent 58%), linear-gradient(180deg, var(--background), oklch(0.13 0.035 265))",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 28%, oklch(0.8 0.1 260 / 0.65) 0 1px, transparent 1.5px), radial-gradient(circle at 76% 42%, oklch(0.8 0.1 290 / 0.55) 0 1px, transparent 1.5px), radial-gradient(circle at 44% 78%, oklch(0.8 0.1 250 / 0.45) 0 1px, transparent 1.5px)",
            backgroundSize: "190px 190px, 250px 250px, 310px 310px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, ease: EASE_ORION }}
              className="eyebrow flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60" />
              ORION
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-primary/60" />
            </motion.span>

            <h1
              id="orion-main-heading"
              className="mt-6 max-w-4xl text-[2.55rem] font-bold leading-[1.03] tracking-[-0.045em] sm:text-5xl md:text-6xl xl:text-7xl"
            >
              <motion.span
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.55 }}
                transition={{ staggerChildren: 0.07, delayChildren: 0.1 }}
                className="inline"
              >
                {headline.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: { opacity: 0.94, y: 0 },
                    }}
                    transition={{ duration: 0.6, ease: EASE_ORION }}
                    className="inline-block"
                  >
                    {word}
                    {index < headline.length - 1 ? "\u00A0" : ""}
                  </motion.span>
                ))}
              </motion.span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 0.94, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.6, delay: 0.42, ease: EASE_ORION }}
                className="inline-block"
              >
                automações{" "}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 0.94, y: 0 }}
                viewport={{ once: true, amount: 0.55 }}
                transition={{ duration: 0.6, delay: 0.5, ease: EASE_ORION }}
                className="text-gradient inline-block"
              >
                para sua empresa.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE_ORION }}
              className="mt-6 max-w-2xl text-[1.02rem] leading-7 text-muted-foreground/85 sm:text-lg sm:leading-8"
            >
              A Orion desenvolve soluções digitais sob medida para organizar processos, fortalecer
              sua presença online e transformar tecnologia em resultados.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE_ORION }}
              className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <Magnetic strength={10} className="w-full sm:w-auto">
                <a
                  href="/briefing"
                  className="btn-shine group inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold opacity-90 btn-primary-glow hover:opacity-100 sm:w-auto"
                >
                  Iniciar meu projeto
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
              </Magnetic>

              <Magnetic strength={10} className="w-full sm:w-auto">
                <a
                  href="briefing"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border/70 bg-card/25 px-7 py-3.5 text-sm font-semibold text-foreground/90 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card/50 hover:text-foreground hover:shadow-[0_10px_30px_oklch(0.55_0.22_275/0.25)] sm:w-auto"
                >
                  <Play className="h-4 w-4" />
                  Ver como funciona
                </a>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
