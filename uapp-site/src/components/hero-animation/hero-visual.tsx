import { cn } from "@/lib/utils";

/**
 * Статичний плейсхолдер сигнатурного hero-ефекту.
 * Контракт модуля — див. README.md поруч. Статичний кадр тривіально
 * задовольняє reduced-motion і не потребує pause-кнопки.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-64 items-center justify-center rounded-lg border border-dashed border-ultramarine-300",
        className,
      )}
    >
      <span className="text-sm text-muted-foreground">
        hero signature effect — placeholder
      </span>
    </div>
  );
}
