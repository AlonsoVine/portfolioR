'use client';

import { motion } from "framer-motion";
import { BadgeCheck, CloudCog, Code2, Database, Layers, Wrench } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { SkillCard } from "@/data/portfolio";
import { scrollRevealConfig } from "@/lib/utils";

const skillIconMap = {
	code: Code2,
	layers: Layers,
	cloud: CloudCog,
	database: Database,
	wrench: Wrench,
	badge: BadgeCheck,
} as const;

const pillToneVar: Record<SkillCard["tone"], string> = {
	blue: "--pill-sky",
	green: "--pill-emerald",
	teal: "--pill-teal",
	purple: "--pill-violet",
	amber: "--pill-amber",
	rose: "--pill-rose",
};

type SkillsGridProps = {
	groups: SkillCard[];
};

export function SkillsGrid({ groups }: SkillsGridProps) {
	return (
		<SectionShell id="skills" className="relative">
			<SectionHeading
				eyebrow="Stack"
				title="Stack Tecnológico"
				description="Agrupación de mis habilidades clave y las herramientas esenciales que utilizo diariamente"
			/>
			<div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{groups.map((group, index) => {
					const Icon = skillIconMap[group.icon];
					const toneKey = pillToneVar[group.tone] ?? "--pill-sky";
					return (
						<motion.div
							key={group.title}
							{...scrollRevealConfig}
							transition={{ delay: index * 0.05, duration: 0.55 }}
							className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl surface-card p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
						>
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-200/5 via-transparent to-rose-300/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
							<div className="relative z-10 flex items-center gap-3">
								<span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/5">
									<Icon className="h-5 w-5 text-[var(--accent-warm)]" aria-hidden="true" />
								</span>
								<p className="text-lg font-semibold text-[var(--foreground)]">{group.title}</p>
							</div>
							<div className="relative z-10 flex flex-wrap gap-2">
								{group.items.map((item) => (
									<span
										key={item}
										className="rounded-full border px-3 py-1 text-xs font-semibold"
										style={{
											borderColor: `var(${toneKey}-border)`,
											backgroundColor: `var(${toneKey}-bg)`,
											color: `var(${toneKey}-text)`,
										}}
									>
										{item}
									</span>
								))}
							</div>
						</motion.div>
					);
				})}
			</div>
		</SectionShell>
	);
}
