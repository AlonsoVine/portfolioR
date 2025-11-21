import { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function SectionHeading({ eyebrow, title, description, actions }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-3 text-center text-[var(--foreground)] md:text-left">
      {eyebrow && (
        <span
          className="inline-flex items-center justify-center text-xs font-semibold uppercase tracking-[0.35em] opacity-80"
          style={{ color: "var(--accent-warm)" }}
        >
          {eyebrow}
        </span>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
          {description && <p className="mt-3 text-base text-muted">{description}</p>}
        </div>
        {actions && <div className="flex justify-center md:justify-end">{actions}</div>}
      </div>
    </div>
  );
}

