'use client';

import { useEffect, useState } from "react";
import { Languages } from "lucide-react";
import { useLanguage } from "@/i18n";

export function LanguageToggle() {
	const { lang, setLang } = useLanguage();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	const next = lang === "es" ? "en" : "es";

	return (
		<button
			type="button"
			onClick={() => setLang(next)}
			className="inline-flex items-center gap-2 rounded-full border border-soft bg-white/5 px-3 py-2 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--accent-warm)] hover:text-[var(--foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-warm)]"
			aria-label={`Cambiar idioma a ${next === "es" ? "Español" : "English"}`}
		>
			<Languages className="h-4 w-4" aria-hidden="true" />
			<span>{lang.toUpperCase()}</span>
		</button>
	);
}
