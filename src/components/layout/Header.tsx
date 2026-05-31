'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";
import { LanguageToggle } from "../ui/LanguageToggle";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/useActiveSection";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function Header() {
  const { dict } = useLanguage();
  const links = dict.nav.links;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sectionIds = useMemo(
    () => links.map((l) => l.href.replace("#", "")),
    [links],
  );
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex w-full justify-center px-4 transition-all duration-500",
        scrolled ? "translate-y-0" : ""
      )}
    >
      <div
        className={cn(
          "glass-panel relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-full px-6 py-3 text-sm font-medium text-[var(--foreground)] transition-all duration-500 ease-out",
          scrolled ? "shadow-[0_12px_40px_rgba(15,23,42,0.35)]" : "bg-transparent"
        )}
      >
        <Link href="#hero" className="flex min-w-0 items-center gap-2">
          <Image
            src={`${prefix}/images/logo.webp`}
            alt="Logotipo personal"
            width={32}
            height={32}
            className="shrink-0 transition-transform duration-300 hover:scale-[1.02]"
          />
          <span
            className="min-w-0 text-sm font-semibold leading-tight tracking-[0.08em] text-[var(--foreground)] sm:text-base sm:tracking-[0.18em]"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            ALONSO VIÑÉ
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = link.href === `#${activeId}`;
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "group relative rounded-full px-4 py-2 text-sm transition-all duration-300 hover:text-amber-200",
                  isActive ? "text-amber-200" : "text-[var(--foreground)]",
                )}
              >
                <span className="relative z-10">{link.label}</span>
                <span
                  className={cn(
                    "pointer-events-none absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-amber-200 to-rose-200 transition-all duration-300",
                    isActive
                      ? "scale-x-100 opacity-100"
                      : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-soft text-[var(--foreground)] transition-all duration-300 hover:scale-105 md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Abrir menú"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div
          className={cn(
            "absolute left-0 top-full mt-4 w-full origin-top scale-y-0 rounded-3xl surface-panel p-6 shadow-2xl backdrop-blur-xl transition-transform duration-300 md:hidden",
            open ? "scale-y-100" : "pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-4">
            {links.map((link) => {
              const isActive = link.href === `#${activeId}`;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "text-base transition-colors",
                    isActive
                      ? "text-amber-200"
                      : "text-muted hover:text-[var(--foreground)]",
                  )}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
