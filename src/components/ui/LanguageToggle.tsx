'use client';

import { useLanguage } from "@/i18n";

export function LanguageToggle() {
	const { lang, setLang, dict } = useLanguage();
	const next = lang === "es" ? "en" : "es";

	return (
		<button
			type="button"
			onClick={() => setLang(next)}
			className="meta inline-flex min-h-11 items-center px-2 text-ink hover:text-muted"
		>
			<span className="sr-only">{dict.ui.languageCurrent}: {lang.toUpperCase()}, {dict.ui.languageSwitch} </span>
			{/* Se muestra el idioma al que se cambia: el botón dice lo que hace */}
			<span aria-hidden="true">{next.toUpperCase()}</span>
		</button>
	);
}
