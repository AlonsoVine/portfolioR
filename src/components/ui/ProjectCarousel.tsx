'use client';

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Props = {
	images: string[];
	alt: string;
	intervalMs?: number;
};

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function ProjectCarousel({ images, alt, intervalMs = 3200 }: Props) {
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [zoomed, setZoomed] = useState(false);
	const reduceMotion = useReducedMotion();

	const total = images.length;
	const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
	const next = useCallback(() => goTo(index + 1), [goTo, index]);
	const prev = useCallback(() => goTo(index - 1), [goTo, index]);

	useEffect(() => {
		if (reduceMotion || paused || zoomed || total <= 1) return;
		const id = window.setInterval(() => setIndex((i) => (i + 1) % total), intervalMs);
		return () => window.clearInterval(id);
	}, [paused, zoomed, total, intervalMs, reduceMotion]);

	useEffect(() => {
		if (!zoomed) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setZoomed(false);
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
		};
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
		};
	}, [zoomed, next, prev]);

	const current = images[index];

	return (
		<>
			<div
				className="relative h-60 w-full overflow-hidden"
				role="group"
				aria-roledescription="carousel"
				aria-label={alt}
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}
				onFocus={() => setPaused(true)}
				onBlur={() => setPaused(false)}
			>
				<AnimatePresence initial={false} mode="sync">
					<motion.button
						key={current}
						type="button"
						onClick={() => setZoomed(true)}
						aria-label={`Ampliar imagen ${index + 1} de ${total}`}
						className="absolute inset-0 cursor-zoom-in"
						initial={reduceMotion ? false : { opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduceMotion ? 0 : 0.7, ease: "easeInOut" }}
					>
						<Image
							src={`${prefix}${current}`}
							alt={alt}
							width={1200}
							height={800}
							className="h-full w-full object-cover"
							priority={index === 0}
						/>
					</motion.button>
				</AnimatePresence>

				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent opacity-80" />

				{total > 1 ? (
					<>
						<button
							type="button"
							onClick={prev}
							aria-label="Imagen anterior"
							className="absolute left-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/60 group-hover:opacity-100 focus:opacity-100"
						>
							<ChevronLeft className="h-5 w-5" aria-hidden="true" />
						</button>
						<button
							type="button"
							onClick={next}
							aria-label="Imagen siguiente"
							className="absolute right-2 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-black/60 group-hover:opacity-100 focus:opacity-100"
						>
							<ChevronRight className="h-5 w-5" aria-hidden="true" />
						</button>

						<div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
							{images.map((src, i) => {
								const active = i === index;
								return (
									<button
										key={src}
										type="button"
										onClick={() => goTo(i)}
										aria-label={`Ir a la imagen ${i + 1} de ${total}`}
										aria-current={active}
										className={`h-1.5 rounded-full transition-all duration-300 ${
											active ? "w-6 bg-[var(--accent-warm)]" : "w-1.5 bg-white/40 hover:bg-white/70"
										}`}
									/>
								);
							})}
						</div>
					</>
				) : null}
			</div>

			{zoomed ? (
				<div
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
					role="dialog"
					aria-modal="true"
					aria-label={`${alt} — vista ampliada`}
					onClick={() => setZoomed(false)}
				>
					<div
						className="relative max-h-[90vh] w-full max-w-6xl"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							type="button"
							onClick={() => setZoomed(false)}
							aria-label="Cerrar vista ampliada"
							className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
						>
							<X className="h-5 w-5" aria-hidden="true" />
						</button>

						<div className="relative h-[80vh] w-full">
							<Image
								src={`${prefix}${current}`}
								alt={alt}
								fill
								sizes="100vw"
								className="object-contain"
							/>
						</div>

						{total > 1 ? (
							<>
								<button
									type="button"
									onClick={prev}
									aria-label="Imagen anterior"
									className="absolute left-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
								>
									<ChevronLeft className="h-6 w-6" aria-hidden="true" />
								</button>
								<button
									type="button"
									onClick={next}
									aria-label="Imagen siguiente"
									className="absolute right-3 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
								>
									<ChevronRight className="h-6 w-6" aria-hidden="true" />
								</button>

								<div className="mt-4 flex items-center justify-center gap-2 text-sm text-white/70">
									<span>{index + 1} / {total}</span>
								</div>
							</>
						) : null}
					</div>
				</div>
			) : null}
		</>
	);
}
