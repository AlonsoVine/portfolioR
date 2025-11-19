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
				"fixed bottom-6 right-4 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full border border-soft bg-[var(--background)]/85 text-[var(--foreground)] shadow-[0_12px_30px_rgba(15,23,42,0.35)] backdrop-blur duration-300 ease-out sm:right-6",
				visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
			)}
		>
			<ArrowUp className="h-5 w-5" aria-hidden="true" />
		</button>
	);
}
