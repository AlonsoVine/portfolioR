"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR = [
	"a[href]",
	"button:not([disabled])",
	"input:not([disabled])",
	"select:not([disabled])",
	"textarea:not([disabled])",
	"[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * Mantiene el foco del teclado atrapado dentro del contenedor referenciado
 * mientras `enabled` sea true. Restaura el foco al elemento previo al
 * desactivarse.
 */
export function useFocusTrap(
	containerRef: RefObject<HTMLElement | null>,
	enabled: boolean,
) {
	useEffect(() => {
		if (!enabled) return;
		const container = containerRef.current;
		if (!container) return;

		const previousFocus = document.activeElement as HTMLElement | null;

		const getFocusable = () =>
			Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
				(el) => !el.hasAttribute("hidden") && el.offsetParent !== null,
			);

		// Foco inicial en el primer elemento (o el propio contenedor si no hay focusables)
		const initial = getFocusable();
		if (initial.length > 0) {
			initial[0].focus();
		} else if (container.tabIndex >= 0) {
			container.focus();
		}

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== "Tab") return;
			const focusables = getFocusable();
			if (focusables.length === 0) {
				event.preventDefault();
				return;
			}
			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const active = document.activeElement;
			if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		};

		container.addEventListener("keydown", onKeyDown);
		return () => {
			container.removeEventListener("keydown", onKeyDown);
			if (previousFocus && typeof previousFocus.focus === "function") {
				previousFocus.focus();
			}
		};
	}, [enabled, containerRef]);
}
