import React from "react";
import Toggle from "./Toggle";

export default function SectionCard({
  title,
  description,
  toggle,
  className = "",
  children,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  toggle?: { id: string; checked: boolean; onChange: () => void; label?: string };
  className?: string;
  children?: React.ReactNode;
}) {
  const open = !toggle || toggle.checked;
  return (
    <section className={`card ${className}`}>
      <div className={`flex items-start justify-between gap-4 px-5 py-4 sm:px-6 ${open && children ? "border-b border-line" : ""}`}>
        <div>
          <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-ink/50">{description}</p>}
        </div>
        {toggle && (
          <Toggle id={toggle.id} checked={toggle.checked} onChange={toggle.onChange} label={toggle.label} />
        )}
      </div>
      {open && children && <div className="flex flex-col gap-5 px-5 py-5 sm:px-6">{children}</div>}
    </section>
  );
}
