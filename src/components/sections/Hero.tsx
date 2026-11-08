'use client';

import {
	motion,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import Image from "next/image";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";
import { ArrowRight, Download, GithubIcon, Linkedin, MapPin, Twitter } from "lucide-react";
import { useLanguage } from "@/i18n";
import { calcYearsExperience } from "@/lib/years";
import { withBasePath } from "@/lib/utils";
import { RotatingTagline } from "../ui/RotatingTagline";
import { CountUp } from "../ui/CountUp";

const socialIconMap = {
	linkedin: Linkedin,
	github: GithubIcon,
	twitter: Twitter,
} as const;

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
	const { dict } = useLanguage();
	const { hero, socialLinks, experiences, ui } = dict;
	const { title, role, subtitle, image, ctas, location, availability } = hero;
	const isEn = dict.lang === "en";
	const yearsExp = calcYearsExperience(experiences.map((e) => e.period));
	const subtitleWithYears = subtitle.replace("{years}", String(yearsExp));
	const currentExp =
		experiences.find((e) => /actual|present|current/i.test(e.period)) ?? experiences[0];
	const projectsCount = dict.projects.items.length;
	const companiesCount = new Set(experiences.map((e) => e.company.replace(/\s*\(.*\)\s*/, "").trim())).size;
	const certsCount = dict.education.items.length;
	const taglines = (
		isEn
			? [
					`Currently · ${currentExp?.title ?? ""}`,
					currentExp?.tech?.slice(0, 3).join(" · ") ?? "",
					`${yearsExp}+ years shipping code to production`,
					"Frontend · Backend · DevOps",
					`${projectsCount} GitHub projects · 1 playable, the rest pure code`,
					"English C2 + Spanish · ready for international teams",
				]
			: [
					`Actualmente · ${currentExp?.title ?? ""}`,
					currentExp?.tech?.slice(0, 3).join(" · ") ?? "",
					`${yearsExp}+ años entregando código en producción`,
					"Frontend · Backend · DevOps",
					`${projectsCount} proyectos en GitHub · 1 jugable, el resto código`,
					"Inglés C2 + Español · entornos internacionales OK",
				]
	).filter((t) => t.trim().length > 0);
	const cvHref = withBasePath(ctas.secondary.href);

	const reduce = useReducedMotion();
	const sectionRef = useRef<HTMLElement>(null);
	const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
	const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
	const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
	const avatarY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);
	const avatarRotate = useTransform(scrollYProgress, [0, 0.6], [0, -3]);

	const tiltX = useMotionValue(0);
	const tiltY = useMotionValue(0);
	const springX = useSpring(tiltX, { stiffness: 160, damping: 18 });
	const springY = useSpring(tiltY, { stiffness: 160, damping: 18 });

	const onAvatarMove = (event: ReactPointerEvent<HTMLDivElement>) => {
		if (reduce || event.pointerType !== "mouse") return;
		const rect = event.currentTarget.getBoundingClientRect();
		const px = (event.clientX - rect.left) / rect.width - 0.5;
		const py = (event.clientY - rect.top) / rect.height - 0.5;
		tiltX.set(py * -12);
		tiltY.set(px * 12);
	};
	const onAvatarLeave = () => {
		tiltX.set(0);
		tiltY.set(0);
	};

	const words = title.split(/\s+/);
	let letterIndex = 0;

	const stats = [
		{ value: yearsExp, suffix: "+", label: ui.heroStats.years },
		{ value: companiesCount, suffix: "", label: ui.heroStats.companies },
		{ value: projectsCount, suffix: "", label: ui.heroStats.projects },
		{ value: certsCount, suffix: "", label: ui.heroStats.certifications },
	];

	return (
		<section
			id="hero"
			ref={sectionRef}
			className="relative flex min-h-[100svh] scroll-mt-32 flex-col overflow-hidden"
		>
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.25),_transparent_55%)]" />
			<motion.div
				style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
				className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-4 pb-20 pt-32 text-[var(--foreground)] sm:px-6 lg:pt-36"
			>
				<h1 className="hero-name">
					<span className="sr-only">{title} · </span>
					<span
						aria-hidden="true"
						className="font-display block whitespace-normal text-[clamp(3.4rem,17vw,5.5rem)] sm:text-[clamp(2.9rem,9.6vw,8.75rem)] font-semibold leading-[0.95] tracking-[0.02em]"
					>
						{words.map((word, wi) => (
							<span key={wi} className="inline-block whitespace-nowrap">
								{Array.from(word).map((char, ci) => {
									const i = letterIndex++;
									const style = { "--i": i } as CSSProperties;
									return ci === 0 ? (
										<span key={ci} className="hero-letter text-[var(--foreground)]" style={style}>
											{char}
										</span>
									) : (
										<span key={ci} className="hero-letter letter-muted text-[var(--foreground)]" style={style}>
											{char.toUpperCase()}
										</span>
									);
								})}
								{wi < words.length - 1 ? <span className="inline-block w-[0.28em]" /> : null}
							</span>
						))}
					</span>
					<span
						className="hero-in-solid mt-5 block text-2xl font-medium text-muted sm:text-3xl"
						style={delay(380)}
					>
						{role}
					</span>
				</h1>

				<div className="mt-6 grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-20">
					<div>
						<p className="hero-in inline-flex items-center gap-1.5 text-sm text-muted" style={delay(460)}>
							<MapPin className="h-4 w-4 text-[var(--accent-warm)]" aria-hidden="true" />
							{location}
						</p>
						<div className="hero-in max-w-2xl" style={delay(520)}>
							<RotatingTagline phrases={taglines} />
						</div>
						<p className="hero-in-solid mt-4 max-w-2xl text-lg text-muted" style={delay(580)}>
							{subtitleWithYears}
						</p>
						<div className="hero-in mt-8 flex flex-wrap items-center gap-4" style={delay(660)}>
							<span data-magnetic className="magnetic">
								<a
									href={ctas.primary.href}
									className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-8 py-3 text-base font-semibold text-slate-900 shadow-[0_20px_60px_rgba(248,212,128,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
								>
									{ctas.primary.label}
									<span className="absolute inset-0 rounded-full bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</a>
							</span>
							<span data-magnetic className="magnetic">
								<a
									href={cvHref}
									className="group relative inline-flex rounded-full bg-gradient-to-r from-amber-400 to-rose-400 p-[1px] text-base font-semibold transition-transform duration-300 hover:-translate-y-0.5"
									target="_blank"
									rel="noreferrer"
									download={ctas.secondary.download || undefined}
								>
									<span className="inline-flex items-center gap-2 rounded-full bg-[var(--hero-cta-surface)] px-8 py-3 text-[var(--foreground)] transition-colors duration-300 group-hover:bg-[var(--hero-cta-surface-hover)]">
										<Download className="h-4 w-4 text-[var(--foreground)]/80 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:text-[var(--foreground)]" aria-hidden="true" />
										{ctas.secondary.label}
									</span>
									<span className="pointer-events-none absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</a>
							</span>
							<a
								href={ctas.tertiary.href}
								className="group inline-flex items-center gap-1.5 px-2 py-3 text-base font-semibold text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--accent-warm)]"
							>
								{ctas.tertiary.label}
								<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
							</a>
						</div>

						<dl className="hero-in mt-12 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-soft pt-6 sm:grid-cols-4" style={delay(760)}>
							{stats.map((stat) => (
								<div key={stat.label} className="flex flex-col gap-1">
									<dt className="order-2 text-[11px] uppercase leading-snug tracking-[0.2em] text-muted">{stat.label}</dt>
									<dd className="font-display tabular order-1 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
										<CountUp value={stat.value} suffix={stat.suffix} />
									</dd>
								</div>
							))}
						</dl>

						<div className="hero-in mt-8 flex items-center gap-4" style={delay(840)}>
							{socialLinks.map((social) => {
								const Icon = socialIconMap[social.icon];
								return (
									<a
										key={social.label}
										href={social.href}
										target="_blank"
										rel="noreferrer"
										aria-label={ui.socialProfile.replace("{name}", social.label)}
										className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-soft text-[var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:border-strong"
									>
										<Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
									</a>
								);
							})}
						</div>
					</div>

					<div className="hero-in flex w-full justify-center lg:w-auto" style={delay(300)}>
					<motion.div style={reduce ? undefined : { y: avatarY, rotate: avatarRotate }}>
						<div
							className="relative h-72 w-72 [perspective:900px] sm:h-80 sm:w-80"
							onPointerMove={onAvatarMove}
							onPointerLeave={onAvatarLeave}
						>
							<div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400/30 via-transparent to-rose-400/30 blur-3xl" />
							<motion.div
								className="relative h-full w-full"
								style={reduce ? undefined : { rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
							>
								<div className="avatar-stack relative h-full w-full">
									<div className="avatar-flip">
										<div className="avatar-face front">
											<Image
												src={withBasePath(image.front.src)}
												alt={image.front.alt}
												fill
												sizes="(max-width: 640px) 18rem, 20rem"
												className="object-cover"
												priority
											/>
										</div>
										<div className="avatar-face back">
											<Image
												src={withBasePath(image.back.src)}
												alt={image.back.alt}
												fill
												sizes="(max-width: 640px) 18rem, 20rem"
												className="object-cover"
											/>
										</div>
									</div>
								</div>
							</motion.div>
							{availability ? (
								<div
									className="hero-in pointer-events-none absolute -bottom-3 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap"
									style={delay(900)}
								>
									<span className="inline-flex items-center gap-2 rounded-full bg-[var(--surface-panel)] px-4 py-2 text-xs font-medium text-[var(--foreground)] shadow-[0_15px_40px_rgba(15,23,42,0.45)] ring-1 ring-emerald-400/30 backdrop-blur-xl">
										<span className="relative flex h-2 w-2">
											<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:animate-none" />
											<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
										</span>
										{availability}
									</span>
								</div>
							) : null}
						</div>
					</motion.div>
					</div>
				</div>
			</motion.div>

			<a
				href="#skills"
				className="hero-in group relative mx-auto mb-8 hidden flex-col items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-muted transition-colors hover:text-[var(--foreground)] md:flex print:hidden"
				style={delay(1100)}
			>
				{ui.scrollCue}
				<span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-[var(--divider-line)]">
					<span className="scroll-cue-dot absolute left-0 top-0 h-3 w-px bg-[var(--accent-warm)]" />
				</span>
			</a>
		</section>
	);
}
