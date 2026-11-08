"use client";

import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/utils";

const line = {
	initial: { scaleX: 0, opacity: 0 },
	whileInView: { scaleX: 1, opacity: 1 },
	viewport: { once: true, amount: 1 },
	transition: { duration: 1.2, ease: EASE_OUT_EXPO },
};

export function SectionDivider() {
	return (
		<div
			aria-hidden="true"
			className="mx-auto flex w-full max-w-sm items-center gap-4 px-4 py-2 print:hidden"
		>
			<motion.span
				{...line}
				className="h-px flex-1 origin-right"
				style={{
					backgroundImage:
						"linear-gradient(to right, transparent, var(--divider-line))",
				}}
			/>
			<motion.span
				className="font-display inline-block text-[11px]"
				style={{ color: "var(--divider-ornament)" }}
				initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
				whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
				viewport={{ once: true, amount: 1 }}
				transition={{ duration: 1.1, ease: EASE_OUT_EXPO, delay: 0.15 }}
			>
				✦
			</motion.span>
			<motion.span
				{...line}
				className="h-px flex-1 origin-left"
				style={{
					backgroundImage:
						"linear-gradient(to left, transparent, var(--divider-line))",
				}}
			/>
		</div>
	);
}
