import { cn } from "@/lib/utils";
import { Marker } from "@/components/ui/marker";
import { SchematicWindow } from "@/components/ui/schematic";

const SHORES = [
  { side: "Fiat rails", nodes: ["SEPA Instant", "ISO 20022", "Card programs"] },
  { side: "On-chain rails", nodes: ["Wallets", "Exchanges", "Settlement"] },
] as const;

/**
 * Місце сигнатурного hero-ефекту, зайняте змістовним кадром, а не рамкою
 * з написом «placeholder»: два береги, підписані реальними рейками, і
 * пунктирна вісь між ними з єдиною акцентною точкою — тим самим вузлом,
 * який у наступній ітерації почне рухатися.
 *
 * Контракт модуля — див. README.md поруч. Статичний кадр тривіально
 * задовольняє reduced-motion і не потребує pause-кнопки.
 */
export function HeroVisual({
  caption,
  className,
}: {
  caption: string;
  className?: string;
}) {
  return (
    <SchematicWindow caption={caption} className={className}>
      <div aria-hidden="true" className="relative px-7 py-8">
        {/* Вісь між берегами: пунктир — те, що зв'язане, а не збудоване */}
        <div className="pointer-events-none absolute inset-y-8 left-1/2 flex -translate-x-1/2 flex-col items-center">
          <div className="bg-window-rule-strong w-px flex-1 [mask-image:repeating-linear-gradient(to_bottom,#000_0_4px,transparent_4px_8px)]" />
          <div className="bg-primary size-2 shrink-0 rotate-45" />
          <div className="bg-window-rule-strong w-px flex-1 [mask-image:repeating-linear-gradient(to_bottom,#000_0_4px,transparent_4px_8px)]" />
        </div>

        <div className="grid grid-cols-2">
          {SHORES.map(({ side, nodes }, index) => (
            <div
              key={side}
              className={cn(
                "flex flex-col gap-4",
                index === 0 ? "pr-10 text-right" : "pl-10",
              )}
            >
              <Marker
                className={cn(
                  "text-window-muted",
                  index === 0 && "justify-end",
                )}
              >
                {side}
              </Marker>
              <ul className="flex flex-col">
                {nodes.map((node) => (
                  <li
                    key={node}
                    className="border-window-rule text-window-foreground type-caption border-t py-2.5 first:border-t-0"
                  >
                    {node}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SchematicWindow>
  );
}
