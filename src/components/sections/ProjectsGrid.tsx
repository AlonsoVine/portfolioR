'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { GithubIcon, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n";

const techPillPalette = ["--pill-emerald", "--pill-sky", "--pill-amber", "--pill-violet", "--pill-rose", "--pill-teal"];
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
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
		),
	);
};

export function ProjectsGrid() {
	const { dict } = useLanguage();
	const { projects } = dict;

	return (
		<SectionShell id="projects">
			<SectionHeading eyebrow={projects.eyebrow} title={projects.title} description={projects.description} />
			<div className="mt-12 grid gap-8 md:grid-cols-2">
				{projects.items.map((project, index) => (
						<motion.article
						key={project.title}
						{...scrollRevealConfig}
						transition={{ delay: index * 0.08 }}
						className="group relative flex h-full flex-col overflow-hidden rounded-3xl surface-card shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(251,191,36,0.18)]"
					>
						<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
							<div className="absolute inset-0 bg-gradient-to-br from-amber-200/8 via-transparent to-rose-300/8" />
						</div>
						<div className="relative overflow-hidden">
							<Image
								src={`${prefix}${project.image}`}
								alt={project.title}
								width={1200}
								height={800}
								className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent opacity-80" />
						</div>
						<div className="flex flex-1 flex-col gap-6 p-8">
							<div className="flex flex-col gap-3">
								<div className="flex items-center gap-3">
									<h3 className="text-2xl font-semibold text-[var(--foreground)]">{project.title}</h3>
									{project.featured ? (
										<span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-warm-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-warm)]">
											<Sparkles className="h-4 w-4" aria-hidden="true" />
											{projects.featuredLabel}
										</span>
									) : null}
								</div>
								<p className="text-base text-muted">{highlightTech(project.description, project.tech)}</p>
							</div>
							<div className="flex flex-wrap gap-2">
								{project.tech.map((tech, i) => {
									const tone = techPillPalette[i % techPillPalette.length];
									return (
										<span
											key={tech}
											className="rounded-full border px-3 py-1 text-xs font-semibold"
											style={{
												borderColor: `var(${tone}-border)`,
												backgroundColor: `var(${tone}-bg)`,
												color: `var(${tone}-text)`,
											}}
										>
											{tech}
										</span>
									);
								})}
							</div>
							<div className={`mt-auto grid grid-cols-1 gap-3 ${project.links.demo ? "sm:grid-cols-2" : ""}`}>
								<a
									href={project.links.code}
									target="_blank"
									rel="noreferrer"
									className="inline-flex items-center justify-center gap-2 rounded-xl border border-soft bg-black/20 px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300"
								>
									<GithubIcon className="h-4 w-4" aria-hidden="true" />
									{projects.codeLabel}
								</a>
								{project.links.demo ? (
									<a
										href={project.links.demo}
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_20px_50px_rgba(52,211,153,0.35)] transition-all duration-300 hover:-translate-y-0.5"
									>
										{projects.demoLabel}
									</a>
								) : null}
							</div>
						</div>
					</motion.article>
				))}
			</div>
		</SectionShell>
	);
}
