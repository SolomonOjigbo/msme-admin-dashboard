import { Badge } from "@/components/ui/badge";

interface AccountCardProps {
  name: string;
  email: string;
  role: string;
  initials: string;
  status?: "Pending" | "Active";
}

export function AccountCard({
  name,
  email,
  role,
  initials,
  status,
}: AccountCardProps) {
  return (
    <div className="rounded-xl bg-secondary/60 border border-border p-4">
      <p className="text-[11px] font-semibold tracking-wider text-muted-foreground mb-3">
        YOUR ACCOUNT
      </p>
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 min-w-[180px]">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-success to-warning flex items-center justify-center text-white font-semibold text-sm">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-sm leading-tight">{name}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Role</p>
          <p className="text-sm font-medium">{role}</p>
        </div>
        {status && (
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <Badge
              variant="secondary"
              className="bg-info-soft text-info hover:bg-info-soft mt-0.5"
            >
              {status}
            </Badge>
          </div>
        )}
      </div>
    </div>
  );
}
