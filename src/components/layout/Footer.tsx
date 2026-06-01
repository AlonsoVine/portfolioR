"use client";

import { GithubIcon, Linkedin, Mail, Printer } from "lucide-react";
import { useLanguage } from "@/i18n";
import { LighthouseBadge } from "../ui/LighthouseBadge";

const socialIconMap = {
	linkedin: Linkedin,
	github: GithubIcon,
} as const;

export function Footer() {
	const { dict } = useLanguage();
	const year = new Date().getFullYear();
	const isEn = dict.lang === "en";
	const footerSocials = dict.socialLinks.filter(
		(link) => link.icon === "linkedin" || link.icon === "github",
	);
	const navLinks = dict.nav.links;
	const role = dict.hero.role;
	const location = dict.hero.location;
	const printLabel = isEn ? "Print live snapshot" : "Imprimir versión actual";
	const printHint = isEn
		? "Always-up-to-date snapshot · prints directly from this page"
		: "Snapshot live siempre actualizado · imprime desde esta página";
	const handlePrint = () => {
		if (typeof window !== "undefined") window.print();
	};

	return (
		<footer className="mt-24 border-t border-soft/60 pt-14 pb-10 text-sm text-subtle">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4">
				<div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
					<div className="flex flex-col gap-3">
						<p
							className="text-3xl tracking-[0.32em] sm:text-4xl"
							style={{ fontFamily: "var(--font-cinzel)" }}
						>
							<span className="text-[var(--foreground)]">A</span>
							<span className="text-[var(--foreground)]/30">LONSO</span>
							<span className="text-[var(--foreground)]/30">&nbsp;</span>
							<span className="text-[var(--foreground)]">V</span>
							<span className="text-[var(--foreground)]/30">IÑÉ</span>
						</p>
						<p className="text-sm text-muted">{role}</p>
						<p className="text-xs text-subtle">{location}</p>
					</div>

					<nav
						aria-label="Footer navigation"
						className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-muted sm:grid-cols-3 md:auto-cols-max md:grid-flow-col md:gap-x-8"
					>
						{navLinks.map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="transition-colors duration-300 hover:text-[var(--foreground)]"
							>
								{link.label}
							</a>
						))}
					</nav>
				</div>

				<div className="flex flex-col gap-6 border-t border-soft/30 pt-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
						<p className="text-xs text-subtle">© {year} Alonso Viñé Barrancos</p>
						<LighthouseBadge />
					</div>
					<div className="flex items-center gap-3">
						{footerSocials.map((social) => {
							const Icon = socialIconMap[social.icon as keyof typeof socialIconMap];
							return (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noreferrer"
									aria-label={social.label}
									className="inline-flex h-10 w-10 items-center justify-center rounded-full border-soft text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-strong"
								>
									<Icon className="h-4 w-4" aria-hidden="true" />
								</a>
							);
						})}
						<a
							href="mailto:alonvineba@gmail.com"
							aria-label="Email"
							className="inline-flex h-10 w-10 items-center justify-center rounded-full border-soft text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-strong"
						>
							<Mail className="h-4 w-4" aria-hidden="true" />
						</a>
						<button
							type="button"
							onClick={handlePrint}
							aria-label={printLabel}
							title={printHint}
							className="inline-flex h-10 w-10 items-center justify-center rounded-full border-soft text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-strong print:hidden"
						>
							<Printer className="h-4 w-4" aria-hidden="true" />
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
