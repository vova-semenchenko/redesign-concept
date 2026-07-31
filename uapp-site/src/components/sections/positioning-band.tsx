import { Container, Section } from "@/components/ui/section";
import type { HomeContent } from "@/content/types";

export function PositioningBand({
  text,
}: {
  text: HomeContent["positioningBand"];
}) {
  return (
    <Section zone="dark">
      <Container className="py-24">
        {/* Два рівні всередині блоку: твердження — і приглушена деталізація */}
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-title text-heading">{text.lead}</p>
          <p className="mt-6 text-lead text-muted-foreground">{text.body}</p>
        </div>
      </Container>
    </Section>
  );
}
