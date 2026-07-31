import { cn } from "@/lib/utils";
import { Marker } from "@/components/ui/marker";
import { SchematicWindow } from "@/components/ui/schematic";
import type { HomeContent } from "@/content/types";

/**
 * Розріз мосту — місце сигнатурного hero-ефекту, зайняте змістовним
 * кадром, а не рамкою з написом «placeholder».
 *
 * Позиціонування несе сама поверхня. Банківський берег — біле вікно,
 * тобто збудований продукт: п'ять рейок, суцільні лінії, акцентний
 * вузол. On-chain берег лежить просто на аркуші, контуром: три рейки,
 * жодної заливки. Пропорція 5:3 узята з мандатного positioning band, а
 * не придумана; дзеркальні колонки, що стояли тут раніше, читалися як
 * 50/50 і суперечили першому пункту чекліста брифу §11.
 *
 * Знизу титульний блок креслення — самі перевірні числа.
 *
 * Контракт модуля — див. README.md поруч. Статичний кадр тривіально
 * задовольняє reduced-motion і не потребує pause-кнопки.
 */
export function HeroVisual({
  caption,
  diagram,
  className,
}: {
  caption: string;
  diagram: HomeContent["hero"]["diagram"];
  className?: string;
}) {
  return (
    <SchematicWindow caption={caption} frame="open" className={className}>
      <div className="grid grid-cols-12">
        <Shore
          title={diagram.primary.title}
          nodes={diagram.primary.nodes}
          tone="window"
          className="col-span-7"
        />
        <Shore
          title={diagram.secondary.title}
          nodes={diagram.secondary.nodes}
          tone="zone"
          className="col-span-5"
        />
      </div>

      <ul className="border-rule text-marker flex flex-wrap items-center gap-x-6 gap-y-1 border-t px-6 py-3">
        {diagram.scale.map((figure) => (
          <li key={figure} className="label-micro nums-tabular">
            {figure}
          </li>
        ))}
      </ul>
    </SchematicWindow>
  );
}

/**
 * Берег. `window` — збудоване: біла поверхня, суцільні хейрлайни,
 * єдиний акцентний вузол і пунктирний зв'язок, що йде з нього на
 * сусідній берег. `zone` — те, що поруч: жодної заливки, лінії зони.
 */
function Shore({
  title,
  nodes,
  tone,
  className,
}: {
  title: string;
  nodes: string[];
  tone: "window" | "zone";
  className?: string;
}) {
  const built = tone === "window";
  return (
    <div
      className={cn(
        "relative flex flex-col gap-3 px-6 pt-5 pb-6",
        built
          ? "corner-ticks bg-window text-window-foreground [--tick:var(--color-window-rule-strong)]"
          : "text-foreground",
        className,
      )}
    >
      <Marker className={built ? "text-window-muted" : "text-marker"}>
        {title}
      </Marker>
      <ul className="flex flex-col">
        {nodes.map((node, index) => {
          const isNode = built && index === 0;
          return (
            <li
              key={node}
              className={cn(
                "type-caption relative flex items-center gap-2.5 border-b py-2 last:border-b-0",
                built ? "border-window-rule" : "border-rule",
                isNode && "font-medium",
              )}
            >
              {isNode ? (
                <span
                  aria-hidden="true"
                  className="bg-primary size-2 shrink-0"
                />
              ) : null}
              <span className={cn(built && !isNode && "pl-[18px]")}>
                {node}
              </span>
              {isNode ? (
                /* Зв'язок із сусіднім берегом: пунктир — те, що з'єднане */
                <span
                  aria-hidden="true"
                  className="bg-window-rule-strong absolute top-1/2 -right-6 h-px w-6 [mask-image:repeating-linear-gradient(to_right,#000_0_3px,transparent_3px_6px)]"
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
