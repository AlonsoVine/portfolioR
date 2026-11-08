"use client";

import { Check } from "lucide-react";
import { useMemo } from "react";
import { useLanguage } from "@/i18n";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

/** Índice lateral leído como un pipeline: etapas superadas (✓), en curso (●) y pendientes (○). */
export function SectionIndex() {
	const { dict } = useLanguage();
	const links = useMemo(() => dict.nav.links.filter((l) => l.href !== "#hero"), [dict.nav.links]);
	const ids = useMemo(() => dict.nav.links.map((l) => l.href.slice(1)), [dict.nav.links]);
	const active = useActiveSection(ids);
	const activeIndex = links.findIndex((l) => l.href === `#${active}`);
	const visible = activeIndex >= 0;
	const pad = (n: number) => String(n).padStart(2, "0");

	return (
		<nav
			aria-label={dict.ui.sectionNav}
			className={cn(
				"fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,visibility] duration-500 min-[1400px]:block print:hidden",
				visible ? "opacity-100" : "invisible pointer-events-none opacity-0",
			)}
		>
			<p className="tabular mb-4 text-right font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
				{dict.ui.stage} {pad(Math.max(activeIndex, 0) + 1)} / {pad(links.length)}
			</p>
			<ol className="flex flex-col items-end gap-3">
				{links.map((link, i) => {
					const state = i < activeIndex ? "done" : i === activeIndex ? "running" : "pending";
					return (
						<li key={link.href}>
							<a
								href={link.href}
								aria-current={state === "running" ? "true" : undefined}
								className="group flex items-center gap-3 py-0.5"
							>
								<span
									className={cn(
										"translate-x-2 text-[11px] font-medium uppercase tracking-[0.25em] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
										state === "running" ? "text-[var(--foreground)]" : "text-muted",
									)}
								>
									{link.label}
								</span>
								<span
									className={cn(
										"font-display tabular text-xs transition-opacity duration-300",
										state === "running"
											? "text-[var(--accent-warm)]"
											: "text-[var(--foreground)] opacity-75 group-hover:opacity-100",
									)}
								>
									{pad(i + 1)}
								</span>
								<span aria-hidden="true" className="relative flex h-4 w-4 items-center justify-center">
									{state === "done" ? (
										<Check className="h-3 w-3 text-[var(--accent-warm)]" strokeWidth={3} />
									) : state === "running" ? (
										<>
											<span className="stage-pulse absolute h-4 w-4 rounded-full bg-[var(--accent-warm)]" />
											<span className="relative h-2 w-2 rounded-full bg-[var(--accent-warm)]" />
										</>
									) : (
										<span className="h-2 w-2 rounded-full border border-[var(--foreground)] opacity-50" />
									)}
								</span>
							</a>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
