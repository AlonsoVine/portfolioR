'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { CurtainReveal } from "../shared/CurtainReveal";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { ScrollQuote } from "../shared/ScrollQuote";
import { revealWith, scrollRevealConfig, withBasePath } from "@/lib/utils";
import { useLanguage } from "@/i18n";

export function About() {
	const { dict, lang } = useLanguage();
	const marks = lang === "en" ? (["“", "”"] as const) : (["«", "»"] as const);
	const [lead, ...paragraphs] = dict.about.textBlocks;
	const highlights = dict.about.highlights;
	const cta = dict.about.cta;

	return (
		<SectionShell id="about" className="pt-20 pb-28 lg:pt-28 lg:pb-40">
			<SectionHeading
				sectionId="about"
				index="02"
				eyebrow={dict.about.eyebrow}
				title={dict.about.title}
				description={dict.about.description}
			/>

			<div className="grid-page mt-14 gap-y-12 lg:mt-24">
				<motion.figure
					{...scrollRevealConfig}
					className="print-hide col-span-3 md:col-span-3 lg:col-span-4 lg:row-span-2"
				>
					<CurtainReveal className="media-frame aspect-[4/5]">
						<Image
							src={withBasePath("/assets/img/about-img.webp")}
							alt={dict.ui.a11y.aboutPhotoAlt}
							width={910}
							height={910}
							sizes="(min-width: 1024px) 30vw, (min-width: 768px) 36vw, 75vw"
							className="photo-mono h-full w-full object-cover object-[50%_20%]"
						/>
					</CurtainReveal>
				</motion.figure>

				<div className="col-span-4 md:col-span-5 lg:col-span-7 lg:col-start-6">
					<motion.p
						{...scrollRevealConfig}
						className="font-display text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.12] text-ink"
					>
						{lead}
					</motion.p>
					<div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
						{paragraphs.map((text, i) => (
							<motion.p
								key={text}
								{...revealWith({ delay: 0.08 * (i + 1) })}
								className="print-compact-text text-[1.0625rem] leading-relaxed text-muted"
							>
								{text}
							</motion.p>
						))}
					</div>
				</div>

				{highlights?.length ? (
					<motion.dl
						{...revealWith({ delay: 0.1 })}
						className="col-span-4 grid gap-y-6 self-end md:col-span-8 md:grid-cols-3 md:gap-x-6 lg:col-span-7 lg:col-start-6 lg:gap-x-8"
					>
						{highlights.map((item) => (
							<div key={item.title} className="border-t border-rule pt-4">
								<dt className="meta text-ink">{item.title}</dt>
								<dd className="mt-2 text-[0.95rem] leading-snug text-muted">{item.description}</dd>
							</div>
						))}
					</motion.dl>
				) : null}
			</div>

			<div className="grid-page mt-24 lg:mt-36">
				<div className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-4">
					<ScrollQuote text={dict.about.pullQuote} marks={marks} />
					{cta ? (
						<p className="print-hide mt-10 pl-[0.42em] lg:mt-12">
							<a href={cta.href} className="link-rule text-lg text-ink">
								{cta.label}
								<span aria-hidden="true" className="link-arrow">→</span>
							</a>
						</p>
					) : null}
				</div>
			</div>
		</SectionShell>
	);
}
