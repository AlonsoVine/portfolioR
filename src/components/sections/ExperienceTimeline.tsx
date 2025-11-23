'use client';

import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { Building2, BriefcaseBusiness, MapPin, CalendarDays } from "lucide-react";
import { useLanguage } from "@/i18n";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightTech = (text: string, techs?: string[]) => {
  if (!techs?.length) return text;
  const pattern = techs.map(escapeRegExp).join("|");
  if (!pattern) return text;
  const regex = new RegExp(`(${pattern})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, idx) =>
    regex.test(part) ? (
      <em key={`${part}-${idx}`} className="italic not-italic font-semibold text-[var(--foreground)]">
        {part}
      </em>
    ) : (
      <span key={`${part}-${idx}`}>{part}</span>
    )
  );
};

export function ExperienceTimeline() {
  const { dict } = useLanguage();
  const experiences = dict.experiences;
  const heading = dict.experienceHeading;
  const techLabel =
    (heading as any)?.techLabel ??
    (dict.lang === "en" ? "Technologies used" : "Tecnologias utilizadas");

  return (
    <SectionShell id="experience">
      <SectionHeading
        eyebrow={heading.eyebrow}
        title={heading.title}
        description={heading.description}
      />
      <div className="relative mt-16">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-[color:var(--accent-warm-soft)] via-white/60 to-rose-300 md:block" />
        <div className="flex flex-col gap-16">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.period}-${experience.title}`}
              {...scrollRevealConfig}
              transition={{ delay: index * 0.08 }}
              className="relative flex flex-col md:flex-row md:items-start"
            >
              <div
                className={`flex-1 ${
                  experience.position === "left" ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"
                }`}
              >
                <div className="group rounded-3xl surface-card p-6 text-muted shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(251,191,36,0.15)]">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[color:var(--accent-warm-soft)] via-transparent to-rose-300/10" />
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <h3 className="text-2xl font-semibold text-[var(--foreground)]">{experience.title}</h3>
                      <div
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] opacity-80"
                        style={{ color: "var(--accent-warm)" }}
                      >
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                        <span>{experience.period}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-sm text-muted">
                      <div className="flex items-center gap-2 text-[var(--foreground)]">
                        <Building2 className="h-4 w-4 text-emerald-300/80" aria-hidden="true" />
                        <span className="font-medium">{experience.company}</span>
                      </div>
                      {experience.project && (
                        <div className="flex items-center gap-2">
                          <BriefcaseBusiness className="h-4 w-4 text-emerald-300/60" aria-hidden="true" />
                          <span>{experience.project}</span>
                        </div>
                      )}
                      {experience.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-emerald-300/60" aria-hidden="true" />
                          <span>{experience.location}</span>
                        </div>
                      )}
                    </div>
                    <ul className="mt-1 space-y-2 text-muted">
                      {experience.bullets.map((bullet, idx) => (
                        <li key={`${experience.company}-${idx}`} className="leading-relaxed">
                          {highlightTech(bullet, experience.tech)}
                        </li>
                      ))}
                    </ul>
                    {experience.tech?.length ? (
                      <div className="mt-4 border-t border-soft/40 pt-4">
                        <p className="text-xs uppercase tracking-[0.35em] text-muted">{techLabel}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {experience.tech.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-soft/80 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--foreground)]/80"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="pointer-events-none relative hidden h-full w-10 md:flex">
                <span className="absolute left-1/2 top-[52px] z-20 flex -translate-x-1/2 items-center justify-center">
                  <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-[color:var(--accent-warm-soft)]" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[color:var(--accent-warm)] ring-2 ring-[var(--background)]" />
                </span>
              </div>
              <div className={`hidden flex-1 md:block ${experience.position === "left" ? "order-2" : ""}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
