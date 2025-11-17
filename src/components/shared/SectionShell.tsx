import { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({ id, children, className }: SectionShellProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8 ${className ?? ""}`}
    >
      {children}
    </section>
  );
}

