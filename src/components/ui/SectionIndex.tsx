"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useLanguage } from "@/i18n";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";

export function SectionIndex() {
	const { dict } = useLanguage();
	const links = useMemo(() => dict.nav.links.filter((l) => l.href !== "#hero"), [dict.nav.links]);
	const ids = useMemo(() => dict.nav.links.map((l) => l.href.slice(1)), [dict.nav.links]);
	const active = useActiveSection(ids);
	const visible = active !== null && active !== "hero";

	return (
		<nav
			aria-label={dict.ui.sectionNav}
			className={cn(
				"fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 transition-[opacity,visibility] duration-500 min-[1400px]:block print:hidden",
				visible ? "opacity-100" : "invisible pointer-events-none opacity-0",
			)}
		>
			<ol className="flex flex-col items-end gap-3">
				{links.map((link, i) => {
					const isActive = link.href === `#${active}`;
					return (
						<li key={link.href}>
							<a
								href={link.href}
								aria-current={isActive ? "true" : undefined}
								className="group flex items-center gap-3 py-0.5"
							>
								<span
									className={cn(
										"translate-x-2 text-[11px] font-medium uppercase tracking-[0.25em] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
										isActive ? "text-[var(--foreground)]" : "text-muted",
									)}
								>
									{link.label}
								</span>
								<span
									className={cn(
										"font-display tabular text-xs transition-opacity duration-300",
										isActive ? "text-[var(--accent-warm)] opacity-100" : "text-[var(--foreground)] opacity-60 group-hover:opacity-100",
									)}
								>
									{String(i + 1).padStart(2, "0")}
								</span>
								<span className="relative h-px w-6 overflow-hidden bg-[var(--divider-line)]">
									{isActive ? (
										<motion.span
											layoutId="section-index-bar"
											className="absolute inset-0 bg-[var(--accent-warm)]"
											transition={{ type: "spring", stiffness: 380, damping: 34 }}
										/>
									) : null}
								</span>
							</a>
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
