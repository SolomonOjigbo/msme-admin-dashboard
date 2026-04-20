"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Eye, EyeOff, X } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AccountCard } from "@/components/auth/AccountCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function SetPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");

  const checks = useMemo(
    () => ({
      length: pwd.length >= 8,
      upper: /[A-Z]/.test(pwd),
      number: /\d/.test(pwd),
      special: /[^A-Za-z0-9]/.test(pwd),
    }),
    [pwd]
  );

  const allValid =
    Object.values(checks).every(Boolean) && pwd === confirm && confirm.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allValid) {
      toast({ title: "Cannot set password", description: "Check requirements and match." });
      return;
    }
    router.push("/account-created");
  };

  return (
    <AuthLayout>
      <div className="rounded-2xl bg-card shadow-xl border border-border p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Set your password</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Create a secure way to complete your setup
            </p>
          </div>
          <button
            onClick={() => router.push("/sign-in")}
            className="text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <AccountCard
            name="Amara Nwosu"
            email="amaranwosu1@gmail.com"
            role="Admin officer"
            initials="AN"
          />

          <div className="space-y-2">
            <Label htmlFor="new-pwd">New password</Label>
            <div className="relative">
              <Input
                id="new-pwd"
                type={show1 ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShow1((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show1 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-pwd">Confirm password</Label>
            <div className="relative">
              <Input
                id="confirm-pwd"
                type={show2 ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShow2((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {show2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="rounded-lg bg-success-soft border border-success/20 p-3 space-y-1.5">
            <Requirement ok={checks.length} label="At least 8 characters" />
            <Requirement ok={checks.upper} label="One uppercase letter" />
            <Requirement ok={checks.number} label="One number" />
            <Requirement ok={checks.special} label="One special character" />
          </div>

          <Button type="submit" className="w-full h-11 font-semibold" disabled={!allValid}>
            Set password <ArrowRight className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}

function Requirement({ ok, label }: { ok: boolean; label: string }) {
  return (
    <div className={cn("flex items-center gap-2 text-xs", ok ? "text-success" : "text-muted-foreground")}>
      <CheckCircle2 className={cn("h-3.5 w-3.5", ok ? "text-success" : "text-muted-foreground/60")} />
      <span>{label}</span>
    </div>
  );
}
