import { cn } from "@/lib/utils";

interface MetricStatProps {
  value: string;
  label: string;
  className?: string;
}

export function MetricStat({ value, label, className }: MetricStatProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-3xl font-bold text-heading">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
