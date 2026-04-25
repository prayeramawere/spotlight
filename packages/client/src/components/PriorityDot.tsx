import type { Priority } from "../lib/types";
import { cn } from "../lib/utils/helpers";
interface PriorityDotProps {
  priority: Priority;
}

export function PriorityDot({ priority }: PriorityDotProps) {
  const map: Record<Priority, string> = {
    high: "bg-rose-500",
    med: "bg-amber-400",
    low: "bg-slate-500",
  };
  return (
    <span
      className={cn("w-1.5 h-1.5 rounded-full inline-block", map[priority])}
    />
  );
}
