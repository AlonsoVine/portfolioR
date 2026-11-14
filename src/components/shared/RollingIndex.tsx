"use client";

import { useInView } from "framer-motion";
import type { CSSProperties } from "react";
import { useRef } from "react";

/** Número de sección que rueda como un contador mecánico, del 0 hasta su valor, al entrar en pantalla. */
export function RollingIndex({ value, className }: { value: string; className?: string }) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, amount: 1 });
	return (
		<span ref={ref} className={className}>
			<span className="sr-only">{value}</span>
			<span aria-hidden="true" className={`roll ${inView ? "is-in" : ""}`}>
				{Array.from(value).map((ch, i) => {
					const n = Number(ch);
					if (Number.isNaN(n)) return <span key={i}>{ch}</span>;
					return (
						<span key={i} className="roll-digit">
							<span className="roll-strip" style={{ "--n": n, "--i": i } as CSSProperties}>
								{Array.from({ length: n + 1 }, (_, d) => (
									<span key={d}>{d}</span>
								))}
							</span>
						</span>
					);
				})}
			</span>
		</span>
	);
}
