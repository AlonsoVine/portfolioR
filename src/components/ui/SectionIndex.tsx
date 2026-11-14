"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Índice marginal desde 1280 px: número de sección y un filete que crece en la activa.
 * En portátiles (1280–1519 px) va compacto para caber en el margen; el nombre aparece al pasar o enfocar.
 */
export function SectionIndex() {
	const { dict } = useLanguage();
	const links = useMemo(() => dict.nav.links.filter((l) => l.href !== "#hero"), [dict.nav.links]);
	const ids = useMemo(() => dict.nav.links.map((l) => l.href.slice(1)), [dict.nav.links]);
	const active = useActiveSection(ids);
	const activeIndex = links.findIndex((l) => l.href === `#${active}`);
	const [footerInView, setFooterInView] = useState(false);

	useEffect(() => {
		const footer = document.querySelector("footer");
		if (!footer) return;
		const io = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
			rootMargin: "0px 0px -15% 0px",
		});
		io.observe(footer);
		return () => io.disconnect();
	}, []);

	const visible = activeIndex >= 0 && !footerInView;

	return (
		<nav
			aria-label={dict.ui.sectionNav}
			className={cn(
				"floating-ui fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,visibility] duration-500 xl:block min-[1520px]:left-5 print:hidden",
				visible ? "opacity-100" : "invisible pointer-events-none opacity-0",
			)}
		>
			{/* Grafo de commits: el tronco se rellena hasta la sección activa y los nodos ya visitados quedan llenos */}
			<div className="relative">
				<span aria-hidden="true" className="absolute bottom-3.5 left-[4.5px] top-3.5 w-px bg-rule-strong" />
				<span
					aria-hidden="true"
					className="absolute left-[4.5px] top-3.5 w-px origin-top bg-signal transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
					style={{ height: "calc(100% - 1.75rem)", transform: `scaleY(${Math.max(0, activeIndex) / Math.max(1, links.length - 1)})` }}
				/>
				<ol className="relative flex flex-col gap-1">
					{links.map((link, i) => {
						const isActive = i === activeIndex;
						const passed = i < activeIndex;
						return (
							<li key={link.href}>
								<a
									href={link.href}
									aria-current={isActive ? "true" : undefined}
									className="group relative flex min-h-7 items-center gap-2 min-[1520px]:gap-2.5"
								>
									<span
										aria-hidden="true"
										className={cn(
											"block h-2.5 w-2.5 shrink-0 rounded-full border transition-colors duration-500",
											isActive ? "border-signal bg-signal" : passed ? "border-signal bg-paper" : "border-rule-strong bg-paper group-hover:border-ink",
										)}
									/>
									<span className={cn("meta tabular", isActive ? "text-ink" : "text-muted group-hover:text-ink")}>
										{pad(i + 1)}
									</span>
									<span
										className={cn(
											"meta pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap bg-paper px-1.5 py-0.5 text-ink transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
											isActive ? "opacity-0 min-[1600px]:opacity-100" : "opacity-0",
										)}
									>
										{link.label}
									</span>
								</a>
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
}
