import React from "react";
import { CakeIcon, CheckIcon, HeartIcon, RingIcon } from "../icon/Icons";

const OPTIONS = [
  { value: "wedding", label: "Wedding", desc: "Akad / pemberkatan & resepsi", icon: HeartIcon },
  { value: "engagement", label: "Engagement", desc: "Acara lamaran / tunangan", icon: RingIcon },
  { value: "birthday", label: "Birthday", desc: "Pesta ulang tahun", icon: CakeIcon },
];

export default function EventTypePicker({
  value,
  onChange,
  only,
}: {
  value: string;
  onChange: (v: string) => void;
  only?: string;
}) {
  const options = only ? OPTIONS.filter((o) => o.value === only) : OPTIONS;
  return (
    <div role="radiogroup" aria-label="Jenis acara" className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
      {options.map(({ value: v, label, desc, icon: Icon }) => {
        const selected = value === v;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(v)}
            className={`relative flex items-center gap-4 rounded-2xl xl:flex-col xl:items-start xl:gap-3 border p-4 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/30 ${
              selected ? "border-gold bg-gold-50 ring-1 ring-gold" : "border-gold-200 bg-white hover:border-gold hover:bg-gold-50/50"
            }`}
          >
            <span
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${
                selected ? "bg-gold text-white" : "bg-gold-50 text-gold-500"
              }`}
            >
              <Icon />
            </span>
            <span>
              <span className="block font-semibold">{label}</span>
              <span className="block text-xs text-dark/55">{desc}</span>
            </span>
            {selected && (
              <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-xs text-white">
                <CheckIcon />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
