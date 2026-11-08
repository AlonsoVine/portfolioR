"use client";

import { motion, type Variants } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/utils";

const container: Variants = {
	hidden: {},
	visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const word: Variants = {
	hidden: { y: "105%" },
	visible: { y: "0%", transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};

type Props = {
	text: string;
	className?: string;
};

/** Cada palabra sube desde detrás de su propia línea al entrar en pantalla. */
export function RevealText({ text, className }: Props) {
	const words = text.split(/\s+/).filter(Boolean);
	return (
		<motion.span
			className={className}
			variants={container}
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.6 }}
		>
			{words.map((w, i) => (
				<span key={`${w}-${i}`}>
					<span className="reveal-line">
						<motion.span className="reveal-word" variants={word}>
							{w}
						</motion.span>
					</span>
					{i < words.length - 1 ? " " : null}
				</span>
			))}
		</motion.span>
	);
}
