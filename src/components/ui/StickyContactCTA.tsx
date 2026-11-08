"use client";

import { Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n";

export function StickyContactCTA() {
	const { dict } = useLanguage();
	const label = dict.ui.contactCta;

	const [show, setShow] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			const scrolled = window.scrollY;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			const pct = max > 0 ? scrolled / max : 0;
			// Visible entre el 30% y 92% del scroll (oculto cuando ya estás en Contact)
			setShow(pct > 0.3 && pct < 0.92);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<aside aria-label={label} className="print:hidden">
			<a
				href="#contact"
				aria-hidden={show ? undefined : true}
				tabIndex={show ? undefined : -1}
				className={`fixed bottom-6 left-6 z-40 inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 text-sm font-semibold text-slate-900 shadow-[0_20px_60px_rgba(248,212,128,0.35)] transition-all duration-300 hover:-translate-y-0.5 sm:h-auto sm:w-auto sm:px-5 sm:py-3 ${
					show ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0"
				}`}
			>
				<Mail className="h-4 w-4" aria-hidden="true" />
				<span className="sr-only sm:not-sr-only">{label}</span>
			</a>
		</aside>
	);
}
