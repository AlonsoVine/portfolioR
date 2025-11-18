'use client';

import { motion } from "framer-motion";
import Image from "next/image";
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
            className="group relative overflow-hidden rounded-3xl surface-card shadow-[0_20px_60px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-200/10 via-transparent to-rose-300/20" />
            </div>
            {item.image && (
              <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
            )}
            <div className="p-8">
              <p className="text-sm uppercase tracking-[0.4em] text-subtle">{item.dates}</p>
              <h3 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">{item.title}</h3>
              <p className="text-muted">{item.institution}</p>
              <p className="mt-4 text-muted">{item.details}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}

