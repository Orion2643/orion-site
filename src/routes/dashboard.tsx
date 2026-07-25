import { createFileRoute } from "@tanstack/react-router";
import OrionDashboard from "@/components/orion-dashboard";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Área Orion | Iniciar Projeto" },
      {
        name: "description",
        content: "Área pública da Orion para iniciar um novo projeto e acessar o painel administrativo.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: OrionDashboard,
});
