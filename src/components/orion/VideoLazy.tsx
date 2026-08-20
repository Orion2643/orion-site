import { useEffect, useRef, useState } from "react";

type Source = { src: string; type: string; media?: string };

export function VideoLazy({
  sources,
  poster,
  className = "",
}: {
  sources: Source[];
  poster: string;
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
    if (reducedMotion || saveData) return;
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setEnabled(true);
          io.disconnect();
        }
      },
      { rootMargin: matchMedia("(max-width: 767px)").matches ? "90px" : "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!enabled || !v) return;

    // Garante mudo (workaround de bug do React com o atributo muted)
    v.muted = true;

    const onReady = () => setReady(true);
    v.addEventListener("canplay", onReady);
    v.addEventListener("loadeddata", onReady);

    const tryPlay = () =>
      v
        .play()
        .then(() => console.log("[VideoLazy] ▶ vídeo rodando"))
        .catch((err) => console.warn("[VideoLazy] autoplay bloqueado:", err?.message));

    v.load();
    tryPlay();

    // Se o navegador bloquear, tenta de novo na primeira interação
    window.addEventListener("pointerdown", tryPlay, { once: true });

    // Pausa fora da viewport e quando a aba fica em segundo plano.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && document.visibilityState === "visible") tryPlay();
      else v.pause();
    }, { threshold: 0.08 });
    io.observe(v);

    const onVisibility = () => {
      if (document.visibilityState === "hidden") v.pause();
      else if (v.getBoundingClientRect().bottom > 0 && v.getBoundingClientRect().top < innerHeight) tryPlay();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("pointerdown", tryPlay);
      v.removeEventListener("canplay", onReady);
      v.removeEventListener("loadeddata", onReady);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  return (
    <div ref={wrapRef} className="absolute inset-0 overflow-hidden">
      <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className={`${className} transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        {enabled && sources.map((s) => <source key={`${s.src}-${s.media ?? "all"}`} src={s.src} type={s.type} media={s.media} />)}
      </video>
    </div>
  );
}
