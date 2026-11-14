'use client';

import { motion, useInView } from "framer-motion";
import { Fragment, useRef, type CSSProperties } from "react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { cn, revealWith } from "@/lib/utils";
import { useLanguage } from "@/i18n";

type Group = { title: string; items: string[] };

/** Una capa del stack: el título a la izquierda y sus piezas como un array que se «instala» al entrar. */
function StackRow({ group, index, packages }: { group: Group; index: number; packages: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.4 });

	return (
		<motion.div
			ref={ref}
			{...revealWith({ delay: 0.04 * index })}
			className={cn("stack-row print-row grid-page gap-y-3 border-t border-rule py-6 last:border-b lg:py-8", inView && "is-in")}
		>
			<dt className="col-span-4 md:col-span-3 lg:col-span-3">
				<span className="flex items-baseline gap-3">
					<span className="font-mono text-xs text-subtle tabular">{String.fromCharCode(97 + index)}</span>
					<span className="font-display text-[1.75rem] leading-none text-ink lg:text-[1.875rem]">{group.title}</span>
				</span>
				<span className="meta mt-2 block pl-6 text-subtle">
					<span className="text-signal">+</span> {packages.replace("{n}", String(group.items.length))}
				</span>
			</dt>
			<dd className="print-compact-text col-span-4 font-mono text-[0.95rem] leading-[1.9] md:col-span-5 lg:col-span-9 lg:col-start-4 lg:text-[1.0625rem]">
				<span aria-hidden="true" className="text-subtle">[ </span>
				{group.items.map((item, i) => (
					<Fragment key={item}>
					<span className="pkg" style={{ "--k": i } as CSSProperties}>
						<span aria-hidden="true" className="text-subtle">&quot;</span>
						<span className="pkg-name">{item}</span>
						<span aria-hidden="true" className="text-subtle">&quot;</span>
						{i < group.items.length - 1 ? (
							<>
								<span className="sr-only">, </span>
								<span aria-hidden="true" className="text-subtle">, </span>
							</>
						) : null}
					</span>{" "}
					</Fragment>
				))}
				<span aria-hidden="true" className="text-subtle">]</span>
			</dd>
		</motion.div>
	);
}

/** Índice del stack: una fila por capa, las tecnologías escritas como el array que las instala. */
export function SkillsGrid() {
	const { dict } = useLanguage();
	const groups = dict.skills.cards;

	return (
		<SectionShell id="skills" className="pt-28 pb-24 sm:pt-36 lg:pt-44">
			<SectionHeading
				sectionId="skills"
				index="01"
				eyebrow={dict.skills.eyebrow}
				title={dict.skills.title}
				description={dict.skills.description}
			/>
			<dl className="print-tight mt-14 lg:mt-20">
				{groups.map((group, index) => (
					<StackRow key={group.title} group={group} index={index} packages={dict.skills.packages} />
				))}
			</dl>
		</SectionShell>
	);
}
