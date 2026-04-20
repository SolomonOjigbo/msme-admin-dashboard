"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Phone, Mail, MapPin, Globe, Star, BadgeCheck, Shirt,
  Award, Calendar, Clock, Trash2, FileText, Download, ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArchiveModal } from "@/components/msmes/ArchiveModal";
import { getMsme, type Msme } from "@/data/msmes";
import { cn } from "@/lib/utils";

function InfoTile({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="bg-muted/50 rounded-lg p-3 flex items-start gap-3">
      <div className="h-8 w-8 rounded-md bg-primary-soft text-primary grid place-items-center shrink-0">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold truncate">{value}</div>
      </div>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, link }: { icon: React.ElementType; label: string; value: string; link?: boolean }) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="h-9 w-9 rounded-full bg-primary-soft grid place-items-center shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{label}</div>
        <div className="text-sm font-medium truncate flex items-center gap-1">
          {value}
          {link && <ExternalLink className="h-3 w-3 text-muted-foreground" />}
        </div>
      </div>
    </div>
  );
}

function StarRow({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} className={cn("h-3.5 w-3.5", i < Math.round(value) ? "fill-warning text-warning" : "text-muted-foreground/30")} />
      ))}
    </div>
  );
}

export default function MsmeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const msme = getMsme(id ?? "");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [local, setLocal] = useState<Msme | undefined>(msme);

  if (!local) {
    return (
      <p className="text-muted-foreground">
        MSME not found.{" "}
        <Link className="text-primary underline" href="/msmes">Back to list</Link>
      </p>
    );
  }

  const buckets = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: local.reviews.filter((r) => r.rating === s).length,
  }));
  const avg = local.reviews.length
    ? local.reviews.reduce((a, r) => a + r.rating, 0) / local.reviews.length
    : 0;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <ArrowLeft className="h-5 w-5" /> MSMEs details page
        </button>
        <div className="flex gap-3">
          <Button>Edit profile</Button>
          <Button variant="outline" onClick={() => setArchiveOpen(true)}>Archive</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <h2 className="text-2xl font-bold">{local.name}</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success px-2.5 py-1 text-xs font-medium text-success-foreground">
                <BadgeCheck className="h-3.5 w-3.5" /> Verified Business
              </span>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-semibold">{local.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">({local.reviewsCount})</span>
              </div>
            </div>

            <Tabs defaultValue="overview" className="mt-5">
              <TabsList className="bg-transparent border-b border-border w-full justify-start rounded-none h-auto p-0 gap-6">
                {["overview", "reviews"].map((t) => (
                  <TabsTrigger
                    key={t}
                    value={t}
                    className="capitalize rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 font-semibold"
                  >
                    {t}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="overview" className="pt-5">
                <p className="text-sm text-foreground/80">{local.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {local.services.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {s}
                    </span>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="pt-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-5 border-b">
                  <div>
                    <div className="text-5xl font-bold">{avg.toFixed(1)}</div>
                    <StarRow value={avg} />
                    <p className="text-xs text-muted-foreground mt-1">Based on {local.reviews.length} reviews</p>
                  </div>
                  <div className="space-y-1.5">
                    {buckets.map((b) => (
                      <div key={b.star} className="flex items-center gap-3 text-xs">
                        <span className="flex items-center gap-1 w-6">
                          {b.star}<Star className="h-3 w-3 fill-warning text-warning" />
                        </span>
                        <Progress value={local.reviews.length ? (b.count / local.reviews.length) * 100 : 0} className="h-2 flex-1" />
                        <span className="w-4 text-right text-muted-foreground">{b.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="mt-5">Write a Review</Button>
                <div className="mt-5 space-y-3">
                  {local.reviews.map((r) => (
                    <div key={r.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-warning/20 text-warning font-semibold grid place-items-center text-xs">
                            {r.initials}
                          </div>
                          <div>
                            <div className="text-sm font-semibold">{r.author}</div>
                            <div className="text-xs text-muted-foreground">{r.date}</div>
                          </div>
                        </div>
                        <StarRow value={r.rating} />
                      </div>
                      <p className="text-sm text-foreground/80 mt-3">{r.text}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-muted-foreground">
                        <span>👍 Helpful (0)</span>
                        <Trash2 className="h-4 w-4" />
                      </div>
                    </div>
                  ))}
                  {local.reviews.length === 0 && (
                    <p className="text-sm text-muted-foreground">No reviews yet.</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold mb-4">Business Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <InfoTile icon={Shirt} label="Category" value={local.category} />
              <InfoTile icon={Award} label="Capacity" value={local.capacityFull} />
              <InfoTile icon={Calendar} label="Established" value={local.established} />
              <InfoTile icon={Clock} label="Hours" value={local.hours} />
              <InfoTile icon={Clock} label="Hours" value={local.hours} />
              <InfoTile icon={BadgeCheck} label="Status" value={local.verified ? "Verified Business" : "Unverified"} />
            </div>
            {local.verified && (
              <div className="mt-4 flex items-start gap-2 text-sm">
                <BadgeCheck className="h-4 w-4 text-success mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold">Verified Business</div>
                  <p className="text-muted-foreground">
                    A new collection account will be automatically generated for this outlet using your business name and outlet name.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold mb-4">Attachment</h3>
            {local.attachments.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No document available</p>
              </div>
            ) : (
              <div className="space-y-3">
                {local.attachments.map((a) => (
                  <div key={a.name} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded bg-muted grid place-items-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">{a.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Date uploaded : {a.date} | {a.size}
                      </div>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground cursor-pointer" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold mb-3">Contact Business</h3>
            <ContactRow icon={Phone} label="Phone" value="+234 802 345 6789" />
            <ContactRow icon={Mail} label="Email" value={local.email} />
            <ContactRow icon={MapPin} label="Address" value={local.address} link />
            <ContactRow icon={Globe} label="Website" value={local.website} link />
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold mb-3 text-center">Brand information</h3>
            <p className="text-xs text-muted-foreground mb-2">Brand logo</p>
            <img
              src={local.brandImage}
              alt={local.name}
              width={512}
              height={176}
              className="w-full h-44 object-cover rounded-lg"
            />
          </div>

          <div className="bg-card border rounded-xl p-6">
            <h3 className="font-bold mb-4 text-center">Activity log</h3>
            <div className="space-y-3">
              {[
                { label: "Added by", value: local.addedBy },
                { label: "Date added", value: local.dateAdded },
                { label: "Archive reason", value: local.archiveReason ?? "---" },
              ].map((item) => (
                <div key={item.label} className="bg-muted/50 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</div>
                  <div className="text-sm font-semibold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ArchiveModal
        msme={local}
        open={archiveOpen}
        onOpenChange={setArchiveOpen}
        onArchived={(_, reason) => setLocal({ ...local, status: "Archived", archiveReason: reason })}
      />
    </>
  );
}
