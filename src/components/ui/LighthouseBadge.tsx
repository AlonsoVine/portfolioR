/**
 * Puntuaciones de la última auditoría de Lighthouse publicada.
 * Actualizar a mano tras cada despliegue relevante (PageSpeed Insights).
 */
const SCORES = [
	{ label: "Performance", value: 95 },
	{ label: "Accessibility", value: 95 },
	{ label: "Best Practices", value: 100 },
	{ label: "SEO", value: 100 },
];

const SITE_URL = "https://alonsovine.github.io/portfolioR/";
const PSI_URL = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`;

export function LighthouseBadge() {
	return (
		<a
			href={PSI_URL}
			target="_blank"
			rel="noreferrer"
			title="Lighthouse · Performance · Accessibility · Best Practices · SEO"
			className="meta inline-flex min-h-11 items-center gap-2 text-subtle transition-colors hover:text-ink"
		>
			<span>Lighthouse</span>
			{SCORES.map((score, i) => (
				<span key={score.label} className="text-ink tabular">
					<span className="sr-only">{score.label} </span>
					{score.value}
					{i < SCORES.length - 1 ? <span aria-hidden="true" className="text-subtle"> /</span> : null}
				</span>
			))}
		</a>
	);
}
