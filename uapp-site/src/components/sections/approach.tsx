import { IndexChip } from "@/components/ui/micro-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/section";
import type { HomeContent } from "@/content/types";

export function Approach({ approach }: { approach: HomeContent["approach"] }) {
  return (
    <Section zone="light">
      <Container className="py-28">
        <SectionHeading index="05" title={approach.heading} />
        {/* Три стовпи, розділені вертикальними лініями */}
        <div className="mt-16 grid grid-cols-3 border-t border-rule pt-12">
          {approach.pillars.map((p, i) => (
            <div
              key={p.title}
              className={i === 0 ? "pr-10" : "border-l border-rule px-10"}
            >
              <IndexChip value={i + 1} />
              <h3 className="mt-6 text-subtitle">{p.title}</h3>
              <p className="mt-4 text-muted-foreground">{p.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
