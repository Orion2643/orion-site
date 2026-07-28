import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/orion/Header";
import { HeroSection } from "@/components/orion/HeroSection";
import { MainCards } from "@/components/orion/MainCards";
import { ProcessSection } from "@/components/orion/ProcessSection";
import { ProjectTrackingSection } from "@/components/orion/ProjectTrackingSection";
import { FinalCTA } from "@/components/orion/FinalCTA";
import { Footer } from "@/components/orion/Footer";
import { WhatsAppFloat } from "@/components/orion/WhatsAppFloat";
import { ScrollProgressBar } from "@/components/orion/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Orion — Soluções em Tecnologia" },
      {
        name: "description",
        content:
          "Tecnologia, estratégia e criatividade para impulsionar seu negócio para o futuro. Sites, sistemas web, automações e consultoria pela Orion.",
      },
      { property: "og:title", content: "Orion — Soluções em Tecnologia" },
      {
        property: "og:description",
        content:
          "O próximo nível da sua empresa começa aqui. Tecnologia, estratégia e criatividade pela Orion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollProgressBar />
      <Header />
      <main>
        <HeroSection />
        <MainCards />
        <ProcessSection />
        <ProjectTrackingSection />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
