"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { THEME_EVENT, whenBooted } from "@/lib/siteActions";
import { cn } from "@/lib/utils";

const RAMP = " .:-=+*#%@";
const NOISE = "01{}[]<>/=+*#";
const DECODE_MS = 1300;
const HOLD_MS = 450;
const FADE_MS = 900;
const LENS = 0.19;
/** Fracción inferior de la foto que se queda en código; el CSS funde la imagen en la misma franja. */
const BASE = 0.24;

type Cell = { x: number; y: number; ch: string; at: number; base: number; accent: boolean };
type Scene = { cells: Cell[]; box: DOMRect; color: string; accent: string };

/**
 * Intro del retrato: la foto se «compila» primero como texto monoespaciado (densidad de glifos según la luminancia)
 * y después se funde con la imagen real, salvo la base del cuerpo, que se queda en código y se deshace hacia abajo.
 * Con un puntero fino, el mismo texto queda además como lente que sigue al cursor.
 */
export function AsciiPortrait({ src, className }: { src: string; className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const reduce = useReducedMotion();
	const [done, setDone] = useState(false);
	const [running, setRunning] = useState(false);
	const [lens, setLens] = useState(false);
	const [hasBase, setHasBase] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		const figure = canvas?.parentElement;
		if (!canvas || !ctx || !figure) return;

		let raf = 0;
		let lensRaf = 0;
		let cancelled = false;
		let introDone = false;
		let scene: Scene | null = null;
		const pointer = { x: 0, y: 0, on: false };
		const timers: number[] = [];
		const img = new Image();
		img.decoding = "async";
		img.src = src;

		const build = (): Scene | null => {
			const box = canvas.getBoundingClientRect();
			if (!box.width || !box.height || !img.naturalWidth) return null;
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(box.width * dpr);
			canvas.height = Math.round(box.height * dpr);
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			// Mismo encaje que la imagen: object-contain anclada abajo
			const scale = Math.min(box.width / img.naturalWidth, box.height / img.naturalHeight);
			const w = img.naturalWidth * scale;
			const h = img.naturalHeight * scale;
			const ox = (box.width - w) / 2;
			const oy = box.height - h;

			const cell = Math.max(5, Math.round(box.width / 78));
			const cols = Math.floor(w / (cell * 0.62));
			const rows = Math.floor(h / cell);
			const sample = document.createElement("canvas");
			sample.width = cols;
			sample.height = rows;
			const sctx = sample.getContext("2d", { willReadFrequently: true });
			if (!sctx) return null;
			sctx.drawImage(img, 0, 0, cols, rows);
			const data = sctx.getImageData(0, 0, cols, rows).data;
			const light = document.documentElement.dataset.theme === "light";
			const lumAt = (k: number) => (0.299 * data[k] + 0.587 * data[k + 1] + 0.114 * data[k + 2]) / 255;
			// Estira el rango tonal de la figura para que la cara tenga todos los glifos de la rampa
			let lo = 1;
			let hi = 0;
			for (let k = 0; k < data.length; k += 4) {
				if (data[k + 3] < 90) continue;
				const l = lumAt(k);
				if (l < lo) lo = l;
				if (l > hi) hi = l;
			}
			const span = Math.max(hi - lo, 0.01);
			const cells: Cell[] = [];
			for (let r = 0; r < rows; r += 1) {
				// Franja de la base: los glifos aparecen al entrar en ella y se van aclarando hacia el borde inferior
				const t = (r / rows - (1 - BASE)) / BASE;
				const presence = t <= 0 ? 0 : Math.min(1, t / 0.4) * (t > 0.7 ? 1 - ((t - 0.7) / 0.3) * 0.75 : 1);
				for (let c = 0; c < cols; c += 1) {
					const k = (r * cols + c) * 4;
					if (data[k + 3] < 90) continue;
					const lum = Math.pow((lumAt(k) - lo) / span, 0.8);
					const level = light ? 1 - lum : lum;
					const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(level * RAMP.length))];
					if (ch === " ") continue;
					// Se resuelve de abajo arriba con algo de ruido, como una salida que va llegando
					const at = (1 - r / rows) * 0.7 * DECODE_MS + Math.random() * 0.3 * DECODE_MS;
					// En la base, cada glifo pesa como su tono: la chaqueta queda tenue y escasa, la camisa y las manos brillan.
					// Los píxeles semitransparentes del recorte se descartan para que el contorno no deje puntos sueltos.
					const kept = presence > 0 && data[k + 3] > 200 && Math.random() < presence * (0.3 + 0.7 * level);
					cells.push({
						x: ox + c * cell * 0.62,
						y: oy + r * cell,
						ch,
						at,
						base: kept ? (0.15 + 0.85 * level) * (0.4 + 0.6 * Math.min(1, t / 0.4)) : 0,
						accent: kept && Math.random() < 0.05,
					});
				}
			}
			const styles = getComputedStyle(document.documentElement);
			const color = styles.getPropertyValue("--foreground").trim() || "#ecebe6";
			const accent = styles.getPropertyValue("--accent").trim() || color;
			const mono = styles.getPropertyValue("--font-plex-mono").trim();
			ctx.font = `${cell}px ${mono || "ui-monospace"}, monospace`;
			ctx.textBaseline = "top";
			return { cells, box, color, accent };
		};

		/** Pinta la base fija y, con `rest` > 0, el resto del retrato con esa opacidad (para el fundido tras la intro). */
		const drawBase = (rest = 0) => {
			if (!scene) return;
			const { box, cells, color, accent } = scene;
			ctx.clearRect(0, 0, box.width, box.height);
			for (const cell of cells) {
				const alpha = cell.base || rest;
				if (!alpha) continue;
				ctx.globalAlpha = alpha;
				ctx.fillStyle = cell.accent ? accent : color;
				ctx.fillText(cell.ch, cell.x, cell.y);
			}
			ctx.globalAlpha = 1;
		};

		const settle = () => {
			introDone = true;
			setHasBase(true);
			drawBase();
		};

		const fadeToBase = () => {
			setDone(true);
			const t0 = performance.now();
			const frame = (now: number) => {
				const p = Math.min(1, (now - t0) / FADE_MS);
				drawBase(1 - p * (2 - p));
				if (p < 1) raf = requestAnimationFrame(frame);
				else settle();
			};
			raf = requestAnimationFrame(frame);
		};

		const intro = () => {
			if (cancelled) return;
			scene = build();
			if (!scene) return;
			const s = scene;
			setRunning(true);
			const t0 = performance.now();
			const frame = (now: number) => {
				const t = now - t0;
				ctx.clearRect(0, 0, s.box.width, s.box.height);
				for (const cell of s.cells) {
					if (t < cell.at - 260) continue;
					const solved = t >= cell.at;
					ctx.fillStyle = solved ? s.color : s.accent;
					ctx.fillText(solved ? cell.ch : NOISE[(Math.random() * NOISE.length) | 0], cell.x, cell.y);
				}
				if (t < DECODE_MS) raf = requestAnimationFrame(frame);
				else timers.push(window.setTimeout(fadeToBase, HOLD_MS));
			};
			raf = requestAnimationFrame(frame);
		};

		const drawLens = () => {
			drawBase();
			if (!scene || !pointer.on) return;
			const { box, cells, color, accent } = scene;
			const R = box.width * LENS;
			const R2 = R * R;
			for (const cell of cells) {
				if (cell.base) continue;
				const dx = cell.x - pointer.x;
				const dy = cell.y - pointer.y;
				const d2 = dx * dx + dy * dy;
				if (d2 > R2) continue;
				const edge = 1 - Math.sqrt(d2) / R;
				// Densidad que se deshace hacia el borde, y el ruido verde solo en el anillo exterior
				if (edge < 0.35 && Math.random() > edge / 0.35) continue;
				ctx.globalAlpha = Math.min(1, edge * 1.8);
				const glitch = edge < 0.3 && Math.random() < 0.12;
				ctx.fillStyle = glitch ? accent : color;
				ctx.fillText(glitch ? NOISE[(Math.random() * NOISE.length) | 0] : cell.ch, cell.x, cell.y);
			}
			ctx.globalAlpha = 1;
			lensRaf = requestAnimationFrame(drawLens);
		};

		const rebuild = () => {
			if (!introDone) return;
			scene = build();
			if (!pointer.on) drawBase();
		};

		const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
		const onMove = (event: PointerEvent) => {
			if (reduce || !introDone || !fine.matches) return;
			const rect = canvas.getBoundingClientRect();
			pointer.x = event.clientX - rect.left;
			pointer.y = event.clientY - rect.top;
			figure.style.setProperty("--lx", `${pointer.x}px`);
			figure.style.setProperty("--ly", `${pointer.y}px`);
			figure.style.setProperty("--lr", `${rect.width * LENS}px`);
			if (!pointer.on) {
				pointer.on = true;
				setLens(true);
				cancelAnimationFrame(lensRaf);
				lensRaf = requestAnimationFrame(drawLens);
			}
		};
		const onLeave = () => {
			pointer.on = false;
			setLens(false);
		};

		const onTheme = () => {
			if (introDone) rebuild();
			else if (!reduce) intro();
		};

		const resize = new ResizeObserver(rebuild);

		let stopWaiting = () => {};
		const start = () => {
			resize.observe(canvas);
			if (reduce) {
				// Sin animación: la base aparece ya resuelta y no hay lente
				scene = build();
				settle();
				return;
			}
			stopWaiting = whenBooted(intro);
		};
		if (img.complete && img.naturalWidth) start();
		else img.addEventListener("load", start, { once: true });
		window.addEventListener(THEME_EVENT, onTheme);
		figure.addEventListener("pointermove", onMove);
		figure.addEventListener("pointerleave", onLeave);
		return () => {
			cancelled = true;
			stopWaiting();
			resize.disconnect();
			cancelAnimationFrame(raf);
			cancelAnimationFrame(lensRaf);
			timers.forEach((id) => window.clearTimeout(id));
			window.removeEventListener(THEME_EVENT, onTheme);
			figure.removeEventListener("pointermove", onMove);
			figure.removeEventListener("pointerleave", onLeave);
		};
	}, [reduce, src]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className={cn(
				"ascii-portrait pointer-events-none absolute inset-0 h-full w-full",
				running && "is-running",
				done && "is-done",
				lens && "is-lens",
				hasBase && "has-base",
				className,
			)}
		/>
	);
}
