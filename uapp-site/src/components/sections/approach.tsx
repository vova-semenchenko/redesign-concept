import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function Approach({ approach }: { approach: HomeContent["approach"] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={approach.heading} />
      <div className="mt-10 grid grid-cols-3 gap-8">
        {approach.pillars.map((p) => (
          <div key={p.title}>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-foreground">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
