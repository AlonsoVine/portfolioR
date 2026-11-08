'use client';

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageToggle } from "../ui/LanguageToggle";
import { useLanguage } from "@/i18n";
import { cn, EASE_OUT_EXPO } from "@/lib/utils";
import { useActiveSection } from "@/lib/useActiveSection";
import { openPalette } from "@/lib/siteActions";
import { ScrambleText } from "../shared/ScrambleText";

const HIDE_AFTER = 640;
const pad = (n: number) => String(n).padStart(2, "0");

export function Header() {
	const { dict } = useLanguage();
	const links = dict.nav.links;
	const sectionLinks = links.filter((l) => l.href !== "#hero");
	const reduce = useReducedMotion();
	const [scrolled, setScrolled] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [open, setOpen] = useState(false);
	const headerRef = useRef<HTMLElement>(null);
	const menuLabel = open ? dict.ui.a11y.closeMenu : dict.ui.a11y.openMenu;
	const sectionIds = useMemo(() => links.map((l) => l.href.replace("#", "")), [links]);
	const activeId = useActiveSection(sectionIds);
	const { scrollY } = useScroll();

	useMotionValueEvent(scrollY, "change", (y) => {
		const prev = scrollY.getPrevious() ?? 0;
		setScrolled(y > 24);
		if (reduce || open || window.innerWidth < 768) {
			setHidden(false);
			return;
		}
		const focusInside = headerRef.current?.contains(document.activeElement) ?? false;
		if (y > HIDE_AFTER && y > prev + 4 && !focusInside) setHidden(true);
		else if (y < prev - 4 || y <= HIDE_AFTER) setHidden(false);
	});

	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		// En reposo sin ninguna clase translate: cualquier translate convierte el header en bloque
		// contenedor y el panel fixed del menú móvil quedaría medido contra él (altura cero).
		<header
			ref={headerRef}
			onFocusCapture={() => setHidden(false)}
			className={cn(
				"site-header fixed inset-x-0 top-0 z-50 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] print:hidden",
				hidden && !open ? "-translate-y-full" : "",
			)}
		>
			<div className="page flex h-14 items-center justify-between gap-6">
				<a href="#hero" className="font-display shrink-0 text-[1.35rem] leading-none text-ink">
					Alonso Viñé
				</a>

				<nav aria-label={dict.ui.a11y.mainNav} className="hidden lg:block">
					<ul className="flex items-center gap-7">
						{sectionLinks.map((link, i) => {
							const isActive = link.href === `#${activeId}`;
							return (
								<li key={link.href}>
									<a
										href={link.href}
										aria-current={isActive ? "page" : undefined}
										className={cn(
											"relative flex items-baseline gap-1.5 py-2 text-[0.9rem]",
											isActive ? "text-ink" : "text-muted hover:text-ink",
										)}
									>
										<span className="font-mono text-[0.68rem] text-subtle tabular">{pad(i + 1)}</span>
										<ScrambleText text={link.label} trigger="hover" duration={420} />
										{isActive ? (
											<motion.span
												layoutId="nav-active"
												aria-hidden="true"
												className="absolute inset-x-0 bottom-0 h-px bg-signal"
												transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
											/>
										) : null}
									</a>
								</li>
							);
						})}
					</ul>
				</nav>

				<div className="flex items-center gap-1 sm:gap-2">
					<button
						type="button"
						onClick={openPalette}
						aria-keyshortcuts="Control+K Meta+K"
						className="meta mr-2 hidden min-h-11 items-center gap-2 px-2 text-muted hover:text-ink xl:inline-flex"
					>
						{dict.ui.palette.open}
						<kbd className="border border-rule-strong px-1.5 py-0.5 text-[0.65rem] leading-none text-ink">Ctrl K</kbd>
					</button>
					<span className="mr-3 hidden lg:block">
						<a href="#contact" className="btn btn-line btn-sm">
							{dict.ui.contactCta}
						</a>
					</span>
					<LanguageToggle />
					<span aria-hidden="true" className="h-4 w-px bg-rule-strong" />
					<ThemeToggle />
					<button
						type="button"
						className="meta -mr-2 ml-2 min-h-11 px-2 text-ink lg:hidden"
						onClick={() => setOpen((prev) => !prev)}
						aria-label={menuLabel}
						aria-expanded={open}
						aria-controls="mobile-menu"
					>
						<span aria-hidden="true">{open ? dict.ui.a11y.close : dict.ui.menu}</span>
					</button>
				</div>
			</div>
			<div
				aria-hidden="true"
				className={cn("h-px bg-rule transition-opacity duration-500", scrolled || open ? "opacity-100" : "opacity-0")}
			/>

			<AnimatePresence>
				{open ? (
					<motion.div
						id="mobile-menu"
						key="mobile-menu"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-x-0 bottom-0 top-[3.5625rem] overflow-y-auto bg-paper lg:hidden"
					>
						<ol className="page flex flex-col pt-4">
							{links.map((link, i) => {
								const isActive = link.href === `#${activeId}`;
								return (
									<motion.li
										key={link.href}
										className="border-b border-rule"
										initial={{ opacity: 0, y: 12 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.04 * i }}
									>
										<a
											href={link.href}
											onClick={() => setOpen(false)}
											aria-current={isActive ? "page" : undefined}
											className="flex items-baseline gap-4 py-4 text-ink"
										>
											<span className="font-mono w-6 text-xs text-subtle tabular">{pad(i)}</span>
											<span className="font-display text-[2rem] leading-none">{link.label}</span>
											{isActive ? <span aria-hidden="true" className="signal-dot ml-auto self-center" /> : null}
										</a>
									</motion.li>
								);
							})}
							<li className="border-b border-rule">
								<button
									type="button"
									onClick={() => {
										setOpen(false);
										openPalette();
									}}
									className="flex w-full items-baseline gap-4 py-4 text-left text-muted"
								>
									<span className="font-mono w-6 text-xs text-subtle">&gt;</span>
									<span className="font-mono text-base">{dict.ui.palette.open}</span>
								</button>
							</li>
						</ol>
					</motion.div>
				) : null}
			</AnimatePresence>
		</header>
	);
}
