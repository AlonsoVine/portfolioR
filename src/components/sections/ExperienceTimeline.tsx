'use client';

import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { Experience } from "@/data/portfolio";
import { scrollRevealConfig } from "@/lib/utils";
import { Building2, BriefcaseBusiness, MapPin, CalendarDays } from "lucide-react";

type ExperienceTimelineProps = {
  experiences: Experience[];
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <SectionShell id="experience">
      <SectionHeading
        eyebrow="Experiencia"
        title="Timeline profesional"
        description="Resumen de mi experiencia laboral en orden cronológico."
      />
      <div className="relative mt-16">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-amber-200 via-white/60 to-rose-300 md:block" />
        <div className="flex flex-col gap-16">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.period}`}
              {...scrollRevealConfig}
              transition={{ delay: index * 0.08 }}
              className="relative flex flex-col md:flex-row md:items-start"
            >
              <div
                className={`flex-1 ${
                  experience.position === "left" ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"
                }`}
              >
                <div className="rounded-3xl surface-card p-6 text-muted shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <h3 className="text-2xl font-semibold text-[var(--foreground)]">{experience.title}</h3>
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-amber-100/80">
                        <CalendarDays className="h-4 w-4 text-amber-300" aria-hidden="true" />
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
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    {experience.tech?.length ? (
                      <div className="mt-4 border-t border-soft/40 pt-4">
                        <p className="text-xs uppercase tracking-[0.35em] text-muted">Tecnologias utilizadas</p>
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
                  <span className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-amber-300/35" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-300 ring-2 ring-[var(--background)]" />
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
