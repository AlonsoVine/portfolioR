"use client";

import { useLanguage } from "@/i18n";

export function SkipToContent() {
	const { dict } = useLanguage();
	const isEn = dict.lang === "en";
	const label = isEn ? "Skip to main content" : "Saltar al contenido principal";

	return (
		<a
			href="#main-content"
			className="sr-only fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition-transform focus:not-sr-only focus:translate-y-0"
		>
			{label}
		</a>
	);
}
