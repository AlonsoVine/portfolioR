'use client';

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { useLanguage } from "@/i18n";

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const highlightTech = (text: string, techs?: string[]) => {
	if (!techs?.length) return text;
	const regex = new RegExp(`(${techs.map(escapeRegExp).join("|")})`, "gi");
	return text.split(regex).map((part, idx) =>
		idx % 2 === 1 ? (
			<span key={`${part}-${idx}`} className="text-ink">
				{part}
			</span>
		) : (
			<span key={`${part}-${idx}`}>{part}</span>
		),
	);
};

const isCurrentPeriod = (period: string) => /actual|present/i.test(period);

export function ExperienceTimeline() {
	const { dict } = useLanguage();
	const experiences = dict.experiences;
	const heading = dict.experienceHeading;
	const { tech: techLabel, current: currentLabel, project: projectLabel } = dict.ui.experience;

	const listRef = useRef<HTMLOListElement>(null);
	const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
	const reduce = useReducedMotion();
	const eased = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

	return (
		<SectionShell id="experience" className="pt-24 pb-24 lg:pt-32 lg:pb-32">
			<SectionHeading
				sectionId="experience"
				index="03"
				eyebrow={heading.eyebrow}
				title={heading.title}
				description={heading.description}
			/>

			<div className="relative mt-14 lg:mt-20">
				<div aria-hidden="true" className="absolute -left-6 top-0 hidden h-full w-px bg-rule xl:block print:hidden" />
				<motion.div
					aria-hidden="true"
					className="progress-rule absolute -left-6 top-0 hidden h-full w-px bg-ink xl:block print:hidden"
					style={{ scaleY: reduce ? scrollYProgress : eased }}
				/>

				<ol className="print-tight">
					{experiences.map((experience) => {
						const isCurrent = isCurrentPeriod(experience.period);
						return (
							<motion.li
								key={`${experience.company}-${experience.period}-${experience.title}`}
								{...scrollRevealConfig}
								className="print-row grid-page gap-y-5 border-t border-rule py-10 last:border-b lg:py-14"
							>
								<div className="col-span-4 md:col-span-3 lg:col-span-4">
									<div className="lg:sticky lg:top-24">
										<p className="meta flex items-center gap-2.5 text-ink tabular">
											{isCurrent ? <span aria-hidden="true" className="signal-dot signal-dot-live" /> : null}
											{experience.period}
											{isCurrent ? <span className="text-signal">· {currentLabel}</span> : null}
										</p>
										<p className="mt-3 font-display text-[2.25rem] leading-none text-ink lg:text-[2.75rem]">
											{experience.company}
										</p>
									</div>
								</div>

								<div className="col-span-4 md:col-span-5 lg:col-span-7 lg:col-start-6">
									<h3 className="text-[1.375rem] font-medium leading-snug text-ink lg:text-[1.5rem]">{experience.title}</h3>
									<p className="meta mt-2 text-muted">
										{experience.project ? (
											<>
												<span className="sr-only">{projectLabel}: </span>
												{experience.project}
											</>
										) : null}
										{experience.project && experience.location ? " · " : null}
										{experience.location}
									</p>
									<ul className="print-compact-text mt-6 flex flex-col gap-3 text-muted">
										{experience.bullets.map((bullet, idx) => (
											<li key={`${experience.company}-${idx}`} className="grid grid-cols-[1.25rem_1fr] leading-relaxed">
												<span aria-hidden="true" className="text-subtle">
													–
												</span>
												<span>{highlightTech(bullet, experience.tech)}</span>
											</li>
										))}
									</ul>
									{experience.tech?.length ? (
										<p className="print-compact-text mt-6 font-mono text-[0.8rem] leading-relaxed text-subtle">
											<span className="sr-only">{techLabel}: </span>
											{experience.tech.join(" · ")}
										</p>
									) : null}
								</div>
							</motion.li>
						);
					})}
				</ol>
			</div>
		</SectionShell>
	);
}
