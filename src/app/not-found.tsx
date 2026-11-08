import Link from "next/link";
import { es } from "@/i18n/locales/es";
import { en } from "@/i18n/locales/en";

// Sin proveedor de idioma en esta ruta: se muestran los dos textos.
export default function NotFound() {
	return (
		<main className="page flex min-h-screen flex-col justify-center py-24">
			<p className="meta text-subtle">404</p>
			<div aria-hidden="true" className="mt-4 h-px bg-rule-strong" />
			<h1 className="mt-8 font-display text-[clamp(3.5rem,12vw,9rem)] leading-[0.85] tracking-[-0.03em] text-ink">
				{es.ui.notFound.title}
			</h1>
			<p className="mt-8 max-w-[46ch] text-lg text-muted">{es.ui.notFound.body}</p>
			<p lang="en" className="mt-2 max-w-[46ch] text-lg text-subtle">
				{en.ui.notFound.body}
			</p>
			<p className="mt-10">
				<Link href="/" className="btn btn-ink">
					<span aria-hidden="true">←</span>
					{es.ui.notFound.back}
				</Link>
			</p>
		</main>
	);
}
