"use client";

import { useEffect } from "react";

const MAGNET_STRENGTH = 0.28;
const MAGNET_MAX = 10;

/**
 * Un único listener delegado para todo el documento:
 * - `[data-spotlight]`: expone la posición del puntero como --sx/--sy (px) para `.spotlight`.
 * - `[data-magnetic]`: desplaza el elemento hacia el puntero con `transform`.
 * Solo con puntero fino y sin reduced motion; en táctil no hace nada.
 */
export function PointerEffects() {
	useEffect(() => {
		const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		if (!fine.matches || reduced.matches) return;

		let frame = 0;
		let lastEvent: PointerEvent | null = null;
		let magnet: HTMLElement | null = null;

		const releaseMagnet = () => {
			if (!magnet) return;
			magnet.style.transform = "";
			magnet = null;
		};

		const apply = () => {
			frame = 0;
			const event = lastEvent;
			if (!event || !(event.target instanceof Element)) return;

			const spot = event.target.closest<HTMLElement>("[data-spotlight]");
			if (spot) {
				const rect = spot.getBoundingClientRect();
				spot.style.setProperty("--sx", `${event.clientX - rect.left}px`);
				spot.style.setProperty("--sy", `${event.clientY - rect.top}px`);
			}

			const target = event.target.closest<HTMLElement>("[data-magnetic]");
			if (target !== magnet) releaseMagnet();
			if (target) {
				magnet = target;
				const rect = target.getBoundingClientRect();
				const dx = event.clientX - (rect.left + rect.width / 2);
				const dy = event.clientY - (rect.top + rect.height / 2);
				const clamp = (v: number) => Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, v * MAGNET_STRENGTH));
				target.style.transform = `translate3d(${clamp(dx)}px, ${clamp(dy)}px, 0)`;
			}
		};

		const onMove = (event: PointerEvent) => {
			lastEvent = event;
			if (!frame) frame = window.requestAnimationFrame(apply);
		};

		const onLeave = () => releaseMagnet();

		document.addEventListener("pointermove", onMove, { passive: true });
		document.addEventListener("pointerleave", onLeave);
		window.addEventListener("blur", onLeave);
		return () => {
			document.removeEventListener("pointermove", onMove);
			document.removeEventListener("pointerleave", onLeave);
			window.removeEventListener("blur", onLeave);
			if (frame) window.cancelAnimationFrame(frame);
			releaseMagnet();
		};
	}, []);

	return null;
}
