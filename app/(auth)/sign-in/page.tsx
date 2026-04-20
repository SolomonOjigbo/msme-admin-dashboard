"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Info, X } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { PendingApprovalModal } from "@/components/auth/PendingApprovalModal";
import { useAuth } from "@/components/auth/AuthContext";

type Tab = "signin" | "invite";

export default function SignInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("signin");
  const [showPwd, setShowPwd] = useState(false);
  const [pendingOpen, setPendingOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pwd) {
      toast({ title: "Missing fields", description: "Email and password required." });
      return;
    }
    if (email.includes("pending")) {
      setPendingOpen(true);
      return;
    }
    signIn(email);
    toast({ title: "Welcome back", description: "Signed in successfully." });
    router.push("/");
  };

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteRole) {
      toast({ title: "Missing fields", description: "Email and role required." });
      return;
    }
    toast({ title: "Invitation sent", description: `Invite emailed to ${inviteEmail}.` });
    setInviteEmail("");
    setInviteRole("");
  };

  return (
    <AuthLayout>
      <div className="rounded-2xl bg-card shadow-xl border border-border p-8">
        <div className="flex justify-end">
          <button
            onClick={() => router.push("/")}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-1 rounded-lg bg-secondary p-1">
          {(["signin", "invite"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "py-2 text-sm font-medium rounded-md transition-colors",
                tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              )}
            >
              {t === "signin" ? "Sign In" : "Invite a team member"}
            </button>
          ))}
        </div>

        {tab === "signin" ? (
          <form onSubmit={handleSignIn} className="mt-6 space-y-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome to the Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
            </div>

            <Button type="button" variant="outline" className="w-full h-11 font-medium">
              <GoogleIcon />
              Continue with Google
            </Button>

            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <span className="relative bg-card px-3 text-xs text-muted-foreground">
                or sign in with email
              </span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-info hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter your password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  autoComplete="current-password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-11 font-semibold">
              Sign In <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="rounded-lg bg-primary-soft border border-primary/20 p-3 flex gap-2">
              <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-semibold text-primary">Access notice</p>
                <p className="text-primary/90 mt-0.5">
                  This platform is restricted to Super Admins and authorized team members only.
                  Access is granted through official invitations sent by system administrators.
                </p>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleInvite} className="mt-6 space-y-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Invite a team member</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Send an invitation to join the admin team.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-email">Email address</Label>
              <Input
                id="invite-email"
                type="email"
                placeholder="teammate@example.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="invite-role">Role</Label>
              <select
                id="invite-role"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Select a role…</option>
                <option value="super-admin">Super Admin</option>
                <option value="admin-officer">Admin Officer</option>
              </select>
            </div>

            <Button type="submit" className="w-full h-11 font-semibold">
              Send invitation <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Invitees will receive a secure link to set their password.
            </p>
          </form>
        )}
      </div>

      <PendingApprovalModal open={pendingOpen} onClose={() => setPendingOpen(false)} />
    </AuthLayout>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 mr-2">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4-5.5 4-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.4 14.6 2.4 12 2.4 6.7 2.4 2.4 6.7 2.4 12s4.3 9.6 9.6 9.6c5.5 0 9.2-3.9 9.2-9.4 0-.6-.1-1.1-.2-1.6H12z" />
    </svg>
  );
}
