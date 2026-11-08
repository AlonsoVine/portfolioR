'use client';

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Portal, useInertOutside } from "../shared/Portal";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { useLanguage } from "@/i18n";
import { cn, withBasePath } from "@/lib/utils";

type Props = {
	images: string[];
	alt: string;
	intervalMs?: number;
	size?: "default" | "large";
};

const pad = (n: number) => String(n).padStart(2, "0");

export function ProjectCarousel({ images, alt, intervalMs = 4200, size = "default" }: Props) {
	const { ui } = useLanguage().dict;
	const t = ui.carousel;
	const fill = (text: string, n: number) => text.replace("{n}", String(n)).replace("{total}", String(images.length));
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const [zoomed, setZoomed] = useState(false);
	const reduceMotion = useReducedMotion();
	const lightboxRef = useRef<HTMLDivElement>(null);
	useInertOutside(zoomed);
	useFocusTrap(lightboxRef, zoomed);

	const total = images.length;
	const goTo = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);
	const next = useCallback(() => goTo(index + 1), [goTo, index]);
	const prev = useCallback(() => goTo(index - 1), [goTo, index]);
	const close = useCallback(() => setZoomed(false), []);

	useEffect(() => {
		if (reduceMotion || paused || zoomed || total <= 1) return;
		const id = window.setInterval(() => setIndex((i) => (i + 1) % total), intervalMs);
		return () => window.clearInterval(id);
	}, [paused, zoomed, total, intervalMs, reduceMotion]);

	useEffect(() => {
		if (!zoomed) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
			else if (e.key === "ArrowRight") next();
			else if (e.key === "ArrowLeft") prev();
		};
		const onWheel = () => close();
		const onTouchMove = () => close();
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", onKey);
		window.addEventListener("wheel", onWheel, { passive: true });
		window.addEventListener("touchmove", onTouchMove, { passive: true });
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", onKey);
			window.removeEventListener("wheel", onWheel);
			window.removeEventListener("touchmove", onTouchMove);
		};
	}, [zoomed, next, prev, close]);

	const current = images[index];
	const contain = size === "large";

	return (
		<>
			<div
				role="group"
				aria-roledescription="carousel"
				aria-label={alt}
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}
				onFocus={() => setPaused(true)}
				onBlur={() => setPaused(false)}
			>
				<div className="media-frame relative aspect-[16/10] w-full overflow-hidden">
					<AnimatePresence initial={false} mode="sync">
						<motion.button
							key={current}
							type="button"
							onClick={() => setZoomed(true)}
							aria-label={fill(t.zoom, index + 1)}
							className="absolute inset-0 cursor-zoom-in"
							initial={reduceMotion ? false : { opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeInOut" }}
						>
							<Image
								src={withBasePath(current)}
								alt={alt}
								width={1200}
								height={800}
								sizes={contain ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 40vw, 100vw"}
								className={cn("media-tone h-full w-full", contain ? "object-contain" : "object-cover")}
							/>
						</motion.button>
					</AnimatePresence>
				</div>

				{total > 1 ? (
					<div className="print-hide mt-3 flex items-center gap-4">
						<p className="meta w-16 shrink-0 text-subtle tabular" aria-live="off">
							<span className="text-ink">{pad(index + 1)}</span> / {pad(total)}
						</p>
						<div className="flex flex-1 items-center gap-1">
							{images.map((src, i) => {
								const active = i === index;
								return (
									<button
										key={src}
										type="button"
										onClick={() => goTo(i)}
										aria-label={fill(t.goTo, i + 1)}
										aria-current={active}
										className="group flex h-6 flex-1 items-center"
									>
										<span
											className={cn(
												"block h-px w-full",
												active ? "bg-ink" : "bg-rule-strong group-hover:bg-ink-muted",
											)}
										/>
									</button>
								);
							})}
						</div>
						<div className="flex shrink-0">
							<button type="button" onClick={prev} aria-label={t.prev} className="meta inline-flex h-11 w-11 items-center justify-center text-ink hover:text-muted">
								<span aria-hidden="true">←</span>
							</button>
							<button type="button" onClick={next} aria-label={t.next} className="meta inline-flex h-11 w-11 items-center justify-center text-ink hover:text-muted">
								<span aria-hidden="true">→</span>
							</button>
						</div>
					</div>
				) : null}
			</div>

			<Portal>
				{zoomed ? (
					<div
						ref={lightboxRef}
						className="fixed inset-0 z-[80] flex flex-col bg-paper"
						role="dialog"
						aria-modal="true"
						aria-label={`${alt} — ${t.zoomed}`}
					>
						<div className="page flex h-14 shrink-0 items-center justify-between border-b border-rule">
							<p className="meta text-ink">
								{alt}
								{total > 1 ? (
									<span className="ml-3 text-subtle tabular" aria-live="polite">
										{pad(index + 1)} / {pad(total)}
									</span>
								) : null}
							</p>
							<button type="button" onClick={close} className="meta -mr-2 min-h-11 px-2 text-ink hover:text-muted">
								{t.close}
							</button>
						</div>
						<div
							className="relative flex-1"
							onClick={(e) => {
								if (e.target === e.currentTarget) close();
							}}
						>
							<div className="absolute inset-4 sm:inset-10">
								<Image src={withBasePath(current)} alt={alt} fill sizes="100vw" className="object-contain" />
							</div>
						</div>
						{total > 1 ? (
							<div className="page flex h-14 shrink-0 items-center justify-between border-t border-rule">
								<button type="button" onClick={prev} className="meta -ml-2 min-h-11 px-2 text-ink hover:text-muted">
									<span aria-hidden="true">← </span>
									{t.prev}
								</button>
								<button type="button" onClick={next} className="meta -mr-2 min-h-11 px-2 text-ink hover:text-muted">
									{t.next}
									<span aria-hidden="true"> →</span>
								</button>
							</div>
						) : null}
					</div>
				) : null}
			</Portal>
		</>
	);
}
