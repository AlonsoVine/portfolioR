'use client';

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { CurtainReveal } from "../shared/CurtainReveal";
import { ProjectCarousel } from "../ui/ProjectCarousel";
import { PrensaRecord } from "../ui/PrensaRecord";
import { RenamerShowcase } from "../ui/RenamerShowcase";
import { LibertyChart, type LibertyCopy } from "../ui/LibertyChart";
import { cn, EASE_OUT_EXPO, scrollRevealConfig, withBasePath } from "@/lib/utils";
import { useLanguage } from "@/i18n";
import { GITHUB_PROJECTS, socialLinks, type Project } from "@/data/portfolio";

type Labels = {
	codeLabel: string;
	demoLabel: string;
	featuredLabel: string;
	galleryLabel: string;
	videoLabel: string;
	mediaToggleLabel: string;
	logoAlt: string;
	videoAlt: string;
	liberty: LibertyCopy;
	renamer: { window: string; exif: string; fallback: string; summary: string; replay: string };
	prensa: { coverAlt: string; tagline: string; rec: string; facts: string; discLabel: string; hint: string };
};

const pad = (n: number) => String(n).padStart(2, "0");

function ProjectLinks({ project, labels }: { project: Project; labels: Labels }) {
	return (
		<div className="print-hide flex flex-wrap items-center gap-x-6 gap-y-3">
			{project.links.demo ? (
				<a href={project.links.demo} target="_blank" rel="noreferrer" className="btn btn-ink min-h-11">
					{project.demoLinkLabel ?? labels.demoLabel}
					<span aria-hidden="true" className="link-arrow">↗</span>
				</a>
			) : null}
			<a href={project.links.code} target="_blank" rel="noreferrer" className="link-rule text-ink">
				{labels.codeLabel}
				<span aria-hidden="true" className="link-arrow">↗</span>
			</a>
		</div>
	);
}

type Mode = "chart" | "gallery" | "video";

const swap = {
	initial: { clipPath: "inset(0 0 0 100%)", opacity: 1 },
	animate: { clipPath: "inset(0 0 0 0%)", opacity: 1 },
	exit: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
	transition: { duration: 0.75, ease: EASE_OUT_EXPO },
};

function ProjectMedia({ project, labels, large, locale }: { project: Project; labels: Labels; large: boolean; locale: string }) {
	const chart = project.showcase === "liberty";
	const [mode, setMode] = useState<Mode>(chart ? "chart" : "gallery");
	const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
	const modes: { value: Mode; label: string }[] = [
		...(chart ? [{ value: "chart" as const, label: labels.liberty.chartLabel }] : []),
		{ value: "gallery", label: labels.galleryLabel },
		...(project.video ? [{ value: "video" as const, label: labels.videoLabel }] : []),
	];

	const body =
		mode === "chart" ? (
			<LibertyChart backdrop={project.image} copy={labels.liberty} locale={locale} />
		) : project.singleImage ? (
			<div className={cn("media-frame relative w-full", large ? "aspect-[16/11]" : "aspect-[16/10]")}>
				<Image
					src={withBasePath(encodeURI(project.image))}
					alt={project.title}
					fill
					sizes="(min-width: 1024px) 55vw, 100vw"
					className="media-tone object-cover"
				/>
			</div>
		) : mode === "video" && project.video ? (
			<video
				key={project.video}
				src={withBasePath(encodeURI(project.video))}
				poster={withBasePath(project.image)}
				controls
				autoPlay
				loop
				muted
				playsInline
				preload="none"
				aria-label={labels.videoAlt}
				className="aspect-[16/10] w-full bg-black object-contain"
			/>
		) : (
			<ProjectCarousel images={images} alt={project.title} size={large ? "large" : "default"} />
		);

	return (
		<div className="print-hide relative">
			{modes.length > 1 ? (
				// Cambio de vista como un checkout de rama: la nueva entra barriendo a la anterior
				<AnimatePresence mode="popLayout" initial={false}>
					<motion.div key={mode} {...swap}>
						{body}
					</motion.div>
				</AnimatePresence>
			) : (
				<CurtainReveal>{body}</CurtainReveal>
			)}
			{modes.length > 1 ? (
				<div role="group" aria-label={labels.mediaToggleLabel} className="meta mt-4 flex flex-wrap items-center gap-x-5 gap-y-1">
					<span aria-hidden="true" className="text-subtle">
						<span className="text-signal">$</span> git checkout
					</span>
					{modes.map((option) => {
						const active = mode === option.value;
						return (
							<button
								key={option.value}
								type="button"
								onClick={() => setMode(option.value)}
								aria-pressed={active}
								className={cn("relative min-h-11 py-1", active ? "text-ink" : "text-subtle hover:text-ink")}
							>
								{option.label}
								{active ? (
									<motion.span
										layoutId={`media-mode-${project.title}`}
										aria-hidden="true"
										className="absolute inset-x-0 bottom-2 h-px bg-signal"
										transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
									/>
								) : null}
							</button>
						);
					})}
				</div>
			) : null}
		</div>
	);
}

function ProjectRow({ project, index, total, counterLabel, labels, locale }: { project: Project; index: number; total: number; counterLabel: string; labels: Labels; locale: string }) {
	const large = Boolean(project.spotlight);
	// Las dos piezas principales alternan el lado de la imagen; el resto va en una retícula más estrecha.
	const mediaFirst = large ? index % 2 === 1 : false;

	return (
		<motion.article
			{...scrollRevealConfig}
			className={cn("print-row grid-page gap-y-8 border-t border-rule", large ? "py-12 lg:py-16" : "py-10 lg:py-12")}
		>
			<div
				className={cn(
					"col-span-4 flex flex-col gap-6",
					large
						? cn("md:col-span-8 lg:col-span-5", mediaFirst ? "lg:order-2 lg:col-start-8" : "")
						: "md:col-span-4 lg:col-span-6",
				)}
			>
				<div className="flex items-baseline justify-between gap-4">
					<p className="meta text-subtle tabular">
						<span className="sr-only">{counterLabel} </span>
						<span className="text-ink">{pad(index + 1)}</span>
						<span aria-hidden="true"> / </span>
						<span className="sr-only"> / </span>
						{pad(total)}
					</p>
					{project.featured && large ? <p className="meta text-subtle">{labels.featuredLabel}</p> : null}
				</div>
				<h3 className={cn("font-display leading-[0.95] text-ink break-words", large ? "text-[clamp(2.5rem,4.4vw,4.25rem)]" : "text-[clamp(2.1rem,3.4vw,3rem)]")}>
						{project.title}
					</h3>
				<p className="print-compact-text max-w-[52ch] text-[1.0625rem] leading-relaxed text-muted">{project.description}</p>
				<p className="print-compact-text font-mono text-[0.8rem] leading-relaxed text-subtle">{project.tech.join(" · ")}</p>
				<ProjectLinks project={project} labels={labels} />
			</div>
			<div
				className={cn(
					"col-span-4",
					large
						? cn("md:col-span-8 lg:col-span-7", mediaFirst ? "lg:order-1 lg:col-start-1" : "lg:col-start-6")
						: "md:col-span-4 lg:col-span-5 lg:col-start-8",
				)}
			>
				{project.showcase === "prensa" ? (
					<PrensaRecord image={project.image} copy={labels.prensa} />
				) : project.showcase === "renamer" ? (
					<RenamerShowcase image={project.image} alt={project.title} copy={labels.renamer} />
				) : (
					<ProjectMedia project={project} labels={labels} large={large} locale={locale} />
				)}
			</div>
		</motion.article>
	);
}

export function ProjectsGrid() {
	const { dict } = useLanguage();
	const { projects } = dict;
	const github = socialLinks.find((l) => l.icon === "github");

	return (
		<SectionShell id="projects" className="overflow-x-clip pt-20 pb-12 lg:pt-28 lg:pb-16">
			<SectionHeading
				sectionId="projects"
				index="03"
				eyebrow={projects.eyebrow}
				title={projects.title}
				description={projects.description.replace("{projects}", String(GITHUB_PROJECTS))}
				aside={
					github ? (
						<a href={github.href} target="_blank" rel="noreferrer" className="print-hide link-rule shrink-0 text-ink">
							{projects.moreLabel}
							<span aria-hidden="true" className="link-arrow">↗</span>
						</a>
					) : null
				}
			/>
			<div className="print-tight mt-14 lg:mt-20">
				{projects.items.map((project, index) => (
					<ProjectRow
						key={project.title}
						project={project}
						index={index}
						total={projects.items.length}
						counterLabel={dict.ui.projectCounter}
						locale={dict.ui.locale}
						labels={projects}
					/>
				))}
				<div aria-hidden="true" className="h-px bg-rule" />
			</div>
		</SectionShell>
	);
}
