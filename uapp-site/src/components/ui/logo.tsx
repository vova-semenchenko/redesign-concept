import { cn } from "@/lib/utils";

/**
 * `decorative` — для випадків, коли ім'я дає сам контейнер (посилання в
 * хедері має власний sr-only текст): інакше скрінрідер читає «UAPP» двічі.
 */
export function Logo({
  className,
  decorative = false,
}: {
  className?: string;
  decorative?: boolean;
}) {
  return (
    <span
      {...(decorative
        ? { "aria-hidden": true }
        : { role: "img", "aria-label": "UAPP" })}
      className={cn("inline-block h-6 w-24 bg-current", className)}
      style={{
        maskImage: "url(/logo-uapp.svg)",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "left center",
        WebkitMaskImage: "url(/logo-uapp.svg)",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "left center",
      }}
    />
  );
}
