"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Filete de lectura bajo la cabecera: tinta sobre papel, sin adornos. */
export function ReadingProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] print:hidden">
			<motion.div style={{ scaleX }} className="h-full origin-left bg-ink" />
		</div>
	);
}
