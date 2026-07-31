import { Button } from "@/components/ui/button";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Компактна смуга, що повторює одну й ту саму дію між великими блоками.
 * Меседж не змінюється — змінюється тільки зона під ним.
 */
export function CtaStrip({
  cta,
  tone = "paper",
}: {
  cta: HomeContent["ctaStrip"];
  tone?: "paper" | "ink";
}) {
  return (
    <Zone tone={tone} pad="band">
      <div className="sheet-grid items-center gap-y-6">
        <p className="type-subtitle text-heading col-start-3 col-end-9">
          {cta.statement}
        </p>
        <div className="col-start-9 col-end-11 flex justify-end">
          <Button asChild size="sm">
            <a href="#contact">{cta.action}</a>
          </Button>
        </div>
      </div>
    </Zone>
  );
}
