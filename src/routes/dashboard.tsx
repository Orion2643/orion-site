import { createFileRoute } from "@tanstack/react-router";
import OrionDashboard from "@/components/orion-dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Portal Orion | Gestão de Projetos" },
      {
        name: "description",
        content: "Portal interno da Orion para iniciar e acompanhar projetos digitais.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: OrionDashboard,
});
