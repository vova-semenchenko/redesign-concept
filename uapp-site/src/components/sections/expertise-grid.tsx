import { Container } from "@/components/ui/band";
import { DefinitionList, DefinitionRow } from "@/components/ui/definition-row";
import { IsoIcon, type IsoIconName } from "@/components/ui/iso-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

/**
 * Чотири домени як специфікація, а не як сітка однакових карток з іконкою
 * і трьома рядками — саме той «лінивий контейнер», який craft floor називає
 * структурною відмовою.
 *
 * Іконка кожного домену — модифікація куба, а не окремий символ: стос плит
 * для рейок, наскрізний куб для аудиту, піднята кришка для захищеного об'єму,
 * куб на орбіті для ончейну.
 */
const marks: Record<string, IsoIconName> = {
  "Fintech & Payments": "stack",
  "Compliance & AML": "audit",
  Security: "lift",
  "Crypto & Web3": "orbit",
};

export function ExpertiseGrid({
  expertise,
}: {
  expertise: HomeContent["expertise"];
}) {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
        {/* Без вступного абзацу: Expertise — мандатний блок, і оригінальний
            текст для нього писати заборонено (voice-and-tone.md §0). */}
        <SectionHeading title={expertise.heading} className="lg:col-span-3" />

        <DefinitionList className="lg:col-span-9">
          {expertise.cards.map((card) => (
            <DefinitionRow
              key={card.title}
              term={card.title}
              tags={card.standards}
              mark={
                <IsoIcon
                  name={marks[card.title] ?? "module"}
                  size={34}
                  className="text-primary"
                />
              }
            >
              {card.description}
            </DefinitionRow>
          ))}
        </DefinitionList>
      </div>
    </Container>
  );
}
