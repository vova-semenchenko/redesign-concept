import { Marker } from "@/components/ui/marker";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Смуга під героєм не повторює його цифри — вона називає стандарти.
 * Для читача, який відсіює вендорів, «ISO 20022 · PSD2 / SCA» доводить
 * приналежність до його світу швидше за ще один рядок метрик.
 */
export function TrustStrip({ trust }: { trust: HomeContent["trust"] }) {
  return (
    <Zone tone="ink" pad="band">
      <div className="sheet-grid items-start gap-y-6">
        <div className="sheet-edge-start">
          <Marker>{trust.marker}</Marker>
        </div>
        <ul className="divide-rule col-start-3 col-end-11 grid grid-cols-4 divide-x">
          {trust.standards.map((standard) => (
            <li
              key={standard}
              className="label-micro text-foreground px-5 first:pl-0"
            >
              {standard}
            </li>
          ))}
        </ul>
        <p className="label-micro text-marker sheet-edge-end min-w-0 pl-8 text-balance">
          {trust.note}
        </p>
      </div>
    </Zone>
  );
}
