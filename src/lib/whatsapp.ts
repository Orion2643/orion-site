const ORION_WHATSAPP_NUMBER = "5515976043100";

export const WHATSAPP_MESSAGES = {
  contact:
    "Olá! Vim pelo site da Orion 🪐 e gostaria de mais informações 💫💻➡️📱✨",
  project:
    "Olá! Vim pelo site da Orion e quero iniciar um projeto. Gostaria de receber mais informações.",
  services:
    "Olá! Vim pelo site da Orion e gostaria de conhecer melhor os serviços disponíveis.",
} as const;

export function createWhatsAppUrl(
  message: string = WHATSAPP_MESSAGES.contact,
): string {
  return `https://wa.me/${ORION_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
