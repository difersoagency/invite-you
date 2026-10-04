import React from "react";

export default function Toggle({
  id,
  checked,
  onChange,
  label,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  label?: string;
}) {
  return (
    <label htmlFor={id} className="inline-flex shrink-0 cursor-pointer items-center gap-2.5 select-none">
      {label && <span className="hidden text-xs text-dark/60 sm:inline">{label}</span>}
      <input id={id} type="checkbox" className="peer sr-only" checked={!!checked} onChange={onChange} />
      <span className="relative h-6 w-11 rounded-full bg-gray-200 transition peer-checked:bg-gold peer-focus-visible:ring-4 peer-focus-visible:ring-gold/30 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition peer-checked:after:translate-x-5" />
    </label>
  );
}
