"use client";

import { useEffect, useRef } from "react";

const KONAMI = [
	"ArrowUp",
	"ArrowUp",
	"ArrowDown",
	"ArrowDown",
	"ArrowLeft",
	"ArrowRight",
	"ArrowLeft",
	"ArrowRight",
	"b",
	"a",
];

/**
 * Detecta la secuencia clásica de Konami (↑↑↓↓←→←→BA) en el documento
 * y dispara el callback cuando se completa.
 */
export function useKonamiCode(onUnlock: () => void) {
	const positionRef = useRef(0);
	const callbackRef = useRef(onUnlock);
	callbackRef.current = onUnlock;

	useEffect(() => {
		if (typeof window === "undefined") return;
		const onKeyDown = (event: KeyboardEvent) => {
			const expected = KONAMI[positionRef.current];
			const pressed = event.key.length === 1 ? event.key.toLowerCase() : event.key;
			if (pressed === expected) {
				positionRef.current += 1;
				if (positionRef.current === KONAMI.length) {
					positionRef.current = 0;
					callbackRef.current();
				}
			} else {
				positionRef.current = pressed === KONAMI[0] ? 1 : 0;
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);
}
