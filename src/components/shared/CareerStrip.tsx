"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import { useLanguage } from "@/i18n";

const yearOf = (part: string) => Number(part.trim().split(/\s+/).pop());

/** Trayectoria en una línea, derivada de `experiences`: empresa y años, de la más reciente a la primera. */
export function CareerStrip({ label, variant = "strip" }: { label: string; variant?: "strip" | "column" }) {
	const { dict } = useLanguage();
	const present = dict.ui.present;

	const stops = useMemo(() => {
		const byCompany = new Map<string, { from: number; to: number | null }>();
		for (const exp of dict.experiences) {
			const name = exp.company.replace(/\s*\(Cestic\)\s*/, "").trim();
			const [startPart, endPart = ""] = exp.period.split("-");
			const from = yearOf(startPart);
			const to = /actual|present/i.test(endPart) ? null : yearOf(endPart);
			const prev = byCompany.get(name);
			if (!prev) byCompany.set(name, { from, to });
			else
				byCompany.set(name, {
					from: Math.min(prev.from, from),
					to: prev.to === null || to === null ? null : Math.max(prev.to, to),
				});
		}
		return Array.from(byCompany, ([name, r]) => ({
			name,
			current: r.to === null,
			years: r.to === null ? `${r.from}–${present}` : r.from === r.to ? `${r.from}` : `${r.from}–${r.to}`,
		}));
	}, [dict.experiences, present]);

	if (variant === "column") {
		return (
			<div>
				<p className="meta text-subtle">{label}</p>
				<ol className="mt-3 border-t border-rule">
					{stops.map((stop) => (
						<li key={stop.name} className="meta flex items-center gap-2 border-b border-rule py-2">
							{stop.current ? <span aria-hidden="true" className="signal-dot" /> : null}
							<span className="text-ink">{stop.name}</span>
							<span className="ml-auto tabular text-subtle">{stop.years}</span>
						</li>
					))}
				</ol>
			</div>
		);
	}

	return (
		<div className="page print-hide hero-in lg:hidden" style={{ "--d": "900ms" } as CSSProperties}>
			<div aria-hidden="true" className="h-px bg-rule-strong" />
			<div className="grid-page gap-y-3 py-4">
				<p className="meta col-span-4 text-subtle md:col-span-2 lg:col-span-3">{label}</p>
				<ol className="col-span-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2 md:col-span-6 md:grid-cols-4 lg:col-span-9">
					{stops.map((stop) => (
						<li key={stop.name} className="meta flex items-center gap-2 border-b border-rule pb-2 sm:border-0 sm:pb-0">
							{stop.current ? <span aria-hidden="true" className="signal-dot" /> : null}
							<span className="text-ink">{stop.name}</span>
							<span className="ml-auto tabular text-subtle sm:ml-0">{stop.years}</span>
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}
