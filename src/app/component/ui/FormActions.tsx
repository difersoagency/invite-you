"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "../icon/Icons";

export default function FormActions({
  onSubmit,
  loading,
  submitLabel,
  loadingLabel = "Tunggu sebentar...",
  showBack = true,
}: {
  onSubmit: () => void;
  loading?: boolean;
  submitLabel: React.ReactNode;
  loadingLabel?: string;
  showBack?: boolean;
}) {
  const router = useRouter();
  return (
    <div className="sticky bottom-0 z-30 -mx-4 mt-8 border-t border-gold-100 bg-white/90 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {showBack ? (
          <button type="button" className="btn-ghost" onClick={() => router.back()}>
            <ArrowLeftIcon /> <span className="hidden sm:inline">Kembali</span>
          </button>
        ) : (
          <span />
        )}
        <button type="button" className="btn-primary min-w-[10rem]" disabled={loading} onClick={onSubmit}>
          {loading && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          )}
          {loading ? loadingLabel : submitLabel}
        </button>
      </div>
    </div>
  );
}
