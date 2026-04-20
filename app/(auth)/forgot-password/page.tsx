"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail, X } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: "Email required" });
      return;
    }
    setSent(true);
  };

  return (
    <AuthLayout>
      <div className="rounded-2xl bg-card shadow-xl border border-border p-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Forgot password</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {sent
                ? "Check your inbox for a reset link."
                : "Enter your email and we'll send a reset link."}
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

        {sent ? (
          <div className="mt-6 space-y-4">
            <div className="rounded-xl bg-success-soft border border-success/20 p-4 flex gap-3">
              <Mail className="h-5 w-5 text-success shrink-0 mt-0.5" />
              <p className="text-sm text-foreground">
                If an account exists for <span className="font-semibold">{email}</span>, you&apos;ll
                receive a password reset link shortly.
              </p>
            </div>
            <Button
              variant="outline"
              className="w-full h-11"
              onClick={() => router.push("/sign-in")}
            >
              <ArrowLeft className="h-4 w-4" /> Back to sign in
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email address</Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-11 font-semibold">
              Send reset link <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
}
