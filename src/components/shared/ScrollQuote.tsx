"use client";

import { motion, useScroll, useTransform, type MotionStyle, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: MotionValue<number> }) {
	const start = index / total;
	const lit = useTransform(progress, [start, Math.min(1, start + 1.5 / total)], [0, 1]);
	return (
		<motion.span className="quote-word" style={{ "--lit": lit } as MotionStyle}>
			{word}
		</motion.span>
	);
}

/** Cita que se ilumina palabra a palabra al recorrerla con el scroll (solo opacidad). */
export function ScrollQuote({ text }: { text: string }) {
	const ref = useRef<HTMLQuoteElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
	const words = text.split(/\s+/);

	return (
		<blockquote
			ref={ref}
			className="font-display relative mx-auto mt-20 max-w-4xl text-center text-[clamp(1.6rem,3.6vw,2.9rem)] font-semibold leading-[1.2] tracking-[0.01em] text-[var(--foreground)]"
		>
			<span aria-hidden="true" className="mb-6 block text-sm text-[var(--accent-warm)]">
				✦
			</span>
			<p>
				{words.map((w, i) => (
					<span key={`${w}-${i}`}>
						<Word word={w} index={i} total={words.length} progress={scrollYProgress} />
						{i < words.length - 1 ? " " : null}
					</span>
				))}
			</p>
		</blockquote>
	);
}
