import { Button } from "@/components/ui/button";
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
  // Без `relative` поряд зі `sticky`: це дві position-утиліти, які конфліктують,
  // а sticky і так є позиціонованим — панель розкриття чіпляється саме до нього.
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

          <div className="flex items-center gap-4 sm:gap-6">
            <HeaderCta label={nav.cta} />

            {/* Нижче lg навігації не було взагалі — п'ять пунктів існували
                тільки у футері. Розкриття на <details>: клавіатура й
                семантика з коробки, жодного JS. */}
            <details className="group lg:hidden">
              <summary className="flex cursor-pointer list-none items-center gap-2 py-2 font-body text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase transition-colors ease-mech hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Menu</span>
                <span className="hidden group-open:inline">Close</span>
                <span
                  aria-hidden="true"
                  className="inline-block h-px w-4 bg-current"
                />
              </summary>

              <nav
                aria-label="Main"
                className="absolute inset-x-0 top-full border-b border-rule bg-background"
              >
                <Container>
                  <ul>
                    {nav.items.map((item) => (
                      <li key={item.href} className="border-t border-rule">
                        <a
                          href={item.href}
                          className="block py-4 font-body text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase transition-colors ease-mech hover:text-heading focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                    {/* Нижче lg пігулки в шапці немає — головна дія живе тут,
                        останнім рядком розкриття. */}
                    <li className="border-t border-rule py-5">
                      <Button asChild variant="pill" size="pill">
                        <a href="#contact">{nav.cta}</a>
                      </Button>
                    </li>
                  </ul>
                </Container>
              </nav>
            </details>
          </div>
        </div>
      </Container>
    </header>
  );
}
