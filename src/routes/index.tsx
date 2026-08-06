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
      {
        title:
          "Orion Soluções em Tecnologia | Sites Profissionais, Sistemas Web, Automação e IA",
      },
      {
        name: "description",
        content:
          "A Orion desenvolve sites profissionais, sistemas web personalizados, automações com inteligência artificial, integrações e soluções digitais para empresas em todo o Brasil.",
      },
      {
        property: "og:title",
        content: "Orion Soluções em Tecnologia | Sites, Sistemas e Automações",
      },
      {
        property: "og:description",
        content:
          "Sites profissionais, sistemas personalizados e automações inteligentes para organizar processos, fortalecer sua presença digital e gerar resultados.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Orion Soluções em Tecnologia" },
      { property: "og:url", content: "https://orion-sistemas.info" },
      { property: "og:image", content: "https://orion-sistemas.info/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Orion | Sites Profissionais, Sistemas Web e Automação",
      },
      {
        name: "twitter:description",
        content:
          "Tecnologia sob medida para empresas que querem crescer, automatizar processos e conquistar mais clientes.",
      },
      { name: "twitter:image", content: "https://orion-sistemas.info/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://orion-sistemas.info" }],
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
