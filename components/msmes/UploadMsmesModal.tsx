"use client";

import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FileText, ImageIcon, RefreshCw, Trash2, Upload, X, Plus } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  date: string;
}

const today = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function FileRow({
  file,
  idx,
  onRemove,
  numbered,
}: {
  file: UploadedFile;
  idx?: number;
  onRemove: () => void;
  numbered?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      {numbered && (
        <span className="text-sm text-muted-foreground w-4">{(idx ?? 0) + 1}.</span>
      )}
      <div className="h-10 w-10 rounded bg-muted grid place-items-center shrink-0">
        <FileText className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate">{file.name}</div>
        <div className="text-xs text-muted-foreground">
          Date uploaded : {file.date}{" "}
          <span className="mx-1">|</span>{" "}
          {(file.size / 1024).toFixed(0)}KB
        </div>
      </div>
      <button className="flex items-center gap-1.5 text-sm font-medium underline underline-offset-4 text-foreground/80 hover:text-foreground">
        <RefreshCw className="h-4 w-4" /> Change file
      </button>
      <span className="text-border">|</span>
      <button
        onClick={onRemove}
        className="flex items-center gap-1.5 text-sm font-medium text-destructive underline underline-offset-4"
      >
        <Trash2 className="h-4 w-4" /> Delete file
      </button>
    </div>
  );
}

function DropZone({
  onDrop,
  accept,
  label,
  sublabel,
  icon,
}: {
  onDrop: (files: File[]) => void;
  accept: Record<string, string[]>;
  label: string;
  sublabel: string;
  icon: "doc" | "image";
}) {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
  });
  return (
    <div
      {...getRootProps()}
      className="bg-muted/60 rounded-lg py-10 px-6 text-center cursor-default"
    >
      <input {...getInputProps()} />
      <div className="mx-auto h-14 w-14 rounded-full bg-success-soft text-success grid place-items-center mb-4">
        {icon === "doc" ? (
          <FileText className="h-6 w-6" />
        ) : (
          <ImageIcon className="h-6 w-6" />
        )}
      </div>
      <p className="text-sm">
        {label}{" "}
        <button
          type="button"
          onClick={open}
          className="text-primary font-semibold underline underline-offset-4"
        >
          Browse
        </button>
      </p>
      <p className="text-xs text-muted-foreground mt-2">{sublabel}</p>
      <p className="text-xs font-semibold mt-1">Max file size : 5MB</p>
    </div>
  );
}

export function UploadMsmesModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [tab, setTab] = useState<"bulk" | "single">("bulk");
  const [bulkFiles, setBulkFiles] = useState<UploadedFile[]>([]);
  const [singleFile, setSingleFile] = useState<UploadedFile | null>(null);
  const [logo, setLogo] = useState<{ url: string; file: UploadedFile } | null>(null);

  const handleBulk = (accepted: File[]) => {
    setBulkFiles((prev) => [
      ...prev,
      ...accepted.map((f) => ({
        id: crypto.randomUUID(),
        name: f.name,
        size: f.size,
        date: today(),
      })),
    ]);
  };

  const handleSingle = (accepted: File[]) => {
    const f = accepted[0];
    if (f)
      setSingleFile({
        id: crypto.randomUUID(),
        name: f.name,
        size: f.size,
        date: today(),
      });
  };

  const handleLogo = (accepted: File[]) => {
    const f = accepted[0];
    if (f)
      setLogo({
        url: URL.createObjectURL(f),
        file: { id: crypto.randomUUID(), name: f.name, size: f.size, date: today() },
      });
  };

  const canSubmit = tab === "bulk" ? bulkFiles.length > 0 : singleFile && logo;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 gap-0 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-2xl font-bold">Upload MSMEs</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6">
          <div className="grid grid-cols-2 gap-1 bg-muted rounded-lg p-1">
            {(["bulk", "single"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "py-2.5 rounded-md text-sm font-semibold transition",
                  tab === t ? "bg-card shadow-sm" : "text-muted-foreground"
                )}
              >
                {t === "bulk" ? "Bulk upload" : "Form upload (single)"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {tab === "bulk" ? (
            <>
              <DropZone
                onDrop={handleBulk}
                accept={{
                  "text/csv": [".csv"],
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                }}
                label="Drag & drop your single file here or"
                sublabel="Accepted formats. xlsx, CSV"
                icon="doc"
              />
              {bulkFiles.length > 0 && (
                <div className="mt-5 border rounded-lg overflow-hidden">
                  <div className="bg-muted px-4 py-2.5 text-sm font-semibold">
                    Files added [{bulkFiles.length}]
                  </div>
                  <div className="px-4 divide-y">
                    {bulkFiles.map((f) => (
                      <FileRow
                        key={f.id}
                        file={f}
                        onRemove={() =>
                          setBulkFiles((p) => p.filter((x) => x.id !== f.id))
                        }
                      />
                    ))}
                    <button className="flex items-center gap-2 py-3 text-sm text-primary font-medium">
                      <Plus className="h-4 w-4" /> Add new
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-4 py-2.5 text-sm font-semibold">
                Business information
              </div>
              <div className="p-4 space-y-4">
                {singleFile ? (
                  <FileRow
                    file={singleFile}
                    numbered
                    idx={0}
                    onRemove={() => setSingleFile(null)}
                  />
                ) : (
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-sm text-muted-foreground w-4">1.</span>
                    <div className="h-10 w-10 rounded bg-muted grid place-items-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">File name</div>
                      <div className="text-xs text-muted-foreground">
                        Date uploaded : --- | ---KB
                      </div>
                    </div>
                    <UploadInline
                      onDrop={handleSingle}
                      accept={{
                        "text/csv": [".csv"],
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
                      }}
                      label="Upload file (xlsx, CSV)"
                    />
                    <span className="text-border">|</span>
                    <button
                      disabled
                      className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground/60 underline underline-offset-4 cursor-not-allowed"
                    >
                      <Trash2 className="h-4 w-4" /> Delete file
                    </button>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">
                      Logo<span className="text-destructive">*</span>
                    </label>
                    {logo && (
                      <button onClick={() => setLogo(null)}>
                        <Trash2 className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                  {logo ? (
                    <img
                      src={logo.url}
                      alt="Brand preview"
                      className="w-full h-56 object-cover rounded-lg"
                    />
                  ) : (
                    <DropZone
                      onDrop={handleLogo}
                      accept={{ "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] }}
                      label="Drag & drop your brand image here or"
                      sublabel="Accepted formats. PNG JPEG"
                      icon="image"
                    />
                  )}
                </div>

                <button className="flex items-center gap-2 pt-2 text-sm text-primary font-medium border-t w-full">
                  <Plus className="h-4 w-4 mt-2" />
                  <span className="mt-2">Add file</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button
            disabled={!canSubmit}
            onClick={() => onOpenChange(false)}
          >
            Upload MSMEs
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function UploadInline({
  onDrop,
  accept,
  label,
}: {
  onDrop: (f: File[]) => void;
  accept: Record<string, string[]>;
  label: string;
}) {
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept,
    noClick: true,
  });
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <button
        onClick={open}
        className="flex items-center gap-1.5 text-sm font-medium underline underline-offset-4 text-foreground/80 hover:text-foreground"
      >
        <Upload className="h-4 w-4" /> {label}
      </button>
    </div>
  );
}
