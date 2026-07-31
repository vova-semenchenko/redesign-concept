import { SectionHeading } from "@/components/ui/section-heading";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Команда подається доменними ролями — без поділу на фронт і бек і без
 * фотографій, яких у нас немає. Ролі стоять рядками на лініях: перелік
 * читається як склад бригади в титульному блоці креслення.
 */
export function TeamTeaser({ team }: { team: HomeContent["team"] }) {
  return (
    <Zone tone="paper" pad="md" id="team">
      <div className="sheet-grid gap-y-14">
        <SectionHeading
          marker={team.marker}
          title={team.heading}
          description={team.description}
          className="sheet-main"
        />
        <ul className="divide-rule border-rule sheet-main grid grid-cols-4 divide-x border-b">
          {team.roles.map((role) => (
            <li
              key={role}
              className="label-micro text-marker px-6 py-8 first:pl-0"
            >
              {role}
            </li>
          ))}
        </ul>
      </div>
    </Zone>
  );
}
