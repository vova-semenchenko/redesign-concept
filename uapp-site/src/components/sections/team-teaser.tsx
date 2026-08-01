import { IsoIcon, type IsoIconName } from "@/components/ui/iso-icon";
import { MicroLabel } from "@/components/ui/annotation";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

/**
 * Тизер команди без сітки облич: фотографій, імен і кількості клієнт не
 * надав, а вигадувати їх заборонено (PRODUCT.md, Evidence on Hand).
 *
 * Замість порожнього блоку — рольова драбина тими самими доменними ролями,
 * що вже названі в описі, набрана лінійованими рядками. Поділу
 * Frontend/Backend немає й бути не може (бриф §8).
 */
const marks: IsoIconName[] = ["stack", "audit", "orbit"];

export function TeamTeaser({ team }: { team: HomeContent["team"] }) {
  return (
    <div>
      <SectionHeading title={team.heading} lead={team.description} />

      <ul className="mt-10 border-t border-rule">
        {team.roles.map((role, i) => (
          <li
            key={role}
            className="flex items-center gap-4 border-b border-rule py-4"
          >
            <IsoIcon
              name={marks[i] ?? "module"}
              size={26}
              className="text-muted-foreground"
            />
            <MicroLabel tone="ink">{role}</MicroLabel>
          </li>
        ))}
      </ul>
    </div>
  );
}
