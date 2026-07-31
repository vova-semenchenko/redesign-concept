import { Button } from "@/components/ui/button";
import { MicroLabel } from "@/components/ui/micro-label";
import { Container, Section, type Zone } from "@/components/ui/section";

/**
 * Компактна CTA-смуга, що повторюється між великими блоками: меседж той самий,
 * оформлення змінюється разом із зоною (розд. 3 стилістики).
 */
export function CtaBand({
  note,
  cta,
  zone = "light",
}: {
  note: string;
  cta: string;
  zone?: Zone;
}) {
  return (
    <Section zone={zone}>
      <Container className="flex items-center justify-between gap-8 py-10">
        <div className="flex items-baseline gap-6">
          <MicroLabel>Next step</MicroLabel>
          <p className="text-subtitle text-heading">{note}</p>
        </div>
        <Button asChild variant="pill" size="hero">
          <a href="#contact">{cta}</a>
        </Button>
      </Container>
    </Section>
  );
}
