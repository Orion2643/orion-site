import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { company } from "../config/company";

function NotFoundComponent() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado. Tente novamente ou volte para o início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "content-language", content: "pt-BR" },
      { name: "google", content: "notranslate" },
      { name: "theme-color", content: "#050816" },
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
        name: "keywords",
        content:
          "Orion Soluções em Tecnologia, criação de sites, sites profissionais, desenvolvimento web, sistemas web personalizados, automação empresarial, inteligência artificial, integração WhatsApp, SEO, Google Analytics, Cloudflare, Supabase, React, TypeScript",
      },
      { name: "author", content: company.name },
      { name: "robots", content: "index, follow, max-image-preview:large" },
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
      { property: "og:site_name", content: company.name },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:url", content: company.website },
      { property: "og:image", content: `${company.website}/og-image.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Orion Soluções em Tecnologia — sites, sistemas e automações",
      },
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
      { name: "twitter:image", content: `${company.website}/og-image.jpg` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "64x64" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "canonical", href: company.website },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `${company.website}/#website`,
              url: company.website,
              name: company.name,
              alternateName: [company.shortName, "Orion Tecnologia"],
              inLanguage: "pt-BR",
              publisher: { "@id": `${company.website}/#organization` },
            },
            {
              "@type": ["Organization", "ProfessionalService"],
              "@id": `${company.website}/#organization`,
              name: company.name,
              alternateName: company.shortName,
              slogan: company.slogan,
              description:
                "Empresa de tecnologia especializada em sites profissionais, sistemas web personalizados, automações, inteligência artificial, integrações e soluções digitais.",
              url: company.website,
              logo: {
                "@type": "ImageObject",
                url: `${company.website}${company.icon}`,
              },
              image: `${company.website}/og-image.jpg`,
              email: company.email,
              telephone: `+${company.whatsapp}`,
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Sorocaba",
                addressRegion: "SP",
                addressCountry: "BR",
              },
              areaServed: {
                "@type": "Country",
                name: "Brasil",
              },
              sameAs: [company.instagram, company.linkedin, company.github],
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" dir="ltr" translate="no" className="dark notranslate">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
