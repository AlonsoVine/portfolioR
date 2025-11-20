'use client';

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setVisible(window.scrollY > 160);
		};

		handleScroll();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<button
			type="button"
			aria-label="Volver al inicio"
			onClick={scrollToTop}
			className={cn(
				"group fixed bottom-6 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-soft bg-[var(--background)]/85 text-[var(--foreground)] shadow-[0_12px_30px_rgba(15,23,42,0.35)] backdrop-blur duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:border-strong hover:bg-[var(--background)] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:right-6",
				visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
			)}
		>
			<ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
		</button>
	);
}
