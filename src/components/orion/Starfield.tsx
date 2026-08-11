import { useEffect, useState } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
  layer: number;
}

interface StarfieldProps {
  count?: number;
  className?: string;
  layered?: boolean;
}

/**
 * Estrelas piscando com múltiplas camadas para dar sensação de profundidade
 * (paralaxe sutil via translate baseado em scroll).
 */
export function Starfield({ count = 80, className = "", layered = true }: StarfieldProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setStars(
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.4,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 4,
        opacity: 0.25 + Math.random() * 0.75,
        layer: layered ? Math.floor(Math.random() * 3) : 0,
      })),
    );
  }, [count, layered]);

  useEffect(() => {
    if (!layered) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [layered]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {stars.map((s) => {
        const parallax = layered
          ? scrollY * (s.layer === 0 ? 0.04 : s.layer === 1 ? 0.09 : 0.16)
          : 0;
        return (
          <span
            key={s.id}
            className="absolute rounded-full bg-white animate-twinkle"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              transform: parallax ? `translate3d(0, ${-parallax}px, 0)` : undefined,
              willChange: layered ? "transform" : undefined,
              boxShadow: s.size > 1.6 ? "0 0 6px oklch(0.9 0.1 240 / 0.7)" : undefined,
            }}
          />
        );
      })}
    </div>
  );
}
