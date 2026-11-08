'use client';

import { useSyncExternalStore } from "react";
import { useLanguage } from "@/i18n";
import { readTheme, THEME_EVENT, toggleTheme, type Theme } from "@/lib/siteActions";

function subscribe(callback: () => void) {
	window.addEventListener(THEME_EVENT, callback);
	return () => window.removeEventListener(THEME_EVENT, callback);
}

export function ThemeToggle() {
	const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");
	const { dict } = useLanguage();

	const current = theme === "dark" ? dict.ui.theme.dark : dict.ui.theme.light;
	const ariaLabel = `${current}: ${theme === "light" ? dict.ui.a11y.toDark : dict.ui.a11y.toLight}`;

	return (
		<button
			type="button"
			onClick={() => toggleTheme()}
			aria-label={ariaLabel}
			className="meta inline-flex min-h-11 items-center gap-2 px-2 text-ink hover:text-muted"
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
