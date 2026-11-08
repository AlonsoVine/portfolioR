"use client";

import {
	motion,
	useAnimationFrame,
	useInView,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "framer-motion";
import { useMemo, useRef } from "react";
import { useLanguage } from "@/i18n";

const BASE_SPEED = 2.2;

function wrap(min: number, max: number, v: number) {
	const range = max - min;
	return ((((v - min) % range) + range) % range) + min;
}

const yearOf = (part: string) => Number(part.trim().split(/\s+/).pop());

/** Trayectoria en una línea: empresa + años, derivado de `experiences` (de la más reciente a la primera). */
export function CareerMarquee() {
	const { dict } = useLanguage();
	const present = dict.ui.present;

	const stops = useMemo(() => {
		const byCompany = new Map<string, { from: number; to: number | null }>();
		for (const exp of dict.experiences) {
			const name = exp.company.replace(/\s*\(Cestic\)\s*/, "").trim();
			const [startPart, endPart = ""] = exp.period.split("-");
			const from = yearOf(startPart);
			const to = /actual|present/i.test(endPart) ? null : yearOf(endPart);
			const prev = byCompany.get(name);
			if (!prev) byCompany.set(name, { from, to });
			else
				byCompany.set(name, {
					from: Math.min(prev.from, from),
					to: prev.to === null || to === null ? null : Math.max(prev.to, to),
				});
		}
		return Array.from(byCompany, ([name, r]) => ({
			name,
			years: r.to === null ? `${r.from} — ${present}` : r.from === r.to ? `${r.from}` : `${r.from} — ${r.to}`,
		}));
	}, [dict.experiences, present]);

	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref);
	const reduce = useReducedMotion();
	const baseX = useMotionValue(0);
	const direction = useRef(1);
	const { scrollY } = useScroll();
	const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
	const boost = useTransform(velocity, [0, 1200], [0, 5], { clamp: false });
	const skew = useTransform(velocity, [-2400, 2400], [7, -7]);
	const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

	useAnimationFrame((_, delta) => {
		if (!inView || reduce) return;
		const b = boost.get();
		if (b < 0) direction.current = -1;
		else if (b > 0) direction.current = 1;
		const step = direction.current * BASE_SPEED * (delta / 1000);
		baseX.set(baseX.get() - (step + step * Math.abs(b)));
	});

	const copies = [0, 1, 2, 3];
	const row = (copy: number) =>
		stops.map((stop, i) => (
			<span key={`${copy}-${stop.name}`} className="flex shrink-0 items-center">
				<span className={(i + copy) % 2 === 0 ? "text-[var(--foreground)]" : "marquee-outline"}>{stop.name}</span>
				<span className="tabular ml-4 self-start pt-[0.35em] [font-family:var(--font-geist-sans)] text-[0.22em] font-medium tracking-[0.2em] text-[var(--accent-warm)]">
					{stop.years}
				</span>
				<span className="mx-6 text-[0.4em] text-[var(--accent-warm)] sm:mx-10">✦</span>
			</span>
		));

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="marquee-mask relative w-full overflow-hidden py-6 select-none print:hidden"
		>
			<motion.div
				className="font-display flex w-max items-center whitespace-nowrap text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-none tracking-[0.04em]"
				style={reduce ? undefined : { x, skewX: skew }}
			>
				{copies.slice(0, 2).map((c) => (
					<span key={c} className="flex">
						{row(c * 2)}
						{row(c * 2 + 1)}
					</span>
				))}
			</motion.div>
		</div>
	);
}
