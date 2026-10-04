import React from "react";

const STEPS = ["Data klien", "Template", "Detail acara"];

export default function Stepper({ current }: { current: number }) {
  return (
    <ol className="mb-8 grid grid-cols-3 gap-2 sm:gap-4">
      {STEPS.map((label, i) => {
        const reached = i <= current;
        return (
          <li key={label}>
            <div className={`h-0.5 ${i < current ? "bg-ink" : i === current ? "bg-gold" : "bg-line"}`} />
            <p className={`mt-2 text-xs sm:text-sm ${reached ? "text-ink" : "text-ink/35"}`}>
              <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className={`ml-2 ${i === current ? "inline" : "hidden sm:inline"}`}>{label}</span>
            </p>
          </li>
        );
      })}
    </ol>
  );
}
