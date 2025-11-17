'use client';

import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { Experience } from "@/data/portfolio";
import { scrollRevealConfig } from "@/lib/utils";

type ExperienceTimelineProps = {
  experiences: Experience[];
};

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  return (
    <SectionShell id="experience">
      <SectionHeading
        eyebrow="Experiencia"
        title="Timeline profesional"
        description="Nodos sincronizados con animaciones y contenido en tarjetas con blur. Los bullets están preparados para copy definitivo."
      />
      <div className="relative mt-16">
        <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-amber-200 via-white/60 to-rose-300 md:block" />
        <div className="flex flex-col gap-12">
          {experiences.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.period}`}
              {...scrollRevealConfig}
              transition={{ delay: index * 0.08 }}
              className="relative flex flex-col md:flex-row md:items-center"
            >
              <div
                className={`flex-1 ${
                  experience.position === "left" ? "md:pr-16 md:text-right" : "md:order-2 md:pl-16"
                }`}
              >
                <div className="rounded-3xl surface-card p-6 text-muted shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm uppercase tracking-[0.4em] text-amber-200/80">{experience.period}</p>
                    <h3 className="text-2xl font-semibold text-[var(--foreground)]">{experience.title}</h3>
                    <p className="text-muted">{experience.company}</p>
                    <ul className="mt-4 space-y-2 text-muted">
                      {experience.bullets.map((bullet) => (
                        <li key={bullet} className="leading-relaxed">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="my-8 flex items-center justify-center md:my-0">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-300/40" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-amber-300" />
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

