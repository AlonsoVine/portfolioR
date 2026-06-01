"use client";

import { useEffect, useState } from "react";
import { Gamepad2, X } from "lucide-react";
import { useKonamiCode } from "@/lib/useKonamiCode";
import { useLanguage } from "@/i18n";

const RETRO_CLASS = "retro-mode";

export function RetroEasterEgg() {
	const { dict } = useLanguage();
	const isEn = dict.lang === "en";
	const [active, setActive] = useState(false);
	const [justUnlocked, setJustUnlocked] = useState(false);

	useKonamiCode(() => {
		setActive((prev) => !prev);
		setJustUnlocked(true);
	});

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

	const titleOn = isEn ? "RETRO MODE ON" : "MODO RETRO ACTIVADO";
	const titleOff = isEn ? "RETRO MODE OFF" : "MODO RETRO DESACTIVADO";
	const hint = isEn
		? "Press Esc or konami again to toggle"
		: "Pulsa Esc o el konami otra vez para alternar";

	return (
		<div
			className="pointer-events-none fixed bottom-6 left-1/2 z-[9000] -translate-x-1/2 print:hidden"
			aria-live="polite"
		>
			<div className="pointer-events-auto flex items-center gap-3 rounded-full border border-emerald-400/60 bg-black/90 px-4 py-2 text-xs font-mono tracking-[0.18em] text-emerald-300 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
				<Gamepad2 className="h-4 w-4" aria-hidden="true" />
				<span>{active ? titleOn : titleOff}</span>
				<span className="hidden text-emerald-400/60 sm:inline">·</span>
				<span className="hidden text-[10px] normal-case tracking-normal text-emerald-400/60 sm:inline">
					{hint}
				</span>
				{active ? (
					<button
						type="button"
						onClick={() => setActive(false)}
						aria-label={isEn ? "Close retro mode" : "Cerrar modo retro"}
						className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full text-emerald-300/80 transition-colors hover:text-emerald-200"
					>
						<X className="h-3 w-3" aria-hidden="true" />
					</button>
				) : null}
			</div>
		</div>
	);
}
