'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Download, GithubIcon, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/i18n";

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
	const { hero, socialLinks } = dict;
	const { eyebrow, title, role, subtitle, image, ctas } = hero;
	const cvHref = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${ctas.secondary.href}`;
	const { scrollY } = useScroll();
	const translate = useTransform(scrollY, [0, 400], [0, -40]);
	const rotate = useTransform(scrollY, [0, 400], [0, -3]);

	return (
		<section id="hero" className="relative overflow-hidden">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.25),_transparent_55%)]" />
			<div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-24 pt-32 text-[var(--foreground)] sm:px-6 lg:flex-row lg:items-center lg:gap-20">
				<div className="flex-1 text-left">
					<motion.span
						className="inline-flex items-center gap-2 rounded-full border-soft bg-white/10 px-6 py-2 text-xs uppercase tracking-[0.45em]"
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1, duration: 0.6 }}
					>
						{eyebrow}
					</motion.span>
					<motion.h1
						className="mt-6 text-4xl font-semibold leading-tight tracking-wide sm:text-5xl lg:text-6xl"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2, duration: 0.8 }}
					>
						{title}
					</motion.h1>
					<motion.h2
						className="mt-3 text-2xl font-medium text-muted sm:text-3xl"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.25, duration: 0.85 }}
					>
						{role}
					</motion.h2>
					<motion.p
						className="mt-4 max-w-2xl text-lg text-muted"
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.35, duration: 0.85 }}
					>
						{subtitle}
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
					</div>
				</motion.div>
			</div>
		</section>
	);
}
