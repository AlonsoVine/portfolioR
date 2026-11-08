"use client";

import { useLanguage } from "@/i18n";

export function SkipToContent() {
	const { dict } = useLanguage();

	return (
		<a
			href="#main-content"
			className="btn btn-ink sr-only fixed left-4 top-3 z-[100] focus:not-sr-only"
		>
			{dict.ui.a11y.skipToContent}
		</a>
	);
}
