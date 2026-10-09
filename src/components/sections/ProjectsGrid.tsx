'use client';

import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { GithubIcon, Sparkles } from "lucide-react";
import { useLanguage } from "@/i18n";
import { ProjectCarousel } from "../ui/ProjectCarousel";
import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/data/portfolio";

const techPillPalette = ["--pill-emerald", "--pill-sky", "--pill-amber", "--pill-violet", "--pill-rose", "--pill-teal"];
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

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

type ProjectCardProps = {
	project: Project;
	index: number;
	labels: {
		codeLabel: string;
		demoLabel: string;
		featuredLabel: string;
		galleryLabel: string;
		videoLabel: string;
		mediaToggleLabel: string;
		logoAlt: string;
		videoAlt: string;
	};
};

function ProjectCard({ project, index, labels }: ProjectCardProps) {
	const [showVideo, setShowVideo] = useState(false);
	const isSpotlight = project.spotlight;

	return (
		<motion.article
			{...scrollRevealConfig}
			transition={{ delay: index * 0.08 }}
			className={`group relative flex h-full flex-col overflow-hidden rounded-3xl surface-card shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_100px_rgba(251,191,36,0.18)] ${
				isSpotlight ? "md:col-span-2 lg:grid lg:grid-cols-[minmax(0,1.25fr)_minmax(22rem,0.75fr)]" : ""
			}`}
		>
			<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
				<div className="absolute inset-0 bg-gradient-to-br from-amber-200/8 via-transparent to-rose-300/8" />
			</div>
			<div className={`relative overflow-hidden ${isSpotlight ? "lg:min-h-[460px]" : ""}`}>
				{isSpotlight && project.video ? (
					<div
						role="group"
						aria-label={labels.mediaToggleLabel}
						className="absolute right-4 top-4 z-20 inline-flex rounded-full border border-white/15 bg-slate-950/80 p-1 shadow-lg backdrop-blur-md"
					>
						<button
							type="button"
							onClick={() => setShowVideo(false)}
							aria-pressed={!showVideo}
							className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
								!showVideo ? "bg-white text-slate-950" : "text-white/75 hover:text-white"
							}`}
						>
							{labels.galleryLabel}
						</button>
						<button
							type="button"
							onClick={() => setShowVideo(true)}
							aria-pressed={showVideo}
							className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
								showVideo ? "bg-white text-slate-950" : "text-white/75 hover:text-white"
							}`}
						>
							{labels.videoLabel}
						</button>
					</div>
				) : null}
				{isSpotlight && showVideo && project.video ? (
					<video
						key={project.video}
						src={`${basePath}${encodeURI(project.video)}`}
						poster={`${basePath}${project.image}`}
						controls
						autoPlay
						loop
						muted
						playsInline
						preload="none"
						aria-label={labels.videoAlt}
						className="h-72 w-full bg-black object-contain md:h-96 lg:h-[460px]"
					/>
				) : (
					<ProjectCarousel
						images={project.gallery && project.gallery.length > 0 ? project.gallery : [project.image]}
						alt={project.title}
						size={isSpotlight ? "large" : "default"}
					/>
				)}
			</div>
			<div className={`flex flex-1 flex-col gap-6 p-8 ${isSpotlight ? "lg:justify-center lg:p-10" : ""}`}>
				<div className="flex flex-col gap-3">
					<div className="flex items-center gap-3">
						{project.logo ? (
							<Image
								src={`${basePath}${project.logo}`}
								alt={labels.logoAlt}
								width={52}
								height={52}
								className="h-12 w-12 rounded-xl object-cover"
							/>
						) : null}
						<h3 className={`font-semibold text-[var(--foreground)] ${isSpotlight ? "text-3xl md:text-4xl" : "text-2xl"}`}>
							{project.title}
						</h3>
						{project.featured ? (
							<span className="inline-flex items-center gap-2 rounded-full bg-[color:var(--accent-warm-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent-warm)]">
								<Sparkles className="h-4 w-4" aria-hidden="true" />
								{labels.featuredLabel}
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
						{labels.codeLabel}
					</a>
					{project.links.demo ? (
						<a
							href={project.links.demo}
							target="_blank"
							rel="noreferrer"
							className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 px-5 py-3 text-sm font-semibold text-slate-900 shadow-[0_20px_50px_rgba(52,211,153,0.35)] transition-all duration-300 hover:-translate-y-0.5"
						>
							{labels.demoLabel}
						</a>
					) : null}
				</div>
			</div>
		</motion.article>
	);
}

export function ProjectsGrid() {
	const { dict } = useLanguage();
	const { projects } = dict;

	return (
		<SectionShell id="projects">
			<SectionHeading eyebrow={projects.eyebrow} title={projects.title} description={projects.description} />
			<div className="mt-12 grid gap-8 md:grid-cols-2">
				{projects.items.map((project, index) => (
					<ProjectCard
						key={project.title}
						project={project}
						index={index}
						labels={projects}
					/>
				))}
			</div>
		</SectionShell>
	);
}
