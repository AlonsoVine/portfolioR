'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { useLanguage } from "@/i18n";
import { ArrowRight, Bot, Code2, Cog, Languages, MapPin, Target, Zap } from "lucide-react";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

const highlightIconMap = {
	code: Code2,
	target: Target,
	gear: Cog,
	zap: Zap,
	pin: MapPin,
	languages: Languages,
	bot: Bot,
} as const;

export function About() {
	const { dict } = useLanguage();
	const paragraphs = dict.about.textBlocks;
	const highlights = dict.about.highlights;
	const cta = dict.about.cta;
	return (
		<SectionShell id="about">
			<SectionHeading
				eyebrow={dict.about.eyebrow}
				title={dict.about.title}
				description={dict.about.description}
			/>
			<div className="mt-12 grid gap-10 md:grid-cols-2 md:items-stretch">
				<div className="flex flex-col gap-6">
					<motion.div
						{...(scrollRevealConfig as any)}
						className="group relative rounded-[32px] border-soft bg-gradient-to-b from-white/20 to-transparent p-2 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-transform duration-500 ease-out hover:-translate-y-1"
					>
						<div className="relative overflow-hidden rounded-[28px]">
							<div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/10 via-transparent to-amber-200/10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
							<Image
								src={`${prefix}/assets/img/about-img.png`}
								alt="Alonso Vine - Desarrollador y Analista"
								width={640}
								height={640}
								className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
							/>
							<div className="pointer-events-none absolute inset-0 flex items-end justify-start p-4">
								<span
									className="translate-y-2 text-lg font-semibold tracking-[0.18em] text-white opacity-0 drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100"
									style={{ fontFamily: "var(--font-cinzel)" }}
								>
									ALONSO&nbsp;VIÑÉ
								</span>
							</div>
						</div>
						<div className="absolute -inset-1 rounded-[34px] border-soft opacity-70 blur-xl" />
					</motion.div>
					{highlights?.length ? (
						<motion.div
							{...(scrollRevealConfig as any)}
							transition={{ ...(scrollRevealConfig as any).transition, delay: 0.2 }}
							className="grid gap-4 sm:grid-cols-3"
						>
							{highlights.map((item) => {
								const Icon = highlightIconMap[item.icon as keyof typeof highlightIconMap] ?? Code2;
								return (
									<div
										key={item.title}
										className="rounded-2xl surface-card p-4 text-left text-[var(--foreground)] shadow-[0_15px_35px_rgba(15,23,42,0.25)]"
									>
										<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
											<Icon className="h-5 w-5 text-[var(--accent-warm)]" aria-hidden="true" />
										</div>
										<h4 className="text-sm font-semibold">{item.title}</h4>
										<p className="mt-1 text-xs text-muted">{item.description}</p>
									</div>
								);
							})}
						</motion.div>
					) : null}
				</div>
				<motion.div
					{...(scrollRevealConfig as any)}
					transition={{ ...(scrollRevealConfig as any).transition, delay: 0.15 }}
					className="relative flex h-full flex-col overflow-hidden rounded-3xl surface-card p-8 text-muted shadow-[0_30px_80px_rgba(15,23,42,0.35)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_30px_90px_rgba(251,191,36,0.15)]"
				>
					<div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100">
						<div className="absolute inset-0 bg-gradient-to-br from-[color:var(--accent-warm-soft)] via-transparent to-rose-300/10" />
					</div>
					<div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
					<div className="flex h-full flex-col gap-6">
						{paragraphs.map((text) => (
							<p key={text} className="text-lg leading-relaxed text-[var(--foreground)]">
								{text}
							</p>
						))}
						{cta ? (
							<a
								href={cta.href}
								className="group mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--accent-warm)]"
							>
								{cta.label}
								<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
							</a>
						) : null}
					</div>
				</motion.div>
			</div>
		</SectionShell>
	);
}
