'use client';

import { motion } from "framer-motion";
import { BadgeCheck, CloudCog, Code2, Database, Layers, Wrench } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { SkillCard } from "@/data/portfolio";
import { EASE_OUT_EXPO, revealWith } from "@/lib/utils";
import { useLanguage } from "@/i18n";

const skillIconMap = {
	code: Code2,
	layers: Layers,
	cloud: CloudCog,
	database: Database,
	wrench: Wrench,
	badge: BadgeCheck,
} as const;

// Bento en zigzag: con 3 columnas, estas tarjetas ocupan dos y no queda ningún hueco.
const WIDE = new Set([1, 2, 5]);

const pillToneVar: Record<SkillCard["tone"], string> = {
	blue: "--pill-sky",
	green: "--pill-emerald",
	teal: "--pill-teal",
	purple: "--pill-violet",
	amber: "--pill-amber",
	rose: "--pill-rose",
};

export function SkillsGrid() {
	const { dict } = useLanguage();
	const groups: SkillCard[] = dict.skills.cards;

	return (
		<SectionShell id="skills" className="relative">
			<SectionHeading
				eyebrow={dict.skills.eyebrow}
				index="01"
				title={dict.skills.title}
				description={dict.skills.description}
			/>
			<div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{groups.map((group, index) => {
					const Icon = skillIconMap[group.icon];
					const toneKey = pillToneVar[group.tone] ?? "--pill-sky";
					return (
						<motion.div
							key={group.title}
							{...revealWith({ delay: (index % 3) * 0.08, duration: 0.8 })}
							data-spotlight
							className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl surface-card p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 ${
								WIDE.has(index) ? "lg:col-span-2" : ""
							}`}
						>
							<span aria-hidden="true" className="spotlight" />
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-200/5 via-transparent to-rose-300/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							<span
								aria-hidden="true"
								className="font-display tabular marquee-outline pointer-events-none absolute right-5 top-3 text-[clamp(3rem,5vw,4.5rem)] leading-none opacity-80 transition-transform duration-500 group-hover:-translate-y-1"
							>
								{String(group.items.length).padStart(2, "0")}
							</span>
							<div className="relative z-10 flex items-center gap-3 pr-20">
								<span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5">
									<Icon className="h-5 w-5 text-[var(--accent-warm)]" aria-hidden="true" />
								</span>
								<h3 className="text-lg font-semibold text-[var(--foreground)]">{group.title}</h3>
							</div>
							<motion.ul
								className="relative z-10 flex flex-wrap gap-2"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.4 }}
								variants={{ visible: { transition: { staggerChildren: 0.03, delayChildren: 0.15 + (index % 3) * 0.08 } } }}
							>
								{group.items.map((item, idx) => (
									<motion.li
										key={`${item}-${idx}`}
										variants={{
											hidden: { opacity: 0, y: 8, scale: 0.96 },
											visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
										}}
										className="rounded-full border px-3 py-1 text-xs font-semibold transition-transform duration-200 hover:-translate-y-0.5"
										style={{
											borderColor: `var(${toneKey}-border)`,
											backgroundColor: `var(${toneKey}-bg)`,
											color: `var(${toneKey}-text)`,
										}}
									>
										{item}
									</motion.li>
								))}
							</motion.ul>
						</motion.div>
					);
				})}
			</div>
		</SectionShell>
	);
}
