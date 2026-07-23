import { createFileRoute } from "@tanstack/react-router";
import OrionBriefing from "@/components/orion-briefing";
import { company } from "@/config/company";

export const Route = createFileRoute("/briefing")({
  head: () => ({
    meta: [
      { title: "Levantamento de Requisitos | Orion" },
      {
        name: "description",
        content: "Portal Orion para levantamento de requisitos e geração de briefing de projetos digitais.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: `${company.website}/briefing` }],
  }),
  component: OrionBriefing,
});
