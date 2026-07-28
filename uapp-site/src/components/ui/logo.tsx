import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="UAPP"
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
