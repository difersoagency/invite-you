"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "../icon/Icons";

export default function FormActions({
  onSubmit,
  loading,
  submitLabel,
  loadingLabel = "Menyimpan...",
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
    <div className="sticky bottom-0 z-30 -mx-4 mt-10 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        {showBack ? (
          <button type="button" className="btn-ghost" onClick={() => router.back()}>
            <ArrowLeftIcon /> Kembali
          </button>
        ) : (
          <span />
        )}
        <button type="button" className="btn-primary min-w-[9rem]" disabled={loading} onClick={onSubmit}>
          {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
          {loading ? loadingLabel : submitLabel}
        </button>
      </div>
    </div>
  );
}
