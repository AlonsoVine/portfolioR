// Verificación de diseño (falla con código 1):
// - colores con saturación HSL > 25 % y tono en [250°, 320°] o [15°, 45°]
// - `background-clip: text`
// - gradientes decorativos (solo se admiten dentro de `mask-image` y del modo retro del easter egg)
// - emojis o pictogramas en textos de la interfaz
// Analiza el CSS compilado de `out/` (incluye las utilidades de Tailwind en oklch) y el código de `src/`.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = process.cwd();
const failures = [];

function walk(dir, exts, acc = []) {
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		const st = statSync(p);
		if (st.isDirectory()) walk(p, exts, acc);
		else if (exts.includes(extname(p))) acc.push(p);
	}
	return acc;
}

function rgbToHsl(r, g, b) {
	r /= 255; g /= 255; b /= 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	const l = (max + min) / 2;
	if (max === min) return { h: 0, s: 0, l };
	const d = max - min;
	const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	let h;
	if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
	else if (max === g) h = (b - r) / d + 2;
	else h = (r - g) / d + 4;
	return { h: h * 60, s, l };
}

function oklchToRgb(L, C, H) {
	const hr = (H * Math.PI) / 180;
	const a = C * Math.cos(hr), b = C * Math.sin(hr);
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;
	const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
	const lin = [
		4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	];
	return lin.map((c) => {
		c = Math.min(1, Math.max(0, c));
		return 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
	});
}

function parseColors(text) {
	const found = [];
	for (const m of text.matchAll(/#([0-9a-fA-F]{3,8})\b/g)) {
		let h = m[1];
		if (![3, 4, 6, 8].includes(h.length)) continue;
		if (h.length <= 4) h = [...h].map((c) => c + c).join("");
		found.push({ raw: m[0], rgb: [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) });
	}
	for (const m of text.matchAll(/rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/g)) {
		found.push({ raw: m[0], rgb: [+m[1], +m[2], +m[3]] });
	}
	for (const m of text.matchAll(/hsla?\(\s*([\d.]+)(?:deg)?[ ,]+([\d.]+)%[ ,]+([\d.]+)%/g)) {
		found.push({ raw: m[0], hsl: { h: +m[1], s: +m[2] / 100, l: +m[3] / 100 } });
	}
	for (const m of text.matchAll(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/g)) {
		const L = m[2] ? +m[1] / 100 : +m[1];
		found.push({ raw: m[0], rgb: oklchToRgb(L, +m[3], +m[4]) });
	}
	return found;
}

function forbidden({ rgb, hsl }) {
	const { h, s, l } = hsl ?? rgbToHsl(...rgb);
	// Casi blanco o casi negro: la saturación HSL deja de tener sentido perceptivo
	if (l > 0.97 || l < 0.03) return null;
	const inRange = (h >= 250 && h <= 320) || (h >= 15 && h <= 45);
	return s > 0.25 && inRange ? { h: Math.round(h), s: Math.round(s * 100) } : null;
}

// 1) CSS compilado
const cssFiles = walk(join(ROOT, "out"), [".css"]);
if (cssFiles.length === 0) failures.push("No hay CSS en out/: ejecuta `npm run build` antes.");
for (const file of cssFiles) {
	const css = readFileSync(file, "utf8");
	// Se analizan declaraciones (prop:valor) con su selector para poder aplicar las excepciones
	for (const rule of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
		const selector = rule[1].trim();
		for (const decl of rule[2].split(";")) {
			const idx = decl.indexOf(":");
			if (idx < 0) continue;
			const prop = decl.slice(0, idx).trim();
			const value = decl.slice(idx + 1).trim();
			if (/background-clip\s*$/.test(prop) && /\btext\b/.test(value)) failures.push(`background-clip: text en «${selector}»`);
			const isMask = /mask/.test(prop);
			const isRetro = /retro-mode/.test(selector);
			if (/gradient\(/.test(value) && !isMask && !isRetro) failures.push(`gradiente en «${selector}» → ${prop}: ${value.slice(0, 80)}`);
			if (prop.startsWith("--tw-") || isRetro) continue;
			for (const c of parseColors(value)) {
				const bad = forbidden(c);
				if (bad) failures.push(`color prohibido ${c.raw} (tono ${bad.h}°, sat ${bad.s} %) en «${selector}» → ${prop}`);
			}
		}
	}
}

// 2) Código fuente: colores literales en estilos inline / clases arbitrarias y emojis en textos
const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2B00}-\u{2BFF}\u{1F000}-\u{1F2FF}\u{FE0F}]/u;
for (const file of walk(join(ROOT, "src"), [".ts", ".tsx", ".css"])) {
	const text = readFileSync(file, "utf8");
	const rel = file.slice(ROOT.length + 1);
	text.split("\n").forEach((line, i) => {
		if (/^\s*(\/\/|\*|\/\*)/.test(line)) return;
		if (rel.endsWith("ConsoleSignature.tsx")) return; // salida de consola, no interfaz
		if (EMOJI.test(line)) failures.push(`emoji/pictograma en ${rel}:${i + 1}: ${line.trim().slice(0, 80)}`);
		if (rel.endsWith(".css")) return; // el CSS ya se analiza compilado
		for (const c of parseColors(line)) {
			const bad = forbidden(c);
			if (bad) failures.push(`color prohibido ${c.raw} en ${rel}:${i + 1}`);
		}
		if (/gradient\(/.test(line) && !/mask/i.test(line)) failures.push(`gradiente en ${rel}:${i + 1}`);
		if (/bg-gradient-|from-\w+-\d|bg-clip-text/.test(line)) failures.push(`utilidad de degradado en ${rel}:${i + 1}`);
	});
}

if (failures.length) {
	console.error(`check:design · ${failures.length} problema(s):`);
	for (const f of [...new Set(failures)].slice(0, 80)) console.error("  ✗ " + f);
	process.exit(1);
}
console.log(`check:design · OK (${cssFiles.length} CSS compilados y src/ sin colores prohibidos, gradientes decorativos, background-clip:text ni emojis)`);
