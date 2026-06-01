"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = {
	phrases: string[];
	intervalMs?: number;
};

export function RotatingTagline({ phrases, intervalMs = 8000 }: Props) {
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		if (reduceMotion || paused || phrases.length <= 1) return;
		const id = window.setInterval(() => {
			setIndex((i) => (i + 1) % phrases.length);
		}, intervalMs);
		return () => window.clearInterval(id);
	}, [phrases.length, intervalMs, paused, reduceMotion]);

	if (phrases.length === 0) return null;

	return (
		<div
			className="mt-3 flex items-center gap-2 text-sm text-muted"
			onMouseEnter={() => setPaused(true)}
			onMouseLeave={() => setPaused(false)}
			onFocus={() => setPaused(true)}
			onBlur={() => setPaused(false)}
		>
			<span
				className="shrink-0 text-[var(--accent-warm)]"
				aria-hidden="true"
			>
				▸
			</span>
			<span className="relative block min-w-0 flex-1 leading-snug">
				<AnimatePresence mode="wait" initial={false}>
					<motion.span
						key={index}
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -5 }}
						transition={{ duration: 0.55, ease: "easeOut" }}
						className="block truncate italic"
					>
						{phrases[index]}
					</motion.span>
				</AnimatePresence>
			</span>
		</div>
	);
}
