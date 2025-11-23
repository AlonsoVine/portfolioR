"use client";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { es } from "./locales/es";
import { en } from "./locales/en";

type Locale = typeof es;
type Lang = "es" | "en";

const dictionaries: Record<Lang, Locale> = {
	es,
	en,
};

type LanguageContextValue = {
	lang: Lang;
	dict: Locale;
	setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
	lang: "es",
	dict: es,
	setLang: () => undefined,
});

const STORAGE_KEY = "portfolio-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
	const [lang, setLangState] = useState<Lang>("es");

	useEffect(() => {
		const stored = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as Lang | null) : null;
		if (stored === "en" || stored === "es") setLangState(stored);
	}, []);

	const setLang = (next: Lang) => {
		setLangState(next);
		if (typeof window !== "undefined") {
			localStorage.setItem(STORAGE_KEY, next);
		}
	};

	const value = useMemo(
		() => ({
			lang,
			dict: dictionaries[lang],
			setLang,
		}),
		[lang],
	);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	return useContext(LanguageContext);
}
