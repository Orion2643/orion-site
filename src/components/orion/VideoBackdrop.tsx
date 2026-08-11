import { useEffect, useState } from "react";

const SOURCES = {
  desktop: {
    webm: "/video/hero-bg.webm",
    mp4: "/video/hero-bg.mp4",
  },
  mobile: {
    mp4: "/video/hero-bg-mobile.mp4",
  },
  poster: "/video/hero-poster.webp",
};

/**
 * Vídeo de fundo reutilizável — mesma técnica usada em sites de referência
 * (ex: hero de estética automotiva): o vídeo não tem transparência real,
 * o efeito "translúcido" vem de camadas de gradiente por cima que fundem
 * as bordas do vídeo com a cor de fundo do site, além de um leve véu de
 * cor da marca para manter a identidade visual do Orion.
 *
 * Usado no Hero (mais forte) e, com menor opacidade, no briefing, no
 * admin e no rodapé — para que o site inteiro pareça uma coisa só.
 */
export function VideoBackdrop({
  opacity = 0.45,
  tintOpacity = 1,
  edgeFade = true,
  className = "",
}: {
  /** Opacidade do vídeo em si (0–1). */
  opacity?: number;
  /** Intensidade do véu de cor da marca por cima do vídeo (0–1, multiplicador). */
  tintOpacity?: number;
  /** Se deve esmaecer as bordas do vídeo até a cor de fundo (recomendado). */
  edgeFade?: boolean;
  className?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMobile = (event: MediaQueryList | MediaQueryListEvent) => setIsMobile(event.matches);
    const syncMotion = (event: MediaQueryList | MediaQueryListEvent) =>
      setReducedMotion(event.matches);

    syncMobile(mobileQuery);
    syncMotion(motionQuery);

    mobileQuery.addEventListener("change", syncMobile);
    motionQuery.addEventListener("change", syncMotion);
    return () => {
      mobileQuery.removeEventListener("change", syncMobile);
      motionQuery.removeEventListener("change", syncMotion);
    };
  }, []);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {reducedMotion || isMobile ? (
        <img
          src={SOURCES.poster}
          alt=""
          className="h-full w-full object-cover"
          style={{ opacity }}
        />
      ) : (
        <video
          key={isMobile ? "mobile" : "desktop"}
          className="h-full w-full object-cover"
          style={{ opacity }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={SOURCES.poster}
        >
          {!isMobile && <source src={SOURCES.desktop.webm} type="video/webm" />}
          <source src={isMobile ? SOURCES.mobile.mp4 : SOURCES.desktop.mp4} type="video/mp4" />
        </video>
      )}

      {/* Véu de cor da marca — funde o vídeo com a paleta azul/violeta do Orion */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, oklch(0.24 0.12 275 / 0.55), transparent 62%), radial-gradient(ellipse at 80% 60%, oklch(0.24 0.14 295 / 0.4), transparent 58%)",
          mixBlendMode: "multiply",
          opacity: tintOpacity,
        }}
      />

      {edgeFade && (
        <>
          <div
            className="absolute inset-x-0 top-0 h-1/3"
            style={{
              background: "linear-gradient(180deg, var(--background) 0%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2"
            style={{ background: "linear-gradient(0deg, var(--background) 0%, transparent 100%)" }}
          />
          <div
            className="absolute inset-y-0 left-0 w-1/4"
            style={{ background: "linear-gradient(90deg, var(--background) 0%, transparent 100%)" }}
          />
          <div
            className="absolute inset-y-0 right-0 w-1/4"
            style={{
              background: "linear-gradient(270deg, var(--background) 0%, transparent 100%)",
            }}
          />
        </>
      )}
    </div>
  );
}
