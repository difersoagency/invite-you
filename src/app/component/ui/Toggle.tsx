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
      {label && <span className="hidden text-xs text-ink/50 sm:inline">{label}</span>}
      <input id={id} type="checkbox" className="peer sr-only" checked={!!checked} onChange={onChange} />
      <span className="relative h-5 w-9 rounded-full bg-ink/15 transition-colors peer-checked:bg-ink peer-focus-visible:ring-2 peer-focus-visible:ring-gold peer-focus-visible:ring-offset-2 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-4" />
    </label>
  );
}
