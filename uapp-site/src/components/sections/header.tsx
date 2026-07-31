import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/section";
import { Logo } from "@/components/ui/logo";
import type { HomeContent } from "@/content/types";

export function Header({ nav }: { nav: HomeContent["nav"] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-background/85 backdrop-blur">
      <Container className="flex h-18 items-center justify-between gap-10">
        <a
          href="#top"
          aria-label="UAPP — home"
          className="text-heading transition-opacity duration-tap ease-mech hover:opacity-70"
        >
          <Logo />
        </a>
        <div className="flex items-center gap-8">
          <nav aria-label="Main">
            <ul className="flex items-center gap-8 text-sm">
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
          <span aria-hidden="true" className="h-6 w-px bg-rule" />
          <Button asChild variant="pill" size="lg">
            <a href="#contact">{nav.cta}</a>
          </Button>
        </div>
      </Container>
    </header>
  );
}
