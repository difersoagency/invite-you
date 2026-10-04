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
  const hasPreview = previews.filter(Boolean).length > 0;
  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm font-medium text-dark">
          {label}
        </label>
      )}
      {description && <p className="mb-2 text-xs text-dark/55">{description}</p>}

      <label
        htmlFor={id}
        className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gold-200 bg-gold-50/40 px-4 py-6 text-center transition hover:border-gold hover:bg-gold-50"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-gold-500 shadow-sm transition group-hover:scale-105">
          <UploadIcon />
        </span>
        <span className="text-sm font-medium text-dark">
          {hasPreview ? "Ganti gambar" : "Klik untuk upload"}
          {multiple && " (bisa pilih banyak)"}
        </span>
        <span className="text-xs text-dark/50">PNG, JPG atau WEBP</span>
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
      </label>

      {hasPreview && (
        <div
          className={
            multiple
              ? "mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6"
              : "mt-3"
          }
        >
          {previews.filter(Boolean).map((src, i) => (
            <div
              key={i}
              className={`overflow-hidden rounded-xl border border-gold-100 bg-white ${
                multiple ? "aspect-square" : "aspect-[4/3] max-w-xs"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Preview ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
