export const company = {
  name: "Orion Soluções em Tecnologia",
  shortName: "Orion",
  slogan: "Guiando empresas rumo ao futuro.",
icon: "/favicon.png",
phoneDisplay: "+55 (15) 98148-2430",
  phone: "(15) 98148-2430",
  whatsapp: "5515981482430",
  email: "orionai2643@gmail.com",

  city: "Sorocaba - SP",
  serviceArea: "Atendimento em todo o Brasil",

  website: "https://orion-sistemas.info",

  instagram: "https://www.instagram.com/orionai2643/",
  github: "https://github.com/Orion2643",
  linkedin:
    "https://www.linkedin.com/company/orion-solu%C3%A7%C3%B5es-em-tecnologia/about/?viewAsMember=true",
};

const whatsappMessage =
  "Olá! Encontrei o site da Orion Soluções em Tecnologia e gostaria de saber mais sobre seus serviços.";

export const whatsappUrl = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export const emailUrl = `mailto:${company.email}`;
