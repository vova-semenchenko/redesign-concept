import { Logo } from "@/components/ui/logo";
import { MicroLabel } from "@/components/ui/micro-label";
import { Container, Section } from "@/components/ui/section";
import type { HomeContent } from "@/content/types";

export function Footer({
  nav,
  footer,
}: {
  nav: HomeContent["nav"];
  footer: HomeContent["footer"];
}) {
  return (
    <Section as="footer" zone="dark">
      <Container className="grid grid-cols-12 gap-x-8 gap-y-12 py-20">
        <div className="col-span-5">
          <Logo className="text-heading" />
          <p className="mt-6 text-sm text-muted-foreground">{footer.note}</p>
        </div>
        <nav className="col-span-4" aria-label="Footer">
          <MicroLabel as="div">Navigation</MicroLabel>
          <ul className="mt-6 flex flex-col gap-3 text-sm">
            {nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-muted-foreground transition-colors duration-tap ease-mech hover:text-heading"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="col-span-3">
          <MicroLabel as="div">Contact</MicroLabel>
          <a
            href="#contact"
            className="mt-6 inline-block text-sm text-muted-foreground transition-colors duration-tap ease-mech hover:text-heading"
          >
            {nav.cta}
          </a>
        </div>
        {/* Окремий рядок юридичних посилань */}
        <div className="col-span-12 border-t border-rule pt-8">
          <MicroLabel>{footer.legal}</MicroLabel>
        </div>
      </Container>
    </Section>
  );
}
