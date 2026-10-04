import React from "react";
import { CakeIcon, HeartIcon, RingIcon } from "../icon/Icons";

const OPTIONS = [
  { value: "wedding", label: "Wedding", desc: "Akad atau pemberkatan, resepsi", icon: HeartIcon },
  { value: "engagement", label: "Engagement", desc: "Lamaran dan tunangan", icon: RingIcon },
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
    <div role="radiogroup" aria-label="Jenis acara" className="flex flex-col divide-y divide-line overflow-hidden rounded-md border border-line">
      {options.map(({ value: v, label, desc, icon: Icon }) => {
        const selected = value === v;
        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(v)}
            className={`flex items-center gap-4 px-4 py-3.5 text-left transition-colors focus:outline-none focus-visible:bg-ivory ${
              selected ? "bg-ink text-white" : "bg-white hover:bg-ivory"
            }`}
          >
            <Icon className={`h-5 w-5 shrink-0 ${selected ? "text-gold" : "text-ink/40"}`} />
            <span className="flex-1">
              <span className="block text-sm font-semibold">{label}</span>
              <span className={`block text-xs ${selected ? "text-white/60" : "text-ink/50"}`}>{desc}</span>
            </span>
            <span
              className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                selected ? "border-gold" : "border-ink/25"
              }`}
            >
              {selected && <span className="h-2 w-2 rounded-full bg-gold" />}
            </span>
          </button>
        );
      })}
    </div>
  );
}
