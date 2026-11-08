"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/utils";

export function StickyContactCTA() {
	const { dict } = useLanguage();
	const label = dict.ui.contactCta;
	const [show, setShow] = useState(false);

	useEffect(() => {
		const onScroll = () => {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			const pct = max > 0 ? window.scrollY / max : 0;
			// Aparece pasada la portada y se retira al llegar a Contacto
			setShow(pct > 0.3 && pct < 0.9);
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<aside aria-label={label} className="print:hidden lg:hidden">
			<a
				href="#contact"
				aria-hidden={show ? undefined : true}
				tabIndex={show ? undefined : -1}
				className={cn(
					"floating-ui btn btn-ink fixed bottom-[4.25rem] right-4 z-40 min-h-11 w-11 px-0 sm:bottom-5 sm:w-auto sm:px-4 text-[0.9rem] transition-[opacity,transform] duration-300 sm:right-[5.25rem]",
					show ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-2 opacity-0",
				)}
			>
				<span aria-hidden="true" className="signal-dot hidden sm:inline-block" />
				<span aria-hidden="true" className="meta sm:hidden">@</span>
				<span className="sr-only sm:not-sr-only">{label}</span>
			</a>
		</aside>
	);
}
