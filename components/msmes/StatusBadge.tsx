import { cn } from "@/lib/utils";
import type { MsmeStatus } from "@/data/msmes";

const styles: Record<MsmeStatus, string> = {
  Active: "bg-success-soft text-success",
  Archived: "bg-[hsl(170_70%_92%)] text-[hsl(170_60%_30%)]",
  Pending: "bg-info-soft text-info",
};

export function StatusBadge({ status }: { status: MsmeStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-medium",
        styles[status]
      )}
    >
      {status}
    </span>
  );
}
