"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type Stage = { id: string; start: number; end: number };

/** Barra de lectura dividida en etapas (una por sección, proporcional a su altura), como un pipeline. */
export function ReadingProgress() {
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 30,
		restDelta: 0.001,
	});
	const [stages, setStages] = useState<Stage[]>([]);
	const [passed, setPassed] = useState(0);

	useMotionValueEvent(scrollYProgress, "change", (v) => {
		setPassed(stages.filter((stage) => v >= stage.start).length);
	});

	useEffect(() => {
		const measure = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			if (max <= 0) return;
			const sections = Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
			setStages(
				sections.map((el) => {
					const top = el.getBoundingClientRect().top + window.scrollY;
					return {
						id: el.id,
						start: Math.min(1, Math.max(0, top / max)),
						end: Math.min(1, (top + el.offsetHeight) / max),
					};
				}),
			);
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(document.body);
		window.addEventListener("resize", measure);
		return () => {
			ro.disconnect();
			window.removeEventListener("resize", measure);
		};
	}, []);

	return (
		<div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] print:hidden">
			<motion.div
				style={{ scaleX }}
				className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500"
			/>
			{stages.slice(1).map((stage, i) => {
				const done = passed > i + 1;
				return (
					<span key={stage.id} className="absolute top-0 -translate-x-1/2" style={{ left: `${stage.start * 100}%` }}>
						<span className="absolute left-0 top-0 h-[2px] w-[3px] bg-[var(--background)]" />
						<span
							className="absolute left-[1px] top-[2px] h-[6px] w-px origin-top bg-[var(--foreground)] transition-[transform,opacity] duration-500"
							style={{ transform: done ? "scaleY(0)" : "scaleY(1)", opacity: done ? 0 : 0.35 }}
						/>
					</span>
				);
			})}
		</div>
	);
}
