import orionSymbol from "@/assets/orion-symbol-official.png";

interface OrionMarkProps {
  className?: string;
  glow?: boolean;
  animated?: boolean;
}

/**
 * Símbolo oficial da Orion, reutilizado em todos os pontos da Landing.
 * A imagem é suavizada nas bordas para se integrar ao fundo espacial.
 */
export function OrionMark({ className = "", glow = true, animated = true }: OrionMarkProps) {
  return (
    <div
      className={`relative isolate grid place-items-center ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      {glow && (
        <div
          className="pointer-events-none absolute inset-[14%] rounded-full opacity-80 blur-2xl animate-[engine-pulse_3.2s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.18 245 / 0.5), oklch(0.62 0.2 292 / 0.24) 48%, transparent 74%)",
          }}
        />
      )}

      <img
        src={orionSymbol}
        alt=""
        width={1024}
        height={1024}
        className={`relative h-full w-full rounded-2xl object-cover ${
          animated ? "animate-[orion-logo-float_4.2s_ease-in-out_infinite]" : ""
        }`}
        style={{
          filter: "drop-shadow(0 0 12px rgba(80,160,255,.28))",
        }}
      />

      {animated && (
        <span className="pointer-events-none absolute inset-[12%] overflow-hidden rounded-full">
          <span className="absolute inset-y-[-20%] left-[-45%] w-[28%] rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent blur-sm animate-[logo-shine_4.8s_ease-in-out_infinite]" />
        </span>
      )}
    </div>
  );
}
