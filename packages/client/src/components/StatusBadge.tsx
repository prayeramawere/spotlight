import type { TaskStatus } from "../lib/types";
import { cn } from "../lib/utils/helpers";

interface StatusBadgeProps {
  status: TaskStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const map: Record<TaskStatus, [string, string]> = {
    done: ["bg-emerald-900/60 text-emerald-400 border-emerald-700/40", "Done"],
    "in-progress": [
      "bg-amber-900/60 text-amber-400 border-amber-700/40",
      "In Progress",
    ],
    todo: ["bg-slate-800/80 text-slate-400 border-slate-700/40", "To Do"],
  };
  const [cls, label] = map[status];
  return (
    <span
      className={cn(
        "text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border",
        cls,
      )}
    >
      {label}
    </span>
  );
}
