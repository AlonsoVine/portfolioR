"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ScrambleText } from "../shared/ScrambleText";
import { cn, withBasePath } from "@/lib/utils";

type Copy = { window: string; exif: string; fallback: string; summary: string; replay: string };

// Nombres de ejemplo: así llegan las fotos de una cámara, un móvil y un chat
const FILES = [
	{ from: "IMG_4821.JPG", to: "2024-06-14 18.32.07.jpg", exif: true },
	{ from: "DSC00193.JPG", to: "2024-06-14 19.05.51.jpg", exif: true },
	{ from: "PXL_20240615_091244.jpg", to: "2024-06-15 09.12.44.jpg", exif: true },
	{ from: "WhatsApp Image (3).jpeg", to: "2024-06-16 12.40.03.jpeg", exif: false },
	{ from: "IMG_4830.HEIC", to: "2024-06-18 21.47.30.heic", exif: true },
];
const STEP_MS = 520;

/**
 * Escaparate de PhotoDateRenamer: sobre la captura de la app, una ventana en la que cada nombre de archivo
 * se reescribe con su fecha de captura. Corre al entrar en pantalla y se repite al señalar la pieza.
 */
export function RenamerShowcase({ image, alt, copy }: { image: string; alt: string; copy: Copy }) {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.5 });
	const reduce = useReducedMotion();
	const [run, setRun] = useState(0);
	const [step, setStep] = useState(0);

	useEffect(() => {
		if (!inView || reduce) return;
		let n = 0;
		const id = window.setInterval(() => {
			n += 1;
			setStep(n);
			if (n > FILES.length) window.clearInterval(id);
		}, STEP_MS);
		return () => window.clearInterval(id);
	}, [inView, reduce, run]);

	const shown = reduce ? FILES.length + 1 : step;
	const replay = () => {
		if (reduce || step <= FILES.length) return;
		setStep(0);
		setRun((r) => r + 1);
	};

	return (
		<div ref={ref} className="print-hide" onPointerEnter={replay}>
			<div className="media-frame relative aspect-[16/11] w-full overflow-hidden">
				<Image src={withBasePath(encodeURI(image))} alt={alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="media-tone object-cover" />
				<div className="renamer-window absolute inset-x-[6%] bottom-[7%] border border-rule-strong bg-paper font-mono text-[0.72rem] leading-[1.6] sm:inset-x-[10%] sm:text-[0.8rem]">
					<div className="flex items-center gap-2 border-b border-rule px-3 py-2 text-subtle">
						<span aria-hidden="true" className="flex gap-1.5">
							<span className="h-2 w-2 rounded-full border border-rule-strong" />
							<span className="h-2 w-2 rounded-full border border-rule-strong" />
							<span className="h-2 w-2 rounded-full border border-rule-strong" />
						</span>
						<span className="ml-2 truncate">{copy.window}</span>
					</div>
					<ol className="px-3 py-2">
						{FILES.map((file, i) => {
							const done = shown > i;
							return (
								<li key={file.from} className="grid grid-cols-[1.4rem_minmax(0,1fr)_auto] items-baseline gap-x-2">
									<span className={done ? "text-signal" : "text-subtle"}>{done ? "ok" : "··"}</span>
									<span className="min-w-0 truncate">
										{done ? (
											<span className="text-ink">
												<ScrambleText key={`${run}-${i}`} text={file.to} duration={480} />
											</span>
										) : (
											<span className="text-muted">{file.from}</span>
										)}
									</span>
									<span className={cn("meta text-[0.62rem]", done ? "text-subtle" : "invisible")}>
										{file.exif ? copy.exif : copy.fallback}
									</span>
								</li>
							);
						})}
					</ol>
					<p className="flex items-center justify-between gap-4 border-t border-rule px-3 py-2 text-subtle">
						<span className={cn("transition-opacity duration-500", shown > FILES.length ? "opacity-100" : "opacity-0")}>
							{copy.summary.replace("{n}", String(FILES.length))}
						</span>
					</p>
				</div>
			</div>
			<p className="meta prensa-hint mt-3 text-subtle">{copy.replay}</p>
		</div>
	);
}
