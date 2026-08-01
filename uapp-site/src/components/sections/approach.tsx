import { Container } from "@/components/ui/band";
import { DefinitionList, DefinitionRow } from "@/components/ui/definition-row";
import { IsoIcon, type IsoIconName } from "@/components/ui/iso-icon";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

const marks: Record<string, IsoIconName> = {
  "Both sides of the bridge": "mesh",
  "Regulated-grade": "audit",
  "AI-native delivery": "lift",
};

export function Approach({ approach }: { approach: HomeContent["approach"] }) {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
        <SectionHeading title={approach.heading} className="lg:col-span-3" />

        <DefinitionList className="lg:col-span-9">
          {approach.pillars.map((pillar) => (
            <DefinitionRow
              key={pillar.title}
              term={pillar.title}
              mark={
                <IsoIcon
                  name={marks[pillar.title] ?? "module"}
                  size={34}
                  className="text-primary"
                />
              }
            >
              {pillar.description}
            </DefinitionRow>
          ))}
        </DefinitionList>
      </div>
    </Container>
  );
}
