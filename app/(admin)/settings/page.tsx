"use client";

import { useState } from "react";
import {
  ArrowLeft, Camera, Upload, ChevronRight, ChevronDown,
  User, Bell, Shield, MessageSquare, AlertCircle, UsersRound,
  Building2, Database, Check, Eye, EyeOff,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/components/auth/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type SectionId = "profile" | "tickets" | "messaging" | "notification" | "security" | "team" | "msmes" | "data";

interface SectionDef {
  id: SectionId;
  title: string;
  description: string;
  icon: React.ElementType;
  group: "Super Admin" | "Admin Officer";
}

const sections: SectionDef[] = [
  { id: "profile", title: "Profile settings", description: "Manage your personal account details.", icon: User, group: "Super Admin" },
  { id: "tickets", title: "Tickets", description: "Configure how tickets are created and managed.", icon: AlertCircle, group: "Super Admin" },
  { id: "messaging", title: "Messaging", description: "Control how chat works for users and admins.", icon: MessageSquare, group: "Super Admin" },
  { id: "notification", title: "Notification", description: "Choose how you receive updates.", icon: Bell, group: "Super Admin" },
  { id: "security", title: "Security", description: "Manage your account security.", icon: Shield, group: "Super Admin" },
  { id: "team", title: "Team Management", description: "Manage team members, roles, and access to the system.", icon: UsersRound, group: "Admin Officer" },
  { id: "msmes", title: "MSMEs Management", description: "View, update, and manage all MSME records within the platform.", icon: Building2, group: "Admin Officer" },
  { id: "data", title: "Data Operation", description: "Upload bulk data and export records for reporting and analysis.", icon: Database, group: "Admin Officer" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();
  const [openSection, setOpenSection] = useState<SectionId | null>(null);

  const toggle = (id: SectionId) => setOpenSection((cur) => (cur === id ? null : id));
  const superAdminSections = sections.filter((s) => s.group === "Super Admin");
  const adminOfficerSections = sections.filter((s) => s.group === "Admin Officer");

  const renderGroup = (label: string, items: SectionDef[]) => (
    <div className="mb-8">
      <h2 className="text-base font-bold mb-1">{label}</h2>
      <p className="text-xs text-muted-foreground mb-3">Roles and permission preference</p>
      <div className="space-y-3">
        {items.map((s) => (
          <div key={s.id} className="bg-card border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggle(s.id)}
              className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-primary-soft grid place-items-center shrink-0">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.description}</p>
              </div>
              {openSection === s.id ? (
                <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
              ) : (
                <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
              )}
            </button>
            {openSection === s.id && (
              <div className="border-t border-border p-5 bg-surface/50">
                <SectionContent id={s.id} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            aria-label="Back"
            className="h-9 w-9 grid place-items-center rounded-md hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-2xl font-bold tracking-tight">Settings & Preferences</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={() => toast({ title: "Changes saved" })}>Save Changes</Button>
        </div>
      </div>

      <div className="flex items-center gap-5 mb-8 flex-wrap">
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-primary-soft grid place-items-center text-primary text-2xl font-bold">
            {user?.initials ?? "JE"}
          </div>
          <button
            aria-label="Change photo"
            className="absolute bottom-0 right-0 h-7 w-7 rounded-full bg-card border border-border grid place-items-center hover:bg-muted"
          >
            <Camera className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg font-bold">
              {user ? `${user.firstName} ${user.lastName}` : "John Ezekude"}
            </h2>
            <Badge variant="secondary" className="bg-primary-soft text-primary hover:bg-primary-soft">
              {user?.role ?? "Super Admin"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Upload a new profile photo. JPG, PNG or GIF. Max size 5MB.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4" /> Upload Photo
        </Button>
      </div>

      {renderGroup("Super Admin", superAdminSections)}
      {renderGroup("Admin Officer", adminOfficerSections)}
    </>
  );
}

function SectionContent({ id }: { id: SectionId }) {
  switch (id) {
    case "profile": return <ProfileSection />;
    case "tickets":
      return <ToggleList items={[
        { title: "Auto-assign tickets", description: "Automatically assign new tickets to available officers." },
        { title: "Allow user replies", description: "Let users reply to closed tickets within 7 days." },
        { title: "Notify on new ticket", description: "Send a notification when a ticket is created." },
      ]} />;
    case "messaging":
      return <ToggleList items={[
        { title: "Enable chat", description: "Allow users to start conversations with your team." },
        { title: "Offline message", description: "Show a message when chat is unavailable." },
        { title: "Show resolved tickets in list", description: "Display resolved tickets alongside active ones." },
        { title: "New message alerts", description: "Notify admins when a new message is received." },
      ]} />;
    case "notification":
      return <ToggleList items={[
        { title: "New message", description: "Get notified when a new message is received." },
        { title: "Ticket created", description: "Get notified when a new ticket is created." },
        { title: "Ticket assigned", description: "Get notified when a ticket is assigned to you." },
        { title: "Email notification", description: "Receive updates via email." },
        { title: "New message (email)", description: "Receive an email when a new message is received." },
        { title: "Ticket updates (email)", description: "Receive an email when a ticket is updated." },
      ]} />;
    case "security": return <SecuritySection />;
    case "team":
      return <ToggleList defaults={[true, true, false, false, false]} items={[
        { title: "Invite Members", description: "Send invitations to add new users to the system." },
        { title: "Activate requests", description: "Approve pending users and grant them access." },
        { title: "Edit user roles", description: "Modify roles assigned to team members." },
        { title: "Suspend members", description: "Temporarily disable access for a team member." },
        { title: "Remove members", description: "Permanently remove members from the team." },
      ]} />;
    case "msmes":
      return <ToggleList defaults={[true, true, false, false, false]} items={[
        { title: "View MSMEs", description: "Access and view all MSME records." },
        { title: "Add MSMEs", description: "Create new MSME entries." },
        { title: "Edit MSMEs", description: "Update and manage MSME information." },
        { title: "Archive MSMEs", description: "Remove MSMEs from active view without deleting them." },
        { title: "Delete MSMEs", description: "Permanently remove MSME records from the system." },
      ]} />;
    case "data":
      return <ToggleList defaults={[true, true]} items={[
        { title: "Upload data", description: "Import bulk data into the system." },
        { title: "Download data", description: "Download data for reporting purposes." },
      ]} />;
  }
}

function ToggleList({ items, defaults }: { items: { title: string; description: string }[]; defaults?: boolean[] }) {
  const [states, setStates] = useState<boolean[]>(items.map((_, i) => defaults?.[i] ?? false));
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={item.title + i} className="flex items-center justify-between gap-4 px-4 py-3 rounded-lg bg-secondary/60">
          <div className="min-w-0">
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
          </div>
          <Switch
            checked={states[i]}
            onCheckedChange={(v) => setStates((s) => s.map((x, idx) => (idx === i ? v : x)))}
          />
        </div>
      ))}
    </div>
  );
}

function ProfileSection() {
  const { user } = useAuth();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>First name</Label>
        <Input defaultValue={user?.firstName ?? "John"} />
      </div>
      <div className="space-y-2">
        <Label>Last name</Label>
        <Input defaultValue={user?.lastName ?? "Ezekude"} />
      </div>
      <div className="space-y-2">
        <Label>Email address</Label>
        <Input defaultValue={user?.email ?? "john.ezekude@gmail.com"} disabled />
      </div>
      <div className="space-y-2">
        <Label>Role</Label>
        <Input defaultValue={user?.role ?? "Admin Officer"} disabled />
      </div>
    </div>
  );
}

function SecuritySection() {
  const { toast } = useToast();
  const [show, setShow] = useState({ current: false, next: false, confirm: false });
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });
  const [success, setSuccess] = useState(false);

  const checks = [
    { label: "At least 8 characters", ok: pwd.next.length >= 8 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(pwd.next) },
    { label: "One number", ok: /\d/.test(pwd.next) },
    { label: "One special character", ok: /[^A-Za-z0-9]/.test(pwd.next) },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pwd.current || !pwd.next || pwd.next !== pwd.confirm) {
      toast({ title: "Check your inputs", description: "Passwords must match and meet all requirements." });
      return;
    }
    if (!checks.every((c) => c.ok)) {
      toast({ title: "Weak password", description: "Meet all requirements to continue." });
      return;
    }
    setSuccess(true);
    setPwd({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-secondary/60 p-5">
        <h3 className="text-sm font-semibold">Change password</h3>
        <p className="text-xs text-muted-foreground mt-0.5 mb-4">Update your account password to keep your account secure.</p>
        <div className="rounded-lg bg-success-soft p-4 mb-4">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {checks.map((c) => (
              <li key={c.label} className={cn("flex items-center gap-2 text-xs font-medium", c.ok ? "text-success" : "text-muted-foreground")}>
                <span className={cn("h-4 w-4 rounded-full grid place-items-center", c.ok ? "bg-success text-success-foreground" : "bg-muted")}>
                  <Check className="h-3 w-3" />
                </span>
                {c.label}
              </li>
            ))}
          </ul>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PasswordField label="Current password" value={pwd.current} onChange={(v) => setPwd((p) => ({ ...p, current: v }))} show={show.current} onToggle={() => setShow((s) => ({ ...s, current: !s.current }))} />
          <PasswordField label="New password" value={pwd.next} onChange={(v) => setPwd((p) => ({ ...p, next: v }))} show={show.next} onToggle={() => setShow((s) => ({ ...s, next: !s.next }))} />
          <PasswordField label="Confirm password" value={pwd.confirm} onChange={(v) => setPwd((p) => ({ ...p, confirm: v }))} show={show.confirm} onToggle={() => setShow((s) => ({ ...s, confirm: !s.confirm }))} />
          <div className="flex items-end justify-end">
            <Button type="submit" variant="outline" className="border-primary text-primary hover:bg-primary-soft">
              Update password <Check className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      <div className="rounded-xl bg-secondary/60 p-5 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <h3 className="text-sm font-semibold">Session timeout</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Automatically log out after a period of inactivity.</p>
        </div>
        <div className="space-y-2">
          <Label>Select timeout</Label>
          <Select defaultValue="30">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="15">15 minutes</SelectItem>
              <SelectItem value="30">30 minutes</SelectItem>
              <SelectItem value="60">1 hour</SelectItem>
              <SelectItem value="240">4 hours</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Dialog open={success} onOpenChange={setSuccess}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <div className="mx-auto h-16 w-16 rounded-full bg-success-soft grid place-items-center mb-2">
              <Check className="h-7 w-7 text-success" />
            </div>
            <DialogTitle className="text-center">Password updated</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="w-full" onClick={() => setSuccess(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function PasswordField({ label, value, onChange, show, onToggle }: { label: string; value: string; onChange: (v: string) => void; show: boolean; onToggle: () => void }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="relative">
        <Input type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)} placeholder="••••••••" className="pr-10 bg-card" />
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={show ? "Hide" : "Show"}>
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
