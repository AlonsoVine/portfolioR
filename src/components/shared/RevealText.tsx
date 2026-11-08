"use client";

import { useInView } from "framer-motion";
import type { CSSProperties } from "react";
import { useRef } from "react";

type Props = {
	text: string;
	className?: string;
};

/**
 * Cada palabra sube desde detrás de su línea al entrar en pantalla.
 * El estado oculto solo aplica con `html[data-js]`, así que sin JS el título se lee.
 */
export function RevealText({ text, className }: Props) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.6 });
	const words = text.split(/\s+/).filter(Boolean);
	return (
		<span ref={ref} className={`${className ?? ""} ${inView ? "" : "reveal-pending"}`}>
			{words.map((w, i) => (
				<span key={`${w}-${i}`}>
					<span className="reveal-line">
						<span className="reveal-word" style={{ "--w": i } as CSSProperties}>
							{w}
						</span>
					</span>
					{i < words.length - 1 ? " " : null}
				</span>
			))}
		</span>
	);
}
