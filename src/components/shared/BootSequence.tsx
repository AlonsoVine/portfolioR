"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n";
import { BOOT_DONE_EVENT } from "@/lib/siteActions";
import { cn } from "@/lib/utils";

const RUN_MS = 1500;
const HOLD_MS = 220;
const OUT_MS = 950;

/**
 * Primera visita de la sesión: la página se «compila» como un build antes de mostrarse.
 * El script de tema marca `html[data-boot]` antes del primer pintado, así que no hay parpadeo del hero;
 * sin JS o con movimiento reducido esa marca no existe y esto no se ve nunca.
 */
export function BootSequence() {
	const { dict } = useLanguage();
	const t = dict.ui.boot;
	const sections = dict.nav.links.filter((l) => l.href !== "#hero").map((l) => l.label);
	const [phase, setPhase] = useState<"run" | "out" | "done">("run");
	const [progress, setProgress] = useState(0);
	const startRef = useRef(0);

	useEffect(() => {
		const root = document.documentElement;
		// Sin la marca el overlay sigue en el DOM pero oculto por CSS
		if (!root.dataset.boot) return;
		startRef.current = performance.now();
		let raf = 0;
		const timers: number[] = [];
		let finished = false;

		const finish = () => {
			if (finished) return;
			finished = true;
			cancelAnimationFrame(raf);
			setProgress(1);
			try {
				sessionStorage.setItem("booted", "1");
			} catch {
				// sin sessionStorage se vuelve a ver en la próxima carga
			}
			setPhase("out");
			delete root.dataset.boot;
			window.dispatchEvent(new Event(BOOT_DONE_EVENT));
			timers.push(window.setTimeout(() => setPhase("done"), OUT_MS));
		};

		const tick = (now: number) => {
			const p = Math.min(1, (now - startRef.current) / RUN_MS);
			// Arranque rápido, cola lenta: como un build que se atasca en el último módulo
			setProgress(1 - Math.pow(1 - p, 2.4));
			if (p < 1) raf = requestAnimationFrame(tick);
			else timers.push(window.setTimeout(finish, HOLD_MS));
		};
		raf = requestAnimationFrame(tick);

		const skip = () => finish();
		window.addEventListener("keydown", skip);
		window.addEventListener("pointerdown", skip);
		return () => {
			cancelAnimationFrame(raf);
			timers.forEach((id) => window.clearTimeout(id));
			window.removeEventListener("keydown", skip);
			window.removeEventListener("pointerdown", skip);
		};
	}, []);

	if (phase === "done") return null;

	const pct = Math.round(progress * 100);
	const solved = Math.floor(progress * sections.length + 0.0001);
	const elapsed = Math.round(RUN_MS * 0.82);

	return (
		<div
			aria-hidden="true"
			className={cn("boot print-hide fixed inset-0 z-[200] flex-col bg-paper", phase === "out" && "is-out")}
		>
			<div className="page flex flex-1 flex-col pt-8 sm:pt-12">
				<div className="font-mono text-[0.8rem] leading-[1.9] text-muted sm:text-[0.875rem]">
					<p className="text-ink">
						<span className="text-subtle">~ $ </span>
						{t.command}
					</p>
					<p>{t.engine}</p>
					<p className="mt-3 text-subtle">{t.compiling}</p>
					<ol>
						{sections.map((name, i) => (
							<li key={name} className={cn("boot-line", i < solved && "is-in")}>
								<span className="text-signal">[ok]</span> {String(i + 1).padStart(2, "0")} {name}
							</li>
						))}
					</ol>
					<p className={cn("boot-line mt-3 text-ink", progress >= 1 && "is-in")}>
						{t.ready} {elapsed} ms<span className="boot-caret" />
					</p>
				</div>
				<div className="mt-auto pb-8 sm:pb-12">
					<div className="flex items-end justify-between gap-6">
						<p className="meta text-subtle">{t.skip}</p>
						<p className="font-display text-[clamp(5rem,18vw,15rem)] leading-[0.8] tracking-[-0.03em] text-ink tabular">
							{String(pct).padStart(3, "0")}
						</p>
					</div>
					<div className="mt-6 h-px bg-rule">
						<div className="h-full origin-left bg-ink" style={{ transform: `scaleX(${progress})` }} />
					</div>
				</div>
			</div>
		</div>
	);
}
