"use client";

import { useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Un panel del color del fondo se retira hacia la derecha mientras la imagen se asienta.
 * El estado tapado solo existe con `html[data-js]`: sin JS la imagen se ve tal cual.
 */
export function CurtainReveal({ children, className }: { children: ReactNode; className?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.35 });
	return (
		<div ref={ref} className={cn("curtain relative overflow-hidden", inView && "curtain-in", className)}>
			<div className="curtain-media h-full w-full">{children}</div>
			<span aria-hidden="true" className="curtain-panel" />
		</div>
	);
}
