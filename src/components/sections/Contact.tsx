'use client';

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { GithubIcon, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/i18n";

type FormState = {
	name: string;
	email: string;
	message: string;
	website: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";

const platformIconMap = {
	LinkedIn: Linkedin,
	GitHub: GithubIcon,
	Email: Mail,
};

const RATE_LIMIT_KEY = "contact_last_submit";
const RATE_LIMIT_MS = 60_000;
const MIN_FORM_TIME_MS = 2_500;
const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LIMITS = {
	name: { min: 2, max: 100 },
	email: { max: 254 },
	message: { min: 10, max: 2000 },
};

export function Contact() {
	const { dict } = useLanguage();
	const { contact, socialLinks } = dict;
	const [form, setForm] = useState<FormState>({ name: "", email: "", message: "", website: "" });
	const [status, setStatus] = useState<FormStatus>("idle");
	const [feedback, setFeedback] = useState<string | null>(null);
	const mountedAt = useRef<number>(Date.now());
	const isEn = dict.lang === "en";

	const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
	const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
	const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

	const handleChange =
		(field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
			setForm((prev) => ({ ...prev, [field]: event.target.value }));

	const validate = (): string | null => {
		const name = form.name.trim();
		const email = form.email.trim();
		const message = form.message.trim();
		if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
			return isEn
				? `Name must be between ${LIMITS.name.min} and ${LIMITS.name.max} characters.`
				: `El nombre debe tener entre ${LIMITS.name.min} y ${LIMITS.name.max} caracteres.`;
		}
		if (email.length > LIMITS.email.max || !EMAIL_RX.test(email)) {
			return isEn ? "Please enter a valid email." : "Introduce un email válido.";
		}
		if (message.length < LIMITS.message.min || message.length > LIMITS.message.max) {
			return isEn
				? `Message must be between ${LIMITS.message.min} and ${LIMITS.message.max} characters.`
				: `El mensaje debe tener entre ${LIMITS.message.min} y ${LIMITS.message.max} caracteres.`;
		}
		return null;
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (form.website.trim().length > 0) {
			setStatus("success");
			setFeedback(isEn ? "Message sent successfully!" : "Mensaje enviado correctamente");
			setForm({ name: "", email: "", message: "", website: "" });
			return;
		}

		if (Date.now() - mountedAt.current < MIN_FORM_TIME_MS) {
			setStatus("error");
			setFeedback(
				isEn
					? "Please take a moment to fill out the form."
					: "Tómate un momento para completar el formulario.",
			);
			return;
		}

		const validationError = validate();
		if (validationError) {
			setStatus("error");
			setFeedback(validationError);
			return;
		}

		try {
			const lastSubmit = Number(window.localStorage.getItem(RATE_LIMIT_KEY) || "0");
			if (Date.now() - lastSubmit < RATE_LIMIT_MS) {
				const remaining = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmit)) / 1000);
				setStatus("error");
				setFeedback(
					isEn
						? `Please wait ${remaining}s before sending another message.`
						: `Espera ${remaining}s antes de enviar otro mensaje.`,
				);
				return;
			}
		} catch {
			// localStorage no disponible, seguimos
		}

		if (!serviceId || !templateId || !publicKey) {
			setStatus("error");
			setFeedback(isEn ? "Missing EmailJS keys" : "Faltan las claves de EmailJS");
			return;
		}

		setStatus("sending");
		setFeedback(null);
		try {
			await emailjs.send(
				serviceId,
				templateId,
				{
					from_name: form.name.trim(),
					from_email: form.email.trim(),
					message: form.message.trim(),
				},
				{ publicKey },
			);
			setStatus("success");
			setFeedback(isEn ? "Message sent successfully!" : "Mensaje enviado correctamente");
			setForm({ name: "", email: "", message: "", website: "" });
			try {
				window.localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
			} catch {
				// noop
			}
		} catch (error) {
			console.error("EmailJS error:", error);
			setStatus("error");
			setFeedback(isEn ? "Something went wrong. Please try later." : "Algo falló. Inténtalo más tarde.");
		}
	};

	const platforms = [
		{
			label: "LinkedIn",
			description: isEn ? "Professional profile" : "Perfil profesional",
			href: socialLinks.find((l) => l.label.toLowerCase().includes("linkedin"))?.href ?? "#",
		},
		{
			label: "GitHub",
			description: isEn ? "Projects and code" : "Proyectos y codigo",
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
					noValidate
					className="relative rounded-3xl surface-card p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<h3 className="text-2xl font-semibold text-[var(--foreground)]">{contact.form.title}</h3>
					<p className="mt-1 text-sm text-muted">{contact.form.helper}</p>

					<div
						aria-hidden="true"
						className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0"
					>
						<label htmlFor="contact-website">Website (leave empty)</label>
						<input
							id="contact-website"
							type="text"
							name="website"
							value={form.website}
							onChange={handleChange("website")}
							tabIndex={-1}
							autoComplete="off"
						/>
					</div>

					<div className="mt-8 grid gap-6">
						<div>
							<label className="text-xs uppercase tracking-[0.35em] text-subtle">{contact.form.name.label}</label>
							<input
								value={form.name}
								onChange={handleChange("name")}
								className="mt-2 w-full rounded-2xl border border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
								placeholder={contact.form.name.placeholder}
								required
								minLength={LIMITS.name.min}
								maxLength={LIMITS.name.max}
								autoComplete="name"
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
								required
								maxLength={LIMITS.email.max}
								autoComplete="email"
							/>
						</div>
						<div>
							<label className="text-xs uppercase tracking-[0.35em] text-subtle">{contact.form.message.label}</label>
							<textarea
								value={form.message}
								onChange={handleChange("message")}
								className="mt-2 min-h-[140px] w-full rounded-3xl border border-soft bg-white/5 px-5 py-4 text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
								placeholder={contact.form.message.placeholder}
								required
								minLength={LIMITS.message.min}
								maxLength={LIMITS.message.max}
							/>
							<p className="mt-1 text-right text-xs text-subtle">
								{form.message.length}/{LIMITS.message.max}
							</p>
						</div>
					</div>
					<motion.button
						type="submit"
						disabled={status === "sending"}
						whileTap={{ scale: 0.98 }}
						className="group relative mt-8 inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500 px-10 py-4 text-base font-semibold text-slate-900 shadow-[0_30px_60px_rgba(251,191,36,0.45)] disabled:cursor-not-allowed disabled:opacity-70"
					>
						{status === "sending" ? (isEn ? "Sending..." : "Enviando...") : contact.form.submit}
						<span className="absolute inset-0 bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
					</motion.button>
					{feedback ? (
						<p
							className={`mt-4 text-sm ${
								status === "success" ? "text-emerald-300" : "text-rose-300"
							}`}
							role="status"
						>
							{feedback}
						</p>
					) : null}
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
