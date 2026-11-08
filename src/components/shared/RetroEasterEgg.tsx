"use client";

import { useEffect, useState } from "react";
import { useKonamiCode } from "@/lib/useKonamiCode";
import { useLanguage } from "@/i18n";
import { RETRO_TOGGLE_EVENT } from "@/lib/siteActions";

const RETRO_CLASS = "retro-mode";

export function RetroEasterEgg() {
	const { dict } = useLanguage();
	const [active, setActive] = useState(false);
	const [justUnlocked, setJustUnlocked] = useState(false);

	useKonamiCode(() => {
		setActive((prev) => !prev);
		setJustUnlocked(true);
	});

	useEffect(() => {
		const onToggle = () => {
			setActive((prev) => !prev);
			setJustUnlocked(true);
		};
		window.addEventListener(RETRO_TOGGLE_EVENT, onToggle);
		return () => window.removeEventListener(RETRO_TOGGLE_EVENT, onToggle);
	}, []);

	useEffect(() => {
		if (typeof document === "undefined") return;
		document.documentElement.classList.toggle(RETRO_CLASS, active);
		return () => {
			document.documentElement.classList.remove(RETRO_CLASS);
		};
	}, [active]);

	useEffect(() => {
		if (!justUnlocked) return;
		const id = window.setTimeout(() => setJustUnlocked(false), 4500);
		return () => window.clearTimeout(id);
	}, [justUnlocked]);

	useEffect(() => {
		if (!active) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setActive(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active]);

	if (!active && !justUnlocked) return null;

	const { on: titleOn, off: titleOff, hint, close: closeLabel } = dict.ui.retro;

	return (
		<div className="floating-ui pointer-events-none fixed bottom-5 left-1/2 z-[9000] -translate-x-1/2 print:hidden" aria-live="polite">
			<div className="meta pointer-events-auto flex items-center gap-3 border border-ink bg-paper px-4 py-2 text-ink">
				<span aria-hidden="true" className="signal-dot" />
				<span>{active ? titleOn : titleOff}</span>
				<span className="hidden normal-case text-subtle sm:inline">{hint}</span>
				{active ? (
					<button type="button" onClick={() => setActive(false)} className="ml-1 min-h-8 px-1 text-ink hover:text-muted">
						{closeLabel}
					</button>
				) : null}
			</div>
		</div>
	);
}
