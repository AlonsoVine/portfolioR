"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { RevealText } from "./RevealText";
import { CopyLinkButton } from "../ui/CopyLinkButton";
import { ScrambleText } from "./ScrambleText";
import { RollingIndex } from "./RollingIndex";
import { scrollRevealConfig } from "@/lib/utils";

type SectionHeadingProps = {
	sectionId: string;
	index: string;
	eyebrow: string;
	title: string;
	description?: string;
	aside?: ReactNode;
};

/** Hash corto y estable por sección, como el de un commit. */
function shortHash(seed: string) {
	let h = 2166136261;
	for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
	return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
}

/** Cabecera de sección: columna de metadatos a la izquierda y titular a la derecha, sobre un filete. */
export function SectionHeading({ sectionId, index, eyebrow, title, description, aside }: SectionHeadingProps) {
	const ref = useRef<HTMLElement>(null);
	// Cada cabecera entra como un capítulo: el filete se traza con el scroll y titular y metadatos llegan a ritmos distintos
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
	const rule = useTransform(scrollYProgress, [0, 0.85], [0, 1]);
	const titleY = useTransform(scrollYProgress, [0, 1], [90, 0]);
	const metaY = useTransform(scrollYProgress, [0, 1], [160, 0]);

	return (
		<header ref={ref} className="section-head group/head">
			<motion.div aria-hidden="true" className="rule-draw scroll-linked" style={{ scaleX: rule }} />
			<div className="grid-page gap-y-6 pt-5">
				<motion.div
					style={{ y: metaY }}
					className="scroll-linked col-span-4 flex items-start justify-between gap-4 md:col-span-2 lg:col-span-3 lg:flex-col lg:justify-start"
				>
					<div>
						<p className="meta flex items-baseline gap-3 text-subtle">
							<RollingIndex value={index} className="tabular text-signal-alt" />
							<ScrambleText text={eyebrow} />
						</p>
						<p aria-hidden="true" className="meta mt-1.5 hidden text-subtle lg:block">
							<ScrambleText text={`commit ${shortHash(sectionId)}`} duration={900} />
						</p>
					</div>
					<CopyLinkButton sectionId={sectionId} />
				</motion.div>
				<motion.div style={{ y: titleY }} className="scroll-linked col-span-4 md:col-span-6 lg:col-span-9">
					<h2 className="section-title font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.92]">
						<RevealText text={title} />
					</h2>
					{description || aside ? (
						<motion.div
							{...scrollRevealConfig}
							className="mt-6 flex flex-col gap-6 lg:mt-8 lg:flex-row lg:items-end lg:justify-between"
						>
							{description ? (
								<p className="section-desc max-w-[44ch] text-lg leading-snug text-muted sm:text-xl">{description}</p>
							) : null}
							{aside}
						</motion.div>
					) : null}
				</motion.div>
			</div>
		</header>
	);
}
