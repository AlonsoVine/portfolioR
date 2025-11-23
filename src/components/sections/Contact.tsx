'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { GithubIcon, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/i18n";

type FormState = {
	name: string;
	email: string;
	message: string;
};

const platformIconMap = {
	LinkedIn: Linkedin,
	GitHub: GithubIcon,
	Email: Mail,
};

export function Contact() {
	const { dict } = useLanguage();
	const { contact, socialLinks } = dict;
	const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });

	const handleChange =
		(field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setForm((prev) => ({ ...prev, [field]: event.target.value }));

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setForm({ name: "", email: "", message: "" });
	};

	const platforms = [
		{
			label: "LinkedIn",
			description: dict.lang === "en" ? "Professional profile" : "Perfil profesional",
			href: socialLinks.find((l) => l.label.toLowerCase().includes("linkedin"))?.href ?? "#",
		},
		{
			label: "GitHub",
			description: dict.lang === "en" ? "Projects and code" : "Proyectos y codigo",
			href: socialLinks.find((l) => l.label.toLowerCase().includes("github"))?.href ?? "#",
		},
		{
			label: "Email",
			description: "alonvineba@gmail.com",
			href: "mailto:alonvineba@gmail.com",
		},
	];

	return (
		<SectionShell id="contact">
			<SectionHeading eyebrow={contact.eyebrow} title={contact.title} description={contact.description} />

			<div className="mt-12 grid gap-8 lg:grid-cols-2">
				<motion.form
					{...(scrollRevealConfig as any)}
					onSubmit={handleSubmit}
					className="rounded-3xl surface-card p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
						<h3 className="text-2xl font-semibold text-[var(--foreground)]">{contact.form.title}</h3>
					<p className="mt-1 text-sm text-muted">{contact.form.helper}</p>
					<div className="mt-8 grid gap-6">
						<div>
							<label className="text-xs uppercase tracking-[0.35em] text-subtle">{contact.form.name.label}</label>
							<input
								value={form.name}
								onChange={handleChange("name")}
								className="mt-2 w-full rounded-2xl border border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
								placeholder={contact.form.name.placeholder}
							/>
						</div>
						<div>
							<label className="text-xs uppercase tracking-[0.35em] text-subtle">{contact.form.email.label}</label>
							<input
								value={form.email}
								onChange={handleChange("email")}
								type="email"
								className="mt-2 w-full rounded-2xl border border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
								placeholder={contact.form.email.placeholder}
							/>
						</div>
						<div>
							<label className="text-xs uppercase tracking-[0.35em] text-subtle">{contact.form.message.label}</label>
							<textarea
								value={form.message}
								onChange={handleChange("message")}
								className="mt-2 min-h-[140px] w-full rounded-3xl border border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
								placeholder={contact.form.message.placeholder}
							/>
						</div>
					</div>
					<motion.button
						type="submit"
						whileTap={{ scale: 0.98 }}
						className="group relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500 px-10 py-4 text-base font-semibold text-slate-900 shadow-[0_30px_60px_rgba(251,191,36,0.45)]"
					>
						{contact.form.submit}
						<span className="absolute inset-0 bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					</motion.button>
				</motion.form>

				<motion.div
					{...scrollRevealConfig}
					transition={{ delay: 0.1 }}
					className="flex flex-col gap-6 rounded-3xl bg-white/5 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur"
				>
					<div className="rounded-2xl border border-soft/40 bg-white/5 p-6">
						<h3 className="text-xl font-semibold text-[var(--foreground)]">{contact.platforms.title}</h3>
						<p className="mt-1 text-sm text-muted">{contact.platforms.subtitle}</p>
						<div className="mt-5 flex flex-col gap-3">
							{platforms.map((platform) => {
								const Icon = platformIconMap[platform.label as keyof typeof platformIconMap] ?? Mail;
								return (
									<a
										key={platform.label}
										href={platform.href}
										target="_blank"
										rel="noreferrer"
										className="flex items-center justify-between rounded-2xl border border-soft/40 bg-black/20 px-5 py-4 text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white/10"
									>
										<div className="flex items-center gap-3">
											<Icon className="h-5 w-5 text-[var(--foreground)]/70" aria-hidden="true" />
											<div className="text-sm">
												<p className="font-medium">{platform.label}</p>
												<p className="text-muted">{platform.description}</p>
											</div>
										</div>
									</a>
								);
							})}
						</div>
					</div>
					<div className="rounded-2xl bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500 p-6 text-slate-900 shadow-[0_20px_60px_rgba(251,191,36,0.35)]">
						<h4 className="text-lg font-semibold">{contact.availability.title}</h4>
						<p className="mt-2 text-sm text-slate-900/80">{contact.availability.description}</p>
					</div>
				</motion.div>
			</div>
		</SectionShell>
	);
}
