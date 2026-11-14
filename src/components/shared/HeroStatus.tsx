"use client";

import { useMemo } from "react";
import { useLanguage } from "@/i18n";

const SHA = process.env.NEXT_PUBLIC_BUILD_SHA ?? "";
const BUILT_AT = process.env.NEXT_PUBLIC_BUILD_DATE ?? "";

const yearOf = (period: string) => Number(period.split("-")[0].trim().split(/\s+/).pop());

/** Estado del perfil como la salida de un `git status`: años en activo, puesto actual (HEAD), foco y último build. */
export function HeroStatus() {
	const { dict } = useLanguage();
	const t = dict.ui.hero.status;
	const experiences = dict.experiences;

	const rows = useMemo(() => {
		const from = Math.min(...experiences.map((e) => yearOf(e.period)).filter(Boolean));
		// El año de referencia es el del build, para que servidor y cliente pinten lo mismo
		const now = BUILT_AT ? new Date(BUILT_AT).getFullYear() : from;
		const current = experiences.find((e) => /actual|present/i.test(e.period)) ?? experiences[0];
		const built = BUILT_AT
			? new Intl.DateTimeFormat(dict.ui.locale, { day: "2-digit", month: "short", timeZone: "Europe/Madrid" }).format(new Date(BUILT_AT))
			: "";
		return [
			{ k: t.uptime, v: t.years.replace("{n}", String(now - from)).replace("{from}", String(from)) },
			{ k: t.head, v: current.company.replace(/\s*\(.*\)\s*/, "") },
			{ k: t.focus, v: t.focusValue },
			...(SHA ? [{ k: t.build, v: `${SHA}${built ? ` · ${built}` : ""}` }] : []),
		];
	}, [experiences, t, dict.ui.locale]);

	return (
		<div>
			<p className="meta flex items-center gap-2 text-subtle">
				<span aria-hidden="true" className="signal-dot signal-dot-live" />
				{t.title}
			</p>
			<dl className="mt-3 border-t border-rule">
				{rows.map((row) => (
					<div key={row.k} className="meta flex items-baseline gap-3 border-b border-rule py-2">
						<dt className="w-[6.5rem] shrink-0 text-subtle">{row.k}</dt>
						<dd className="min-w-0 truncate text-ink tabular">{row.v}</dd>
					</div>
				))}
			</dl>
		</div>
	);
}
