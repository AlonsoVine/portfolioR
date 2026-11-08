'use client';

import { Moon, Sun } from "lucide-react";
import { useCallback, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useLanguage } from "@/i18n";

type Theme = "light" | "dark";

declare global {
  interface Window {
    __theme?: Theme;
  }
}

const THEME_EVENT = "portfolio-theme-change";

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  return () => window.removeEventListener(THEME_EVENT, callback);
}

function applyTheme(next: Theme) {
  document.documentElement.dataset.theme = next;
  window.__theme = next;
  try {
    window.localStorage.setItem("theme", next);
  } catch {
    // sin persistencia: el tema dura lo que la pestaña
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "dark");
  const { dict } = useLanguage();
  const isEn = dict.lang === "en";

  const handleToggle = useCallback(() => {
    const next: Theme = readTheme() === "light" ? "dark" : "light";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && typeof document.startViewTransition === "function") {
      document.startViewTransition(() => flushSync(() => applyTheme(next)));
    } else {
      applyTheme(next);
    }
  }, []);

  const Icon = theme === "light" ? Sun : Moon;
  const ariaLabel = isEn
    ? theme === "light"
      ? "Switch to dark mode"
      : "Switch to light mode"
    : theme === "light"
      ? "Activar modo oscuro"
      : "Activar modo claro";

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={ariaLabel}
      aria-pressed={theme === "dark"}
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-soft bg-white/10 text-[var(--foreground)] shadow-[0_8px_24px_rgba(15,23,42,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-strong"
    >
      <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-amber-300/0 via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}
