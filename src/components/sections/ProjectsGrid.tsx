'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { Project } from "@/data/portfolio";
import { scrollRevealConfig } from "@/lib/utils";
import { GithubIcon, Sparkles } from "lucide-react";

const techPillPalette = ["border-emerald-300/40 bg-emerald-300/15 text-emerald-100", "border-sky-300/40 bg-sky-300/15 text-sky-100", "border-amber-300/40 bg-amber-300/15 text-amber-100", "border-violet-300/40 bg-violet-300/15 text-violet-100"];

type ProjectsGridProps = {
	projects: Project[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
	return (
		<SectionShell id="projects">
			<SectionHeading
				eyebrow="Casos"
				title="Proyectos destacados"
				description="Una muestra de lo que construyo."/>
			<div className="mt-12 grid gap-8 md:grid-cols-2">
				{projects.map((project, index) => (
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
								src={project.image}
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
										<span className="inline-flex items-center gap-2 rounded-full bg-amber-300/15 px-3 py-1 text-xs font-semibold text-amber-200">
											<Sparkles className="h-4 w-4" aria-hidden="true" />
											Destacado
										</span>
									) : null}
								</div>
								<p className="text-base text-muted">{project.description}</p>
							</div>
							<div className="flex flex-wrap gap-2">
								{project.tech.map((tech, i) => {
									const tone = techPillPalette[i % techPillPalette.length];
									return (
										<span key={tech} className={`rounded-full border px-3 py-1 text-xs font-semibold ${tone}`}>
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
									Codigo
								</a>
								{project.links.demo ? (
									<a
										href={project.links.demo}
										target="_blank"
										rel="noreferrer"
										className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_20px_50px_rgba(52,211,153,0.35)] transition-all duration-300 hover:-translate-y-0.5"
									>
										Ver Demo
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
