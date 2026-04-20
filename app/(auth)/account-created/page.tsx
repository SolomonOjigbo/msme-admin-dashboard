"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, PartyPopper } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AccountCard } from "@/components/auth/AccountCard";
import { Button } from "@/components/ui/button";

export default function AccountCreatedPage() {
  const router = useRouter();
  return (
    <AuthLayout>
      <div className="rounded-2xl bg-card shadow-xl border border-border p-8 text-center">
        <div className="flex justify-center">
          <div className="h-14 w-14 rounded-full bg-primary-soft flex items-center justify-center">
            <PartyPopper className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight">Account Created</h1>
        <p className="text-sm text-muted-foreground mt-2 px-2">
          Your account has been created successfully. Your access request is now pending approval
          from a Super Admin.
        </p>

        <div className="mt-6 text-left">
          <AccountCard
            name="Amara Nwosu"
            email="amaranwosu1@gmail.com"
            role="Admin officer"
            initials="AN"
            status="Pending"
          />
        </div>

        <Button
          onClick={() => router.push("/sign-in")}
          className="w-full h-11 font-semibold mt-6"
        >
          Proceed to login <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </AuthLayout>
  );
}
