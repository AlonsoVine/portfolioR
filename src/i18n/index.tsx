"use client";

import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { es } from "./locales/es";
import { en } from "./locales/en";

type Locale = typeof es;
export type Lang = "es" | "en";

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
const CHANGE_EVENT = "portfolio-lang-change";
let memoryLang: Lang = "es";

function readStoredLang(): Lang {
	try {
		const stored = window.localStorage.getItem(STORAGE_KEY);
		if (stored === "en" || stored === "es") return stored;
		return memoryLang;
	} catch {
		return memoryLang;
	}
}

function subscribe(callback: () => void) {
	window.addEventListener(CHANGE_EVENT, callback);
	window.addEventListener("storage", callback);
	return () => {
		window.removeEventListener(CHANGE_EVENT, callback);
		window.removeEventListener("storage", callback);
	};
}

export function LanguageProvider({ children }: { children: ReactNode }) {
	const lang = useSyncExternalStore<Lang>(subscribe, readStoredLang, () => "es");

	const setLang = useCallback((next: Lang) => {
		memoryLang = next;
		try {
			window.localStorage.setItem(STORAGE_KEY, next);
		} catch {
			// sin localStorage el idioma vive solo en memoria
		}
		window.dispatchEvent(new Event(CHANGE_EVENT));
	}, []);

	useEffect(() => {
		document.documentElement.lang = lang;
	}, [lang]);

	const value = useMemo(
		() => ({
			lang,
			dict: dictionaries[lang],
			setLang,
		}),
		[lang, setLang],
	);

	return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
	return useContext(LanguageContext);
}
