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

		// Seguidor del cursor: anillo que acompaña al puntero y se convierte en etiqueta sobre `[data-cursor]`.
		const follower = document.createElement("div");
		follower.className = "cursor-follower";
		follower.setAttribute("aria-hidden", "true");
		const followerLabel = document.createElement("span");
		follower.appendChild(followerLabel);
		document.body.appendChild(follower);
		let fx = -100;
		let fy = -100;
		let tx = -100;
		let ty = -100;
		let followFrame = 0;
		let cursorTarget: HTMLElement | null = null;
		const follow = () => {
			fx += (tx - fx) * 0.22;
			fy += (ty - fy) * 0.22;
			follower.style.transform = `translate3d(${fx}px, ${fy}px, 0)`;
			followFrame = Math.abs(tx - fx) + Math.abs(ty - fy) > 0.2 ? window.requestAnimationFrame(follow) : 0;
		};

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

			tx = event.clientX;
			ty = event.clientY;
			follower.classList.add("is-visible");
			if (!followFrame) followFrame = window.requestAnimationFrame(follow);
			const labelled = event.target.closest<HTMLElement>("[data-cursor]");
			if (labelled !== cursorTarget) {
				cursorTarget = labelled;
				if (labelled) followerLabel.textContent = labelled.dataset.cursor ?? "";
				follower.classList.toggle("is-active", Boolean(labelled));
			}

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

		const onLeave = () => {
			releaseMagnet();
			follower.classList.remove("is-visible");
		};

		document.addEventListener("pointermove", onMove, { passive: true });
		document.addEventListener("pointerleave", onLeave);
		window.addEventListener("blur", onLeave);
		return () => {
			document.removeEventListener("pointermove", onMove);
			document.removeEventListener("pointerleave", onLeave);
			window.removeEventListener("blur", onLeave);
			if (frame) window.cancelAnimationFrame(frame);
			if (followFrame) window.cancelAnimationFrame(followFrame);
			releaseMagnet();
			follower.remove();
		};
	}, []);

	return null;
}
