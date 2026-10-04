"use client";

import React from "react";
import { UploadIcon } from "../icon/Icons";

type Props = {
  id: string;
  label?: string;
  description?: string;
  multiple?: boolean;
  previews?: string[];
  onFiles: (files: File[]) => void;
};

export default function ImageUpload({ id, label, description, multiple, previews = [], onFiles }: Props) {
  const shown = previews.filter(Boolean);
  const hasPreview = shown.length > 0;
  const single = !multiple && hasPreview;

  const input = (
    <input
      id={id}
      type="file"
      accept="image/*"
      multiple={multiple}
      className="sr-only"
      onChange={(e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) onFiles(files);
      }}
    />
  );

  return (
    <div>
      {label && <label htmlFor={id} className="label">{label}</label>}
      {description && <p className="hint mb-2">{description}</p>}

      {single ? (
        // Satu gambar: tampilkan gambarnya langsung, klik untuk ganti
        <label htmlFor={id} className="group relative block aspect-[4/3] cursor-pointer overflow-hidden rounded-md border border-line bg-ivory">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={shown[0]} alt="" className="h-full w-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 bg-ink/80 py-2 text-center text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            Ganti gambar
          </span>
          {input}
        </label>
      ) : (
        <label
          htmlFor={id}
          className="flex cursor-pointer items-center gap-3 rounded-md border border-dashed border-ink/20 bg-ivory px-4 py-4 transition-colors hover:border-ink"
        >
          <UploadIcon className="h-5 w-5 shrink-0 text-ink/50" />
          <span className="text-sm">
            <span className="font-medium text-ink underline decoration-gold decoration-2 underline-offset-4">
              {hasPreview ? "Ganti foto" : "Pilih file"}
            </span>
            <span className="text-ink/45"> · JPG, PNG{multiple ? ", bisa lebih dari satu" : ""}</span>
          </span>
          {input}
        </label>
      )}

      {multiple && hasPreview && (
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {shown.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-md bg-ivory">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Foto ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
