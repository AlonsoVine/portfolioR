"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/i18n";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");
const SUB_IDS = ["projects-personal", "projects-professional"];

/**
 * Índice marginal desde 1280 px: número de sección y un filete que crece en la activa.
 * En portátiles (1280–1519 px) va compacto para caber en el margen; el nombre aparece al pasar o enfocar.
 * Dentro de Proyectos se despliega una rama con sus subgrupos (03.1, 03.2).
 */
export function SectionIndex() {
	const { dict } = useLanguage();
	const links = useMemo(() => dict.nav.links.filter((l) => l.href !== "#hero"), [dict.nav.links]);
	const ids = useMemo(() => dict.nav.links.map((l) => l.href.slice(1)), [dict.nav.links]);
	const active = useActiveSection(ids);
	const activeSub = useActiveSection(SUB_IDS);
	const activeIndex = links.findIndex((l) => l.href === `#${active}`);
	const inProjects = active === "projects";
	const subs = [
		{ id: SUB_IDS[0], label: dict.projects.groups.personal.label },
		{ id: SUB_IDS[1], label: dict.projects.groups.professional.label },
	];
	const subIndex = inProjects ? subs.findIndex((s) => s.id === activeSub) : -1;
	const [footerInView, setFooterInView] = useState(false);
	const listRef = useRef<HTMLOListElement>(null);
	const [fill, setFill] = useState(0);

	useEffect(() => {
		const footer = document.querySelector("footer");
		if (!footer) return;
		const io = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting), {
			rootMargin: "0px 0px -15% 0px",
		});
		io.observe(footer);
		return () => io.disconnect();
	}, []);

	// La rama de Proyectos cambia la altura de la lista, así que el relleno del tronco se mide en vez de repartirse a partes iguales
	useEffect(() => {
		const list = listRef.current;
		if (!list) return;
		const measure = () => {
			const nodes = list.querySelectorAll<HTMLElement>("[data-node]");
			const target = nodes[Math.max(0, activeIndex)];
			if (!nodes[0] || !target) return;
			setFill(target.getBoundingClientRect().top - nodes[0].getBoundingClientRect().top);
		};
		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(list);
		return () => ro.disconnect();
	}, [activeIndex]);

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
					className="absolute left-[4.5px] top-3.5 w-px bg-signal transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
					style={{ height: fill }}
				/>
				<ol ref={listRef} className="relative flex flex-col gap-1">
					{links.map((link, i) => {
						const isActive = i === activeIndex;
						const passed = i < activeIndex;
						const isProjects = link.href === "#projects";
						return (
							<li key={link.href}>
								<a
									href={link.href}
									aria-current={isActive && subIndex < 0 ? "true" : undefined}
									className="group relative flex min-h-7 items-center gap-2 min-[1520px]:gap-2.5"
								>
									<span
										aria-hidden="true"
										data-node
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
								{isProjects ? (
									<div
										className={cn(
											"grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
											inProjects ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
										)}
									>
										<ol className="overflow-y-clip" inert={!inProjects}>
											{subs.map((sub, j) => {
												const subActive = j === subIndex;
												const subPassed = j < subIndex;
												return (
													<li key={sub.id}>
														<a
															href={`#${sub.id}`}
															aria-current={subActive ? "true" : undefined}
															className="group relative flex min-h-6 items-center gap-1.5 pl-[13px]"
														>
															{/* Rama que sale del tronco hasta el nodo del subgrupo */}
															<span
																aria-hidden="true"
																className={cn(
																	"absolute left-[5px] top-1/2 h-px w-[9px] transition-colors duration-500",
																	subActive || subPassed ? "bg-signal" : "bg-rule-strong",
																)}
															/>
															<span
																aria-hidden="true"
																className={cn(
																	"block h-2 w-2 shrink-0 rounded-full border transition-colors duration-500",
																	subActive ? "border-signal bg-signal" : subPassed ? "border-signal bg-paper" : "border-rule-strong bg-paper group-hover:border-ink",
																)}
															/>
															<span className={cn("meta tabular text-[0.68rem]", subActive ? "text-ink" : "text-muted group-hover:text-ink")}>
																{`03.${j + 1}`}
															</span>
															<span
																className={cn(
																	"meta pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap bg-paper px-1.5 py-0.5 text-ink transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
																	subActive ? "opacity-0 min-[1760px]:opacity-100" : "opacity-0",
																)}
															>
																{sub.label}
															</span>
														</a>
													</li>
												);
											})}
										</ol>
									</div>
								) : null}
							</li>
						);
					})}
				</ol>
			</div>
		</nav>
	);
}
