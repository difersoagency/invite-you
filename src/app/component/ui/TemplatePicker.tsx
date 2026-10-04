import React from "react";

export default function TemplatePicker({
  templates,
  selected,
  onSelect,
  loading,
}: {
  templates: any[];
  selected: any;
  onSelect: (id: any) => void;
  loading?: boolean;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[3/4] animate-pulse rounded-md bg-line/70" />
            <div className="mt-3 h-3 w-1/2 animate-pulse rounded bg-line/70" />
          </div>
        ))}
      </div>
    );
  }

  if (!templates.length) {
    return <p className="py-16 text-center text-sm text-ink/50">Belum ada template untuk jenis acara ini.</p>;
  }

  return (
    <div role="radiogroup" aria-label="Pilih template" className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 lg:grid-cols-4">
      {templates.map((option, i) => {
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(option.id)}
            className="group text-left focus:outline-none"
          >
            <div
              className={`relative aspect-[3/4] overflow-hidden rounded-md bg-line/60 outline outline-offset-[3px] transition-[outline-color] ${
                isSelected ? "outline-2 outline-ink" : "outline-1 outline-transparent group-hover:outline-ink/20 group-focus-visible:outline-gold"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={option.preview_img}
                alt={option.nama}
                loading="lazy"
                className="h-full w-full object-cover"
              />
              {isSelected && (
                <span className="absolute left-0 top-0 bg-ink px-2.5 py-1 text-[11px] font-semibold text-white">Dipilih</span>
              )}
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-2">
              <p className="truncate text-sm font-medium text-ink">{option.nama}</p>
              <span className="shrink-0 text-xs tabular-nums text-ink/35">{String(i + 1).padStart(2, "0")}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
