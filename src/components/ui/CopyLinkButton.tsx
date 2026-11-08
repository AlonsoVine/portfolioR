"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n";

export function CopyLinkButton({ sectionId }: { sectionId: string }) {
	const { dict } = useLanguage();
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const id = window.setTimeout(() => setCopied(false), 2000);
		return () => window.clearTimeout(id);
	}, [copied]);

	const copy = async () => {
		const url = `${window.location.origin}${window.location.pathname}#${sectionId}`;
		try {
			await navigator.clipboard.writeText(url);
			setCopied(true);
		} catch {
			// sin permiso de portapapeles: el ancla sigue en la barra de direcciones al navegar
		}
	};

	const label = copied ? dict.ui.a11y.linkCopied : dict.ui.a11y.copyLink;

	return (
		<button
			type="button"
			onClick={copy}
			title={label}
			className="meta print-hide -m-2 p-2 text-subtle transition-opacity duration-300 hover:text-ink focus-visible:opacity-100 group-hover/head:opacity-100 [@media(hover:hover)]:opacity-0"
		>
			<span aria-hidden="true">{copied ? dict.ui.a11y.linkCopied : dict.ui.copyLinkShort}</span>
			<span className="sr-only">{copied ? "" : label}</span>
			<span role="status" aria-live="polite" className="sr-only">
				{copied ? dict.ui.a11y.linkCopied : ""}
			</span>
		</button>
	);
}
