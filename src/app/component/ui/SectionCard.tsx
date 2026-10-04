import React from "react";
import Toggle from "./Toggle";

export default function SectionCard({
  title,
  description,
  icon,
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
    <section className={`card p-5 sm:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {icon && (
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-lg text-gold-500">
              {icon}
            </span>
          )}
          <div>
            <h2 className="font-semibold text-dark">{title}</h2>
            {description && <p className="mt-0.5 text-xs text-dark/55">{description}</p>}
          </div>
        </div>
        {toggle && (
          <Toggle id={toggle.id} checked={toggle.checked} onChange={toggle.onChange} label={toggle.label} />
        )}
      </div>
      {open && children && <div className="mt-5 flex flex-col gap-5">{children}</div>}
    </section>
  );
}
