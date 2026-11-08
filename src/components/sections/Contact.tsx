'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { cn, revealWith, scrollRevealConfig } from "@/lib/utils";
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

	const fieldClass = (field: FieldName, extra = "") => cn("field mt-2", extra);

	const renderFieldError = (field: FieldName) =>
		fieldErrors[field] ? (
			<p id={`contact-${field}-error`} role="alert" className="mt-2 text-sm text-ink">
				<span aria-hidden="true" className="meta mr-2 text-subtle">
					!
				</span>
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
	];

	const labelClass = "meta text-muted";

	return (
		<SectionShell id="contact" className="pt-20 pb-24 lg:pt-28 lg:pb-32">
			<SectionHeading
				sectionId="contact"
				index="06"
				eyebrow={contact.eyebrow}
				title={contact.title}
				description={contact.description}
			/>

			<div className="grid-page mt-14 gap-y-16 lg:mt-20">
				<motion.div {...scrollRevealConfig} className="col-span-4 md:col-span-8 lg:col-span-5">
					<p className="meta text-subtle">{contact.form.email.label}</p>
					<div className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-2">
						<a
							href={`mailto:${CONTACT_EMAIL}`}
							className="link-rule font-display text-[clamp(1.7rem,7.4vw,2.9rem)] leading-tight text-ink [overflow-wrap:anywhere] lg:text-[clamp(1.9rem,2.7vw,2.9rem)]"
						>
							{CONTACT_EMAIL}
						</a>
						<button
							type="button"
							onClick={copyEmail}
							className="print-hide meta min-h-11 text-subtle transition-colors hover:text-ink"
						>
							{emailCopied ? dict.ui.emailCopied : dict.ui.copyEmail}
						</button>
						<span role="status" aria-live="polite" className="sr-only">
							{emailCopied ? dict.ui.emailCopied : ""}
						</span>
					</div>

					<div className="mt-12 border-t border-rule pt-5">
						<p className="flex items-center gap-2.5 text-ink">
							<span aria-hidden="true" className="signal-dot signal-dot-live" />
							<span className="font-medium">{contact.availability.title}</span>
						</p>
						<p className="mt-2 max-w-[44ch] text-muted">{contact.availability.description}</p>
						<p className="meta mt-4 text-subtle">{t.responseTime}</p>
					</div>

					<div className="mt-10 border-t border-rule pt-5">
						<h3 className="meta text-subtle">{contact.platforms.title}</h3>
						<ul className="mt-2">
							{platforms.map((platform) => (
								<li key={platform.label} className="border-b border-rule last:border-b-0">
									<a
										href={platform.href}
										target="_blank"
										rel="noreferrer"
										className="group flex items-baseline justify-between gap-4 py-4 text-ink"
									>
										<span className="text-lg">{platform.label}</span>
										<span className="meta flex items-baseline gap-2 text-muted transition-colors group-hover:text-ink">
											{platform.description}
											<span aria-hidden="true" className="link-arrow">↗</span>
										</span>
									</a>
								</li>
							))}
						</ul>
					</div>
				</motion.div>

				<motion.form
					{...revealWith({ delay: 0.1 })}
					onSubmit={handleSubmit}
					noValidate
					className="print-hide col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7"
				>
					<div className="flex items-baseline justify-between gap-4 border-t border-rule-strong pt-5">
						<h3 className="font-display text-[2rem] leading-none text-ink">{contact.form.title}</h3>
						<p className="meta text-right text-subtle">{contact.form.helper}</p>
					</div>

					<div aria-hidden="true" className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0">
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
							transition={{ duration: 0.5, ease: "easeOut" }}
							className="mt-8 border-l-2 border-signal py-2 pl-6"
							role="status"
							aria-live="polite"
						>
							<p className="font-display text-[2rem] leading-tight text-ink">{t.successTitle}</p>
							<p className="mt-3 max-w-[48ch] text-muted">
								{t.successBefore}
								<a href="#projects" className="link-rule text-ink">
									{t.successProjects}
								</a>
								{t.successMiddle}
								<a href="#experience" className="link-rule text-ink">
									{t.successExperience}
								</a>
								.
							</p>
							<button type="button" onClick={resetForm} className="link-rule meta mt-6 text-ink">
								{t.sendAnother}
								<span aria-hidden="true" className="link-arrow">→</span>
							</button>
						</motion.div>
					) : (
						<>
							<div className="mt-8 grid gap-6 sm:grid-cols-2">
								<div>
									<label htmlFor="contact-intent" className={labelClass}>
										{t.intentLabel}
									</label>
									<div className="mt-2">
										<IntentSelect
											id="contact-intent"
											options={intents}
											value={form.intent}
											onChange={(v) => {
												setForm((prev) => ({ ...prev, intent: v }));
												if (submitAttempted) {
													const err = validateField("intent", v);
													setFieldErrors((prev) => ({ ...prev, intent: err ?? undefined }));
												}
											}}
											onBlur={handleBlur("intent")}
											placeholder={t.intentPlaceholder}
											required
											ariaInvalid={Boolean(fieldErrors.intent)}
											ariaDescribedBy={fieldErrors.intent ? "contact-intent-error" : undefined}
										/>
									</div>
									{renderFieldError("intent")}
								</div>
								<div>
									<label htmlFor="contact-name" className={labelClass}>
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
								<div className="sm:col-span-2">
									<label htmlFor="contact-email" className={labelClass}>
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
								<div className="sm:col-span-2">
									<label htmlFor="contact-message" className={labelClass}>
										{contact.form.message.label}
									</label>
									<textarea
										id="contact-message"
										value={form.message}
										onChange={handleChange("message")}
										onBlur={handleBlur("message")}
										{...ariaProps("message")}
										className={fieldClass("message", "min-h-[9.5rem] resize-y")}
										placeholder={contact.form.message.placeholder}
										required
										minLength={LIMITS.message.min}
										maxLength={LIMITS.message.max}
									/>
									<div className="mt-1 flex items-start justify-between gap-3">
										<div className="min-w-0 flex-1">{renderFieldError("message")}</div>
										<p className="meta shrink-0 pt-2 text-subtle tabular">
											{form.message.length}/{LIMITS.message.max}
										</p>
									</div>
								</div>
							</div>
							<div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<button type="submit" disabled={status === "sending"} className="btn btn-ink disabled:cursor-not-allowed disabled:opacity-60">
									{status === "sending" ? t.sending : contact.form.submit}
									<span aria-hidden="true" className="link-arrow">→</span>
								</button>
								{errorMsg ? (
									<p className="text-sm text-ink" role="status" aria-live="polite">
										{errorMsg}
									</p>
								) : null}
							</div>
						</>
					)}
				</motion.form>
			</div>
		</SectionShell>
	);
}
