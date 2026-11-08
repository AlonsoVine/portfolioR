"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { THEME_EVENT } from "@/lib/siteActions";
import { cn } from "@/lib/utils";

const RAMP = " .:-=+*#%@";
const NOISE = "01{}[]<>/=+*#";
const DECODE_MS = 1300;
const HOLD_MS = 450;

type Cell = { x: number; y: number; ch: string; at: number };

/**
 * Intro del retrato: la foto se «compila» primero como texto monoespaciado (densidad de glifos según la luminancia)
 * y después se funde con la imagen real. Solo se dibuja durante la intro; luego el canvas queda en reposo.
 */
export function AsciiPortrait({ src, className }: { src: string; className?: string }) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const reduce = useReducedMotion();
	const [done, setDone] = useState(false);
	const [running, setRunning] = useState(false);

	useEffect(() => {
		if (reduce) return;
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");
		if (!canvas || !ctx) return;

		let raf = 0;
		let cancelled = false;
		const timers: number[] = [];
		const img = new Image();
		img.decoding = "async";
		img.src = src;

		const build = () => {
			const box = canvas.getBoundingClientRect();
			if (!box.width || !box.height) return null;
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
				for (let c = 0; c < cols; c += 1) {
					const k = (r * cols + c) * 4;
					if (data[k + 3] < 90) continue;
					const lum = Math.pow((lumAt(k) - lo) / span, 0.8);
					const level = light ? 1 - lum : lum;
					const ch = RAMP[Math.min(RAMP.length - 1, Math.floor(level * RAMP.length))];
					if (ch === " ") continue;
					// Se resuelve de abajo arriba con algo de ruido, como una salida que va llegando
					const at = (1 - r / rows) * 0.7 * DECODE_MS + Math.random() * 0.3 * DECODE_MS;
					cells.push({ x: ox + c * cell * 0.62, y: oy + r * cell, ch, at });
				}
			}
			const color = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#ecebe6";
			const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || color;
			const mono = getComputedStyle(document.documentElement).getPropertyValue("--font-plex-mono").trim();
			ctx.font = `${cell}px ${mono || "ui-monospace"}, monospace`;
			ctx.textBaseline = "top";
			return { cells, box, color, accent };
		};

		const start = () => {
			if (cancelled) return;
			const scene = build();
			if (!scene) return;
			setRunning(true);
			const t0 = performance.now();
			const frame = (now: number) => {
				const t = now - t0;
				ctx.clearRect(0, 0, scene.box.width, scene.box.height);
				for (const cell of scene.cells) {
					if (t < cell.at - 260) continue;
					const solved = t >= cell.at;
					ctx.fillStyle = solved ? scene.color : scene.accent;
					ctx.fillText(solved ? cell.ch : NOISE[(Math.random() * NOISE.length) | 0], cell.x, cell.y);
				}
				if (t < DECODE_MS) raf = requestAnimationFrame(frame);
				else timers.push(window.setTimeout(() => setDone(true), HOLD_MS));
			};
			raf = requestAnimationFrame(frame);
		};

		const onTheme = () => {
			if (!done) start();
		};

		if (img.complete && img.naturalWidth) start();
		else img.addEventListener("load", start, { once: true });
		window.addEventListener(THEME_EVENT, onTheme);
		return () => {
			cancelled = true;
			cancelAnimationFrame(raf);
			timers.forEach((id) => window.clearTimeout(id));
			window.removeEventListener(THEME_EVENT, onTheme);
		};
		// La intro corre una sola vez por carga
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reduce, src]);

	return (
		<canvas
			ref={canvasRef}
			aria-hidden="true"
			className={cn("ascii-portrait pointer-events-none absolute inset-0 h-full w-full", running && "is-running", done && "is-done", className)}
		/>
	);
}
