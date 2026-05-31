"use client";

import { Check, Link as LinkIcon } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n";

export function CopyLinkButton({ sectionId }: { sectionId: string }) {
	const { dict } = useLanguage();
	const isEn = dict.lang === "en";
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		if (typeof window === "undefined") return;
		const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// noop
		}
	};

	const label = copied
		? isEn
			? "Link copied"
			: "Enlace copiado"
		: isEn
			? "Copy link to this section"
			: "Copiar enlace a esta sección";

	return (
		<button
			type="button"
			onClick={copy}
			aria-label={label}
			title={label}
			className="absolute right-4 top-24 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-soft bg-black/30 text-white/60 opacity-0 backdrop-blur transition-all duration-300 hover:bg-black/60 hover:text-white focus:opacity-100 group-hover/section:opacity-100 sm:right-6 print:hidden"
		>
			{copied ? (
				<Check className="h-4 w-4 text-emerald-300" aria-hidden="true" />
			) : (
				<LinkIcon className="h-4 w-4" aria-hidden="true" />
			)}
		</button>
	);
}
