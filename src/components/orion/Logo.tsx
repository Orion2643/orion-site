import { OrionMark } from "./OrionMark";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group flex min-w-0 items-center gap-3" aria-label="ORION — Início">
      <OrionMark
        glow={false}
        className={`shrink-0 transition-transform duration-500 group-hover:scale-105 ${
          compact ? "h-9 w-9" : "h-11 w-11"
        }`}
      />
      <div className="flex min-w-0 flex-col leading-none">
        <span
          data-orion-brand
          className="orion-brand-name whitespace-nowrap font-display text-lg font-bold tracking-[0.16em] text-foreground sm:text-xl"
          translate="no"
        >
          ORION
        </span>
        {!compact && (
          <span className="mt-1 hidden whitespace-nowrap text-[8px] font-medium uppercase tracking-[0.3em] text-muted-foreground sm:block">
            Soluções em Tecnologia
          </span>
        )}
      </div>
    </a>
  );
}
