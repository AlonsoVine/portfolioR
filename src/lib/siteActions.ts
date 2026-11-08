"use client";

import { flushSync } from "react-dom";

/** Acciones de sitio compartidas por la paleta de comandos, la terminal y los controles del header. */

export type Theme = "light" | "dark";

declare global {
	interface Window {
		__theme?: Theme;
	}
}

export const THEME_EVENT = "portfolio-theme-change";
export const OPEN_PALETTE_EVENT = "portfolio-open-palette";
export const RETRO_TOGGLE_EVENT = "portfolio-retro-toggle";

export function readTheme(): Theme {
	return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function applyTheme(next: Theme) {
	document.documentElement.dataset.theme = next;
	window.__theme = next;
	try {
		window.localStorage.setItem("theme", next);
	} catch {
		// sin persistencia: el tema dura lo que la pestaña
	}
	window.dispatchEvent(new Event(THEME_EVENT));
}

export function prefersReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function toggleTheme(): Theme {
	const next: Theme = readTheme() === "light" ? "dark" : "light";
	if (!prefersReducedMotion() && typeof document.startViewTransition === "function") {
		document.startViewTransition(() => flushSync(() => applyTheme(next)));
	} else {
		applyTheme(next);
	}
	return next;
}

export function goToSection(id: string) {
	const target = document.getElementById(id);
	if (!target) return;
	target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
	history.replaceState(null, "", `#${id}`);
}

export function openPalette() {
	window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}

export function toggleRetro() {
	window.dispatchEvent(new Event(RETRO_TOGGLE_EVENT));
}

export async function copyText(text: string) {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}

export function downloadFile(href: string) {
	const a = document.createElement("a");
	a.href = href;
	a.download = "";
	a.rel = "noreferrer";
	document.body.appendChild(a);
	a.click();
	a.remove();
}

export function isTypingTarget(target: EventTarget | null) {
	if (!(target instanceof HTMLElement)) return false;
	return target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
}
