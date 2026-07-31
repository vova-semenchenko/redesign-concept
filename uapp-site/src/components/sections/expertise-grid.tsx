import { SectionHeading } from "@/components/ui/section-heading";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Не сітка карток, а рядки таблиці доменів: домен ліворуч, опис у центрі,
 * стандарти праворуч. Розділювач — хейрлайн, і саме він реагує на курсор:
 * лінія рядка темнішає, нічого не рухається.
 */
export function ExpertiseGrid({
  expertise,
}: {
  expertise: HomeContent["expertise"];
}) {
  return (
    <Zone tone="paper" pad="md" id="expertise">
      <div className="sheet-grid gap-y-14">
        <SectionHeading
          marker={expertise.marker}
          title={expertise.heading}
          className="sheet-main"
        />

        <ul className="sheet-main">
          {expertise.cards.map((card) => (
            <li
              key={card.title}
              className="border-rule hover:border-rule-strong group grid grid-cols-8 items-start gap-y-4 border-b py-10 transition-colors duration-[var(--dur-state)] first:border-t"
            >
              <h3 className="type-subtitle text-heading col-span-2 pr-8">
                {card.title}
              </h3>
              <p className="type-body text-muted-foreground col-span-4 pr-10">
                {card.description}
              </p>
              <ul className="col-span-2 flex flex-col gap-2.5 pr-4">
                {card.standards.map((standard) => (
                  <li
                    key={standard}
                    className="label-micro text-marker group-hover:text-foreground transition-colors duration-[var(--dur-state)]"
                  >
                    {standard}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Zone>
  );
}
