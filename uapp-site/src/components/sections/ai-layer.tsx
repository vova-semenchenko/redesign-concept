import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function AiLayer({ ai }: { ai: HomeContent["aiLayer"] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={ai.heading} description={ai.statement} />
      <p className="mt-6 text-sm text-muted-foreground">
        {ai.certificationsNote}
      </p>
    </section>
  );
}
