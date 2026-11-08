import { useLanguage } from "@/i18n";

const SITE_URL = "https://alonsovine.github.io/portfolioR/";
const PSI_URL = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(SITE_URL)}`;
const REPO_URL = "https://github.com/AlonsoVine/portfolioR";
const SHA = process.env.NEXT_PUBLIC_BUILD_SHA ?? "";
const BUILT_AT = process.env.NEXT_PUBLIC_BUILD_DATE ?? "";

/** Commit y fecha del build, inyectados por next.config: datos reales en lugar de cifras escritas a mano. */
export function BuildStamp() {
	const { dict } = useLanguage();
	const { build } = dict.ui;
	const date = BUILT_AT
		? new Intl.DateTimeFormat(dict.ui.locale, { day: "2-digit", month: "short", year: "numeric", timeZone: "Europe/Madrid" }).format(new Date(BUILT_AT))
		: "";

	return (
		<p className="meta flex flex-wrap items-baseline gap-x-4 gap-y-1 text-subtle">
			{SHA ? (
				<a href={`${REPO_URL}/commit/${SHA}`} target="_blank" rel="noreferrer" className="link-rule min-h-11 py-3 hover:text-ink">
					{build.label} <span className="text-ink tabular">{SHA}</span>
					{date ? <span> · {date}</span> : null}
				</a>
			) : null}
			<a href={PSI_URL} target="_blank" rel="noreferrer" className="link-rule min-h-11 py-3 hover:text-ink">
				{build.audit}
				<span aria-hidden="true" className="link-arrow"> ↗</span>
			</a>
		</p>
	);
}
