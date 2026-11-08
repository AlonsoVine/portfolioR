"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Filete horizontal que se traza de izquierda a derecha la primera vez que entra en pantalla. */
export function RuleDraw({ className }: { className?: string }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 1 });
	return <div ref={ref} aria-hidden="true" data-drawn={inView ? "true" : "false"} className={cn("rule-draw", className)} />;
}
