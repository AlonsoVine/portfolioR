'use client';

import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { Education as EducationType } from "@/data/portfolio";
import { scrollRevealConfig } from "@/lib/utils";

type EducationProps = {
  items: EducationType[];
};

export function Education({ items }: EducationProps) {
  return (
    <SectionShell id="education">
      <SectionHeading
        eyebrow="Formación"
        title="Educación & especializaciones"
        description="Cards con borde degradado y línea luminosa al hover. El copy final se reemplazará fácilmente."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {items.map((item, index) => (
          <motion.div
            key={`${item.institution}-${item.dates}`}
            {...scrollRevealConfig}
            transition={{ delay: index * 0.05 }}
            className="relative overflow-hidden rounded-3xl surface-card p-8 shadow-[0_20px_60px_rgba(15,23,42,0.35)]"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/10 via-transparent to-rose-300/20" />
            </div>
            <p className="text-sm uppercase tracking-[0.4em] text-subtle">{item.dates}</p>
            <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{item.title}</h3>
            <p className="text-muted">{item.institution}</p>
            <p className="mt-4 text-muted">{item.details}</p>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

