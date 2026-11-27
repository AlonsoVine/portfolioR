"use client";

import { useEffect, useRef } from "react";

type Ribbon = {
	y: number;
	rise: number;
	amp: number;
	freq: number;
	speed: number;
	phase: number;
	band: number;
	twistFreq: number;
	twistSpeed: number;
	strands: number;
	share: number;
	drift: number;
};

type Rgb = [number, number, number];

type Target = { tex: WebGLTexture; fbo: WebGLFramebuffer; w: number; h: number };

const FRAME_MS = 1000 / 30;
const STRIDE = 6;
const SPARK_SHARE = 0.025;

const RIBBONS: Ribbon[] = [
	{ y: 0.52, rise: 0.78, amp: 0.16, freq: 0.7, speed: 0.012, phase: 0.4, band: 0.2, twistFreq: 1.3, twistSpeed: 0.018, strands: 14, share: 0.5, drift: 0.0032 },
	{ y: 0.6, rise: 0.62, amp: 0.13, freq: 1.0, speed: -0.009, phase: 2.6, band: 0.13, twistFreq: 1.8, twistSpeed: -0.014, strands: 10, share: 0.32, drift: 0.0026 },
	{ y: 0.4, rise: 0.9, amp: 0.1, freq: 0.5, speed: 0.007, phase: 4.4, band: 0.08, twistFreq: 1.0, twistSpeed: 0.011, strands: 8, share: 0.18, drift: 0.0021 },
];

// Cada partícula calcula su posición en la GPU a partir de su carril y del tiempo: la CPU no toca nada por frame
const PARTICLE_VS = `#version 300 es
in float a_u;
in float a_offset;
in float a_ripple;
in float a_drift;
in float a_grain;
in float a_ribbon;
uniform float u_time;
uniform float u_t;
uniform float u_lift;
uniform float u_point;
uniform float u_weight;
uniform vec4 u_ra[3];
uniform vec4 u_rb[3];
uniform float u_rc[3];
out vec3 v_w;
const float TAU = 6.2831853;
void main() {
	int r = int(a_ribbon + 0.5);
	vec4 A = u_ra[r];
	vec4 B = u_rb[r];
	float raw = fract(a_u + u_time * a_drift) * 1.16 - 0.08;
	float nx = raw + 0.05 * sin(raw * 3.1 + u_t * 0.01 + B.y);
	float wave = nx * A.w * TAU + u_t * B.x * TAU + B.y;
	float ang = nx * B.w * TAU + u_t * u_rc[r] * TAU + B.y;
	float c = cos(ang);
	float band = B.z * (0.65 + 0.35 * sin(nx * 2.4 + u_t * 0.02 + B.y));
	float centre = A.x + u_lift + A.y * (0.5 - raw) + A.z * sin(wave) + A.z * 0.3 * sin(wave * 2.1 + 1.3);
	float z = a_offset * sin(ang);
	float ripple = 0.006 * sin(raw * 8.0 + a_ripple + u_t * 0.05) * (0.4 + 0.6 * abs(a_offset));
	float y = centre + a_offset * band * c + ripple + band * (0.2 * z + 0.5 * z * z) + 0.025 * z * sin(wave * 1.7);
	float edge = min(1.0, min(max(0.0, raw + 0.04) * 3.5, max(0.0, 1.04 - raw) * 3.5));
	float fold = 1.0 + 1.0 * pow(1.0 - abs(c), 4.0);
	// Grano negativo = chispa ámbar: solo en la cara de delante, para que se lea nítida
	float warm = step(a_grain, 0.0);
	float w = abs(a_grain) * edge * fold * u_weight;
	bool back = z < -0.15;
	float front = w * (0.55 + 0.45 * z) * 0.3;
	v_w = back ? vec3(w * 0.15, w * 0.25, 0.0) : vec3(front, 0.0, front * warm);
	gl_PointSize = back ? u_point * 2.0 : u_point;
	gl_Position = vec4(raw * 2.0 - 1.0, 1.0 - y * 2.0, 0.0, 1.0);
}`;

// Huella gaussiana normalizada (integral ≈ 1): el brillo no depende del tamaño del punto
const PARTICLE_FS = `#version 300 es
precision highp float;
in vec3 v_w;
uniform float u_point;
out vec4 o;
void main() {
	vec2 p = gl_PointCoord - 0.5;
	float k = exp(-dot(p, p) * 9.0);
	float size = v_w.y > 0.0 ? u_point * 2.0 : u_point;
	o = vec4(v_w * k / (0.349 * size * size), 0.0);
}`;

const QUAD_VS = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
	v_uv = a_pos * 0.5 + 0.5;
	gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const DOWN_FS = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_src;
uniform vec2 u_texel;
out vec4 o;
void main() {
	vec2 d = u_texel;
	o = 0.25 * (texture(u_src, v_uv + vec2(-d.x, -d.y)) + texture(u_src, v_uv + vec2(d.x, -d.y))
		+ texture(u_src, v_uv + vec2(-d.x, d.y)) + texture(u_src, v_uv + vec2(d.x, d.y)));
}`;

const BLUR_FS = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_src;
uniform vec2 u_step;
out vec4 o;
void main() {
	vec4 acc = texture(u_src, v_uv) * 0.2270;
	acc += (texture(u_src, v_uv + u_step * 1.3846) + texture(u_src, v_uv - u_step * 1.3846)) * 0.3162;
	acc += (texture(u_src, v_uv + u_step * 3.2308) + texture(u_src, v_uv - u_step * 3.2308)) * 0.0703;
	o = acc;
}`;

// La bruma sólo aparece donde ya hay hilos nítidos cerca: así no flotan nubes sueltas
const COMPOSITE_FS = `#version 300 es
precision highp float;
in vec2 v_uv;
uniform sampler2D u_accum;
uniform sampler2D u_haze;
uniform float u_gain;
uniform float u_hazeGain;
uniform vec3 u_deep;
uniform vec3 u_accent;
uniform vec3 u_glint;
uniform vec3 u_warm;
uniform float u_master;
out vec4 o;
void main() {
	vec3 f = texture(u_accum, v_uv).rgb * u_gain;
	vec2 h = texture(u_haze, v_uv).rg * u_gain;
	float anchor = smoothstep(0.0, 0.15, h.r);
	float d = 2.2 * f.r + u_hazeGain * anchor * (0.6 * h.r + 3.0 * h.g);
	float v = 1.0 - exp(-d);
	float hot = max(0.0, v - 0.78) * 1.6;
	vec3 c = mix(u_deep, u_accent, v) + (u_glint - u_accent) * hot;
	float a = u_master * v;
	// Las chispas se pintan encima del haz, no mezcladas con él: así el ámbar no se ahoga en el cian
	float s = 1.0 - exp(-24.0 * f.b);
	c = mix(c, u_warm, s);
	a = max(a, u_master * s);
	o = vec4(c * a, a);
}`;

function mulberry32(seed: number) {
	return () => {
		seed |= 0;
		seed = (seed + 0x6d2b79f5) | 0;
		let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

function hexToRgb(hex: string, fallback: Rgb): Rgb {
	const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
	if (!m) return fallback;
	const n = parseInt(m[1], 16);
	return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function readTheme() {
	const root = document.documentElement;
	const styles = getComputedStyle(root);
	if (root.dataset.theme === "light") {
		const ink = hexToRgb(styles.getPropertyValue("--accent-alt"), [11 / 255, 86 / 255, 101 / 255]);
		const paper = hexToRgb(styles.getPropertyValue("--background"), [242 / 255, 241 / 255, 237 / 255]);
		const accent = hexToRgb(styles.getPropertyValue("--accent"), [6 / 255, 103 / 255, 107 / 255]);
		const deep = paper.map((c, i) => c + (accent[i] - c) * 0.72) as Rgb;
		const warm = hexToRgb(styles.getPropertyValue("--highlight-glow"), [217 / 255, 150 / 255, 15 / 255]);
		return { deep, accent, glint: ink, warm, master: 0.95, haze: 0.25 };
	}
	return {
		deep: [15 / 255, 117 / 255, 138 / 255] as Rgb,
		accent: hexToRgb(styles.getPropertyValue("--accent"), [47 / 255, 237 / 255, 244 / 255]),
		glint: [211 / 255, 251 / 255, 253 / 255] as Rgb,
		warm: hexToRgb(styles.getPropertyValue("--highlight-glow"), [242 / 255, 180 / 255, 44 / 255]),
		master: 0.92,
		haze: 0.5,
	};
}

function buildParticles(ribbons: Ribbon[], count: number) {
	const rand = mulberry32(11);
	const data = new Float32Array(count * STRIDE);
	const totalShare = ribbons.reduce((sum, r) => sum + r.share, 0);
	let n = 0;
	ribbons.forEach((r, ri) => {
		const lanes = Array.from({ length: r.strands }, (_, k) => {
			const even = (k / (r.strands - 1)) * 2 - 1;
			return Math.max(-1, Math.min(1, even + (rand() - 0.5) * (1.4 / r.strands)));
		});
		const quota = ri === ribbons.length - 1 ? count - n : Math.round((count * r.share) / totalShare);
		for (let i = 0; i < quota && n < count; i++, n++) {
			const dust = rand() < 0.22;
			const k = Math.floor(rand() * r.strands);
			const o = n * STRIDE;
			data[o] = rand();
			data[o + 1] = dust ? rand() * 2.4 - 1.2 : lanes[k] + (rand() + rand() + rand() - 1.5) * 0.06;
			data[o + 2] = (dust ? rand() * 20 : k * 1.7) + ri * 3.1;
			data[o + 3] = r.drift * (0.92 + rand() * 0.16);
			const spark = !dust && rand() < SPARK_SHARE;
			data[o + 4] = dust ? 0.35 : spark ? -(1.1 + rand() * 0.5) : 0.6 + rand() * 0.4;
			data[o + 5] = ri;
		}
	});
	return data;
}

function compile(gl: WebGL2RenderingContext, vs: string, fs: string) {
	const program = gl.createProgram();
	if (!program) return null;
	const shaders: WebGLShader[] = [];
	for (const [type, src] of [
		[gl.VERTEX_SHADER, vs],
		[gl.FRAGMENT_SHADER, fs],
	] as const) {
		const shader = gl.createShader(type);
		if (!shader) return null;
		gl.shaderSource(shader, src);
		gl.compileShader(shader);
		gl.attachShader(program, shader);
		shaders.push(shader);
	}
	gl.linkProgram(program);
	for (const shader of shaders) {
		gl.detachShader(program, shader);
		gl.deleteShader(shader);
	}
	if (gl.getProgramParameter(program, gl.LINK_STATUS)) return program;
	gl.deleteProgram(program);
	return null;
}

/** Crea todo lo que vive en la GPU; devuelve null si el equipo no admite búferes de coma flotante. */
function createRenderer(gl: WebGL2RenderingContext) {
	if (!gl.getExtension("EXT_color_buffer_float") && !gl.getExtension("EXT_color_buffer_half_float")) return null;
	const particle = compile(gl, PARTICLE_VS, PARTICLE_FS);
	const down = compile(gl, QUAD_VS, DOWN_FS);
	const blur = compile(gl, QUAD_VS, BLUR_FS);
	const composite = compile(gl, QUAD_VS, COMPOSITE_FS);
	const quad = gl.createBuffer();
	const particles = gl.createBuffer();
	const particleVao = gl.createVertexArray();
	const quadVao = gl.createVertexArray();
	if (!particle || !down || !blur || !composite || !quad || !particles || !particleVao || !quadVao) return null;

	gl.bindBuffer(gl.ARRAY_BUFFER, quad);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

	gl.bindVertexArray(particleVao);
	gl.bindBuffer(gl.ARRAY_BUFFER, particles);
	["a_u", "a_offset", "a_ripple", "a_drift", "a_grain", "a_ribbon"].forEach((name, i) => {
		const at = gl.getAttribLocation(particle, name);
		if (at < 0) return;
		gl.enableVertexAttribArray(at);
		gl.vertexAttribPointer(at, 1, gl.FLOAT, false, STRIDE * 4, i * 4);
	});

	gl.bindVertexArray(quadVao);
	gl.bindBuffer(gl.ARRAY_BUFFER, quad);
	for (const program of [down, blur, composite]) {
		const at = gl.getAttribLocation(program, "a_pos");
		gl.enableVertexAttribArray(at);
		gl.vertexAttribPointer(at, 2, gl.FLOAT, false, 0, 0);
	}
	gl.bindVertexArray(null);

	const u = (program: WebGLProgram, name: string) => gl.getUniformLocation(program, name);
	return {
		programs: { particle, down, blur, composite },
		buffers: { quad, particles },
		vaos: { particle: particleVao, quad: quadVao },
		pu: {
			time: u(particle, "u_time"),
			t: u(particle, "u_t"),
			lift: u(particle, "u_lift"),
			point: u(particle, "u_point"),
			weight: u(particle, "u_weight"),
			ra: u(particle, "u_ra"),
			rb: u(particle, "u_rb"),
			rc: u(particle, "u_rc"),
		},
		du: { src: u(down, "u_src"), texel: u(down, "u_texel") },
		bu: { src: u(blur, "u_src"), step: u(blur, "u_step") },
		cu: {
			accum: u(composite, "u_accum"),
			haze: u(composite, "u_haze"),
			gain: u(composite, "u_gain"),
			hazeGain: u(composite, "u_hazeGain"),
			deep: u(composite, "u_deep"),
			accent: u(composite, "u_accent"),
			glint: u(composite, "u_glint"),
			warm: u(composite, "u_warm"),
			master: u(composite, "u_master"),
		},
		targets: [] as Target[],
		count: 0,
		weight: 1,
	};
}

type Renderer = NonNullable<ReturnType<typeof createRenderer>>;

function makeTarget(gl: WebGL2RenderingContext, w: number, h: number): Target | null {
	const tex = gl.createTexture();
	const fbo = gl.createFramebuffer();
	if (!tex || !fbo) return null;
	gl.bindTexture(gl.TEXTURE_2D, tex);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
	const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	if (ok) return { tex, fbo, w, h };
	gl.deleteTexture(tex);
	gl.deleteFramebuffer(fbo);
	return null;
}

function releaseTargets(gl: WebGL2RenderingContext, r: Renderer) {
	r.targets.forEach((t) => {
		gl.deleteTexture(t.tex);
		gl.deleteFramebuffer(t.fbo);
	});
	r.targets = [];
}

function releaseRenderer(gl: WebGL2RenderingContext, r: Renderer) {
	releaseTargets(gl, r);
	Object.values(r.programs).forEach((p) => gl.deleteProgram(p));
	Object.values(r.buffers).forEach((b) => gl.deleteBuffer(b));
	Object.values(r.vaos).forEach((v) => gl.deleteVertexArray(v));
}

/**
 * Fondo de hilos de partículas (WebGL2). Las partículas se suman en un búfer de coma flotante y se comprimen
 * con 1 - e^(-kd): sólo brillan los pliegues donde se apelotonan los hilos; lo que queda detrás va desenfocado.
 * Sin WebGL2 con búferes de coma flotante no se pinta nada: es decoración.
 */
export function WaveField() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = ref.current;
		const gl = canvas?.getContext("webgl2", { alpha: true, antialias: false, premultipliedAlpha: true });
		if (!canvas || !gl) return;

		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
		let renderer = createRenderer(gl);
		let theme = readTheme();
		let width = 0;
		let height = 0;
		let cssWidth = 0;
		let cssHeight = 0;
		let dpr = 1;
		let hazeDiv = 4;
		let compact = false;
		let frame = 0;
		let last = 0;
		let time = 60;
		let scroll = window.scrollY;

		const setup = () => {
			if (!renderer) return;
			dpr = Math.min(window.devicePixelRatio || 1, 1.5);
			// La bruma se mide en px CSS: con más densidad de píxeles, el búfer reducido tiene que reducir más
			hazeDiv = Math.round(4 * dpr);
			cssWidth = canvas.clientWidth || window.innerWidth;
			cssHeight = canvas.clientHeight || window.innerHeight;
			width = Math.max(4, Math.round(cssWidth * dpr));
			height = Math.max(4, Math.round(cssHeight * dpr));
			canvas.width = width;
			canvas.height = height;

			releaseTargets(gl, renderer);
			const hw = Math.max(1, Math.ceil(width / hazeDiv));
			const hh = Math.max(1, Math.ceil(height / hazeDiv));
			const targets = [makeTarget(gl, width, height), makeTarget(gl, hw, hh), makeTarget(gl, hw, hh)];
			if (targets.some((t) => !t)) {
				targets.forEach((t) => t && (gl.deleteTexture(t.tex), gl.deleteFramebuffer(t.fbo)));
				return;
			}
			renderer.targets = targets as Target[];

			compact = cssWidth < 768;
			const ribbons = compact ? RIBBONS.slice(0, 2) : RIBBONS;
			const area = cssWidth * cssHeight;
			// `reference` es el número de partículas con el que se ajustó el brillo: con más, cada una pesa menos
			const reference = Math.min(52000, Math.max(14000, area / 25)) * (compact ? 0.7 : 1);
			renderer.count = Math.round(Math.min(160000, Math.max(40000, area / 8)) * (compact ? 0.6 : 1));
			renderer.weight = reference / renderer.count;
			gl.bindBuffer(gl.ARRAY_BUFFER, renderer.buffers.particles);
			gl.bufferData(gl.ARRAY_BUFFER, buildParticles(ribbons, renderer.count), gl.STATIC_DRAW);

			const ra = new Float32Array(12);
			const rb = new Float32Array(12);
			const rc = new Float32Array(3);
			ribbons.forEach((r, i) => {
				ra.set([r.y, r.rise, r.amp, r.freq], i * 4);
				rb.set([r.speed, r.phase, r.band, r.twistFreq], i * 4);
				rc[i] = r.twistSpeed;
			});
			gl.useProgram(renderer.programs.particle);
			gl.uniform4fv(renderer.pu.ra, ra);
			gl.uniform4fv(renderer.pu.rb, rb);
			gl.uniform1fv(renderer.pu.rc, rc);
		};

		const pass = (program: WebGLProgram, target: Target | null) => {
			gl.useProgram(program);
			gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fbo : null);
			gl.viewport(0, 0, target ? target.w : width, target ? target.h : height);
		};

		const draw = () => {
			const r = renderer;
			if (!r || r.targets.length < 3 || gl.isContextLost()) return;
			const [accum, hazeA, hazeB] = r.targets;
			const { programs, pu, du, bu, cu } = r;

			pass(programs.particle, accum);
			gl.clearColor(0, 0, 0, 0);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.enable(gl.BLEND);
			gl.blendFunc(gl.ONE, gl.ONE);
			gl.uniform1f(pu.time, time);
			gl.uniform1f(pu.t, time + scroll * 0.0006);
			gl.uniform1f(pu.lift, 0.08 * Math.sin((scroll / cssHeight) * 0.5));
			gl.uniform1f(pu.point, Math.max(3, 2.5 * dpr));
			gl.uniform1f(pu.weight, r.weight);
			gl.bindVertexArray(r.vaos.particle);
			gl.drawArrays(gl.POINTS, 0, r.count);
			gl.disable(gl.BLEND);

			gl.bindVertexArray(r.vaos.quad);
			gl.activeTexture(gl.TEXTURE0);

			pass(programs.down, hazeA);
			gl.bindTexture(gl.TEXTURE_2D, accum.tex);
			gl.uniform1i(du.src, 0);
			gl.uniform2f(du.texel, 1 / accum.w, 1 / accum.h);
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

			const blurs: [Target, Target, number, number][] = [
				[hazeA, hazeB, 1, 0],
				[hazeB, hazeA, 0, 1],
				[hazeA, hazeB, 1, 0],
				[hazeB, hazeA, 0, 1],
			];
			for (const [src, dst, sx, sy] of blurs) {
				pass(programs.blur, dst);
				gl.bindTexture(gl.TEXTURE_2D, src.tex);
				gl.uniform1i(bu.src, 0);
				gl.uniform2f(bu.step, sx / src.w, sy / src.h);
				gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			}

			// Con el scroll la cinta se retira: en las secciones de lectura queda como un rastro
			const depthIntoPage = Math.min(1, Math.max(0, (scroll / cssHeight - 0.35) / 0.5));
			const fade = 1 - 0.45 * depthIntoPage * depthIntoPage * (3 - 2 * depthIntoPage);

			pass(programs.composite, null);
			gl.clear(gl.COLOR_BUFFER_BIT);
			gl.bindTexture(gl.TEXTURE_2D, accum.tex);
			gl.activeTexture(gl.TEXTURE1);
			gl.bindTexture(gl.TEXTURE_2D, hazeA.tex);
			gl.uniform1i(cu.accum, 0);
			gl.uniform1i(cu.haze, 1);
			// Mismo brillo por px CSS que con el búfer de 0,6× con el que se ajustó: la densidad se reparte entre dpr² px
			gl.uniform1f(cu.gain, (dpr * dpr) / 0.36);
			gl.uniform1f(cu.hazeGain, theme.haze);
			gl.uniform3fv(cu.deep, theme.deep);
			gl.uniform3fv(cu.accent, theme.accent);
			gl.uniform3fv(cu.glint, theme.glint);
			gl.uniform3fv(cu.warm, theme.warm);
			gl.uniform1f(cu.master, theme.master * fade * (compact ? 0.85 : 1));
			gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
			gl.activeTexture(gl.TEXTURE0);
			gl.bindVertexArray(null);
		};

		const loop = (now: number) => {
			frame = requestAnimationFrame(loop);
			const elapsed = now - last;
			if (elapsed < FRAME_MS - 2) return;
			last = now - (elapsed % FRAME_MS);
			time += Math.min(0.1, elapsed / 1000);
			scroll += (window.scrollY - scroll) * 0.06;
			draw();
		};

		const start = () => {
			cancelAnimationFrame(frame);
			if (!renderer || gl.isContextLost()) return;
			if (reduced.matches || document.hidden) {
				scroll = window.scrollY;
				draw();
				return;
			}
			last = performance.now();
			frame = requestAnimationFrame(loop);
		};

		let resizeTimer = 0;
		const onResize = () => {
			// El canvas mide 100lvh: la barra de direcciones del móvil no le cambia el tamaño y no hay que re-sembrar
			const sameDpr = Math.min(window.devicePixelRatio || 1, 1.5) === dpr;
			if (sameDpr && canvas.clientWidth === cssWidth && canvas.clientHeight === cssHeight) return;
			window.clearTimeout(resizeTimer);
			resizeTimer = window.setTimeout(() => {
				setup();
				start();
			}, 150);
		};

		const onLost = (event: Event) => {
			event.preventDefault();
			cancelAnimationFrame(frame);
		};

		const onRestored = () => {
			renderer = createRenderer(gl);
			setup();
			start();
		};

		// Con movimiento reducido no hay bucle: el desvanecido por scroll se repinta a mano
		const onScroll = () => {
			if (!reduced.matches) return;
			scroll = window.scrollY;
			draw();
		};

		let dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
		const onDprChange = () => {
			dprQuery.removeEventListener("change", onDprChange);
			dprQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`);
			dprQuery.addEventListener("change", onDprChange);
			onResize();
		};

		const observer = new MutationObserver(() => {
			theme = readTheme();
			draw();
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

		setup();
		start();
		window.addEventListener("resize", onResize);
		window.addEventListener("scroll", onScroll, { passive: true });
		dprQuery.addEventListener("change", onDprChange);
		document.addEventListener("visibilitychange", start);
		reduced.addEventListener("change", start);
		canvas.addEventListener("webglcontextlost", onLost);
		canvas.addEventListener("webglcontextrestored", onRestored);

		return () => {
			cancelAnimationFrame(frame);
			window.clearTimeout(resizeTimer);
			observer.disconnect();
			window.removeEventListener("resize", onResize);
			window.removeEventListener("scroll", onScroll);
			dprQuery.removeEventListener("change", onDprChange);
			document.removeEventListener("visibilitychange", start);
			reduced.removeEventListener("change", start);
			canvas.removeEventListener("webglcontextlost", onLost);
			canvas.removeEventListener("webglcontextrestored", onRestored);
			if (renderer && !gl.isContextLost()) releaseRenderer(gl, renderer);
			renderer = null;
		};
	}, []);

	return <canvas ref={ref} aria-hidden="true" className="wave-field" />;
}
