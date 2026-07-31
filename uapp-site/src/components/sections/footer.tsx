import { Logo } from "@/components/ui/logo";
import { Marker } from "@/components/ui/marker";
import { Rule } from "@/components/ui/rule";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Титульний блок аркуша: знак, колонки посилань дрібним приглушеним
 * шрифтом і окремий рядок юридичних. Внизу — та сама акцентна лінія,
 * якою сторінка починалася.
 */
export function Footer({ footer }: { footer: HomeContent["footer"] }) {
  return (
    <Zone tone="ink" pad="md" divider={false} className="pb-0">
      <div className="sheet-grid gap-y-16">
        <div className="col-span-2 flex flex-col gap-6">
          <Logo className="h-5 w-20" />
        </div>

        {footer.columns.map((column) => (
          <nav
            key={column.title}
            aria-label={column.title}
            className="col-span-3 flex flex-col gap-5"
          >
            <Marker>{column.title}</Marker>
            <ul className="flex flex-col gap-3">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-heading type-caption transition-colors duration-[var(--dur-state)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="col-span-12 flex flex-col gap-8">
          <Rule />
          <div className="flex items-center justify-between gap-8 pb-10">
            <p className="label-micro text-marker">{footer.note}</p>
            <ul className="flex items-center gap-8">
              {footer.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="label-micro text-marker hover:text-heading transition-colors duration-[var(--dur-state)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="bg-primary absolute inset-x-0 bottom-0 h-0.5"
      />
    </Zone>
  );
}
