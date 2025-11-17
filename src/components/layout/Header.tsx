'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../ui/ThemeToggle";
import { NavLink } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type HeaderProps = {
  links: NavLink[];
};

export function Header({ links }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
        <Link href="#hero" className="flex items-center gap-2">
          <Image
            src="/images/logomark.svg"
            alt="Logotipo personal"
            width={32}
            height={32}
            className="transition-transform duration-300 hover:scale-[1.02]"
          />
          <span className="text-base font-semibold tracking-wide">Portfolio</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative rounded-full px-4 py-2 text-sm text-[var(--foreground)] transition-all duration-300 hover:text-amber-200"
            >
              <span className="relative z-10">{link.label}</span>
              <span className="pointer-events-none absolute inset-x-2 -bottom-1 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-amber-200 to-rose-200 opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
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
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-muted transition-colors hover:text-[var(--foreground)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

