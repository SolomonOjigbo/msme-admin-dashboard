"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, ChevronDown, LogOut, Settings as SettingsIcon, User } from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/components/auth/AuthContext";
import { LogoutModal } from "@/components/auth/LogoutModal";
import { useToast } from "@/components/ui/use-toast";

export function TopBar() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleConfirmLogout = () => {
    signOut();
    setLogoutOpen(false);
    toast({ title: "Signed out", description: "You have been signed out." });
    router.push("/sign-in");
  };

  return (
    <header className="h-16 bg-background border-b flex items-center justify-between px-6">
      <div className="flex-1" />
      <div className="flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-muted transition"
        >
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary" />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full bg-primary-soft px-3 py-2 text-sm font-medium text-foreground hover:bg-primary-soft/80 transition">
              <User className="h-4 w-4" />
              {user ? user.firstName : "Admin"}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {user && (
              <>
                <div className="px-2 py-2">
                  <p className="text-sm font-semibold leading-tight">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <SettingsIcon className="h-4 w-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => setLogoutOpen(true)}
            >
              <LogOut className="h-4 w-4 mr-2" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </header>
  );
}
