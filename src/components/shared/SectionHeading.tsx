"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { RevealText } from "./RevealText";
import { RuleDraw } from "./RuleDraw";
import { CopyLinkButton } from "../ui/CopyLinkButton";
import { scrollRevealConfig } from "@/lib/utils";

type SectionHeadingProps = {
	sectionId: string;
	index: string;
	eyebrow: string;
	title: string;
	description?: string;
	aside?: ReactNode;
};

/** Cabecera de sección: columna de metadatos a la izquierda y titular a la derecha, sobre un filete. */
export function SectionHeading({ sectionId, index, eyebrow, title, description, aside }: SectionHeadingProps) {
	return (
		<header className="section-head">
			<RuleDraw />
			<div className="grid-page gap-y-6 pt-5">
				<div className="col-span-4 flex items-start justify-between gap-4 md:col-span-2 lg:col-span-3 lg:flex-col lg:justify-start">
					<p className="meta flex items-baseline gap-3 text-subtle">
						<span className="tabular text-ink">{index}</span>
						<span>{eyebrow}</span>
					</p>
					<CopyLinkButton sectionId={sectionId} />
				</div>
				<div className="col-span-4 md:col-span-6 lg:col-span-9">
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
				</div>
			</div>
		</header>
	);
}
