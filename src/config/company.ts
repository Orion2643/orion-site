export const company = {
  name: "Orion Soluções em Tecnologia",
  shortName: "ORION",
  slogan: "Guiando empresas rumo ao futuro.",
  phoneDisplay: "+55 (15) 98148-2430",
  phone: "5515981482430",
  email: "orionai2643@gmail.com",
  city: "Sorocaba - SP",
  serviceArea: "Atendimento em todo o Brasil",
  website: "https://orion-sistemas.info",
  instagram: "https://www.instagram.com/orionai2643/",
  github: "https://github.com/Orion2643",
  linkedin:
    "https://www.linkedin.com/company/orion-solu%C3%A7%C3%B5es-em-tecnologia/about/?viewAsMember=true",
  logo: "/brand/logo-orion.jpeg",
  icon: "/brand/orion-icon.png",
  whatsappMessage:
    "Olá! Encontrei o site da Orion Soluções em Tecnologia e gostaria de solicitar um orçamento.",
} as const;

export const whatsappUrl = `https://wa.me/${company.phone}?text=${encodeURIComponent(
  company.whatsappMessage,
)}`;

export const emailUrl = `mailto:${company.email}?subject=${encodeURIComponent(
  "Contato pelo site da Orion",
)}`;
