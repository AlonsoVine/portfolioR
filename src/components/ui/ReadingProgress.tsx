"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ReadingProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 30,
		restDelta: 0.001,
	});

	return (
		<motion.div
			aria-hidden="true"
			style={{ scaleX }}
			className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500"
		/>
	);
}
