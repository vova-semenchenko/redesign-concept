import { MetricRow } from "@/components/ui/metric-stat";
import { MicroLabel } from "@/components/ui/micro-label";
import { Container, Section } from "@/components/ui/section";
import type { HomeContent } from "@/content/types";

export function TrustStrip({ trust }: { trust: HomeContent["trust"] }) {
  return (
    <Section zone="quiet">
      <Container className="py-14">
        <div className="flex items-baseline justify-between gap-8">
          <MicroLabel>Track record</MicroLabel>
          <MicroLabel>{trust.certificationsNote}</MicroLabel>
        </div>
        <MetricRow metrics={trust.metrics} className="mt-10" />
      </Container>
    </Section>
  );
}
