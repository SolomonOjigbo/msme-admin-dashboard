"use client";

import { Store, UserRound, AlertCircle, CheckCircle2, Upload, Download, ChevronDown } from "lucide-react";
import { StatCard } from "@/components/overview/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const insights = [
  { label: "Top category", value: "Leather goods" },
  { label: "Most active cluster", value: "Aba leather cluster" },
  { label: "Average production capacity", value: "500 units/month" },
];

const activity = [
  { title: "New verified MSMEs added:", highlight: "Adeyemi Textiles Ltd", by: "Eric Thomas", time: "2 hours ago" },
  { title: "CSV uploaded:", highlight: "45 new verified business", by: "Eric Thomas +6 others", time: "5 minutes ago" },
  { title: "New ticket raised: #Fraud account", pending: true, by: "Ola Aina", handled: true, time: "3 weeks ago" },
  { title: "5 MSMEs added from Nnewi North", by: "Eric Thomas +6 others", time: "1 month ago" },
  { title: "2 new registered users", time: "3 hours ago" },
];

export default function OverviewPage() {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="gap-2 shadow-sm">
            <Upload className="h-4 w-4" /> Upload MSMEs
          </Button>
          <Button variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary-soft hover:text-primary">
            <Download className="h-4 w-4" /> Export data
            <span className="mx-1 h-4 w-px bg-primary/30" />
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total MSMEs" value="124" delta="2 new this month" icon={Store} iconClassName="bg-warning/15 text-warning" />
        <StatCard label="Total No. of Registered users" value="30" delta="18%" icon={UserRound} iconClassName="bg-info-soft text-info" />
        <StatCard label="Pending tickets" value="30" delta="18%" icon={AlertCircle} iconClassName="bg-destructive-soft text-destructive" />
        <StatCard label="Resolved tickets" value="23" delta="12%" icon={CheckCircle2} iconClassName="bg-success-soft text-success" />
      </div>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Directory insight</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((i) => (
            <div key={i.label} className="bg-card border rounded-xl p-5">
              <div className="text-xs text-muted-foreground mb-2">{i.label}</div>
              <div className="text-base font-semibold">{i.value}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>
        <div className="bg-card border rounded-xl divide-y">
          {activity.map((a, idx) => (
            <div key={idx} className="flex items-start gap-3 px-5 py-4">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-success shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-sm">
                  <span className="font-medium">{a.title}</span>{" "}
                  {a.highlight && <span className="text-info font-medium">{a.highlight}</span>}
                  {a.pending && (
                    <Badge variant="secondary" className="ml-2 bg-info-soft text-info hover:bg-info-soft">
                      Pending
                    </Badge>
                  )}
                </div>
                {a.by && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {a.handled ? "Handled by" : "Added by"}{" "}
                    <span className="text-foreground/80">· {a.by}</span>
                  </div>
                )}
              </div>
              {a.time && <div className="text-xs text-muted-foreground whitespace-nowrap">{a.time}</div>}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
