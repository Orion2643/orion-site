import { useEffect, useState } from "react";

interface Shot {
  id: number;
  top: number;
  left: number;
  angle: number;
  length: number;
  duration: number;
}

/**
 * Assinatura visual da Orion: uma estrela cadente azul-violeta atravessa
 * discretamente a tela em intervalos irregulares (a cada 8–18s). Fixa em viewport,
 * respeita prefers-reduced-motion.
 */
export function ShootingStars() {
  const [shots, setShots] = useState<Shot[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let counter = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const spawn = () => {
      const shot: Shot = {
        id: ++counter,
        top: 5 + Math.random() * 55,
        left: -10 + Math.random() * 30,
        angle: 15 + Math.random() * 20,
        length: 140 + Math.random() * 120,
        duration: 0.7 + Math.random() * 0.3,
      };
      setShots((prev) => [...prev, shot]);
      window.setTimeout(() => {
        setShots((prev) => prev.filter((s) => s.id !== shot.id));
      }, shot.duration * 1000 + 200);

      timeout = setTimeout(spawn, 8000 + Math.random() * 10000);
    };

    timeout = setTimeout(spawn, 4000 + Math.random() * 4000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
    >
      {shots.map((s) => (
        <span
          key={s.id}
          className="absolute block"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.length}px`,
            height: "2px",
            transform: `rotate(${s.angle}deg)`,
            background:
              "linear-gradient(90deg, transparent, oklch(0.85 0.16 260 / 0.9), oklch(0.75 0.22 285 / 0.6), transparent)",
            filter: "drop-shadow(0 0 6px oklch(0.7 0.2 275 / 0.9))",
            animation: `shooting ${s.duration}s ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
}
