'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Award, X } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { useLanguage } from "@/i18n";

type EducationItem = ReturnType<typeof useLanguage>["dict"]["education"]["items"][number];

const highlightKeywords = (text: string) => {
  const regex =
    /\b(AI|Artificial Intelligence|machine learning|neural networks?|NLP|computer vision|big data|model optimization|production deployment|ChatGPT|AWS|Cloud|GitHub|Linux|Power Apps|Power Automate|Power BI|Selenium|Scrum|Python|ECTS|24 ECTS|200 hours|600 hours)\b/gi;
  const parts = text.split(regex);
  return parts.map((part, idx) =>
    regex.test(part) ? (
      <strong key={`${part}-${idx}`} className="font-semibold">
        {part}
      </strong>
    ) : (
      <span key={`${part}-${idx}`}>{part}</span>
    ),
  );
};

export function Education() {
  const { dict, lang } = useLanguage() as { dict: any; lang: "es" | "en" };
  const heading = dict.education;
  const [selected, setSelected] = useState<EducationItem | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SectionShell id="education">
      <SectionHeading eyebrow={heading.eyebrow} title={heading.title} description={heading.description} />
      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {heading.items.map((item, index) => (
          <motion.div
            key={`${item.institution}-${item.dates}-${item.title}`}
            {...scrollRevealConfig}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelected(item)}
            className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-soft/60 surface-card shadow-[0_20px_60px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:border-[color:var(--accent-warm)]/60"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent-warm-soft)] via-transparent to-rose-300/10" />
            </div>
            {item.image ? (
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
            ) : null}
            <div className="p-8">
              <div className="mb-3 flex items-center justify-between">
                <div className="inline-flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent-warm-soft)]">
                    <Award className="h-5 w-5 text-[var(--accent-warm)]" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold text-[color:var(--accent-warm)]">{item.institution}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.35em] text-subtle">{item.dates}</span>
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {lang === "en" ? highlightKeywords(item.details) : item.details}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificado ${selected.title}`}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-[var(--background)] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-[var(--foreground)] transition hover:bg-white/20"
              aria-label="Cerrar"
              onClick={() => setSelected(null)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            {selected.image ? (
              <Image
                src={selected.image}
                alt={selected.title}
                width={1600}
                height={900}
                className="h-full w-full bg-[var(--background)] object-contain"
              />
            ) : null}
          </div>
        </div>
      ) : null}
    </SectionShell>
  );
}

