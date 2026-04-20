"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthUser = {
  firstName: string;
  lastName: string;
  email: string;
  role: "Super Admin" | "Admin Officer";
  initials: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  signIn: (email: string) => void;
  signOut: () => void;
};

const STORAGE_KEY = "aquaris.auth.user";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  const signIn = (email: string) => {
    const local = email.split("@")[0] || "admin";
    const [first = "John", last = "Ezekude"] = local.includes(".")
      ? local.split(".")
      : [local, "Ezekude"];
    const u: AuthUser = {
      firstName: first.charAt(0).toUpperCase() + first.slice(1),
      lastName: last.charAt(0).toUpperCase() + last.slice(1),
      email,
      role: "Super Admin",
      initials: (first[0] + (last[0] || first[1] || "")).toUpperCase(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    // Set a cookie so middleware can check auth server-side
    document.cookie = `aquaris.auth=1; path=/; max-age=${60 * 60 * 24 * 7}`;
    setUser(u);
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    // Clear the auth cookie
    document.cookie = "aquaris.auth=; path=/; max-age=0";
    setUser(null);
  };

  if (!hydrated) return null;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
