import { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-surface flex items-center justify-center p-4">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-primary/15 blur-2xl" />
        <div className="absolute left-24 top-1/2 h-32 w-32 rounded-full bg-success/15 blur-xl" />
        <div className="absolute -right-10 top-24 h-56 w-56 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute right-32 bottom-20 h-40 w-40 rounded-full bg-primary-soft blur-xl" />
        <div className="absolute right-1/4 top-1/2 h-24 w-24 rotate-12 bg-primary/10 blur-md" />
      </div>
      <div className="relative z-10 w-full max-w-md">{children}</div>
    </div>
  );
}
