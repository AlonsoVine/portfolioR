"use client";

import Image from "next/image";
import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { LIBERTY_MILESTONES, LIBERTY_SERIES } from "@/data/liberty";
import { cn, withBasePath } from "@/lib/utils";

export type LibertyCopy = {
	chartLabel: string;
	title: string;
	subtitle: string;
	growth: string;
	then: string;
	start: string;
	delta: string;
	months: string;
	month: string;
	portfolio: string;
	property: string;
	portfolioRow: string;
	portfolioHint: string;
	propertyRow: string;
	propertyHint: string;
	hint: string;
	range: string;
	milestones: string[];
	irr: string;
	irrValue: string;
	freedom: string;
	freedomValue: string;
	sample: string;
};

const W = 600;
const H = 150;
const TOP = 12;
const { total, portfolio, property } = LIBERTY_SERIES;
const N = total.length - 1;
const MAX = total[N];
const COUNT_MS = 1700;

const xAt = (i: number) => (i / N) * W;
const yAt = (v: number) => H - (v / MAX) * (H - TOP);
const line = (values: readonly number[]) => values.map((v, i) => `${i ? "L" : "M"}${xAt(i).toFixed(1)} ${yAt(v).toFixed(1)}`).join(" ");

function monthOf(i: number, locale: string) {
	const [y, m] = LIBERTY_SERIES.start.split("-").map(Number);
	const date = new Date(Date.UTC(y, m - 1 + i, 1));
	return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

/**
 * La tarjeta «Tu patrimonio» de Liberty, viva: sale de la pantalla hacia el visitante, se inclina con el puntero
 * y se recorre mes a mes (ratón, dedo o teclado: debajo hay un control deslizante de verdad).
 */
export function LibertyChart({ backdrop, copy, locale }: { backdrop: string; copy: LibertyCopy; locale: string }) {
	const stageRef = useRef<HTMLDivElement>(null);
	const inView = useInView(stageRef, { once: true, amount: 0.45 });
	const reduce = useReducedMotion();
	const [index, setIndex] = useState(N);
	const [scrubbing, setScrubbing] = useState(false);
	const [count, setCount] = useState(0);
	const [tilt, setTilt] = useState({ x: 0, y: 0 });

	const paths = useMemo(() => ({ total: line(total), portfolio: line(portfolio), property: line(property) }), []);
	const money = useMemo(() => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }), [locale]);

	// La cifra cuenta desde cero mientras la curva se dibuja
	useEffect(() => {
		if (!inView) return;
		if (reduce) {
			const id = requestAnimationFrame(() => setCount(1));
			return () => cancelAnimationFrame(id);
		}
		let raf = 0;
		const t0 = performance.now() + 350;
		const tick = (now: number) => {
			const p = Math.min(1, Math.max(0, (now - t0) / COUNT_MS));
			setCount(1 - Math.pow(1 - p, 3));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [inView, reduce]);

	const i = index;
	const shown = scrubbing || i !== N ? total[i] : Math.round(MAX * count);
	const c = Math.max(0, portfolio[i]);
	const m = Math.max(0, property[i]);
	const pc = Math.round((c / Math.max(1, c + m)) * 100);
	const milestone = LIBERTY_MILESTONES.findIndex((k) => i >= k && i <= k + 3);
	const span = i >= 12 ? 12 : i;
	const delta = i >= 12 ? total[i] - total[i - 12] : total[i] - total[0];
	const heading =
		i === N ? copy.growth : milestone >= 0 ? `${monthOf(i, locale)} · ${copy.milestones[milestone]}` : copy.then.replace("{month}", monthOf(i, locale));
	const deltaText =
		i === 0
			? copy.start
			: copy.delta
					.replace("{amount}", `${delta >= 0 ? "+" : "−"}${money.format(Math.abs(delta))} €`)
					.replace("{span}", span === 1 ? copy.month : copy.months.replace("{n}", String(span)));

	const scrubTo = (event: PointerEvent<HTMLElement>) => {
		const box = event.currentTarget.getBoundingClientRect();
		setIndex(Math.max(0, Math.min(N, Math.round(((event.clientX - box.left) / box.width) * N))));
		setScrubbing(true);
	};
	const release = () => {
		setScrubbing(false);
		setIndex(N);
	};

	const onStageMove = (event: PointerEvent<HTMLDivElement>) => {
		if (reduce || event.pointerType !== "mouse") return;
		const box = event.currentTarget.getBoundingClientRect();
		setTilt({ x: (event.clientX - box.left) / box.width - 0.5, y: (event.clientY - box.top) / box.height - 0.5 });
	};

	return (
		<div
			ref={stageRef}
			className={cn("liberty-stage relative w-full px-[6%] py-[7%] sm:px-[11%]", inView && "is-in")}
			style={{ "--tx": tilt.x, "--ty": tilt.y } as CSSProperties}
			onPointerMove={onStageMove}
			onPointerLeave={() => setTilt({ x: 0, y: 0 })}
		>
			<div aria-hidden="true" className="liberty-backdrop media-frame absolute inset-0 overflow-hidden">
				<Image src={withBasePath(backdrop)} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-left-top" />
			</div>

			<div className="liberty-card relative border border-rule-strong bg-raised p-4 sm:p-6">
				<div className="flex flex-wrap items-baseline gap-x-3">
					<p className="font-display text-[1.35rem] leading-none text-ink">{copy.title}</p>
					<p className="meta hidden text-subtle sm:block">{copy.subtitle}</p>
				</div>
				<p className="liberty-figure mt-3 font-display text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.9] text-ink tabular">
					{money.format(shown)} €
				</p>
				<div aria-hidden="true" className="mt-4 flex h-1.5 gap-1">
					<span className="liberty-bar bg-[var(--liberty-blue)]" style={{ flexGrow: Math.max(c, 1) }} />
					<span className="liberty-bar bg-signal" style={{ flexGrow: Math.max(m, 1) }} />
				</div>
				<p aria-hidden="true" className="meta mt-2 flex gap-4 text-subtle">
					<span className="flex items-center gap-1.5">
						<i className="h-1.5 w-1.5 rounded-full bg-[var(--liberty-blue)]" />
						{copy.portfolio} {pc} %
					</span>
					<span className="flex items-center gap-1.5">
						<i className="h-1.5 w-1.5 rounded-full bg-signal" />
						{copy.property} {100 - pc} %
					</span>
				</p>

				<div className="mt-4 flex items-baseline justify-between gap-4">
					<p className="min-w-0 truncate text-[0.85rem] font-medium text-ink">{heading}</p>
					<p className="meta shrink-0 text-signal tabular">{deltaText}</p>
				</div>
				<div className="relative mt-2" onPointerMove={scrubTo} onPointerLeave={release}>
					<svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block aspect-[600/150] w-full overflow-visible" aria-hidden="true">
						<path d={`${paths.total} L${W} ${H} L0 ${H} Z`} className="liberty-area" />
						<path d={paths.portfolio} pathLength={1} className="liberty-line liberty-line-portfolio" vectorEffect="non-scaling-stroke" />
						<path d={paths.property} pathLength={1} className="liberty-line liberty-line-property" vectorEffect="non-scaling-stroke" />
						<path d={paths.total} pathLength={1} className="liberty-line liberty-line-total" vectorEffect="non-scaling-stroke" />
					</svg>
					<span aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-2 h-2">
						{LIBERTY_MILESTONES.map((k) => (
							<i key={k} className="liberty-milestone" style={{ left: `${(k / N) * 100}%` }} />
						))}
					</span>
					<span
						aria-hidden="true"
						className={cn("liberty-cursor", (scrubbing || i !== N) && "is-on")}
						style={{ left: `${(i / N) * 100}%`, "--cy": `${(yAt(total[i]) / H) * 100}%` } as CSSProperties}
					>
						<i />
					</span>
					<input
						type="range"
						min={0}
						max={N}
						step={1}
						value={i}
						aria-label={copy.range}
						aria-valuetext={`${monthOf(i, locale)}: ${money.format(total[i])} €`}
						onChange={(event) => {
							setIndex(Number(event.target.value));
							setScrubbing(true);
						}}
						onBlur={release}
						className="liberty-range absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
					/>
				</div>
				<p className="meta mt-4 text-subtle">{copy.hint}</p>
				<dl aria-hidden="true" className="mt-3 hidden border-t border-rule sm:block">
					<div className="flex items-baseline justify-between gap-4 border-b border-rule py-2 text-[0.85rem]">
						<dt className="text-muted">
							{copy.portfolioRow} <span className="text-subtle">· {copy.portfolioHint}</span>
						</dt>
						<dd className="font-medium text-ink tabular">{money.format(c)} €</dd>
					</div>
					<div className="flex items-baseline justify-between gap-4 py-2 text-[0.85rem]">
						<dt className="text-muted">
							{copy.propertyRow} <span className="text-subtle">· {copy.propertyHint}</span>
						</dt>
						<dd className="font-medium text-ink tabular">{money.format(m)} €</dd>
					</div>
				</dl>
			</div>

			<div aria-hidden="true" className="liberty-chip liberty-chip-1 absolute hidden border sm:block border-rule-strong bg-raised px-3 py-2">
				<p className="meta text-subtle">{copy.irr}</p>
				<p className="text-[1rem] font-medium text-ink tabular">{copy.irrValue}</p>
			</div>
			<div aria-hidden="true" className="liberty-chip liberty-chip-2 absolute hidden border sm:block border-rule-strong bg-raised px-3 py-2">
				<p className="meta text-subtle">{copy.freedom}</p>
				<p className="text-[1rem] font-medium text-ink tabular">{copy.freedomValue}</p>
			</div>
			<p className="meta absolute bottom-2 right-3 text-subtle">{copy.sample}</p>
		</div>
	);
}
