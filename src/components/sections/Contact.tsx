'use client';

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";
import { CheckCircle2, ChevronDown, Clock, GithubIcon, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/i18n";

type FormState = {
	name: string;
	email: string;
	message: string;
	intent: string;
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

const EMPTY_FORM: FormState = {
	name: "",
	email: "",
	message: "",
	intent: "",
	website: "",
};

export function Contact() {
	const { dict } = useLanguage();
	const { contact, socialLinks } = dict;
	const [form, setForm] = useState<FormState>(EMPTY_FORM);
	const [status, setStatus] = useState<FormStatus>("idle");
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const mountedAt = useRef<number>(Date.now());
	const isEn = dict.lang === "en";

	const intents = useMemo(
		() =>
			isEn
				? [
						{ value: "job", label: "Job offer" },
						{ value: "freelance", label: "Freelance / Project" },
						{ value: "networking", label: "Networking" },
						{ value: "technical", label: "Technical question" },
						{ value: "other", label: "Other" },
					]
				: [
						{ value: "job", label: "Oferta laboral" },
						{ value: "freelance", label: "Freelance / Proyecto" },
						{ value: "networking", label: "Networking" },
						{ value: "technical", label: "Pregunta técnica" },
						{ value: "other", label: "Otro" },
					],
		[isEn],
	);

	const intentLabelOf = (value: string) =>
		intents.find((i) => i.value === value)?.label ?? value;

	const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
	const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
	const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

	const handleChange =
		(field: keyof FormState) =>
		(
			event: React.ChangeEvent<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>,
		) =>
			setForm((prev) => ({ ...prev, [field]: event.target.value }));

	const validate = (): string | null => {
		const name = form.name.trim();
		const email = form.email.trim();
		const message = form.message.trim();
		if (!form.intent) {
			return isEn
				? "Pick a topic for your message."
				: "Selecciona el motivo del mensaje.";
		}
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

	const resetForm = () => {
		setForm(EMPTY_FORM);
		setStatus("idle");
		setErrorMsg(null);
		mountedAt.current = Date.now();
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (form.website.trim().length > 0) {
			setStatus("success");
			setErrorMsg(null);
			setForm(EMPTY_FORM);
			return;
		}

		if (Date.now() - mountedAt.current < MIN_FORM_TIME_MS) {
			setStatus("error");
			setErrorMsg(
				isEn
					? "Please take a moment to fill out the form."
					: "Tómate un momento para completar el formulario.",
			);
			return;
		}

		const validationError = validate();
		if (validationError) {
			setStatus("error");
			setErrorMsg(validationError);
			return;
		}

		try {
			const lastSubmit = Number(window.localStorage.getItem(RATE_LIMIT_KEY) || "0");
			if (Date.now() - lastSubmit < RATE_LIMIT_MS) {
				const remaining = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmit)) / 1000);
				setStatus("error");
				setErrorMsg(
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
			setErrorMsg(isEn ? "Missing EmailJS keys" : "Faltan las claves de EmailJS");
			return;
		}

		setStatus("sending");
		setErrorMsg(null);
		try {
			const topicLabel = isEn ? "Topic" : "Motivo";
			const composedMessage = `[${topicLabel}: ${intentLabelOf(form.intent)}]\n\n${form.message.trim()}`;
			await emailjs.send(
				serviceId,
				templateId,
				{
					from_name: form.name.trim(),
					from_email: form.email.trim(),
					message: composedMessage,
				},
				{ publicKey },
			);
			setStatus("success");
			setErrorMsg(null);
			setForm(EMPTY_FORM);
			try {
				window.localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
			} catch {
				// noop
			}
		} catch (error) {
			console.error("EmailJS error:", error);
			setStatus("error");
			setErrorMsg(
				isEn ? "Something went wrong. Please try later." : "Algo falló. Inténtalo más tarde.",
			);
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

	const intentLabel = isEn ? "What's this about?" : "¿De qué quieres hablar?";
	const intentPlaceholder = isEn ? "Pick a topic" : "Elige un motivo";
	const responseLabel = isEn ? "I usually reply within 24h" : "Suelo responder en ≤ 24h";

	const successTitle = isEn ? "Got it · message received." : "Mensaje recibido.";
	const successBody = isEn ? (
		<>
			I&apos;ll reply within 24 hours. In the meantime, check out my{" "}
			<a href="#projects" className="underline decoration-emerald-300/60 underline-offset-4 hover:text-emerald-200">
				projects
			</a>{" "}
			or my{" "}
			<a href="#experience" className="underline decoration-emerald-300/60 underline-offset-4 hover:text-emerald-200">
				experience
			</a>
			.
		</>
	) : (
		<>
			Te respondo en menos de 24 horas. Mientras, échale un ojo a mis{" "}
			<a href="#projects" className="underline decoration-emerald-300/60 underline-offset-4 hover:text-emerald-200">
				proyectos
			</a>{" "}
			o a mi{" "}
			<a href="#experience" className="underline decoration-emerald-300/60 underline-offset-4 hover:text-emerald-200">
				trayectoria
			</a>
			.
		</>
	);
	const sendAnotherLabel = isEn ? "Send another message" : "Enviar otro mensaje";

	return (
		<SectionShell id="contact">
			<SectionHeading eyebrow={contact.eyebrow} title={contact.title} description={contact.description} />

			<div className="mt-12 grid gap-8 lg:grid-cols-2">
				<motion.form
					{...(scrollRevealConfig as any)}
					onSubmit={handleSubmit}
					noValidate
					className="relative rounded-3xl surface-card p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)] sm:p-7"
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<h3 className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl">{contact.form.title}</h3>
					<p className="mt-1 text-xs text-muted sm:text-sm">{contact.form.helper}</p>

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

					{status === "success" ? (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.4, ease: "easeOut" }}
							className="mt-8 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-6"
							role="status"
							aria-live="polite"
						>
							<div className="flex items-start gap-3">
								<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
								<div className="flex flex-col gap-3">
									<p className="text-base font-semibold text-emerald-200">{successTitle}</p>
									<p className="text-sm text-[var(--foreground)]/80">{successBody}</p>
									<button
										type="button"
										onClick={resetForm}
										className="self-start text-xs uppercase tracking-[0.3em] text-emerald-300/80 transition-colors hover:text-emerald-200"
									>
										{sendAnotherLabel} →
									</button>
								</div>
							</div>
						</motion.div>
					) : (
						<>
							<div className="mt-5 grid gap-4">
								<div className="grid gap-4 sm:grid-cols-2">
									<div>
										<label
											htmlFor="contact-intent"
											className="text-[10px] uppercase tracking-[0.28em] text-subtle"
										>
											{intentLabel}
										</label>
										<div className="relative mt-1.5">
											<select
												id="contact-intent"
												value={form.intent}
												onChange={handleChange("intent")}
												required
												className="w-full appearance-none rounded-xl border border-soft bg-white/5 px-4 py-2.5 pr-10 text-sm text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
											>
												<option value="" disabled className="bg-[var(--background)] text-[var(--foreground)]">
													{intentPlaceholder}
												</option>
												{intents.map((it) => (
													<option key={it.value} value={it.value} className="bg-[var(--background)] text-[var(--foreground)]">
														{it.label}
													</option>
												))}
											</select>
											<ChevronDown
												className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--foreground)]/60"
												aria-hidden="true"
											/>
										</div>
									</div>
									<div>
										<label className="text-[10px] uppercase tracking-[0.28em] text-subtle">{contact.form.name.label}</label>
										<input
											value={form.name}
											onChange={handleChange("name")}
											className="mt-1.5 w-full rounded-xl border border-soft bg-white/5 px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
											placeholder={contact.form.name.placeholder}
											required
											minLength={LIMITS.name.min}
											maxLength={LIMITS.name.max}
											autoComplete="name"
										/>
									</div>
								</div>
								<div>
									<label className="text-[10px] uppercase tracking-[0.28em] text-subtle">{contact.form.email.label}</label>
									<input
										value={form.email}
										onChange={handleChange("email")}
										type="email"
										className="mt-1.5 w-full rounded-xl border border-soft bg-white/5 px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
										placeholder={contact.form.email.placeholder}
										required
										maxLength={LIMITS.email.max}
										autoComplete="email"
									/>
								</div>
								<div>
									<label className="text-[10px] uppercase tracking-[0.28em] text-subtle">{contact.form.message.label}</label>
									<textarea
										value={form.message}
										onChange={handleChange("message")}
										className="mt-1.5 min-h-[110px] w-full rounded-2xl border border-soft bg-white/5 px-4 py-3 text-sm text-[var(--foreground)] outline-none transition-all focus:border-amber-300 focus:bg-white/10"
										placeholder={contact.form.message.placeholder}
										required
										minLength={LIMITS.message.min}
										maxLength={LIMITS.message.max}
									/>
									<p className="mt-1 text-right text-[10px] text-subtle">
										{form.message.length}/{LIMITS.message.max}
									</p>
								</div>
							</div>
							<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div className="inline-flex items-center gap-1.5 text-[11px] text-muted">
									<Clock className="h-3 w-3 text-[var(--accent-warm)]" aria-hidden="true" />
									<span>{responseLabel}</span>
								</div>
								<motion.button
									type="submit"
									disabled={status === "sending"}
									whileTap={{ scale: 0.98 }}
									className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-rose-400 to-violet-500 px-8 py-3 text-sm font-semibold text-slate-900 shadow-[0_20px_50px_rgba(251,191,36,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
								>
									{status === "sending" ? (isEn ? "Sending..." : "Enviando...") : contact.form.submit}
									<span className="absolute inset-0 bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</motion.button>
							</div>
							{errorMsg ? (
								<p className="mt-4 text-sm text-rose-300" role="status" aria-live="polite">
									{errorMsg}
								</p>
							) : null}
						</>
					)}
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
