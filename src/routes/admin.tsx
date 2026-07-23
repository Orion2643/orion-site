import { createFileRoute } from "@tanstack/react-router";
import OrionAdmin from "@/components/orion-admin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Orion Admin | Projetos" },
      { name: "description", content: "Painel administrativo de projetos da Orion." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: OrionAdmin,
});
