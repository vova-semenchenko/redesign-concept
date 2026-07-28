import type { HomeContent } from "@/content/types";

export function PositioningBand({ text }: { text: HomeContent["positioningBand"] }) {
  return (
    <section className="dark bg-background py-16">
      <p className="mx-auto max-w-4xl px-6 text-2xl font-medium text-heading">
        {text}
      </p>
    </section>
  );
}
