import { VideoLazy } from "./VideoLazy";

export function FinalCTA() {
  return (
    <section id="contato" className="px-5 pb-24 pt-10 md:px-10">
      <div className="card-space-static relative mx-auto max-w-6xl overflow-hidden rounded-3xl">
        <VideoLazy
          poster="/video/alone.webp"
          sources={[
            { src: "/video/alone.webm", type: "video/webm" },
            { src: "/video/alone.mp4", type: "video/mp4" },
          ]}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#040611]/95 via-[#040611]/60 to-[#040611]/20" />

        <div className="relative z-10 max-w-xl px-6 py-20 md:px-14 md:py-28">
          <h2 className="text-4xl font-bold md:text-5xl">
            O próximo nível da sua empresa <span className="text-gradient">começa aqui.</span>
          </h2>
          <p className="mt-5 text-muted-foreground md:text-lg">
            Vamos construir juntos uma solução tecnológica inteligente para transformar o seu
            negócio.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/briefing"
              className="btn-primary-glow btn-shine rounded-full px-7 py-3.5 text-sm font-bold"
            >
              Começar agora →
            </a>
            <a
              href="https://wa.me/5515976043100?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Orion%20e%20quero%20iniciar%20um%20projeto.%20%F0%9F%9A%80"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white/10"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
