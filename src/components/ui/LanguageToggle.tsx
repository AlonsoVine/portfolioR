'use client';

import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle() {
	const { lang, setLang, dict } = useLanguage();
	const next = lang === "es" ? "en" : "es";

	return (
		<button
			type="button"
			onClick={() => setLang(next)}
			className="meta inline-flex min-h-11 items-center gap-1.5 px-2 text-subtle transition-colors hover:text-ink"
		>
			<span className="sr-only">{dict.ui.languageCurrent}: </span>
			<span aria-hidden="true" className={cn(lang === "es" && "text-ink")}>ES</span>
			<span aria-hidden="true">/</span>
			<span aria-hidden="true" className={cn(lang === "en" && "text-ink")}>EN</span>
			<span className="sr-only">{lang.toUpperCase()}, {dict.ui.languageSwitch}</span>
		</button>
	);
}
