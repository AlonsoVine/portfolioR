"use client";

import { useEffect } from "react";

const SIGNATURE = `
  █████╗  ██╗   ██╗
 ██╔══██╗ ██║   ██║
 ███████║ ██║   ██║
 ██╔══██║ ╚██╗ ██╔╝
 ██║  ██║  ╚████╔╝
 ╚═╝  ╚═╝   ╚═══╝
`;

export function ConsoleSignature() {
	useEffect(() => {
		if (typeof window === "undefined") return;
		// Evitar duplicados en re-mounts del dev (HMR)
		if ((window as unknown as { __avSigPrinted?: boolean }).__avSigPrinted) return;
		(window as unknown as { __avSigPrinted?: boolean }).__avSigPrinted = true;

		const titleStyle = "color:#fbbf24;font-weight:bold;font-family:monospace;";
		const subtitleStyle = "color:#fb7185;font-size:13px;";
		const linkStyle = "color:#a855f7;font-weight:bold;";
		const muted = "color:#94a3b8;font-style:italic;";

		console.log(`%c${SIGNATURE}`, titleStyle);
		console.log("%cAlonso Viñé · Full Stack Developer · DevOps & IA", subtitleStyle);
		console.log("%c¿Curioso por cómo está construido?", muted);
		console.log("%cRepo: %chttps://github.com/AlonsoVine/portfolioR", muted, linkStyle);
		console.log(
			"%c¿Buscas dev? hablemos → alonvineba@gmail.com",
			muted,
		);
	}, []);

	return null;
}
