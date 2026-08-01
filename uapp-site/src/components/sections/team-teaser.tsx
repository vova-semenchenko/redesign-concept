import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

/**
 * Тизер команди без сітки облич: фотографій і персоналій клієнт не надав,
 * а вигадувати їх заборонено. Замість фейкових карток — заголовок і опис
 * ролями, як вимагає бриф (жодного поділу Frontend/Backend).
 *
 * Живе всередині фінальної темної смуги, розділеної внутрішніми правилами.
 */
export function TeamTeaser({ team }: { team: HomeContent["team"] }) {
  return (
    <div>
      <SectionHeading title={team.heading} lead={team.description} />
    </div>
  );
}
