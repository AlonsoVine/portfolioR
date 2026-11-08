"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

/** Índice marginal en pantallas anchas: número de sección y un filete que crece en la activa. */
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
				"floating-ui fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,visibility] duration-500 min-[1520px]:block print:hidden",
				visible ? "opacity-100" : "invisible pointer-events-none opacity-0",
			)}
		>
			<ol className="flex flex-col gap-1">
				{links.map((link, i) => {
					const isActive = i === activeIndex;
					return (
						<li key={link.href}>
							<a
								href={link.href}
								aria-current={isActive ? "true" : undefined}
								className="group flex min-h-7 items-center gap-2.5"
							>
								<span className={cn("meta tabular", isActive ? "text-ink" : "text-subtle group-hover:text-ink")}>
									{pad(i + 1)}
								</span>
								<span
									aria-hidden="true"
									className={cn(
										"block h-px w-6 origin-left transition-transform duration-500",
										isActive ? "scale-x-100 bg-signal" : "scale-x-50 bg-rule-strong group-hover:scale-x-100",
									)}
								/>
								<span className="meta sr-only text-ink group-hover:not-sr-only group-focus-visible:not-sr-only">{link.label}</span>
							</a>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
