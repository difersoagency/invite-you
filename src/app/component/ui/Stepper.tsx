import React from "react";
import { CheckIcon } from "../icon/Icons";

const STEPS = ["Data Klien", "Template", "Detail Acara"];

export default function Stepper({ current }: { current: number }) {
  return (
    <ol className="mb-8 flex items-center gap-2 sm:gap-4">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3 last:flex-none">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                  done
                    ? "bg-gold text-white"
                    : active
                    ? "bg-dark text-white ring-4 ring-gold/25"
                    : "border border-gold-200 bg-white text-dark/40"
                }`}
              >
                {done ? <CheckIcon className="h-4 w-4" /> : i + 1}
              </span>
              <span
                className={`hidden text-sm sm:inline ${
                  active ? "font-semibold text-dark" : "text-dark/50"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span className={`h-px flex-1 ${done ? "bg-gold" : "bg-gold-200"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
