import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import type { HomeContent } from "@/content/types";

/**
 * Шапка аркуша: логотип в одному краї, дія в іншому, навігація між ними —
 * 11px uppercase, приглушена, з лінією, що прокреслюється зліва на hover.
 * Зверху — єдина акцентна лінія документа.
 */
export function Header({ nav }: { nav: HomeContent["nav"] }) {
  return (
    <header className="border-rule bg-background sticky top-0 z-50 border-b">
      <div aria-hidden="true" className="bg-primary h-0.5 w-full" />
      <div className="sheet">
        <div className="sheet-grid h-16 items-center">
          <div className="col-span-3 flex items-center">
            <Logo className="h-5 w-20" />
          </div>

          <nav aria-label="Main" className="col-span-6 flex justify-center">
            <ul className="flex items-center gap-8">
              {nav.items.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="label-micro text-marker hover:text-heading group relative inline-block py-2 transition-colors duration-[var(--dur-state)]"
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className="bg-heading absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-[var(--dur-state)] ease-[var(--ease-draft)] group-hover:scale-x-100 motion-reduce:transition-none"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-3 flex justify-end">
            <Button asChild size="sm">
              <a href="#contact">{nav.cta}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
