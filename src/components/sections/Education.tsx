'use client';

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Award, Maximize2, X } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { EASE_OUT_EXPO, revealWith, withBasePath } from "@/lib/utils";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useLanguage } from "@/i18n";
import type { Education as EducationItem } from "@/data/portfolio";

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
  const { dict, lang } = useLanguage();
  const heading = dict.education;
  const [selected, setSelected] = useState<EducationItem | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, selected !== null);
  const certificateLabel = lang === "en" ? "Certificate" : "Certificado";
  const viewLabel = lang === "en" ? "View certificate" : "Ver certificado";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <SectionShell id="education">
      <SectionHeading eyebrow={heading.eyebrow} index="05" title={heading.title} description={heading.description} />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {heading.items.map((item, index) => (
          <motion.div
            key={`${item.institution}-${item.dates}-${item.title}`}
            {...revealWith({ delay: (index % 3) * 0.08, duration: 0.8 })}
            className="h-full"
          >
            <button
              type="button"
              onClick={() => setSelected(item)}
              aria-haspopup="dialog"
              aria-label={`${viewLabel}: ${item.title}`}
              data-spotlight
              className="group relative flex h-full w-full cursor-zoom-in flex-col overflow-hidden rounded-3xl border border-soft/60 surface-card text-left shadow-[0_20px_60px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-1 hover:border-[color:var(--accent-warm)]/60"
            >
              <span aria-hidden="true" className="spotlight" />
              <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent-warm-soft)] via-transparent to-rose-300/10" />
              </span>
              {item.image ? (
                <span className="print-hide relative block h-48 w-full overflow-hidden rounded-t-3xl">
                  <Image
                    src={withBasePath(item.image)}
                    alt=""
                    width={800}
                    height={400}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 inline-flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-black/45 text-white opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </span>
                </span>
              ) : null}
              <span className="relative z-10 block p-8">
                <span className="mb-3 flex items-center justify-between gap-3">
                  <span className="inline-flex min-w-0 items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent-warm-soft)]">
                      <Award className="h-5 w-5 text-[var(--accent-warm)]" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-[color:var(--accent-warm)]">{item.institution.trim()}</span>
                  </span>
                  <span className="tabular text-xs uppercase tracking-[0.35em] text-subtle">{item.dates}</span>
                </span>
                <span className="block text-xl font-semibold text-[var(--foreground)]">{item.title}</span>
                <span className="mt-3 block text-sm leading-relaxed text-muted">
                  {lang === "en" ? highlightKeywords(item.details) : item.details}
                </span>
              </span>
            </button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            key="certificate"
            ref={modalRef}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={`${certificateLabel} ${selected.title}`}
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-[var(--background)] shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
            >
              <button
                type="button"
                className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
                aria-label={lang === "en" ? "Close" : "Cerrar"}
                onClick={() => setSelected(null)}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
              {selected.image ? (
                <Image
                  src={withBasePath(selected.image)}
                  alt={`${certificateLabel}: ${selected.title}`}
                  width={1600}
                  height={900}
                  className="max-h-[85vh] w-full bg-[var(--background)] object-contain"
                />
              ) : null}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SectionShell>
  );
}
