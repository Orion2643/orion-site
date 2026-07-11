import { useEffect, useRef, useState } from "react";

export function Starfield({ density = 120 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Star = { x: number; y: number; r: number; a: number; s: number; };
    let stars: Star[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random(),
        s: Math.random() * 0.008 + 0.002,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.a += st.s;
        const alpha = 0.3 + Math.abs(Math.sin(st.a)) * 0.7;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

export function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    type P = { x: number; y: number; z: number };
    const N = 380;
    const points: P[] = Array.from({ length: N }, () => {
      const theta = Math.acos(2 * Math.random() - 1);
      const phi = Math.random() * Math.PI * 2;
      return {
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
      };
    });

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 0.6;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };
    canvas.addEventListener("mousemove", onMove);

    let time = 0;
    const render = () => {
      time += 0.003;
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.38;

      const rotY = time + mouseRef.current.x * 0.8;
      const rotX = mouseRef.current.y * 0.6;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const projected = points.map((p) => {
        let x = p.x * cosY - p.z * sinY;
        let z = p.x * sinY + p.z * cosY;
        let y = p.y * cosX - z * sinX;
        z = p.y * sinX + z * cosX;
        const depth = (z + 1.5) / 2.5;
        return {
          px: cx + x * radius,
          py: cy + y * radius,
          d: depth,
        };
      });

      // Lines between nearby
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.px - b.px;
          const dy = a.py - b.py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 55) {
            const alpha = (1 - dist / 55) * 0.25 * Math.min(a.d, b.d);
            ctx.strokeStyle = `rgba(124, 190, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.stroke();
          }
        }
      }

      // Points
      for (const p of projected) {
        const size = p.d * 2.2;
        const alpha = 0.4 + p.d * 0.6;
        const g = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, size * 3);
        g.addColorStop(0, `rgba(180, 200, 255, ${alpha})`);
        g.addColorStop(1, "rgba(124, 58, 237, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.px, p.py, size * 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(230, 240, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, size * 0.55, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulse ring
      const pulse = (Math.sin(time * 3) + 1) / 2;
      ctx.strokeStyle = `rgba(124, 58, 237, ${0.15 + pulse * 0.15})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * (1.05 + pulse * 0.08), 0, Math.PI * 2);
      ctx.stroke();

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="h-full w-full" />;
}

export function IntroOverlay() {
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(true);
      return;
    }
    const seen = sessionStorage.getItem("orion-intro");
    if (seen) {
      setDone(true);
      return;
    }
    const t1 = setTimeout(() => setFading(true), 7000);
    const t2 = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem("orion-intro", "1");
    }, 8400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (done) return null;

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#050816] transition-opacity duration-1000 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="absolute inset-0 bg-nebula opacity-0 animate-[fadeIn_2s_ease-out_forwards]" />
      <div className="absolute inset-0">
        <Starfield density={140} />
      </div>
      <div className="relative z-10 text-center opacity-0 animate-[fadeUp_1.4s_ease-out_0.8s_forwards]">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-gradient drop-shadow-[0_0_40px_rgba(124,58,237,0.5)]">
          ORION
        </h1>

        <p className="mt-4 text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground">
          Soluções em Tecnologia
        </p>

        <p className="mt-6 text-lg md:text-2xl font-medium text-foreground">
          Guiando empresas rumo ao futuro.
        </p>

        <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-muted-foreground">
          Desenvolvemos sites, sistemas, automações e Inteligência Artificial
          para empresas que desejam crescer.
        </p>
      </div>
      <style>{`
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
