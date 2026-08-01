import { Container } from "@/components/ui/band";
import { HeaderCta } from "@/components/sections/header-cta";
import { Logo } from "@/components/ui/logo";
import type { HomeContent } from "@/content/types";

/**
 * Хедер — це правило з вмістом, а не панель із заливкою: жодного фону,
 * жодного блюру, тільки нижній хейрлайн. Заливка тут з'їла б колонкові
 * лінії, які мусять проходити наскрізь.
 */
export function Header({ nav }: { nav: HomeContent["nav"] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-background">
      <Container>
        <div className="flex items-center justify-between gap-4 py-5 sm:gap-8">
          <a
            href="#top"
            className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <Logo className="text-heading" />
            <span className="sr-only">UAPP — home</span>
          </a>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {nav.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-body text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase transition-colors duration-(--duration-state) ease-mech hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <HeaderCta label={nav.cta} />
        </div>
      </Container>
    </header>
  );
}
