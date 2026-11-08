'use client';

import Image from "next/image";
import type { CSSProperties } from "react";
import { useLanguage } from "@/i18n";
import { withBasePath } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/data/portfolio";
import { CareerStrip } from "../shared/CareerStrip";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
	const { dict } = useLanguage();
	const { hero, socialLinks, experiences, ui } = dict;
	const { title, role, subtitle, image, ctas, location, availability } = hero;
	const current = experiences.find((e) => /actual|present/i.test(e.period)) ?? experiences[0];
	const [firstName, ...rest] = title.split(/\s+/);
	const lastName = rest.join(" ");
	const cvHref = withBasePath(ctas.secondary.href);

	return (
		<section id="hero" className="relative flex min-h-[100svh] flex-col pt-14 print:min-h-0 print:pt-0">
			<div className="page flex flex-1 flex-col">
				<div className="grid-page hero-in gap-y-1 pt-8 text-subtle sm:pt-10 lg:pt-12" style={delay(500)}>
					<p className="meta col-span-4 text-ink md:col-span-3 lg:col-span-4">{role}</p>
					<p className="meta col-span-4 md:col-span-2 lg:col-span-3">{location}</p>
					{availability ? (
						<p className="meta col-span-4 flex items-center gap-2.5 md:col-span-3 md:justify-end lg:col-span-5">
							<span aria-hidden="true" className="signal-dot signal-dot-live" />
							{availability}
						</p>
					) : null}
				</div>
				<div aria-hidden="true" className="hero-rule mt-4 h-px bg-rule-strong" style={delay(200)} />

				<div className="grid-page flex-1 gap-y-10 pb-10 lg:pb-0">
					<h1 className="hero-name col-span-4 pt-6 font-display text-[clamp(5.25rem,27vw,9rem)] leading-[0.8] tracking-[-0.03em] md:col-span-8 md:text-[clamp(8rem,20vw,12rem)] lg:col-span-8 lg:row-start-1 lg:pt-6 lg:text-[clamp(9rem,15.6vw,16rem)]">
						<span className="hero-line">
							<span style={delay(80)}>{firstName}</span>
						</span>{" "}
						<span className="hero-line pl-[0.5em] lg:pl-[1.15em]">
							<span className="italic" style={delay(200)}>
								{lastName}
							</span>
						</span>
					</h1>

					<figure className="portrait print-hide hero-in relative col-span-2 col-start-3 row-start-3 aspect-[1114/1400] w-full self-end md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:-mb-px" style={delay(650)}>
						<Image
							src={withBasePath(image.front.src)}
							alt={image.front.alt}
							fill
							sizes="(min-width: 1024px) 24vw, (min-width: 768px) 36vw, 50vw"
							className="portrait-mono object-contain object-bottom"
							priority
						/>
						<Image
							src={withBasePath(image.front.src)}
							alt=""
							aria-hidden="true"
							fill
							sizes="(min-width: 1024px) 24vw, (min-width: 768px) 36vw, 50vw"
							className="portrait-color object-contain object-bottom"
						/>
					</figure>

					<div className="col-span-4 grid grid-cols-subgrid gap-y-6 self-end md:col-span-8 lg:col-span-8 lg:pb-10">
						<p className="meta hero-in col-span-4 text-subtle md:col-span-2 lg:col-span-3" style={delay(700)}>
							{ui.hero.now}
						</p>
						<div className="hero-in col-span-4 md:col-span-6 lg:col-span-5" style={delay(780)}>
							<p className="text-[1.375rem] font-medium leading-tight text-ink sm:text-[1.6rem]">{current.title}</p>
							<p className="meta mt-2 text-muted">
								{current.company} · {current.period}
							</p>
							<p className="mt-6 max-w-[50ch] text-lg leading-relaxed text-muted">{subtitle}</p>

							<p className="print-only hidden text-sm">
								<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
								{socialLinks.map((social) => (
									<span key={social.href}>
										{" · "}
										<a href={social.href}>{social.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a>
									</span>
								))}
							</p>

							<div className="print-hide mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
								<a href={ctas.primary.href} className="btn btn-ink">
									{ctas.primary.label}
									<span aria-hidden="true" className="link-arrow-down">↓</span>
								</a>
								<a
									href={cvHref}
									className="link-rule text-ink"
									target="_blank"
									rel="noreferrer"
									download={ctas.secondary.download || undefined}
								>
									{ctas.secondary.label}
									<span className="meta text-subtle">PDF</span>
								</a>
								<a href={ctas.tertiary.href} className="link-rule text-ink">
									{ctas.tertiary.label}
								</a>
							</div>
							<ul className="print-hide mt-6 flex gap-6">
								{socialLinks.map((social) => (
									<li key={social.href}>
										<a
											href={social.href}
											target="_blank"
											rel="noreferrer"
											aria-label={ui.socialProfile.replace("{name}", social.label)}
											className="meta link-rule text-muted hover:text-ink"
										>
											{social.label}
											<span aria-hidden="true" className="link-arrow">↗</span>
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
			<CareerStrip label={ui.hero.trajectory} />
		</section>
	);
}
