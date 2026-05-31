'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, GithubIcon, Linkedin, MapPin, Twitter } from "lucide-react";
import { useLanguage } from "@/i18n";
import { calcYearsExperience } from "@/lib/years";

const socialIconMap = {
	linkedin: Linkedin,
	github: GithubIcon,
	twitter: Twitter,
} as const;

type CTA = {
	label: string;
	href: string;
	download?: boolean;
};

type HeroImageFace = {
	src: string;
	alt: string;
};

export function Hero() {
	const { dict } = useLanguage();
	const { hero, socialLinks, experiences } = dict;
	const { title, role, subtitle, image, ctas, location, availability } = hero;
	const yearsExp = calcYearsExperience(experiences.map((e) => e.period));
	const subtitleWithYears = subtitle.replace("{years}", String(yearsExp));
	const cvHref = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${ctas.secondary.href}`;
	const prefix: string = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
	const { scrollY } = useScroll();
	const translate = useTransform(scrollY, [0, 400], [0, -40]);
	const rotate = useTransform(scrollY, [0, 400], [0, -3]);

	return (
		<section id="hero" className="relative scroll-mt-32 overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.25),_transparent_55%)]" />
			<div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-24 pt-32 text-[var(--foreground)] sm:px-6 lg:flex-row lg:items-center lg:gap-20">
				<div className="flex-1 text-left">
					<h1>
						<motion.span
							className="block text-5xl font-semibold leading-[1.05] tracking-wide sm:text-6xl md:text-7xl lg:text-8xl"
							style={{ fontFamily: "var(--font-cinzel)" }}
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.8 }}
						>
							{title.split(/\s+/).map((word, i, arr) => (
								<span key={i}>
									<span className="text-[var(--foreground)]">{word[0]}</span>
									<span className="text-[var(--foreground)]/20">{word.slice(1).toUpperCase()}</span>
									{i < arr.length - 1 ? " " : null}
								</span>
							))}
						</motion.span>
						<motion.span
							className="mt-3 block text-2xl font-medium text-muted sm:text-3xl"
							initial={{ opacity: 0, y: 24 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.25, duration: 0.85 }}
						>
							{role}
						</motion.span>
					</h1>
					<motion.p
						className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.7 }}
					>
						<MapPin className="h-4 w-4 text-[var(--accent-warm)]" aria-hidden="true" />
						{location}
					</motion.p>
					<motion.p
						className="mt-4 max-w-2xl text-lg text-muted"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.35, duration: 0.85 }}
					>
						{subtitleWithYears}
					</motion.p>
					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.45, duration: 0.9 }}
						className="mt-8 flex flex-wrap items-center gap-4"
					>
						<a
							href={ctas.primary.href}
							className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-8 py-3 text-base font-semibold text-slate-900 shadow-[0_20px_60px_rgba(248,212,128,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
						>
							{ctas.primary.label}
							<span className="absolute inset-0 rounded-full bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</a>
						<a
							href={cvHref}
							className="group relative inline-flex rounded-full bg-gradient-to-r from-amber-400 to-rose-400 p-[1px] text-base font-semibold transition-transform duration-300 hover:-translate-y-0.5"
							target="_blank"
							rel="noreferrer"
							download={ctas.secondary.download || undefined}
						>
							<span className="inline-flex items-center gap-2 rounded-full bg-[var(--hero-cta-surface)] px-8 py-3 text-[var(--foreground)] transition-all duration-300 group-hover:bg-white/10">
								<Download className="h-4 w-4 text-[var(--foreground)]/80 transition-colors group-hover:text-[var(--foreground)]" aria-hidden="true" />
								{ctas.secondary.label}
							</span>
							<span className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						</a>
						<a
							href={ctas.tertiary.href}
							className="group inline-flex items-center gap-1.5 px-2 py-3 text-base font-semibold text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--accent-warm)]"
						>
							{ctas.tertiary.label}
							<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
						</a>
					</motion.div>
					<motion.div
						className="mt-12 flex items-center gap-4"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
					>
						{socialLinks.map((social) => {
							const Icon = socialIconMap[social.icon];
							return (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noreferrer"
									className="group inline-flex h-12 w-12 items-center justify-center rounded-full border-soft text-[var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:border-strong"
								>
									<Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
								</a>
							);
						})}
					</motion.div>
				</div>
				<motion.div style={{ y: translate, rotate }} className="flex w-full justify-center lg:w-auto">
					<div className="relative h-72 w-72 sm:h-80 sm:w-80">
						<div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/30 via-transparent to-rose-400/30 blur-3xl" />
						<div className="avatar-stack relative h-full w-full">
							<div className="avatar-flip">
								<div className="avatar-face front">
									<Image
										src={`${prefix}${image.front.src}`}
										alt={image.front.alt}
										fill
										sizes="(max-width: 768px) 16rem, 18rem"
										className="object-cover"
										priority
									/>
								</div>
								<div className="avatar-face back">
									<Image
										src={`${prefix}${image.back.src}`}
										alt={image.back.alt}
										fill
										sizes="(max-width: 768px) 16rem, 18rem"
										className="object-cover"
										priority
									/>
								</div>
							</div>
						</div>
						{availability ? (
							<motion.div
								initial={{ opacity: 0, y: -8, scale: 0.96 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								transition={{ delay: 0.75, duration: 0.5, ease: "easeOut" }}
								className="pointer-events-none absolute -bottom-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap"
							>
								<span className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-panel)] px-4 py-2 text-xs font-medium text-[var(--foreground)] shadow-[0_15px_40px_rgba(15,23,42,0.45)] ring-1 ring-emerald-400/30 backdrop-blur-xl">
									<span className="relative flex h-2 w-2">
										<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
										<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
									</span>
									{availability}
								</span>
							</motion.div>
						) : null}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
