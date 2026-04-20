import { LucideIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  delta: string;
  deltaLabel?: string;
  icon: LucideIcon;
  iconClassName?: string;
}

export function StatCard({
  label,
  value,
  delta,
  deltaLabel = "vs last month",
  icon: Icon,
  iconClassName,
}: StatCardProps) {
  return (
    <div className="bg-card rounded-xl border p-5 flex flex-col gap-3">
      <div
        className={cn(
          "h-9 w-9 rounded-lg grid place-items-center",
          iconClassName ?? "bg-primary-soft text-primary"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="flex items-center gap-1.5 text-xs">
        <TrendingUp className="h-3.5 w-3.5 text-success" />
        <span className="font-semibold text-success">{delta}</span>
        <span className="text-muted-foreground">{deltaLabel}</span>
      </div>
    </div>
  );
}
