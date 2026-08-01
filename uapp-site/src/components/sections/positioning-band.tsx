import { Container } from "@/components/ui/band";
import type { HomeContent } from "@/content/types";

/**
 * Розділ-перелом сторінки: одна смуга, один мандатний абзац, більше нічого.
 * Перше речення несе диференціацію, тому воно набране у display-регістрі,
 * а решта лишається поясненням — розрив шкали і є ієрархією.
 *
 * Текст не редагується: він розділяється по першій крапці й збирається назад
 * без жодного слова від себе.
 */
export function PositioningBand({ text }: { text: HomeContent["positioningBand"] }) {
  const cut = text.indexOf(". ");
  const claim = cut > 0 ? text.slice(0, cut + 1) : text;
  const rest = cut > 0 ? text.slice(cut + 2) : "";

  return (
    <Container>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
        <p className="lg:col-span-7 lg:col-start-2">
          <span className="block max-w-[16ch] font-head text-[clamp(2rem,4.5vw,4rem)] leading-[1] font-normal tracking-[-0.03em] text-balance text-heading">
            {claim}
          </span>
        </p>
        {rest ? (
          <p className="max-w-[52ch] self-end border-t border-rule pt-6 text-[0.9375rem] leading-[1.65] text-muted-foreground lg:col-span-4">
            {rest}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
