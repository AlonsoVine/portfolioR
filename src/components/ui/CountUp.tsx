"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
	value: number;
	suffix?: string;
	duration?: number;
	className?: string;
};

/** El número final está en el HTML desde el servidor; la cuenta solo es decoración. */
export function CountUp({ value, suffix = "", duration = 1.4, className }: Props) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.8 });
	const reduce = useReducedMotion();

	useEffect(() => {
		const node = ref.current;
		if (!node || !inView || reduce) return;
		// Si la entrada CSS del hero ya mostró la cifra antes de hidratar, volver a 0 sería un parpadeo.
		const intro = node.closest<HTMLElement>(".hero-in");
		if (intro && Number(getComputedStyle(intro).opacity) > 0.2) return;
		const controls = animate(0, value, {
			duration,
			ease: [0.16, 1, 0.3, 1],
			onUpdate: (v) => {
				node.textContent = `${Math.round(v)}${suffix}`;
			},
		});
		return () => controls.stop();
	}, [inView, reduce, value, suffix, duration]);

	return (
		<span ref={ref} className={className}>
			{value}
			{suffix}
		</span>
	);
}
