"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n";
import { BOOT_DONE_EVENT } from "@/lib/siteActions";
import { cn } from "@/lib/utils";

const RUN_MS = 1100;
const HOLD_MS = 950;
const OUT_MS = 950;

/**
 * Primera visita de la sesión: la página se «compila» como un build antes de mostrarse.
 * El script de tema marca `html[data-boot]` antes del primer pintado, así que no hay parpadeo del hero;
 * sin JS o con movimiento reducido esa marca no existe y esto no se ve nunca.
 */
export function BootSequence() {
	const { dict } = useLanguage();
	const t = dict.ui.boot;
	const [firstName, ...rest] = dict.hero.title.split(/\s+/);
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
			const p = Math.min(1, Math.max(0, (now - startRef.current) / RUN_MS));
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
	const BAR = 32;
	const filled = Math.round(progress * BAR);

	return (
		<div
			aria-hidden="true"
			className={cn("boot print-hide fixed inset-0 z-[200] flex-col bg-paper", phase === "out" && "is-out")}
		>
			<div className="page flex flex-1 flex-col justify-center py-10">
				<div className="boot-log max-w-[46rem] font-mono text-[0.875rem] leading-[1.85] text-muted sm:text-[1rem]">
					<p className="text-ink">
						<span className="text-signal">~ $ </span>
						{t.command}
					</p>
					<p className="text-subtle">{t.engine}</p>
					<p className="mt-4">{t.compiling}</p>
					<ol className="mt-1">
						{sections.map((name, i) => (
							<li key={name} className={cn("boot-line flex gap-3", i < solved && "is-in")}>
								<span className="text-signal">+</span>
								<span className="text-ink">{name}</span>
								<span className="boot-dots flex-1" />
								<span className="tabular text-subtle">{(18 + i * 37) % 90 + 12} kB</span>
							</li>
						))}
					</ol>
					<p className="mt-5 whitespace-pre text-ink tabular">
						<span className="text-subtle">[</span>
						<span className="text-signal">{"#".repeat(filled)}</span>
						<span className="text-rule-strong">{".".repeat(BAR - filled)}</span>
						<span className="text-subtle">]</span> {String(pct).padStart(3, " ")}%
					</p>
					<p className={cn("boot-line mt-1 text-ink", progress >= 1 && "is-in")}>
						{t.ready} {elapsed} ms<span className="boot-caret" />
					</p>
				</div>
			</div>
			<div className="page pb-8 sm:pb-10">
				<p className={cn("boot-name font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.85] tracking-[-0.03em] text-ink", progress >= 1 && "is-in")}>
					<span className="boot-name-mask">
						<span className="boot-name-text">
							{firstName} <span className="italic">{rest.join(" ")}</span>
						</span>
					</span>
				</p>
				<p className="meta mt-6 text-subtle">{t.skip}</p>
			</div>
		</div>
	);
}
