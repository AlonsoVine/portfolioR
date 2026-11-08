'use client';

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { revealWith, withBasePath } from "@/lib/utils";
import { CountUp } from "../ui/CountUp";
import { calcYearsExperience } from "@/lib/years";
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

function isCurrentPeriod(period: string): boolean {
  return /actual|present/i.test(period);
}

export function ExperienceTimeline() {
  const { dict, lang } = useLanguage();
  const experiences = dict.experiences;
  const heading = dict.experienceHeading;
  const techLabel = lang === "en" ? "Technologies used" : "Tecnologías utilizadas";
  const yearsLabel = lang === "en" ? "years of experience" : "años de experiencia";
  const currentLabel = lang === "en" ? "Current" : "Actual";

  const yearsExp = calcYearsExperience(experiences.map((e) => e.period));

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 35%"],
  });
  const reduce = useReducedMotion();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const fillScale = reduce ? scrollYProgress : progress;
  const cometY = useTransform(fillScale, (v) => `${v * 100}%`);
  const cometOpacity = useTransform(fillScale, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  const companyLogos: Record<string, string> = {
    Seres: withBasePath("/images/company/seres_logo.webp"),
    Inetum: withBasePath("/images/company/inetum_logo.webp"),
    "Fervimax Group (FCC)": withBasePath("/images/company/fervimax_logo.webp"),
    "Atos (Cestic)": withBasePath("/images/company/atos_logo.webp"),
    Atos: withBasePath("/images/company/atos_logo.webp"),
  };

  return (
    <SectionShell id="experience">
      <SectionHeading
        eyebrow={heading.eyebrow}
        index="03"
        title={heading.title}
        description={heading.description}
      />

      <motion.div {...revealWith({ delay: 0.2 })} className="mt-8 flex justify-center">
        <div className="inline-flex items-baseline gap-2.5 rounded-full surface-card px-4 py-2 shadow-[0_10px_30px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <span className="text-xl font-semibold text-[color:var(--accent-warm)] sm:text-2xl">
            <CountUp value={yearsExp} suffix="+" className="font-display tabular" />
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted sm:text-xs">
            {yearsLabel}
          </span>
        </div>
      </motion.div>

      <div ref={timelineRef} className="relative mt-16">
        <div className="pointer-events-none absolute left-6 top-0 h-full w-px bg-[var(--divider-line)] opacity-50 md:left-1/2 md:-translate-x-1/2" />
        <motion.div
          className="pointer-events-none absolute left-6 top-0 h-full w-px origin-top bg-gradient-to-b from-[color:var(--accent-warm)] via-rose-300 to-violet-400 md:left-1/2 md:-translate-x-1/2"
          style={{ scaleY: fillScale }}
          aria-hidden="true"
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-6 top-0 h-full w-px md:left-1/2 md:-translate-x-1/2 print:hidden"
          style={{ y: cometY, opacity: cometOpacity }}
        >
          <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent-warm)] shadow-[0_0_18px_6px_rgba(251,191,36,0.45)]" />
        </motion.div>

        <div className="flex flex-col gap-12">
          {experiences.map((experience, index) => {
            const isLeft = index % 2 === 0;
            const isCurrent = isCurrentPeriod(experience.period);

            return (
              <motion.div
                key={`${experience.company}-${experience.period}-${experience.title}`}
                {...revealWith({ x: isLeft ? -36 : 36, duration: 0.9 })}
                className="relative"
              >
                <div className="pointer-events-none absolute left-6 top-9 z-10 -translate-x-1/2 md:left-1/2">
                  <motion.span
                    className="relative flex items-center justify-center"
                    initial={{ scale: 0.3, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  >
                    {isCurrent ? (
                      <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full bg-emerald-400/40 motion-reduce:animate-none" />
                    ) : null}
                    <span
                      className={`relative inline-flex rounded-full ring-4 ring-[var(--background)] ${
                        isCurrent
                          ? "h-4 w-4 bg-emerald-400"
                          : "h-3 w-3 bg-[color:var(--accent-warm)]"
                      }`}
                    />
                  </motion.span>
                </div>

                <div className="grid md:grid-cols-2 md:gap-12">
                  <div
                    className={`pl-16 md:pl-0 ${
                      isLeft
                        ? "md:col-start-1 md:pr-12 md:text-right"
                        : "md:col-start-2 md:pl-12 md:text-left"
                    }`}
                  >
                    <div
                      data-spotlight
                      className="group relative overflow-hidden rounded-3xl surface-card p-6 text-muted shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(251,191,36,0.12)]"
                    >
                      <span aria-hidden="true" className="spotlight" />
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-amber-200/8 via-transparent to-rose-300/10" />
                      </div>
                      <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h3 className="text-2xl font-semibold text-[var(--foreground)]">{experience.title}</h3>
                          <div
                            className="tabular inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em]"
                            style={{ color: "var(--accent-warm)" }}
                          >
                            <CalendarDays className="h-4 w-4" aria-hidden="true" />
                            <span>{experience.period}</span>
                          </div>
                        </div>
                        {isCurrent ? (
                          <div className="flex">
                            <span className="relative inline-flex items-center gap-2 rounded-full bg-[var(--pill-emerald-bg)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--pill-emerald-text)] ring-1 ring-[color:var(--pill-emerald-border)]">
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                              </span>
                              {currentLabel}
                            </span>
                          </div>
                        ) : null}
                        <div className={`flex items-start gap-3 text-sm text-muted ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}>
                          {companyLogos[experience.company] ? (
                            <div className="mt-0.5 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/5 p-[6px]">
                              <Image
                                src={companyLogos[experience.company]}
                                alt={`Logo ${experience.company}`}
                                width={42}
                                height={42}
                                className="h-12 w-12 object-contain"
                              />
                            </div>
                          ) : null}
                          <div className={`flex flex-col gap-1 ${isLeft ? "md:items-end" : ""}`}>
                            <div className="flex items-center gap-2 text-[var(--foreground)]">
                              <Building2 className="h-4 w-4 text-[var(--pill-emerald-text)] opacity-80" aria-hidden="true" />
                              <span className="font-medium">{experience.company}</span>
                            </div>
                            {experience.project && (
                              <div className="flex items-center gap-2">
                                <BriefcaseBusiness className="h-4 w-4 text-[var(--pill-emerald-text)] opacity-70" aria-hidden="true" />
                                <span>{experience.project}</span>
                              </div>
                            )}
                            {experience.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[var(--pill-emerald-text)] opacity-70" aria-hidden="true" />
                                <span>{experience.location}</span>
                              </div>
                            )}
                          </div>
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
                            <div className={`mt-3 flex flex-wrap gap-2 ${isLeft ? "md:justify-end" : ""}`}>
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
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionShell>
  );
}
