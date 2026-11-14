'use client';

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { cn, scrollRevealConfig } from "@/lib/utils";
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

const VISIBLE = 3;

/** Las tres primeras viñetas siempre; el resto, plegado como un `git log` corto que se despliega. Al imprimir salen todas. */
function Bullets({ id, bullets, render, more, less }: { id: string; bullets: string[]; render: (b: string) => ReactNode; more: string; less: string }) {
	const [open, setOpen] = useState(false);
	const extra = bullets.length - VISIBLE;
	return (
		<>
			<ul id={id} className="print-compact-text mt-6 flex flex-col gap-3 text-muted">
				{bullets.map((bullet, idx) => (
					<li
						key={idx}
						className={cn(
							"grid grid-cols-[1.25rem_1fr] leading-relaxed",
							idx >= VISIBLE && (open ? "bullet-in" : "hidden print:grid"),
						)}
						style={idx >= VISIBLE ? ({ "--b": idx - VISIBLE } as CSSProperties) : undefined}
					>
						<span aria-hidden="true" className={idx >= VISIBLE ? "text-signal" : "text-subtle"}>
							{idx >= VISIBLE ? "+" : "–"}
						</span>
						<span>{render(bullet)}</span>
					</li>
				))}
			</ul>
			{extra > 0 ? (
				<button
					type="button"
					aria-expanded={open}
					aria-controls={id}
					onClick={() => setOpen((v) => !v)}
					className="print-hide meta link-rule mt-4 min-h-11 text-ink"
				>
					<span className="text-subtle">git log</span> {open ? less : `--more · ${more.replace("{n}", String(extra))}`}
				</button>
			) : null}
		</>
	);
}

const isCurrentPeriod = (period: string) => /actual|present/i.test(period);

export function ExperienceTimeline() {
	const { dict } = useLanguage();
	const experiences = dict.experiences;
	const heading = dict.experienceHeading;
	const { tech: techLabel, current: currentLabel, project: projectLabel, more: moreLabel, less: lessLabel } = dict.ui.experience;

	const listRef = useRef<HTMLOListElement>(null);
	const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 70%", "end 60%"] });
	const reduce = useReducedMotion();
	const eased = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

	return (
		<SectionShell id="experience" className="pt-24 pb-24 lg:pt-32 lg:pb-32">
			<SectionHeading
				sectionId="experience"
				index="02"
				eyebrow={heading.eyebrow}
				title={heading.title}
				description={heading.description}
			/>

			<div className="relative mt-14 lg:mt-20">
				<div aria-hidden="true" className="absolute -left-6 top-0 hidden h-full w-px bg-rule min-[1360px]:block print:hidden" />
				<motion.div
					aria-hidden="true"
					className="progress-rule absolute -left-6 top-0 hidden h-full w-px bg-signal min-[1360px]:block print:hidden"
					style={{ scaleY: reduce ? scrollYProgress : eased }}
				/>

				<ol ref={listRef} className="print-tight">
					{experiences.map((experience, i) => {
						const isCurrent = isCurrentPeriod(experience.period);
						// Dos puestos seguidos en la misma empresa se leen como un tramo: el segundo no repite el nombre en grande
						const continues = i > 0 && experiences[i - 1].company === experience.company;
						return (
							<motion.li
								key={`${experience.company}-${experience.period}-${experience.title}`}
								{...scrollRevealConfig}
								className={cn(
									"print-row relative grid-page gap-y-5 border-t py-10 last:border-b last:border-rule lg:py-14",
									continues ? "border-dashed border-rule" : "border-rule",
								)}
							>
								<motion.span
									aria-hidden="true"
									className={cn(
										"commit-node absolute top-[2.85rem] hidden rounded-full border min-[1360px]:block lg:top-[3.85rem] print:hidden",
										isCurrent ? "border-signal bg-signal" : continues ? "border-rule-strong bg-paper" : "border-ink bg-paper",
										continues ? "h-2 w-2" : "h-3 w-3",
									)}
									style={{ left: continues ? "calc(-1.5rem - 3.5px)" : "calc(-1.5rem - 5.5px)" }}
									initial={{ scale: 0 }}
									whileInView={{ scale: 1 }}
									viewport={{ once: true, amount: 1 }}
									transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 22, delay: 0.15 }}
								/>
								<div className="col-span-4 md:col-span-3 lg:col-span-4">
									<div className="lg:sticky lg:top-24">
										<p className="meta flex items-center gap-2.5 text-ink tabular">
											{isCurrent ? <span aria-hidden="true" className="signal-dot signal-dot-live" /> : null}
											{experience.period}
											{isCurrent ? <span className="text-signal">· {currentLabel}</span> : null}
										</p>
										<p
											className={cn(
												"mt-3 font-display leading-none",
												continues ? "text-[1.5rem] italic text-subtle" : "text-[2.25rem] text-ink lg:text-[2.75rem]",
											)}
										>
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
									<Bullets
										id={`exp-${i}`}
										bullets={experience.bullets}
										render={(bullet) => highlightTech(bullet, experience.tech)}
										more={moreLabel}
										less={lessLabel}
									/>
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
