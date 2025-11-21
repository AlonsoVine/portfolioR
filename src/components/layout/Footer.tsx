import Image from "next/image";
import { GithubIcon, Linkedin } from "lucide-react";
import { socialLinks } from "@/data/portfolio";

const socialIconMap = {
	linkedin: Linkedin,
	github: GithubIcon,
} as const;

const footerSocials = socialLinks.filter((link) => link.icon === "linkedin" || link.icon === "github");

export function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-24 border-t border-soft/60 py-10 text-sm text-subtle">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
				<div className="flex flex-col gap-6 border-b border-soft/40 pb-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center gap-3 text-[var(--foreground)]">
						<Image src="/images/logo.png" alt="Logotipo" width={36} height={36} />
						<div>
							<p className="font-semibold text-[var(--foreground)]">{"Alonso Vi\u00F1\u00E9"}</p>
							<p className="text-xs uppercase tracking-[0.35em] text-muted">Desarrollador y Analista</p>
						</div>
					</div>
					<div className="flex flex-wrap justify-center gap-3">
						{footerSocials.map((social) => {
							const Icon = socialIconMap[social.icon];
							return (
								<a
									key={social.label}
									href={social.href}
									target="_blank"
									rel="noreferrer"
									className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 p-[1px] text-sm font-semibold text-slate-900 shadow-[0_15px_50px_rgba(248,212,128,0.25)] transition-transform duration-300 hover:-translate-y-0.5"
								>
									<span className="inline-flex items-center gap-2 rounded-full bg-[var(--background)] px-5 py-2 text-[var(--foreground)] transition-colors duration-300 group-hover:bg-white/10">
										<Icon className="h-4 w-4" aria-hidden="true" />
										{social.label}
									</span>
								</a>
							);
						})}
					</div>
				</div>
				<div className="flex flex-col gap-2 text-center text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
					<div className="flex flex-col gap-1">
						<p>
							Hecho con <span className="text-rose-300">♥</span> por {"Alonso Vi\u00F1\u00E9"}
						</p>
						<p>© {year} Todos los derechos reservados.</p>
					</div>
					<p className="text-subtle">Desarrollado con React, Tailwind CSS y mucho cafe ☕</p>
				</div>
			</div>
		</footer>
	);
}
