'use client';

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageToggle } from "../ui/LanguageToggle";
import { useLanguage } from "@/i18n";
import { cn, EASE_OUT_EXPO, withBasePath } from "@/lib/utils";
import { useActiveSection } from "@/lib/useActiveSection";

const HIDE_AFTER = 640;

export function Header() {
  const { dict } = useLanguage();
  const links = dict.nav.links;
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuLabel = open ? dict.ui.a11y.closeMenu : dict.ui.a11y.openMenu;
  const sectionIds = useMemo(
    () => links.map((l) => l.href.replace("#", "")),
    [links],
  );
  const activeId = useActiveSection(sectionIds);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 32);
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
    <header
      ref={headerRef}
      onFocusCapture={() => setHidden(false)}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 pt-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] print:hidden",
        hidden ? "-translate-y-[120%]" : "translate-y-0",
      )}
    >
      <div
        className={cn(
          "glass-panel relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium text-[var(--foreground)] transition-[box-shadow,background-color] duration-500 ease-out sm:px-6",
          scrolled ? "shadow-[0_12px_40px_rgba(15,23,42,0.35)]" : "bg-transparent",
        )}
      >
        <Link href="#hero" className="group flex min-w-0 items-center gap-2">
          <Image
            src={withBasePath("/images/logo.webp")}
            alt={dict.ui.a11y.logoAlt}
            width={32}
            height={32}
            className="shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[360deg]"
          />
          <span
            className="font-display min-w-0 text-sm font-semibold leading-tight tracking-[0.08em] text-[var(--foreground)] sm:text-base sm:tracking-[0.18em]"
          >
            ALONSO VIÑÉ
          </span>
        </Link>

        <nav aria-label={dict.ui.a11y.mainNav} className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => {
            const isActive = link.href === `#${activeId}`;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300 hover:text-[var(--nav-active-text)] xl:px-4",
                  isActive ? "text-[var(--nav-active-text)]" : "text-[var(--foreground)]",
                )}
              >
                <span className="relative z-10">{link.label}</span>
                {isActive ? (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="nav-active-underline pointer-events-none absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full"
                    transition={{ type: "spring", stiffness: 420, damping: 36 }}
                  />
                ) : (
                  <span className="nav-active-underline pointer-events-none absolute inset-x-2 -bottom-0.5 h-0.5 scale-x-0 rounded-full opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-60" />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-soft text-[var(--foreground)] transition-transform duration-300 hover:scale-105 lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={menuLabel}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-menu"
              key="mobile-menu"
              initial={{ opacity: 0, y: -12, scaleY: 0.92 }}
              animate={{ opacity: 1, y: 0, scaleY: 1 }}
              exit={{ opacity: 0, y: -8, scaleY: 0.96 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
              className="absolute left-0 top-full mt-3 w-full origin-top rounded-3xl border border-soft p-6 shadow-2xl lg:hidden"
              style={{ background: "var(--background)" }}
            >
              <motion.ol
                className="flex flex-col gap-1"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } } }}
              >
                {links.map((link, i) => {
                  const isActive = link.href === `#${activeId}`;
                  return (
                    <motion.li
                      key={link.href}
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
                      }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-baseline gap-4 rounded-2xl px-2 py-2.5 transition-colors",
                          isActive
                            ? "bg-[color:var(--accent-warm-soft)] text-[var(--foreground)]"
                            : "text-[var(--foreground)] hover:bg-[color:var(--accent-warm-soft)]",
                        )}
                      >
                        <span className="font-display tabular w-6 text-xs text-[var(--accent-warm)]">
                          {String(i).padStart(2, "0")}
                        </span>
                        <span className="font-display text-xl font-semibold tracking-[0.04em]">{link.label}</span>
                      </a>
                    </motion.li>
                  );
                })}
              </motion.ol>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
