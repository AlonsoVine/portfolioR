"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

const STEP_MS = 620;

/** Las fases del workflow real (.github/workflows/deploy.yml), recorridas una vez al entrar en pantalla. */
export function DeployPipeline() {
	const { dict } = useLanguage();
	const p = dict.ui.pipeline;
	const reduce = useReducedMotion();
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref, { once: true, amount: 0.6 });
	const [run, setRun] = useState(0);
	const [tick, setTick] = useState(-1);
	const total = p.steps.length;
	const progress = reduce ? total : tick;

	useEffect(() => {
		if (!inView || reduce) return;
		let step = -1;
		const id = window.setInterval(() => {
			step += 1;
			setTick(step);
			if (step >= total) window.clearInterval(id);
		}, STEP_MS);
		return () => window.clearInterval(id);
	}, [inView, reduce, total, run]);

	const statusOf = (i: number) => (i < progress ? "done" : i === progress ? "running" : "queued");
	const finished = progress >= total;

	return (
		<div ref={ref} className="pipeline">
			<div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
				<p className="meta text-ink">{p.title}</p>
				<p className="meta text-subtle" aria-live="polite">
					{finished ? p.status.done : progress >= 0 ? `${p.status.running} · ${p.steps[Math.min(progress, total - 1)]}` : p.status.queued}
				</p>
			</div>
			<ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-6">
				{p.steps.map((step, i) => {
					const status = statusOf(i);
					return (
						<li key={step} className="relative">
							<div aria-hidden="true" className="relative h-px bg-rule">
								<span className={cn("pipeline-fill absolute inset-0 origin-left bg-ink", status === "done" && "is-done")} />
							</div>
							<div className="mt-3 flex items-center gap-2">
								<span
									aria-hidden="true"
									className={cn(
										"pipeline-node inline-block h-2 w-2 rounded-full border",
										status === "done" && "border-ink bg-ink",
										status === "running" && "signal-dot-live border-signal bg-signal",
										status === "queued" && "border-rule-strong",
									)}
								/>
								<span className={cn("font-mono text-[0.8rem]", status === "queued" ? "text-subtle" : "text-ink")}>{step}</span>
							</div>
							<span className="sr-only">{p.status[status]}</span>
						</li>
					);
				})}
			</ol>
			<div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
				<p className="max-w-[60ch] text-[0.85rem] leading-snug text-subtle">{p.description}</p>
				{finished && !reduce ? (
					<button
						type="button"
						onClick={() => {
							setTick(-1);
							setRun((r) => r + 1);
						}}
						className="meta link-rule py-2 text-ink"
					>
						{p.replay}
					</button>
				) : null}
			</div>
		</div>
	);
}
