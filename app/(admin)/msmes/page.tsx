"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, Upload, Download, ChevronDown, MoreVertical, BadgeCheck, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/msmes/StatusBadge";
import { ArchiveModal } from "@/components/msmes/ArchiveModal";
import { UploadMsmesModal } from "@/components/msmes/UploadMsmesModal";
import { msmes as initialMsmes, type Msme, type MsmeStatus } from "@/data/msmes";
import { cn } from "@/lib/utils";

type FilterType = "All" | MsmeStatus;

export default function MsmesManagementPage() {
  const [data, setData] = useState<Msme[]>(initialMsmes);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterType>("All");
  const [target, setTarget] = useState<Msme | null>(null);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  const filtered = useMemo(() => {
    return data.filter((m) => {
      if (filter !== "All" && m.status !== filter) return false;
      if (!query) return true;
      const q = query.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.msmeId.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q)
      );
    });
  }, [data, query, filter]);

  const archive = (id: string, reason: string) => {
    setData((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "Archived" as MsmeStatus, archiveReason: reason } : m))
    );
  };

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">MSMEs Management</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gap-2 shadow-sm" onClick={() => setUploadOpen(true)}>
            <Upload className="h-4 w-4" /> Upload MSMEs
          </Button>
          <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary-soft hover:text-primary">
            <Download className="h-4 w-4" /> Export data
            <span className="mx-1 h-4 w-px bg-primary/30" />
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="relative flex-1 min-w-[280px] max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Business name, ID, Location"
            className="pl-10 bg-muted/60 border-transparent"
          />
        </div>
        <Select value={filter} onValueChange={(v) => setFilter(v as FilterType)}>
          <SelectTrigger className="w-[140px]">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(["All", "Active", "Archived", "Pending"] as FilterType[]).map((f) => (
              <SelectItem key={f} value={f}>{f}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-left">
              {["", "Business name", "MSME ID", "Category", "Location (cluster)", "Phone", "Status", "Capacity", ""].map((h, i) => (
                <th key={i} className="px-4 py-3 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m) => (
              <tr key={m.id} className="border-t hover:bg-muted/30 transition">
                <td className="px-4 py-3"><Checkbox /></td>
                <td className="px-4 py-3">
                  <Link
                    href={`/msmes/${m.id}`}
                    className="flex items-center gap-2 font-medium text-foreground hover:text-primary"
                  >
                    <BadgeCheck className={cn("h-4 w-4", m.verified ? "text-success" : "text-muted-foreground/40")} />
                    <span className="truncate max-w-[160px]">{m.name}</span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{m.msmeId.slice(0, 7)}…</td>
                <td className="px-4 py-3 text-sm">{m.category.length > 9 ? m.category.slice(0, 9) + "…" : m.category}</td>
                <td className="px-4 py-3 text-sm">{m.location}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{m.phone.slice(0, 8)}…</td>
                <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                <td className="px-4 py-3 text-sm">{m.capacity}</td>
                <td className="px-4 py-3 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="p-1 rounded hover:bg-muted">
                      <MoreVertical className="h-4 w-4 text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/msmes/${m.id}`}>View details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      {m.status === "Active" ? (
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => { setTarget(m); setArchiveOpen(true); }}
                        >
                          Archive
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-primary">Restore</DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-12 text-sm text-muted-foreground">
                  No MSMEs match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t text-xs text-muted-foreground">
          <div>Items per page: 3 ▾</div>
          <div>1 ▾ of 100 pages ‹ ›</div>
        </div>
      </div>

      <ArchiveModal msme={target} open={archiveOpen} onOpenChange={setArchiveOpen} onArchived={archive} />
      <UploadMsmesModal open={uploadOpen} onOpenChange={setUploadOpen} />
    </>
  );
}
