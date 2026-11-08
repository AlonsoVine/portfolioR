'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n";

export function ScrollToTopButton() {
	const { dict } = useLanguage();
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => setVisible(window.scrollY > 640);
		handleScroll();
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<button
			type="button"
			aria-label={dict.ui.scrollTop}
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
			className={cn(
				"floating-ui fixed bottom-5 right-4 z-40 inline-flex h-11 w-11 items-center justify-center border border-rule-strong bg-paper text-ink transition-[opacity,transform,border-color] duration-300 hover:border-ink sm:right-6 print:hidden",
				visible ? "translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-2 opacity-0",
			)}
		>
			<span aria-hidden="true" className="meta">↑</span>
		</button>
	);
}
