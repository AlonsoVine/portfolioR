"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n";
import { CONTACT_EMAIL } from "@/data/portfolio";
import { useIsClient } from "@/lib/useIsClient";
import { BuildStamp } from "../ui/BuildStamp";
import { DeployPipeline } from "../ui/DeployPipeline";
import { RevealText } from "../shared/RevealText";

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
		<p className="meta flex items-baseline gap-2 text-subtle">
			<span>{label}</span>
			<span className="text-ink tabular">{isClient ? madridTime(locale) : "--:--"}</span>
		</p>
	);
}

export function Footer() {
	const { dict } = useLanguage();
	const year = new Date().getFullYear();
	const navLinks = dict.nav.links;
	const { role, location, title } = dict.hero;
	const [firstName, ...rest] = title.split(/\s+/);

	return (
		<footer className="print:hidden">
			<div className="page">
				<div aria-hidden="true" className="h-px bg-rule-strong" />
				<div className="grid-page gap-y-12 pt-10 pb-14 lg:pt-14 lg:pb-20">
					<div className="col-span-4 md:col-span-8 lg:col-span-6">
						<p aria-hidden="true" className="font-display text-[clamp(4rem,12vw,9.5rem)] leading-[0.82] tracking-[-0.03em] text-ink">
							<RevealText text={firstName} />{" "}
							<span className="italic">
								<RevealText text={rest.join(" ")} />
							</span>
						</p>
						<p className="meta mt-6 text-muted">
							{role} · {location}
						</p>
					</div>

					<nav aria-label={dict.ui.a11y.footerNav} className="col-span-2 md:col-span-3 lg:col-span-2 lg:col-start-8">
						<ul className="flex flex-col gap-1">
							{navLinks.map((link) => (
								<li key={link.href}>
									<a href={link.href} className="inline-block py-1 text-muted hover:text-ink">
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<div className="col-span-2 flex flex-col gap-1 md:col-span-3 lg:col-span-3 lg:col-start-10">
						<a href={`mailto:${CONTACT_EMAIL}`} className="inline-block py-1 text-ink [overflow-wrap:anywhere] hover:text-muted">
							{CONTACT_EMAIL}
						</a>
						{dict.socialLinks.map((social) => (
							<a
								key={social.href}
								href={social.href}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-baseline gap-1.5 py-1 text-muted hover:text-ink"
							>
								{social.label}
								<span aria-hidden="true" className="link-arrow text-sm">↗</span>
							</a>
						))}
						<div className="mt-5">
							<MadridClock label={dict.ui.madridTime} locale={dict.ui.locale} />
						</div>
					</div>
				</div>

				<div className="border-t border-rule py-8">
					<DeployPipeline />
				</div>

				<div className="grid-page gap-y-4 border-t border-rule py-6">
					<p className="meta col-span-4 text-subtle md:col-span-2 lg:col-span-3">© {year} Alonso Viñé Barrancos</p>
					<p className="col-span-4 text-[0.85rem] leading-snug text-subtle md:col-span-6 lg:col-span-4">{dict.ui.colophon}</p>
					<div className="col-span-4 flex flex-wrap items-center gap-x-6 gap-y-2 md:col-span-8 lg:col-span-5 lg:justify-end">
						<BuildStamp />
						<button
							type="button"
							onClick={() => window.print()}
							title={dict.ui.print.hint}
							className="meta link-rule py-3 text-ink"
						>
							{dict.ui.print.label}
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
}
