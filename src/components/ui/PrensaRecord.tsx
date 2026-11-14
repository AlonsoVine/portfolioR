"use client";

import Image from "next/image";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { withBasePath } from "@/lib/utils";

type Copy = {
	coverAlt: string;
	tagline: string;
	rec: string;
	facts: string;
	discLabel: string;
	hint: string;
};

const GROOVES = [170, 158, 146, 134, 122, 110, 98, 86];
const PRESSED = [164, 152, 140, 128, 116, 104, 92];
const VU = [0.9, 0.7, 1.1, 0.6, 0.95, 0.75];

/**
 * Escaparate de Prensa: la captura hace de funda y el vinilo espera dentro.
 * Al señalar la pieza (hover o foco; en pantallas táctiles, al entrar en pantalla) la funda se aparta,
 * el disco sale girando a 33⅓ rpm, baja el brazo y los surcos se prensan de fuera adentro, como en el banner del README.
 */
export function PrensaRecord({ image, copy }: { image: string; copy: Copy }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { amount: 0.6 });
	const [touch, setTouch] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(hover: none)");
		const sync = () => setTouch(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	return (
		<div className="print-hide">
			<div ref={ref} className="prensa-stage relative aspect-[16/11]" data-active={touch && inView ? "true" : undefined}>
				<div aria-hidden="true" className="prensa-disc absolute top-[8%] aspect-square h-[84%]">
					<svg viewBox="0 0 400 400" className="prensa-spin h-full w-full overflow-visible">
						<defs>
							<path id="prensa-label-path" d="M200,200 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0" />
						</defs>
						<circle cx="200" cy="200" r="196" className="prensa-vinyl" />
						{GROOVES.map((r) => (
							<circle key={r} cx="200" cy="200" r={r} className="prensa-groove" />
						))}
						{PRESSED.map((r, i) => (
							<circle
								key={r}
								cx="200"
								cy="200"
								r={r}
								pathLength={1}
								className="prensa-pressed"
								style={{ "--i": i } as CSSProperties}
							/>
						))}
						<circle cx="200" cy="200" r="72" className="prensa-label" />
						<circle cx="200" cy="200" r="66" className="prensa-label-ring" />
						<text className="prensa-label-text">
							<textPath href="#prensa-label-path">{copy.discLabel}</textPath>
						</text>
						<text x="200" y="208" textAnchor="middle" className="prensa-label-brand">
							PRENSA
						</text>
						<circle cx="200" cy="200" r="4" className="prensa-hole" />
					</svg>
					<svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible">
						<circle cx="200" cy="200" r="172" className="prensa-front" vectorEffect="non-scaling-stroke" />
						<circle cx="200" cy="200" r="196" className="prensa-sheen" />
					</svg>
					<svg viewBox="0 0 400 400" className="prensa-arm absolute inset-0 h-full w-full overflow-visible">
						<circle cx="392" cy="8" r="15" className="prensa-arm-base" />
						<path d="M392 8 L356 196 L314 226" className="prensa-arm-rod" />
						<rect x="298" y="218" width="26" height="15" rx="3" transform="rotate(35 311 225)" className="prensa-arm-head" />
					</svg>
				</div>

				<div className="prensa-sleeve media-frame absolute inset-y-0 left-0 w-[82%] overflow-hidden">
					<Image
						src={withBasePath(image)}
						alt={copy.coverAlt}
						fill
						sizes="(min-width: 1024px) 50vw, 90vw"
						className="media-tone object-cover object-left"
					/>
				</div>
			</div>

			<div className="prensa-caption mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
				<p className="meta flex items-center gap-2 text-subtle">
					<span aria-hidden="true" className="prensa-rec-dot" />
					{copy.rec}
				</p>
				<span aria-hidden="true" className="prensa-vu flex h-3 items-end gap-[3px]">
					{VU.map((d, i) => (
						<span key={i} style={{ "--vu": `${d}s` } as CSSProperties} />
					))}
				</span>
				<p className="meta prensa-hint ml-auto text-subtle">{copy.hint}</p>
			</div>
			<p className="prensa-tagline mt-2 font-mono text-[0.95rem] text-ink">
				<span className="prensa-type">{copy.tagline}</span>
				<span aria-hidden="true" className="prensa-caret" />
			</p>
			<p className="meta mt-1 text-subtle">{copy.facts}</p>
		</div>
	);
}
