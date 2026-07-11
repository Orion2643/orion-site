import { createFileRoute } from "@tanstack/react-router";
import OrionLanding from "@/components/orion-landing";

export const Route = createFileRoute("/")({
  component: OrionLanding,
});
