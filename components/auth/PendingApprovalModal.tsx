"use client";

import { Lock } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function PendingApprovalModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-sm p-0 overflow-hidden">
        <div className="p-6 text-center">
          <div className="flex justify-center">
            <div className="h-12 w-12 rounded-full bg-primary-soft flex items-center justify-center">
              <Lock className="h-5 w-5 text-primary" />
            </div>
          </div>
          <p className="text-sm text-foreground mt-4 leading-relaxed">
            Your account is awaiting approval from a Super Admin. You will be
            notified via email once access is granted.
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full py-3 text-sm font-medium border-t border-border text-foreground hover:bg-secondary transition-colors"
        >
          close
        </button>
      </DialogContent>
    </Dialog>
  );
}
