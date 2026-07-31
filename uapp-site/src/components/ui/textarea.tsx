import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-rule-strong text-foreground placeholder:text-marker/70 w-full resize-none rounded-none border-0 border-b bg-transparent px-0 py-3 text-[0.9375rem] leading-[1.7] transition-shadow duration-[var(--dur-state)] outline-none",
        "focus-visible:shadow-[inset_0_-2px_0_0_var(--primary)] focus-visible:outline-none",
        "aria-invalid:shadow-[inset_0_-2px_0_0_var(--destructive)]",
        "disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
