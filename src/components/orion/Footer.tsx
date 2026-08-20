import { Linkedin, Instagram, Github, Mail, Phone, MapPin, Globe } from "lucide-react";
import { Logo } from "./Logo";
import { Reveal, StaggerGroup, StaggerItem } from "./motion";
import LightBloom from "./LightBloom";

const NAV = [
  { label: "Serviços", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Começar projeto", href: "/briefing" },
  { label: "Orion Admin", href: "/admin" },
];

const SOLUTIONS = [
  "Sites Institucionais",
  "Landing Pages",
  "Sistemas Web",
  "Automações",
  "Consultoria",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-violet-400/15 bg-black pt-16 pb-8">
      <LightBloom
        variant="shafts"
        direction="bottom"
        background="#020006"
        baseColor="#6B2BF5"
        accentColor="#EFE6FF"
        speed={58}
        hover={72}
        light={{ rise: 82, spread: 76 }}
        shafts={{ count: 18, amount: 58, drift: 62 }}
        finish={{ grain: 8, vignette: 30 }}
        style={{ opacity: 0.78 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/10" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <StaggerGroup
          className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]"
          stagger={0.1}
          amount={0.3}
        >
          <StaggerItem y={16}>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Sites profissionais, sistemas personalizados e automações inteligentes para empresas
              que querem crescer com tecnologia.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/company/orion-solu%C3%A7%C3%B5es-em-tecnologia/about/?viewAsMember=true",
                  label: "LinkedIn",
                },
                {
                  Icon: Instagram,
                  href: "https://www.instagram.com/orionai2643/",
                  label: "Instagram",
                },
                { Icon: Mail, href: "mailto:orionai2643@gmail.com", label: "E-mail" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-card/40 text-muted-foreground transition-all hover:border-primary/60 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </StaggerItem>

          <StaggerItem y={16}>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Navegação
            </h4>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem y={16}>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Soluções
            </h4>
            <ul className="mt-5 space-y-3">
              {SOLUTIONS.map((s) => (
                <li key={s} className="text-sm text-foreground/80">
                  {s}
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem y={16}>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
              Contato
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-foreground/80">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+5515976043100"
                  aria-label="Ligar para a Orion"
                  className="hover:text-foreground"
                >
                  (15) 97604-3100
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:orionai2643@gmail.com" className="hover:text-foreground">
                  orionai2643@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-primary" />
                Sorocaba - SP
              </li>
              <li className="flex items-center gap-3">
                <Globe className="h-4 w-4 text-primary" />
                Atendimento online
              </li>
            </ul>
          </StaggerItem>
        </StaggerGroup>

        <Reveal className="mt-14 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground sm:text-left">
          <p>© 2026 Orion Soluções em Tecnologia. Todos os direitos reservados.</p>
        </Reveal>
      </div>
    </footer>
  );
}
