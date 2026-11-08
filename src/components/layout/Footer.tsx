"use client";

import { motion } from "framer-motion";
import { GithubIcon, Linkedin, Mail, Printer } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n";
import { EASE_OUT_EXPO } from "@/lib/utils";
import { useIsClient } from "@/lib/useIsClient";
import { LighthouseBadge } from "../ui/LighthouseBadge";

const socialIconMap = {
	linkedin: Linkedin,
	github: GithubIcon,
} as const;

function madridTime(locale: string) {
	return new Intl.DateTimeFormat(locale, {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "Europe/Madrid",
	}).format(new Date());
}

function MadridClock({ label, locale }: { label: string; locale: string }) {
	const isClient = useIsClient();
	const [, setTick] = useState(0);

	useEffect(() => {
		const id = window.setInterval(() => setTick((t) => t + 1), 30_000);
		return () => window.clearInterval(id);
	}, []);

	return (
		<p className="print-hide inline-flex items-center gap-2 text-xs text-subtle">
			<span className="relative flex h-1.5 w-1.5">
				<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
			</span>
			<span>{label}</span>
			<span className="tabular font-medium text-[var(--foreground)]">{isClient ? madridTime(locale) : "--:--"}</span>
		</p>
	);
}

export function Footer() {
	const { dict } = useLanguage();
	const year = new Date().getFullYear();
	const footerSocials = dict.socialLinks.filter(
		(link) => link.icon === "linkedin" || link.icon === "github",
	);
	const navLinks = dict.nav.links;
	const role = dict.hero.role;
	const location = dict.hero.location;
	const printLabel = dict.ui.print.label;
	const printHint = dict.ui.print.hint;
	const handlePrint = () => {
		if (typeof window !== "undefined") window.print();
	};
	const signature = dict.hero.title.split(/\s+/);

	return (
		<footer className="relative mt-24 overflow-hidden border-t border-soft/60 pt-14 pb-10 text-sm text-subtle">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
				<div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
					<div className="flex flex-col gap-3">
						<p className="text-sm text-muted">{role}</p>
						<p className="text-xs text-subtle">{location}</p>
						<MadridClock label={dict.ui.madridTime} locale={dict.ui.locale} />
					</div>

					<nav
						aria-label={dict.ui.a11y.footerNav}
						className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-muted sm:grid-cols-4 lg:flex lg:flex-wrap lg:justify-end lg:gap-x-8"
					>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="group inline-flex items-center gap-2 transition-colors duration-300 hover:text-[var(--foreground)]"
							>
								<span className="h-px w-0 bg-[var(--accent-warm)] transition-all duration-300 group-hover:w-3" aria-hidden="true" />
								{link.label}
							</a>
						))}
					</nav>
				</div>

				<motion.p
					aria-hidden="true"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
					className="font-display select-none whitespace-nowrap text-center text-[clamp(2.2rem,10.2vw,8.6rem)] font-semibold leading-[0.9] tracking-[0.04em] text-[var(--foreground)]"
				>
					{signature.map((word, wi) => (
						<span key={wi} className="inline-block">
							{Array.from(word).map((char, ci) => {
								return (
									<span key={ci} className="-mt-[0.25em] inline-block overflow-hidden pb-[0.08em] pt-[0.25em] align-top">
										<motion.span
											className="inline-block"
											style={{ opacity: ci === 0 ? 1 : "var(--name-muted)" }}
											variants={{
												hidden: { y: "105%" },
												visible: { y: "0%", transition: { duration: 1, ease: EASE_OUT_EXPO } },
											}}
										>
											{ci === 0 ? char : char.toUpperCase()}
										</motion.span>
									</span>
								);
							})}
							{wi < signature.length - 1 ? <span className="inline-block w-[0.3em]" /> : null}
						</span>
					))}
				</motion.p>

				<div className="flex flex-col gap-6 border-t border-soft/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
						<p className="text-xs text-subtle">© {year} Alonso Viñé Barrancos</p>
						<LighthouseBadge />
					</div>
					<div className="flex flex-wrap items-center gap-3">
						{footerSocials.map((social) => {
							const Icon = socialIconMap[social.icon as keyof typeof socialIconMap];
							return (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noreferrer"
									aria-label={social.label}
									className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-strong"
								>
									<Icon className="h-4 w-4" aria-hidden="true" />
								</a>
							);
						})}
						<a
							href="mailto:alonvineba@gmail.com"
							aria-label="Email"
							className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-strong"
						>
							<Mail className="h-4 w-4" aria-hidden="true" />
						</a>
						<span
							aria-hidden="true"
							className="mx-1 h-6 w-px bg-[var(--foreground)]/15"
						/>
						<button
							type="button"
							onClick={handlePrint}
							aria-label={printLabel}
							title={printHint}
							className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-strong print:hidden"
						>
							<Printer className="h-4 w-4" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
