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

/** Cita que se entinta palabra a palabra al recorrerla con el scroll (solo opacidad). */
export function ScrollQuote({ text, marks }: { text: string; marks: readonly [string, string] }) {
	const ref = useRef<HTMLQuoteElement>(null);
	const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 55%"] });
	const words = text.split(/\s+/);

	return (
		<blockquote
			ref={ref}
			className="print-hide hang-quote font-display text-[clamp(2.1rem,5vw,4.4rem)] italic leading-[1.04] tracking-[-0.02em] text-ink"
		>
			<p>
				<span aria-hidden="true">{marks[0]}</span>
				{words.map((w, i) => (
					<span key={`${w}-${i}`}>
						<Word word={w} index={i} total={words.length} progress={scrollYProgress} />
						{i < words.length - 1 ? " " : null}
					</span>
				))}
				<span aria-hidden="true">{marks[1]}</span>
			</p>
		</blockquote>
	);
}
