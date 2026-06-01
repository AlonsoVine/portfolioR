'use client';

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n";

type Theme = "light" | "dark";

declare global {
  interface Window {
    __theme?: Theme;
  }
}

const getInitialTheme = (): Theme => {
  if (typeof window !== "undefined" && window.__theme) {
    return window.__theme;
  }
  return "dark";
};

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const { dict } = useLanguage();
  const isEn = dict.lang === "en";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
      window.localStorage.setItem("theme", theme);
      window.__theme = theme;
    }
  }, [theme]);

  const handleToggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

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
      onClick={handleToggle}
      aria-label={ariaLabel}
      aria-pressed={theme === "dark"}
      className="group relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-soft bg-white/10 text-[var(--foreground)] shadow-[0_8px_24px_rgba(15,23,42,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-strong"
    >
      <Icon className="h-5 w-5 transition-transform duration-500 group-hover:rotate-180" aria-hidden="true" />
      <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-amber-300/0 via-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
}

