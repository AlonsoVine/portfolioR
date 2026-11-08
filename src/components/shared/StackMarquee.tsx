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
import { useRef } from "react";
import { useLanguage } from "@/i18n";

const BASE_SPEED = 2.2;

function wrap(min: number, max: number, v: number) {
	const range = max - min;
	return ((((v - min) % range) + range) % range) + min;
}

export function StackMarquee() {
	const { dict } = useLanguage();
	const items = dict.skills.cards
		.filter((card) => card.icon !== "badge")
		.flatMap((card) => card.items.slice(0, 4));

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

	const row = (copy: number) =>
		items.map((item, i) => (
			<span key={`${copy}-${item}`} className="flex shrink-0 items-center">
				<span className={i % 2 === 0 ? "text-[var(--foreground)]" : "marquee-outline"}>{item}</span>
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
				{row(0)}
				{row(1)}
			</motion.div>
		</div>
	);
}
