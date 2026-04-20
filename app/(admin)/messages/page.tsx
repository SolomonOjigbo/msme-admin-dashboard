"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, MoreVertical, Search, ArrowLeft, Upload, Download, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { conversations as initialConversations, type ChatMessage } from "@/data/messages";

export default function MessagesPage() {
  const router = useRouter();
  const [conversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [draft, setDraft] = useState("");
  const [search, setSearch] = useState("");
  const [threadMessages, setThreadMessages] = useState<Record<string, ChatMessage[]>>(
    Object.fromEntries(conversations.map((c) => [c.id, c.messages]))
  );

  const active = conversations.find((c) => c.id === activeId)!;
  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    const msg: ChatMessage = {
      id: String(Date.now()),
      fromMe: false,
      text: draft.trim(),
      time: new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
    };
    setThreadMessages((prev) => ({
      ...prev,
      [activeId]: [...prev[activeId], msg],
    }));
    setDraft("");
  };

  return (
    <>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage conversation related to registered users here
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="font-semibold">
            <Upload className="h-4 w-4" /> Upload MSMEs
          </Button>
          <Button variant="outline" className="font-semibold">
            <Download className="h-4 w-4" /> Export data <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 bg-card rounded-2xl border border-border overflow-hidden min-h-[640px]">
        {/* Conversation list */}
        <aside className="border-r border-border p-4 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <button
              onClick={() => router.back()}
              aria-label="Back"
              className="h-8 w-8 grid place-items-center rounded-md hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <h2 className="text-base font-semibold">Messages</h2>
          </div>
          <div className="relative mb-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary border-0"
            />
          </div>
          <ul className="flex-1 overflow-y-auto space-y-1">
            {filtered.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setActiveId(c.id)}
                  className={cn(
                    "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-colors",
                    activeId === c.id ? "bg-primary-soft" : "hover:bg-muted/60"
                  )}
                >
                  <div className="h-9 w-9 rounded-full bg-secondary grid place-items-center text-xs font-semibold shrink-0">
                    {c.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold truncate">{c.name}</p>
                      <span className="text-[11px] text-muted-foreground shrink-0">{c.lastTime}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-0.5">
                      <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                      {c.unread && (
                        <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center shrink-0">
                          {c.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Thread */}
        <section className="flex flex-col bg-surface min-h-[640px]">
          <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-secondary grid place-items-center text-xs font-semibold">
                  {active.initials}
                </div>
                {active.online && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success border-2 border-card" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold">{active.name}</p>
                <p className="text-xs text-success">{active.online ? "Online" : "Offline"}</p>
              </div>
            </div>
            <button aria-label="Options" className="h-8 w-8 grid place-items-center rounded-md hover:bg-muted">
              <MoreVertical className="h-4 w-4 text-muted-foreground" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {threadMessages[activeId].map((m) => (
              <div key={m.id} className={cn("flex flex-col", m.fromMe ? "items-start" : "items-end")}>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm",
                    m.fromMe
                      ? "bg-primary text-primary-foreground rounded-bl-sm"
                      : "bg-card border border-border text-foreground rounded-br-sm"
                  )}
                >
                  {m.text}
                </div>
                <span className="text-[11px] text-muted-foreground mt-1 px-1">{m.time}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-border bg-card flex items-center gap-2">
            <Input
              placeholder="Type a message..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="bg-secondary border-0"
            />
            <Button type="submit" size="icon" aria-label="Send" className="shrink-0">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </section>
      </div>
    </>
  );
}
