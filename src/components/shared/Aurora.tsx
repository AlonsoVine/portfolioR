"use client";

import { useEffect, useState } from "react";

export function Aurora() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Diferimos el render de las blobs hasta el siguiente frame para
		// no penalizar el LCP del Hero (las blobs con blur son GPU-costosas).
		const id = window.requestAnimationFrame(() => setMounted(true));
		return () => window.cancelAnimationFrame(id);
	}, []);

	if (!mounted) return null;

	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-0 -z-10 overflow-hidden print:hidden"
		>
			<div className="aurora-blob aurora-blob-1" />
			<div className="aurora-blob aurora-blob-2" />
			<div className="aurora-blob aurora-blob-3" />
		</div>
	);
}
