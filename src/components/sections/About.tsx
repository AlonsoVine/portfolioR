'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { aboutContent } from "@/data/portfolio";
import { Code2, Target, Zap } from "lucide-react";

const highlightIconMap = {
	code: Code2,
	target: Target,
	zap: Zap,
} as const;

type AboutProps = {
	paragraphs: string[];
	highlights?: (typeof aboutContent)["highlights"];
};

export function About({ paragraphs, highlights = aboutContent.highlights }: AboutProps) {
	return (
		<SectionShell id="about">
			<SectionHeading
				eyebrow="Sobre mi"
				title="Conoceme mejor"
				description="Apasionado por la tecnologia y siempre en busca de nuevas oportunidades para crecer profesionalmente."
			/>
			<div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
				<motion.div
					{...scrollRevealConfig}
					className="group relative rounded-[32px] border-soft bg-gradient-to-b from-white/20 to-transparent p-2 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-transform duration-500 ease-out hover:-translate-y-1"
				>
					<div className="relative overflow-hidden rounded-[28px]">
						<div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/10 via-transparent to-amber-200/10 opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />
						<Image
							src="/assets/img/about-img.png"
							alt="Alonso Vine - Desarrollador y Analista"
							width={640}
							height={640}
							className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
						/>
						<div className="pointer-events-none absolute inset-0 flex items-end justify-start p-4">
							<span className="translate-y-2 opacity-0 text-lg font-semibold text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.45)] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
								Alonso Viñé
							</span>
						</div>
						{/* Imagen anterior conservada por si se desea volver
						<Image
							src="/images/profile.png"
							alt="Alonso Vine - Desarrollador y Analista"
							width={640}
							height={640}
							className="h-full w-full object-cover"
						/>
						*/}
					</div>
					<div className="absolute -inset-1 rounded-[34px] border-soft opacity-70 blur-xl" />
				</motion.div>
				<motion.div
					{...scrollRevealConfig}
					transition={{ ...scrollRevealConfig.transition, delay: 0.15 }}
					className="relative rounded-3xl surface-card p-8 text-muted shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
				>
					<div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
					<div className="flex flex-col gap-6">
						{paragraphs.map((text) => (
							<p key={text} className="text-lg leading-relaxed text-[var(--foreground)]">
								{text}
							</p>
						))}
						{highlights?.length ? (
							<div className="grid gap-4 pt-4 sm:grid-cols-3">
								{highlights.map((item) => {
									const Icon = highlightIconMap[item.icon as keyof typeof highlightIconMap] ?? Code2;
									return (
										<div
											key={item.title}
											className="rounded-2xl bg-black/20 p-4 text-left text-[var(--foreground)] shadow-[0_15px_35px_rgba(15,23,42,0.25)]"
										>
											<div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5">
												<Icon className="h-5 w-5 text-[var(--accent-warm)]" aria-hidden="true" />
											</div>
											<h4 className="text-sm font-semibold">{item.title}</h4>
											<p className="mt-1 text-xs text-muted">{item.description}</p>
										</div>
									);
								})}
							</div>
						) : null}
					</div>
				</motion.div>
			</div>
		</SectionShell>
	);
}
