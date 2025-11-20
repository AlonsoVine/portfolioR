'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { GithubIcon, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/data/portfolio";

type FormState = {
	name: string;
	email: string;
	message: string;
};

const initialState: FormState = {
	name: "",
	email: "",
	message: "",
};

const contactDescription = "Estoy abierto a nuevas oportunidades y colaboraciones. No dudes en escribirme.";

const contactPlatforms = [
	{
		label: "LinkedIn",
		description: "Perfil profesional",
		icon: Linkedin,
	},
	{
		label: "GitHub",
		description: "Proyectos y codigo",
		icon: GithubIcon,
	},
	{
		label: "Email",
		description: "alonvineba@gmail.com",
		icon: Mail,
	},
];

const availabilityCopy = "Actualmente estoy buscando nuevas oportunidades y colaboraciones interesantes. Si tienes un proyecto en mente, hablemos.";

export function Contact() {
	const [form, setForm] = useState<FormState>(initialState);

	const handleChange =
		(field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setForm((prev) => ({ ...prev, [field]: event.target.value }));

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setForm(initialState);
	};

	const getPlatformHref = (label: string) => {
		if (label === "Email") return "mailto:alonvineba@gmail.com";
		return socialLinks.find((link) => link.label.toLowerCase() === label.toLowerCase())?.href ?? "#";
	};

	return (
		<SectionShell id="contact">
			<SectionHeading eyebrow="Contacto" title="Trabajemos juntos" description={contactDescription} />

			<div className="mt-12 grid gap-8 lg:grid-cols-2">
				<motion.form
					{...scrollRevealConfig}
					onSubmit={handleSubmit}
					className="rounded-3xl surface-card p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
				>
						<h3 className="text-2xl font-semibold text-[var(--foreground)]">Enviame un mensaje</h3>
					<p className="mt-1 text-sm text-muted">Completa el formulario y me pondre en contacto contigo lo antes posible.</p>
					<div className="mt-8 grid gap-6">
						<div>
							<label className="text-xs uppercase tracking-[0.35em] text-subtle">Nombre</label>
							<input
								value={form.name}
								onChange={handleChange("name")}
								className="mt-2 w-full rounded-2xl border border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
								placeholder="Tu nombre"
							/>
						</div>
						<div>
							<label className="text-xs uppercase tracking-[0.35em] text-subtle">Email</label>
							<input
								value={form.email}
								onChange={handleChange("email")}
								type="email"
								className="mt-2 w-full rounded-2xl border border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
								placeholder="tu@email.com"
							/>
						</div>
						<div>
							<label className="text-xs uppercase tracking-[0.35em] text-subtle">Mensaje</label>
							<textarea
								value={form.message}
								onChange={handleChange("message")}
								className="mt-2 min-h-[140px] w-full rounded-3xl border border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
								placeholder="Escribe tu mensaje aquí..."
							/>
						</div>
					</div>
					<motion.button
						type="submit"
						whileTap={{ scale: 0.98 }}
						className="group relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500 px-10 py-4 text-base font-semibold text-slate-900 shadow-[0_30px_60px_rgba(251,191,36,0.45)]"
					>
						Enviar mensaje
						<span className="absolute inset-0 bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					</motion.button>
				</motion.form>

				<motion.div
					{...scrollRevealConfig}
					transition={{ delay: 0.1 }}
					className="flex flex-col gap-6 rounded-3xl bg-white/5 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur"
				>
					<div className="rounded-2xl border border-soft/40 bg-white/5 p-6">
						<h3 className="text-xl font-semibold text-[var(--foreground)]">Conecta conmigo</h3>
						<p className="mt-1 text-sm text-muted">Encuéntrame en estas plataformas.</p>
						<div className="mt-5 flex flex-col gap-3">
							{contactPlatforms.map((platform) => (
								<a
									key={platform.label}
									href={getPlatformHref(platform.label)}
									target="_blank"
									rel="noreferrer"
									className="flex items-center justify-between rounded-2xl border border-soft/40 bg-black/20 px-5 py-4 text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white/10"
								>
									<div className="flex items-center gap-3">
										<platform.icon className="h-5 w-5 text-[var(--foreground)]/70" aria-hidden="true" />
										<div className="text-sm">
											<p className="font-medium">{platform.label}</p>
											<p className="text-muted">{platform.description}</p>
										</div>
									</div>
								</a>
							))}
						</div>
					</div>
					<div className="rounded-2xl bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500 p-6 text-slate-900 shadow-[0_20px_60px_rgba(251,191,36,0.35)]">
						<h4 className="text-lg font-semibold">Disponible para colaborar</h4>
						<p className="mt-2 text-sm text-slate-900/80">{availabilityCopy}</p>
					</div>
				</motion.div>
			</div>
		</SectionShell>
	);
}
