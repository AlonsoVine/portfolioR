import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
	return (
		<main className="relative flex min-h-screen flex-col items-center justify-center px-4 py-32 text-center">
			<p
				className="text-7xl font-semibold leading-none text-[color:var(--accent-warm)] sm:text-8xl"
				style={{ fontFamily: "var(--font-cinzel)" }}
				aria-label="Error 404"
			>
				404
			</p>
			<h1
				className="mt-8 text-2xl font-semibold tracking-[0.18em] text-[var(--foreground)] sm:text-3xl"
				style={{ fontFamily: "var(--font-cinzel)" }}
			>
				ALONSO&nbsp;VIÑÉ
			</h1>
			<p className="mt-6 max-w-md text-base text-muted">
				Esta ruta no existe. O existía y ya no. En cualquier caso, te has perdido por buen sitio.
			</p>
			<Link
				href="/"
				className="group mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_20px_60px_rgba(248,212,128,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
			>
				<ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true" />
				Volver al inicio
			</Link>
		</main>
	);
}
