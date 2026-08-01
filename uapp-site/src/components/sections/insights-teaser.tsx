import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

/**
 * Тизер Insights без карток статей: матеріалів ще немає, і порожні
 * плейсхолдер-картки виглядали б як контент, якого не існує.
 */
export function InsightsTeaser({
  insights,
}: {
  insights: HomeContent["insights"];
}) {
  return (
    <div>
      <SectionHeading title={insights.heading} lead={insights.description} />
    </div>
  );
}
