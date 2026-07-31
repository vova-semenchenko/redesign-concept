import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Блюпринт-каркас сторінки.
 *
 * Сітка тут — носій стилю, а не службовий шар: вертикальні лінії проходять
 * наскрізь через секцію, зокрема через порожні зони, а бічні поля лишаються
 * порожніми колонками. Зони чергуються (`light` / `quiet` / `dark`) з різкою
 * межею — хейрлайн замість градієнтного переходу.
 */
export type Zone = "light" | "quiet" | "dark";

const zoneClass: Record<Zone, string> = {
  light: "bg-background",
  quiet: "zone-quiet bg-background",
  dark: "dark bg-background",
};

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto w-full max-w-(--page-max) px-(--page-edge)",
        className,
      )}
      {...props}
    />
  );
}

/** Наскрізні вертикальні лінії; кожна третя — пунктирна («умовна» напрямна). */
export function GridRules({ columns = 12 }: { columns?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="mx-auto grid h-full w-full max-w-(--page-max) px-(--page-edge)"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: columns }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-full border-l border-rule-faint",
              i % 3 === 2 && "border-dashed",
              i === columns - 1 && "border-r",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function Section({
  as: Tag = "section",
  zone = "light",
  rules = true,
  divider = true,
  className,
  children,
  ...props
}: React.ComponentProps<"section"> & {
  as?: "section" | "footer";
  zone?: Zone;
  rules?: boolean;
  divider?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "relative isolate",
        zoneClass[zone],
        divider && "border-t border-rule",
        className,
      )}
      {...props}
    >
      {rules ? <GridRules /> : null}
      {children}
    </Tag>
  );
}
