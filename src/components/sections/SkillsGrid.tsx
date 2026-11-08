'use client';

import { motion } from "framer-motion";
import { Fragment } from "react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { revealWith } from "@/lib/utils";
import { useLanguage } from "@/i18n";

/** Índice tipográfico: una fila por capa, las tecnologías como texto corrido. */
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
					<motion.div
						key={group.title}
						{...revealWith({ delay: 0.04 * index })}
						className="print-row grid-page gap-y-2 border-t border-rule py-6 last:border-b lg:py-7"
					>
						<dt className="col-span-4 flex items-baseline gap-3 md:col-span-3 lg:col-span-3">
							<span className="font-mono text-xs text-subtle tabular">{String.fromCharCode(97 + index)}</span>
							<span className="font-display text-[1.75rem] leading-none text-ink lg:text-[1.875rem]">{group.title}</span>
						</dt>
						<dd className="print-compact-text col-span-4 text-[1.0625rem] leading-[1.75] text-ink md:col-span-5 lg:col-span-9 lg:col-start-4 lg:text-[1.1875rem]">
							{group.items.map((item, i) => (
								<Fragment key={item}>
									<span className="whitespace-nowrap">{item}</span>
									{i < group.items.length - 1 ? (
										<>
											<span className="sr-only">, </span>
											<span aria-hidden="true" className="px-2 text-ink-subtle">
												·
											</span>{" "}
										</>
									) : null}
								</Fragment>
							))}
						</dd>
					</motion.div>
				))}
			</dl>
		</SectionShell>
	);
}
