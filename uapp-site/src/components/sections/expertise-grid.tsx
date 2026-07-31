import { IsoIcon, type IsoIconName } from "@/components/ui/iso-icon";
import { MicroLabel } from "@/components/ui/micro-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/section";
import type { HomeContent } from "@/content/types";

/** Порядок banking-first із контенту: рейки · комплаєнс · безпека · on-chain. */
const icons: IsoIconName[] = ["layers", "gate", "shell", "nodes"];

export function ExpertiseGrid({
  expertise,
}: {
  expertise: HomeContent["expertise"];
}) {
  return (
    <Section id="expertise" zone="light">
      <Container className="py-28">
        <SectionHeading index="01" title={expertise.heading} />
        {/* Рядки списку розділені хейрлайнами, а не відступами */}
        <div className="mt-16 border-t border-rule">
          {expertise.cards.map((card, i) => (
            <div
              key={card.title}
              className="grid grid-cols-12 items-start gap-x-8 border-b border-rule py-10"
            >
              <div className="col-span-1">
                <IsoIcon
                  name={icons[i] ?? "layers"}
                  className="size-14 text-heading"
                />
              </div>
              <h3 className="col-span-4 text-subtitle">{card.title}</h3>
              <div className="col-span-7">
                <p className="max-w-(--measure) text-muted-foreground">
                  {card.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {card.standards.map((s) => (
                    <MicroLabel as="li" key={s}>
                      {s}
                    </MicroLabel>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
