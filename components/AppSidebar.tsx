"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Store, Users, MessageSquare, UsersRound, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Overview", url: "/", icon: LayoutGrid },
  { title: "MSMEs Management", url: "/msmes", icon: Store },
  { title: "Users and Tickets", url: "/users", icon: Users },
  { title: "Messages", url: "/messages", icon: MessageSquare, badge: 5 },
  { title: "Team management", url: "/team", icon: UsersRound },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (url: string) => {
    if (url === "/") return pathname === "/";
    return pathname.startsWith(url);
  };

  return (
    <aside className="w-60 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="flex h-16 items-center gap-2 px-5 border-b border-sidebar-border">
        {/* Flame logo SVG */}
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2C14 2 8 8 8 14C8 17.3137 10.6863 20 14 20C17.3137 20 20 17.3137 20 14C20 11 18 9 18 9C18 9 17 13 14 13C14 13 16 10 14 2Z" fill="#FF7F3F"/>
          <path d="M14 20C14 20 11 22 11 24C11 25.6569 12.3431 27 14 27C15.6569 27 17 25.6569 17 24C17 22 14 20 14 20Z" fill="#FF7F3F" opacity="0.6"/>
        </svg>
        <span className="text-lg font-bold tracking-tight">Aquaris</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {items.map((item) => {
          const active = isActive(item.url);
          return (
            <Link
              key={item.title}
              href={item.url}
              className={cn(
                "flex items-center gap-3 px-3 h-11 rounded-lg text-sm transition-colors",
                active
                  ? "bg-primary-soft text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              <span className="flex-1 truncate">{item.title}</span>
              {item.badge !== undefined && (
                <span className="rounded-full bg-primary-soft text-primary text-xs font-semibold px-2 py-0.5">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
