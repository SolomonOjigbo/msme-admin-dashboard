"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Msme } from "@/data/msmes";

export function ArchiveModal({
  msme,
  open,
  onOpenChange,
  onArchived,
}: {
  msme: Msme | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onArchived: (id: string, reason: string) => void;
}) {
  const [reason, setReason] = useState("");
  const [success, setSuccess] = useState(false);

  if (!msme) return null;

  const close = () => {
    setReason("");
    setSuccess(false);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) close();
        else onOpenChange(o);
      }}
    >
      <DialogContent className="max-w-md p-0 gap-0">
        {success ? (
          <div className="p-8 text-center">
            <button
              onClick={close}
              className="absolute top-4 right-4 text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="mx-auto h-16 w-16 rounded-full bg-success-soft grid place-items-center mb-5">
              <Check className="h-8 w-8 text-success" strokeWidth={3} />
            </div>
            <h3 className="text-xl font-bold mb-2">Archive Successful</h3>
            <p className="text-sm text-muted-foreground mb-6">
              The brand has been added to your record list for later actions
            </p>
            <div className="border-t -mx-8 px-8 pt-4">
              <Button variant="ghost" className="w-full" onClick={close}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold">Archive Business</h3>
              <button onClick={close} className="text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Are you sure you want to archive this?
            </p>
            <div className="bg-primary-soft rounded-lg px-4 py-3 flex items-center justify-between mb-5">
              <span className="font-semibold text-sm">{msme.name}</span>
              <span className="text-sm text-muted-foreground">{msme.msmeId}</span>
            </div>
            <label className="text-sm font-semibold block mb-2">
              Reason for Archive
            </label>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <div className="flex justify-end gap-3 mt-5">
              <Button variant="outline" onClick={close}>
                Close
              </Button>
              <Button
                disabled={!reason.trim()}
                onClick={() => {
                  onArchived(msme.id, reason);
                  setSuccess(true);
                }}
              >
                Proceed to Archive
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
