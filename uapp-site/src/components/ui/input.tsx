import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Поле — це лінія, а не коробка: жодного фону, рамки й радіуса.
 * Фокус потовщує підкреслення до 2px і фарбує його акцентом
 * (через inset-тінь, щоб рядок не стрибав), і ніколи не світиться.
 */
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-rule-strong text-foreground placeholder:text-marker/70 h-11 w-full min-w-0 rounded-none border-0 border-b bg-transparent px-0 text-[0.9375rem] transition-shadow duration-[var(--dur-state)] outline-none",
        "focus-visible:shadow-[inset_0_-2px_0_0_var(--primary)] focus-visible:outline-none",
        "aria-invalid:shadow-[inset_0_-2px_0_0_var(--destructive)]",
        "disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
