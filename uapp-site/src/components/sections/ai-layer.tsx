import { IsoPipeline } from "@/components/ui/iso-pipeline";
import { MicroLabel } from "@/components/ui/micro-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/section";
import type { HomeContent } from "@/content/types";

export function AiLayer({ ai }: { ai: HomeContent["aiLayer"] }) {
  return (
    <Section zone="dark">
      <Container className="py-28">
        <div className="grid grid-cols-12 items-start gap-x-8">
          <SectionHeading
            index="04"
            title={ai.heading}
            className="col-span-5"
          />
          <p className="col-span-7 text-lead text-muted-foreground">
            {ai.statement}
          </p>
        </div>
        {/* Продукт як схема: вхід → обробка → результат */}
        <IsoPipeline
          stages={ai.stages}
          className="mt-16 border-t border-b border-rule"
        />
        <MicroLabel as="p" className="mt-8">
          {ai.certificationsNote}
        </MicroLabel>
      </Container>
    </Section>
  );
}
