'use client';

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { SectionHeading } from "../shared/SectionHeading";
import { Portal, useInertOutside } from "../shared/Portal";
import { SectionShell } from "../shared/SectionShell";
import { cn, EASE_OUT_EXPO, scrollRevealConfig, withBasePath } from "@/lib/utils";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useLanguage } from "@/i18n";
import type { Education as EducationItem } from "@/data/portfolio";

const slug = (v: string) =>
	v
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-");

export function Education() {
	const { dict } = useLanguage();
	const heading = dict.education;
	const [selected, setSelected] = useState<EducationItem | null>(null);
	const [openKey, setOpenKey] = useState<string | null>(null);
	const modalRef = useRef<HTMLDivElement>(null);
	useInertOutside(selected !== null);
	useFocusTrap(modalRef, selected !== null);
	const { certificate: certificateLabel, view: viewLabel } = dict.ui.education;

	const byYear = useMemo(() => {
		const groups = new Map<string, EducationItem[]>();
		for (const item of heading.items) groups.set(item.dates, [...(groups.get(item.dates) ?? []), item]);
		return Array.from(groups);
	}, [heading.items]);

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setSelected(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	useEffect(() => {
		document.body.style.overflow = selected ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [selected]);

	return (
		<SectionShell id="education" className="pt-16 pb-20 lg:pt-24 lg:pb-28">
			<SectionHeading
				sectionId="education"
				index="05"
				eyebrow={heading.eyebrow}
				title={heading.title}
				description={heading.description}
			/>

			<div className="print-tight mt-12 lg:mt-16">
				{byYear.map(([year, items]) => (
					<div key={year} className="grid-page gap-y-4 border-t border-rule-strong pt-6 pb-10 last:pb-0">
						<p className="col-span-4 md:col-span-2 lg:col-span-3">
							<span className="font-display text-[3.25rem] leading-none text-ink tabular lg:sticky lg:top-24 lg:text-[4.5rem]">
								{year}
							</span>
						</p>
						<ol className="col-span-4 md:col-span-6 lg:col-span-9">
							{items.map((item) => {
								const key = `cert-${slug(item.title)}`;
								return (
								<motion.li
									key={`${item.institution}-${item.title}`}
									{...scrollRevealConfig}
									className="print-row grid grid-cols-1 gap-x-8 gap-y-2 border-b border-rule py-4 first:pt-0 last:border-b-0 md:grid-cols-[minmax(0,1fr)_auto] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto]"
								>
									<div className="min-w-0 lg:col-span-2">
										<h3 className="text-[1.1875rem] font-medium leading-snug text-ink">
											<button
												type="button"
												aria-expanded={openKey === key}
												aria-controls={`${key}-details`}
												onClick={() => setOpenKey((k) => (k === key ? null : key))}
												className="group/cert grid w-full grid-cols-[1.5rem_minmax(0,1fr)] items-baseline text-left lg:grid-cols-[1.5rem_minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-x-8"
											>
												<span aria-hidden="true" className="cert-toggle font-mono text-sm text-subtle group-hover/cert:text-signal">
													{openKey === key ? "−" : "+"}
												</span>
												<span className="group-hover/cert:text-signal">{item.title}</span>
												<span className="meta col-start-2 mt-1.5 text-muted lg:col-start-3 lg:mt-0">{item.institution.trim()}</span>
											</button>
										</h3>
										<div id={`${key}-details`} className={cn("cert-details print:hidden", openKey === key && "is-open")}>
											<div className="overflow-hidden">
												<p className="max-w-[62ch] pt-3 pl-6 text-[0.95rem] leading-relaxed text-muted">{item.details}</p>
											</div>
										</div>
									</div>
									{item.image ? (
										<button
											type="button"
											onClick={() => setSelected(item)}
											aria-haspopup="dialog"
											aria-label={`${viewLabel}: ${item.title}`}
											className="print-hide link-rule meta self-start justify-self-start whitespace-nowrap py-1 text-ink md:col-start-2 md:row-start-1 ml-6 md:ml-0 md:justify-self-end lg:col-start-3"
										>
											{viewLabel}
											<span aria-hidden="true" className="link-arrow">↗</span>
										</button>
									) : null}
								</motion.li>
								);
							})}
						</ol>
					</div>
				))}
			</div>

			<Portal>
				<AnimatePresence>
					{selected ? (
						<motion.div
							key="certificate"
							ref={modalRef}
							className="fixed inset-0 z-[80] flex flex-col bg-paper"
							role="dialog"
							aria-modal="true"
							aria-label={`${certificateLabel}: ${selected.title}`}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<div className="page flex h-14 shrink-0 items-center justify-between gap-6 border-b border-rule">
								<p className="meta min-w-0 truncate text-ink">
									<span className="text-subtle">{certificateLabel} · </span>
									{selected.title}
								</p>
								<button type="button" className="meta -mr-2 min-h-11 shrink-0 px-2 text-ink hover:text-muted" onClick={() => setSelected(null)}>
									{dict.ui.a11y.close}
								</button>
							</div>
							<div
								className="relative flex-1"
								onClick={(e) => {
									if (e.target === e.currentTarget) setSelected(null);
								}}
							>
								{selected.image ? (
									<motion.div
										className="absolute inset-4 sm:inset-10"
										initial={{ opacity: 0, y: 16 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
									>
										<Image
											src={withBasePath(selected.image)}
											alt={`${certificateLabel}: ${selected.title}`}
											fill
											sizes="100vw"
											className="object-contain"
										/>
									</motion.div>
								) : null}
							</div>
						</motion.div>
					) : null}
				</AnimatePresence>
			</Portal>
		</SectionShell>
	);
}
