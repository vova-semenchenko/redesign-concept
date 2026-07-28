import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import type { HomeContent } from "@/content/types";

export function Header({ nav }: { nav: HomeContent["nav"] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo className="text-heading" />
        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm">
            {nav.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-heading">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild size="sm">
          <a href="#contact">{nav.cta}</a>
        </Button>
      </div>
    </header>
  );
}
