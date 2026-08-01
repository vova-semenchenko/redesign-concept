import { Container } from "@/components/ui/band";
import { MicroLabel } from "@/components/ui/annotation";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

/**
 * Блок із найвищим ризиком порожньої мови на всій сторінці (voice-and-tone
 * §3), тому він нічого не ілюструє й нічого не прикрашає: мандатне
 * твердження набране великим, і на цьому смуга закінчується.
 *
 * Перелік сертифікатів клієнт ще не надав. Він стоїть явно позначеним
 * плейсхолдером, а не вигаданим списком — PRODUCT.md фіксує це як факт,
 * якого не можна вигадувати.
 */
export function AiLayer({ ai }: { ai: HomeContent["aiLayer"] }) {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
        <SectionHeading title={ai.heading} className="lg:col-span-4" />

        <div className="lg:col-span-7 lg:col-start-6">
          <p className="max-w-[44ch] font-head text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.2] font-normal tracking-[-0.02em] text-balance text-heading">
            {ai.statement}
          </p>
          <p className="mt-10 border-t border-rule pt-6">
            <MicroLabel>{ai.certificationsNote}</MicroLabel>
          </p>
        </div>
      </div>
    </Container>
  );
}
