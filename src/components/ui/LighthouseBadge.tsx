"use client";

import { Gauge } from "lucide-react";

/**
 * Scores reales tras la última auditoría de Lighthouse.
 * Actualizar manualmente tras cada cambio importante (deploy + PSI).
 */
const SCORES = {
	performance: 95,
	accessibility: 95,
	bestPractices: 100,
	seo: 100,
};

const SITE_URL = "https://alonsovine.github.io/portfolioR/";
const PSI_URL = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`;

function colorFor(score: number): string {
	if (score >= 90) return "text-[var(--pill-emerald-text)]";
	if (score >= 50) return "text-[var(--pill-amber-text)]";
	return "text-[var(--pill-rose-text)]";
}

export function LighthouseBadge() {
	return (
		<a
			href={PSI_URL}
			target="_blank"
			rel="noreferrer"
			title="Lighthouse · Performance · Accessibility · Best Practices · SEO"
			className="inline-flex items-center gap-2 rounded-full border border-soft/60 bg-white/5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.18em] text-subtle transition-all duration-300 hover:-translate-y-0.5 hover:border-strong hover:text-[var(--foreground)] print:hidden"
		>
			<Gauge className="h-3 w-3 text-[var(--accent-warm)]" aria-hidden="true" />
			<span className="text-muted">Lighthouse</span>
			<span className="sr-only">Performance </span>
			<span className={colorFor(SCORES.performance)}>{SCORES.performance}</span>
			<span aria-hidden="true" className="text-subtle">·</span>
			<span className="sr-only">Accessibility </span>
			<span className={colorFor(SCORES.accessibility)}>{SCORES.accessibility}</span>
			<span aria-hidden="true" className="text-subtle">·</span>
			<span className="sr-only">Best Practices </span>
			<span className={colorFor(SCORES.bestPractices)}>{SCORES.bestPractices}</span>
			<span aria-hidden="true" className="text-subtle">·</span>
			<span className="sr-only">SEO </span>
			<span className={colorFor(SCORES.seo)}>{SCORES.seo}</span>
		</a>
	);
}
