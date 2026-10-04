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
  wide = false,
}: {
  onSubmit: () => void;
  loading?: boolean;
  submitLabel: React.ReactNode;
  loadingLabel?: string;
  showBack?: boolean;
  wide?: boolean;
}) {
  const router = useRouter();
  return (
    <>
      {/* ruang kosong supaya konten terakhir tidak tertutup bar */}
      <div aria-hidden className="h-20" />
      <div className="fixed inset-x-0 bottom-[calc(4rem+env(safe-area-inset-bottom))] z-30 border-t border-line bg-white/95 backdrop-blur lg:bottom-0 lg:left-60">
        <div className={`mx-auto flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
          {showBack ? (
            <button type="button" className="btn-ghost -ml-3" onClick={() => router.back()}>
              <ArrowLeftIcon /> Kembali
            </button>
          ) : (
            <span />
          )}
          <button type="button" className="btn-primary min-w-[8.5rem]" disabled={loading} onClick={onSubmit}>
            {loading && <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
            {loading ? loadingLabel : submitLabel}
          </button>
        </div>
      </div>
    </>
  );
}
