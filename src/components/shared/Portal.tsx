"use client";

import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useIsClient } from "@/lib/useIsClient";

/**
 * Los diálogos se montan en <body>: dentro de una sección quedaban atrapados en su
 * contexto de apilamiento y el header y los flotantes se pintaban por encima.
 */
export function Portal({ children }: { children: ReactNode }) {
	const isClient = useIsClient();
	return isClient ? createPortal(children, document.body) : null;
}

/** Mientras hay un diálogo abierto, todo lo demás queda fuera del foco y del puntero. */
export function useInertOutside(open: boolean) {
	useEffect(() => {
		if (!open) return;
		// Hay que guardar el disparador antes de marcarlo inerte: `inert` le quita el foco.
		const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
		const touched = Array.from(document.body.children).filter(
			(node): node is HTMLElement =>
				node instanceof HTMLElement && !node.inert && !node.querySelector('[aria-modal="true"]') && node.getAttribute("aria-modal") !== "true",
		);
		touched.forEach((node) => {
			node.inert = true;
		});
		return () => {
			touched.forEach((node) => {
				node.inert = false;
			});
			trigger?.focus();
		};
	}, [open]);
}
