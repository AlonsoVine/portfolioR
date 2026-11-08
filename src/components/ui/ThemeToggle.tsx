'use client';

import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useLanguage } from "@/i18n";

type Theme = "light" | "dark";

declare global {
	interface Window {
		__theme?: Theme;
	}
}

const THEME_EVENT = "portfolio-theme-change";

function readTheme(): Theme {
	return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(callback: () => void) {
	window.addEventListener(THEME_EVENT, callback);
	return () => window.removeEventListener(THEME_EVENT, callback);
}

function applyTheme(next: Theme) {
	document.documentElement.dataset.theme = next;
	window.__theme = next;
	try {
		window.localStorage.setItem("theme", next);
	} catch {
		// sin persistencia: el tema dura lo que la pestaña
	}
	window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle() {
	const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");
	const { dict } = useLanguage();

	const handleToggle = useCallback(() => {
		const next: Theme = readTheme() === "light" ? "dark" : "light";
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (!reduce && typeof document.startViewTransition === "function") {
			document.startViewTransition(() => flushSync(() => applyTheme(next)));
		} else {
			applyTheme(next);
		}
	}, []);

	const current = theme === "dark" ? dict.ui.theme.dark : dict.ui.theme.light;
	const ariaLabel = `${current}: ${theme === "light" ? dict.ui.a11y.toDark : dict.ui.a11y.toLight}`;

	return (
		<button
			type="button"
			onClick={handleToggle}
			aria-label={ariaLabel}
			className="meta inline-flex min-h-11 items-center gap-2 px-2 text-ink transition-colors hover:text-muted"
		>
			{/* Disco partido: la mitad rellena indica el modo en uso */}
			<span aria-hidden="true" className="relative inline-block h-3 w-3 overflow-hidden rounded-full border border-current">
				<span className={theme === "dark" ? "absolute inset-y-0 left-0 w-1/2 bg-current" : "absolute inset-y-0 right-0 w-1/2 bg-current"} />
			</span>
			<span aria-hidden="true" className="hidden sm:inline">
				{current}
			</span>
		</button>
	);
}
