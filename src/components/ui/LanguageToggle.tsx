'use client';

import { Languages } from "lucide-react";
import { useLanguage } from "@/i18n";

export function LanguageToggle() {
  const { lang, setLang, dict } = useLanguage();

  const next = lang === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      lang={lang}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-soft bg-white/5 px-3 text-sm font-semibold text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5 hover:border-[color:var(--accent-warm)] hover:text-[var(--foreground)]"
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{dict.ui.languageCurrent}: </span>
      <span>{lang.toUpperCase()}</span>
      <span className="sr-only">, {dict.ui.languageSwitch}</span>
    </button>
  );
}
