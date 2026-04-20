"use client";

import { useState } from "react";
import { Plus, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { teamMembers as seed, type TeamMember } from "@/data/team";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function TeamManagementPage() {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>(seed);
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Super Admin" | "Admin Officer">("Admin Officer");

  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  const sendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    const local = inviteEmail.split("@")[0];
    const initials = local.slice(0, 2).toUpperCase();
    setMembers((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: local,
        email: inviteEmail,
        role: inviteRole,
        status: "Pending",
        initials,
        joined: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      },
    ]);
    toast({ title: "Invitation sent", description: `Invite sent to ${inviteEmail}` });
    setInviteOpen(false);
    setInviteEmail("");
    setInviteRole("Admin Officer");
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    toast({ title: "Member removed" });
  };

  const toggleSuspend = (id: string) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === "Suspended" ? "Active" : "Suspended" } : m
      )
    );
  };

  return (
    <>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Invite, manage roles and access for your admin team.
          </p>
        </div>
        <Button onClick={() => setInviteOpen(true)} className="font-semibold">
          <Plus className="h-4 w-4" /> Invite member
        </Button>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-0"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 text-xs uppercase text-muted-foreground tracking-wider">
                <th className="text-left px-6 py-3 font-medium">Member</th>
                <th className="text-left px-6 py-3 font-medium">Role</th>
                <th className="text-left px-6 py-3 font-medium">Status</th>
                <th className="text-left px-6 py-3 font-medium">Joined</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-success to-warning grid place-items-center text-white text-xs font-semibold">
                        {m.initials}
                      </div>
                      <div>
                        <p className="font-medium">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{m.role}</td>
                  <td className="px-6 py-4">
                    <Badge
                      variant="secondary"
                      className={cn(
                        "font-medium",
                        m.status === "Active" && "bg-success-soft text-success hover:bg-success-soft",
                        m.status === "Pending" && "bg-info-soft text-info hover:bg-info-soft",
                        m.status === "Suspended" && "bg-destructive-soft text-destructive hover:bg-destructive-soft"
                      )}
                    >
                      {m.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{m.joined}</td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button aria-label="Row actions" className="h-8 w-8 grid place-items-center rounded-md hover:bg-muted">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toast({ title: "Edit role", description: m.name })}>
                          Edit role
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleSuspend(m.id)}>
                          {m.status === "Suspended" ? "Reactivate" : "Suspend"}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => removeMember(m.id)}>
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite a team member</DialogTitle>
            <DialogDescription>They&apos;ll receive a secure link to set their password.</DialogDescription>
          </DialogHeader>
          <form onSubmit={sendInvite} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invite-email">Email address</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="teammate@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <select
                id="invite-role"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as "Super Admin" | "Admin Officer")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Admin Officer">Admin Officer</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setInviteOpen(false)}>Cancel</Button>
              <Button type="submit">Send invite</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
