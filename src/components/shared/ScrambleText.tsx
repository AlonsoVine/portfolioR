"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "01ABCDEF/\\<>{}[]_=+*#$%&";
const FRAME_MS = 32;

type ScrambleTextProps = {
	text: string;
	/** "view": se descifra una vez al entrar en pantalla. "hover": también al pasar el puntero o enfocar el padre. */
	trigger?: "view" | "hover";
	className?: string;
	duration?: number;
};

/**
 * Texto que se «descifra» carácter a carácter, como una salida de terminal que se resuelve.
 * El texto real va siempre en un nodo accesible; la animación es solo visual.
 */
export function ScrambleText({ text, trigger = "view", className, duration = 650 }: ScrambleTextProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const reduce = useReducedMotion();
	const inView = useInView(ref, { once: true, amount: 0.8 });
	const [scrambled, setScrambled] = useState<string | null>(null);
	const timer = useRef<number | null>(null);

	const play = useCallback(() => {
		if (reduce) return;
		if (timer.current) window.clearInterval(timer.current);
		const frames = Math.max(1, Math.round(duration / FRAME_MS));
		let frame = 0;
		timer.current = window.setInterval(() => {
			frame += 1;
			const solved = Math.floor((frame / frames) * text.length);
			setScrambled(
				Array.from(text, (ch, i) => {
					if (i < solved || ch === " ") return ch;
					return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
				}).join(""),
			);
			if (frame >= frames) {
				if (timer.current) window.clearInterval(timer.current);
				timer.current = null;
				setScrambled(null);
			}
		}, FRAME_MS);
	}, [duration, reduce, text]);

	useEffect(() => {
		if (inView) play();
	}, [inView, play]);

	useEffect(() => {
		if (trigger !== "hover") return;
		const host = ref.current?.closest("a, button");
		if (!host) return;
		host.addEventListener("pointerenter", play);
		host.addEventListener("focus", play);
		return () => {
			host.removeEventListener("pointerenter", play);
			host.removeEventListener("focus", play);
		};
	}, [trigger, play]);

	useEffect(
		() => () => {
			if (timer.current) window.clearInterval(timer.current);
		},
		[],
	);

	return (
		<span ref={ref} className={className}>
			<span className="sr-only">{text}</span>
			{/* El texto real, invisible, fija el ancho: lo descifrado se pinta encima sin mover nada */}
			<span aria-hidden="true" className="relative inline-block whitespace-nowrap">
				<span className={scrambled ? "invisible" : undefined}>{text}</span>
				{scrambled ? <span className="absolute inset-0 overflow-hidden">{scrambled}</span> : null}
			</span>
		</span>
	);
}
