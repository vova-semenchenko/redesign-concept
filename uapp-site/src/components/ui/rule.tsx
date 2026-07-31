import { cn } from "@/lib/utils";

/**
 * Rule — горизонтальний хейрлайн. Суцільний означає збудоване,
 * пунктирний — спроєктоване або зв'язане. Розділювач першої черги:
 * лінію малюють раніше, ніж додають відступ.
 */
export function Rule({
  variant = "solid",
  className,
}: {
  variant?: "solid" | "dashed";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "w-full",
        variant === "dashed" ? "rule-dashed" : "bg-rule h-px",
        className,
      )}
    />
  );
}
