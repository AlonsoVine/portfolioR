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

const pillToneMap: Record<SkillCard["tone"], string> = {
	blue: "border-sky-300/40 bg-sky-300/15 text-sky-100",
	green: "border-emerald-300/40 bg-emerald-300/15 text-emerald-100",
	teal: "border-teal-300/40 bg-teal-300/15 text-teal-100",
	purple: "border-violet-300/40 bg-violet-300/15 text-violet-50",
	amber: "border-amber-300/40 bg-amber-300/15 text-amber-100",
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
									<Icon className="h-5 w-5 text-amber-200" aria-hidden="true" />
								</span>
								<p className="text-lg font-semibold text-[var(--foreground)]">{group.title}</p>
							</div>
							<div className="relative z-10 flex flex-wrap gap-2">
								{group.items.map((item) => (
									<span
										key={item}
										className={`rounded-full border px-3 py-1 text-xs font-semibold ${pillToneMap[group.tone]}`}
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
