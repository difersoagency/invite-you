import React from "react";

export default function PageHeader({
  title,
  description,
  eyebrow,
  actions,
}: {
  title: string;
  description?: React.ReactNode;
  eyebrow?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 border-b border-line pb-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-2 text-sm text-ink/45">{eyebrow}</p>}
        <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-[2.5rem]">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-ink/60">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}
