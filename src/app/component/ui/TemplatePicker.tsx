import React from "react";
import { CheckIcon } from "../icon/Icons";

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
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="aspect-[3/4] animate-pulse bg-gold-50" />
            <div className="m-3 h-4 w-2/3 animate-pulse rounded bg-gold-50" />
          </div>
        ))}
      </div>
    );
  }

  if (!templates.length) {
    return <div className="card p-10 text-center text-sm text-dark/55">Belum ada template untuk acara ini.</div>;
  }

  return (
    <div role="radiogroup" aria-label="Pilih template" className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
      {templates.map((option) => {
        const isSelected = selected === option.id;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(option.id)}
            className={`group relative overflow-hidden rounded-2xl border bg-white text-left shadow-soft transition focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/30 ${
              isSelected ? "border-gold ring-2 ring-gold" : "border-gold-100 hover:-translate-y-0.5 hover:border-gold-300"
            }`}
          >
            <div className="aspect-[3/4] overflow-hidden bg-gold-50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={option.preview_img}
                alt={option.nama}
                loading="lazy"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-3">
              <p className={`truncate text-sm font-semibold ${isSelected ? "text-gold-600" : "text-dark"}`}>{option.nama}</p>
            </div>
            {isSelected && (
              <span className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-gold text-sm text-white shadow">
                <CheckIcon />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
