"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ScrambleText } from "../shared/ScrambleText";
import { cn, withBasePath } from "@/lib/utils";

type Copy = {
	window: string;
	listening: string;
	lines: { said: string; did: string }[];
	replay: string;
};

const BARS = 28;
const LINE_MS = 1500;

/**
 * Escaparate de Jarvis: una transcripción de órdenes de voz. Mientras «escucha», una onda late;
 * después la frase queda escrita y debajo la acción que ejecutó. Se repite al señalar la pieza.
 */
export function JarvisShowcase({ image, alt, copy }: { image: string; alt: string; copy: Copy }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.5 });
	const reduce = useReducedMotion();
	const [run, setRun] = useState(0);
	const [step, setStep] = useState(0);
	const total = copy.lines.length;

	useEffect(() => {
		if (!inView || reduce) return;
		let n = 0;
		const id = window.setInterval(() => {
			n += 1;
			setStep(n);
			if (n >= total) window.clearInterval(id);
		}, LINE_MS);
		return () => window.clearInterval(id);
	}, [inView, reduce, run, total]);

	const shown = reduce ? total : step;
	const listening = !reduce && inView && shown < total;
	const replay = () => {
		if (reduce || step < total) return;
		setStep(0);
		setRun((r) => r + 1);
	};

	return (
		<div ref={ref} className="print-hide" onPointerEnter={replay}>
			<div className="media-frame relative aspect-[16/10] w-full overflow-hidden">
				<Image src={withBasePath(encodeURI(image))} alt={alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="media-tone object-cover" />
				<div className="absolute inset-x-[6%] bottom-[7%] border border-rule-strong bg-paper font-mono text-[0.72rem] leading-[1.6] sm:text-[0.8rem]">
					<div className="flex items-center gap-3 border-b border-rule px-3 py-2 text-subtle">
						<span aria-hidden="true" className={cn("signal-dot", listening && "signal-dot-live")} />
						<span className="truncate">{copy.window}</span>
						<span aria-hidden="true" className={cn("jarvis-wave ml-auto flex h-4 items-center gap-[2px]", listening && "is-on")}>
							{Array.from({ length: BARS }, (_, i) => (
								<span key={i} style={{ "--j": `${0.45 + ((i * 37) % 11) / 20}s`, "--jd": `${-((i * 53) % 9) / 10}s` } as CSSProperties} />
							))}
						</span>
					</div>
					<ol className="min-h-[6.5rem] px-3 py-2">
						{copy.lines.slice(0, shown).map((line, i) => (
							<li key={`${run}-${i}`} className={cn("jarvis-line", i < shown - 2 && "hidden")}>
								<p className="truncate text-ink">
									<span className="text-subtle">&gt; </span>
									<ScrambleText text={line.said} duration={520} />
								</p>
								<p className="truncate pl-4 text-subtle">
									<span className="text-signal">ok</span> {line.did}
								</p>
							</li>
						))}
						{listening ? (
							<li className="text-subtle">
								<span>&gt; </span>
								{copy.listening}
								<span aria-hidden="true" className="prensa-caret jarvis-caret" />
							</li>
						) : null}
					</ol>
				</div>
			</div>
			<p className="meta prensa-hint mt-3 text-subtle">{copy.replay}</p>
		</div>
	);
}
