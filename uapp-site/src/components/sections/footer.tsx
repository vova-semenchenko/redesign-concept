import { MicroLabel } from "@/components/ui/annotation";
import { Logo } from "@/components/ui/logo";
import type { HomeContent } from "@/content/types";

/**
 * Закриття сторінки. Навмисно бідне на вміст: адрес, контактів, юридичних
 * реквізитів і соцмереж ніхто не надавав, а вигадувати їх заборонено
 * (PRODUCT.md, Evidence on Hand). Тут лише те, що справді існує — знак,
 * та сама навігація і рядок копірайту.
 */
export function Footer({ nav }: { nav: HomeContent["nav"] }) {
  return (
    <div className="border-t border-rule pt-12">
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <Logo className="text-heading" />

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {nav.items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="font-body text-[0.6875rem] font-medium tracking-[0.08em] text-muted-foreground uppercase transition-colors hover:text-heading focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <MicroLabel className="mt-12 block">© 2026 UAPP</MicroLabel>
    </div>
  );
}
