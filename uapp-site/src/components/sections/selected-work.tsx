import { Container } from "@/components/ui/band";
import { IndexChip, MicroLabel } from "@/components/ui/annotation";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

/**
 * Кейси як реєстр креслень, а не як сітка карток: нумерований перелік,
 * розділений хейрлайнами. Номер тут не декоративний — він працює як
 * реєстровий індекс, до якого можна послатися, і саме тому дозволений
 * (craft floor забороняє нумерацію, яка нічого не значить).
 *
 * NDA-мітка стоїть у кожному рядку: стриманість тут і є повідомленням.
 */
export function SelectedWork({ work }: { work: HomeContent["selectedWork"] }) {
  return (
    <Container>
      <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
        <SectionHeading title={work.heading} />
        <MicroLabel>{work.ndaBadge}</MicroLabel>
      </div>

      <ol className="border-b border-rule">
        {work.cases.map((c, i) => (
          <li
            key={c.id}
            className="grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-t border-rule py-7 md:grid-cols-[auto_minmax(0,1fr)_minmax(0,1.4fr)]"
          >
            <IndexChip className="justify-self-start">
              {String(i + 1).padStart(2, "0")}
            </IndexChip>

            <p className="font-head text-[1.0625rem] leading-[1.3] font-medium tracking-[-0.01em] text-heading">
              {c.clientProfile}
            </p>

            <div>
              <p className="text-[0.9375rem] leading-[1.6] text-muted-foreground">
                {c.domainLine}
              </p>
              <MicroLabel className="mt-3 block" tone="ink">
                {c.factAnchor}
              </MicroLabel>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
