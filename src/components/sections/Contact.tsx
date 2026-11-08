'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { cn, revealWith, scrollRevealConfig } from "@/lib/utils";
import { Check, CheckCircle2, Clock, Copy, GithubIcon, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/i18n";
import { CONTACT_EMAIL } from "@/data/portfolio";
import { IntentSelect } from "../ui/IntentSelect";

type FormState = {
	name: string;
	email: string;
	message: string;
	intent: string;
	website: string;
};

type FormStatus = "idle" | "sending" | "success" | "error";
type FieldName = "intent" | "name" | "email" | "message";

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
	const [fieldErrors, setFieldErrors] = useState<Partial<Record<FieldName, string>>>({});
	const [submitAttempted, setSubmitAttempted] = useState(false);
	const mountedAt = useRef<number>(0);
	const [emailCopied, setEmailCopied] = useState(false);

	useEffect(() => {
		mountedAt.current = Date.now();
	}, []);

	useEffect(() => {
		if (!emailCopied) return;
		const id = window.setTimeout(() => setEmailCopied(false), 2200);
		return () => window.clearTimeout(id);
	}, [emailCopied]);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(CONTACT_EMAIL);
			setEmailCopied(true);
		} catch {
			// sin permiso de portapapeles el enlace mailto sigue disponible
		}
	};

	const t = dict.ui.form;
	const intents = useMemo(
		() =>
			(["job", "freelance", "networking", "technical", "other"] as const).map((value) => ({
				value,
				label: t.intents[value],
			})),
		[t],
	);

	const intentLabelOf = (value: string) =>
		intents.find((i) => i.value === value)?.label ?? value;

	const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
	const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
	const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

	const validateField = (field: FieldName, value: string): string | null => {
		const trimmed = value.trim();
		switch (field) {
			case "intent":
				if (!value)
					return t.errors.intent;
				return null;
			case "name":
				if (trimmed.length === 0)
					return t.errors.nameRequired;
				if (trimmed.length < LIMITS.name.min)
					return t.errors.min.replace("{n}", String(LIMITS.name.min));
				if (trimmed.length > LIMITS.name.max)
					return t.errors.max.replace("{n}", String(LIMITS.name.max));
				return null;
			case "email":
				if (trimmed.length === 0)
					return t.errors.emailRequired;
				if (trimmed.length > LIMITS.email.max)
					return t.errors.emailLong;
				if (!EMAIL_RX.test(trimmed))
					return t.errors.emailInvalid;
				return null;
			case "message":
				if (trimmed.length === 0)
					return t.errors.messageRequired;
				if (trimmed.length < LIMITS.message.min)
					return t.errors.min.replace("{n}", String(LIMITS.message.min));
				if (trimmed.length > LIMITS.message.max)
					return t.errors.max.replace("{n}", String(LIMITS.message.max));
				return null;
			default:
				return null;
		}
	};

	const validateAll = (): boolean => {
		const errors: Partial<Record<FieldName, string>> = {};
		(["intent", "name", "email", "message"] as const).forEach((field) => {
			const err = validateField(field, form[field]);
			if (err) errors[field] = err;
		});
		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleChange =
		(field: keyof FormState) =>
		(
			event: React.ChangeEvent<
				HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
			>,
		) => {
			const value = event.target.value;
			setForm((prev) => ({ ...prev, [field]: value }));
			if (submitAttempted && field !== "website") {
				const err = validateField(field as FieldName, value);
				setFieldErrors((prev) => ({ ...prev, [field as FieldName]: err ?? undefined }));
			}
		};

	const handleBlur = (field: FieldName) => () => {
		const err = validateField(field, form[field]);
		setFieldErrors((prev) => ({ ...prev, [field]: err ?? undefined }));
	};

	const resetForm = () => {
		setForm(EMPTY_FORM);
		setStatus("idle");
		setErrorMsg(null);
		setFieldErrors({});
		setSubmitAttempted(false);
		mountedAt.current = Date.now();
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setSubmitAttempted(true);

		if (form.website.trim().length > 0) {
			setStatus("success");
			setErrorMsg(null);
			setForm(EMPTY_FORM);
			setFieldErrors({});
			return;
		}

		if (Date.now() - mountedAt.current < MIN_FORM_TIME_MS) {
			setStatus("error");
			setErrorMsg(t.errors.tooFast);
			return;
		}

		const isValid = validateAll();
		if (!isValid) {
			setStatus("error");
			setErrorMsg(t.errors.fix);
			return;
		}

		try {
			const lastSubmit = Number(window.localStorage.getItem(RATE_LIMIT_KEY) || "0");
			if (Date.now() - lastSubmit < RATE_LIMIT_MS) {
				const remaining = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmit)) / 1000);
				setStatus("error");
				setErrorMsg(t.errors.wait.replace("{n}", String(remaining)));
				return;
			}
		} catch {
			// localStorage no disponible, seguimos
		}

		if (!serviceId || !templateId || !publicKey) {
			setStatus("error");
			setErrorMsg(t.errors.keys);
			return;
		}

		setStatus("sending");
		setErrorMsg(null);
		try {
			const topicLabel = t.topic;
			const composedMessage = `[${topicLabel}: ${intentLabelOf(form.intent)}]\n\n${form.message.trim()}`;
			const { default: emailjs } = await import("@emailjs/browser");
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
			setFieldErrors({});
			try {
				window.localStorage.setItem(RATE_LIMIT_KEY, String(Date.now()));
			} catch {
				// noop
			}
		} catch (error) {
			console.error("EmailJS error:", error);
			setStatus("error");
			setErrorMsg(t.errors.failed);
		}
	};

	const fieldClass = (field: FieldName, extra = "") =>
		cn(
			"mt-1.5 w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-[var(--foreground)] outline-none transition-all focus:bg-white/10",
			fieldErrors[field]
				? "border-rose-400/70 focus:border-rose-400"
				: "border-soft focus:border-amber-300",
			extra,
		);

	const renderFieldError = (field: FieldName) =>
		fieldErrors[field] ? (
			<p
				id={`contact-${field}-error`}
				role="alert"
				className="mt-1 text-xs text-[var(--pill-rose-text)]"
			>
				{fieldErrors[field]}
			</p>
		) : null;

	const ariaProps = (field: FieldName) => ({
		"aria-invalid": Boolean(fieldErrors[field]),
		"aria-describedby": fieldErrors[field] ? `contact-${field}-error` : undefined,
	});

	const platforms = [
		{
			label: "LinkedIn",
			description: t.linkedinDesc,
			href: socialLinks.find((l) => l.label.toLowerCase().includes("linkedin"))?.href ?? "#",
		},
		{
			label: "GitHub",
			description: t.githubDesc,
			href: socialLinks.find((l) => l.label.toLowerCase().includes("github"))?.href ?? "#",
		},
		{
			label: "Email",
			description: CONTACT_EMAIL,
			href: `mailto:${CONTACT_EMAIL}`,
		},
	];

	const intentLabel = t.intentLabel;
	const intentPlaceholder = t.intentPlaceholder;
	const responseLabel = t.responseTime;

	const successTitle = t.successTitle;
	const successBody = (
		<>
			{t.successBefore}
			<a href="#projects" className="underline decoration-emerald-300/60 underline-offset-4 hover:text-[var(--pill-emerald-text)]">
				{t.successProjects}
			</a>
			{t.successMiddle}
			<a href="#experience" className="underline decoration-emerald-300/60 underline-offset-4 hover:text-[var(--pill-emerald-text)]">
				{t.successExperience}
			</a>
			.
		</>
	);
	const sendAnotherLabel = t.sendAnother;

	return (
		<SectionShell id="contact">
			<SectionHeading eyebrow={contact.eyebrow} index="06" title={contact.title} description={contact.description} />

			<div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-2">
				<motion.form
					{...scrollRevealConfig}
					onSubmit={handleSubmit}
					noValidate
					className="print-hide relative rounded-3xl surface-card p-6 shadow-[0_30px_80px_rgba(15,23,42,0.35)] sm:p-7"
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
								<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--pill-emerald-text)]" aria-hidden="true" />
								<div className="flex flex-col gap-3">
									<p className="text-base font-semibold text-[var(--pill-emerald-text)]">{successTitle}</p>
									<p className="text-sm text-[var(--foreground)]/80">{successBody}</p>
									<button
										type="button"
										onClick={resetForm}
										className="self-start text-xs uppercase tracking-[0.3em] text-[var(--pill-emerald-text)] transition-colors hover:text-[var(--pill-emerald-text)]"
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
										<div className="mt-1.5">
											<IntentSelect
												id="contact-intent"
												options={intents}
												value={form.intent}
												onChange={(v) => {
													setForm((prev) => ({ ...prev, intent: v }));
													if (submitAttempted) {
														const err = validateField("intent", v);
														setFieldErrors((prev) => ({
															...prev,
															intent: err ?? undefined,
														}));
													}
												}}
												onBlur={handleBlur("intent")}
												placeholder={intentPlaceholder}
												required
												ariaInvalid={Boolean(fieldErrors.intent)}
												ariaDescribedBy={
													fieldErrors.intent ? "contact-intent-error" : undefined
												}
											/>
										</div>
										{renderFieldError("intent")}
									</div>
									<div>
										<label
											htmlFor="contact-name"
											className="text-[10px] uppercase tracking-[0.28em] text-subtle"
										>
											{contact.form.name.label}
										</label>
										<input
											id="contact-name"
											value={form.name}
											onChange={handleChange("name")}
											onBlur={handleBlur("name")}
											{...ariaProps("name")}
											className={fieldClass("name")}
											placeholder={contact.form.name.placeholder}
											required
											minLength={LIMITS.name.min}
											maxLength={LIMITS.name.max}
											autoComplete="name"
										/>
										{renderFieldError("name")}
									</div>
								</div>
								<div>
									<label
										htmlFor="contact-email"
										className="text-[10px] uppercase tracking-[0.28em] text-subtle"
									>
										{contact.form.email.label}
									</label>
									<input
										id="contact-email"
										value={form.email}
										onChange={handleChange("email")}
										onBlur={handleBlur("email")}
										{...ariaProps("email")}
										type="email"
										className={fieldClass("email")}
										placeholder={contact.form.email.placeholder}
										required
										maxLength={LIMITS.email.max}
										autoComplete="email"
									/>
									{renderFieldError("email")}
								</div>
								<div>
									<label
										htmlFor="contact-message"
										className="text-[10px] uppercase tracking-[0.28em] text-subtle"
									>
										{contact.form.message.label}
									</label>
									<textarea
										id="contact-message"
										value={form.message}
										onChange={handleChange("message")}
										onBlur={handleBlur("message")}
										{...ariaProps("message")}
										className={fieldClass("message", "min-h-[110px] rounded-2xl py-3")}
										placeholder={contact.form.message.placeholder}
										required
										minLength={LIMITS.message.min}
										maxLength={LIMITS.message.max}
									/>
									<div className="mt-1 flex items-start justify-between gap-3">
										<div className="min-w-0 flex-1">
											{renderFieldError("message")}
										</div>
										<p className="shrink-0 text-[10px] text-subtle">
											{form.message.length}/{LIMITS.message.max}
										</p>
									</div>
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
									{status === "sending" ? t.sending : contact.form.submit}
									<span className="absolute inset-0 bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
								</motion.button>
							</div>
							{errorMsg ? (
								<p className="mt-4 text-sm text-[var(--pill-rose-text)]" role="status" aria-live="polite">
									{errorMsg}
								</p>
							) : null}
						</>
					)}
				</motion.form>

				<motion.div
					{...revealWith({ delay: 0.1 })}
					className="flex flex-col gap-6 rounded-3xl bg-white/5 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.35)] backdrop-blur"
				>
					<div className="rounded-2xl border border-soft/40 bg-white/5 p-6">
						<h3 className="text-xl font-semibold text-[var(--foreground)]">{contact.platforms.title}</h3>
						<p className="mt-1 text-sm text-muted">{contact.platforms.subtitle}</p>
						<div className="mt-5 flex flex-col gap-3">
							{platforms.map((platform) => {
								const Icon = platformIconMap[platform.label as keyof typeof platformIconMap] ?? Mail;
								const isEmail = platform.label === "Email";
								return (
									<div key={platform.label} className="group/platform relative">
										<a
											href={platform.href}
											target={isEmail ? undefined : "_blank"}
											rel={isEmail ? undefined : "noreferrer"}
											className={cn(
												"flex items-center justify-between rounded-2xl border border-soft/40 bg-black/20 px-5 py-4 text-[var(--foreground)] transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white/10",
												isEmail && "pr-16",
											)}
										>
											<div className="flex min-w-0 items-center gap-3">
												<Icon className="h-5 w-5 shrink-0 text-[var(--foreground)]/70 transition-transform duration-300 group-hover/platform:-rotate-6 group-hover/platform:scale-110" aria-hidden="true" />
												<div className="min-w-0 text-sm">
													<p className="font-medium">{platform.label}</p>
													<p className="truncate text-muted">{platform.description}</p>
												</div>
											</div>
										</a>
										{isEmail ? (
											<>
												<button
													type="button"
													onClick={copyEmail}
													aria-label={emailCopied ? dict.ui.emailCopied : dict.ui.copyEmail}
													title={dict.ui.copyEmail}
													className="print-hide absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-soft/60 text-[var(--foreground)] transition-colors duration-300 hover:border-amber-300 hover:text-[var(--accent-warm)]"
												>
													<AnimatePresence mode="wait" initial={false}>
														<motion.span
															key={emailCopied ? "ok" : "copy"}
															initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
															animate={{ opacity: 1, scale: 1, rotate: 0 }}
															exit={{ opacity: 0, scale: 0.6 }}
															transition={{ duration: 0.2 }}
															className="inline-flex"
														>
															{emailCopied ? (
																<Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
															) : (
																<Copy className="h-4 w-4" aria-hidden="true" />
															)}
														</motion.span>
													</AnimatePresence>
												</button>
												<span role="status" aria-live="polite" className="sr-only">
													{emailCopied ? dict.ui.emailCopied : ""}
												</span>
											</>
										) : null}
									</div>
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
