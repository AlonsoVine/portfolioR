"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { useLanguage } from "@/i18n";
import { CONTACT_EMAIL } from "@/data/portfolio";
import { cn, withBasePath } from "@/lib/utils";
import { downloadFile, goToSection, toggleRetro, toggleTheme } from "@/lib/siteActions";
import { SectionShell } from "../shared/SectionShell";
import { RuleDraw } from "../shared/RuleDraw";
import { ScrambleText } from "../shared/ScrambleText";

type Line = { id: number; kind: "in" | "out" | "muted" | "error" | "accent"; content: ReactNode };

const PROMPT = "~ $";
const strip = (text: string) =>
	text
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.toLowerCase()
		.trim();

/** Alias en los dos idiomas: el visitante escribe lo que le salga. */
const ALIASES: Record<string, string> = {
	help: "help", ayuda: "help", "?": "help",
	whoami: "whoami",
	ahora: "now", now: "now",
	ls: "ls", dir: "ls",
	cd: "cd",
	git: "git",
	log: "git",
	stack: "stack", skills: "stack", herramientas: "stack", tools: "stack",
	proyectos: "projects", projects: "projects",
	formacion: "education", education: "education",
	experiencia: "git", experience: "git",
	contacto: "contact", contact: "contact",
	cv: "cv",
	tema: "theme", theme: "theme",
	idioma: "lang", lang: "lang", language: "lang",
	retro: "retro",
	clear: "clear", cls: "clear",
	sudo: "sudo", rm: "sudo",
	exit: "exit", quit: "exit",
	echo: "echo",
	date: "date", fecha: "date",
	pwd: "pwd",
};

export function Terminal() {
	const { dict, lang, setLang } = useLanguage();
	const t = dict.ui.terminal;
	const reduce = useReducedMotion();
	const shellRef = useRef<HTMLDivElement>(null);
	const scrollRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const inView = useInView(shellRef, { once: true, amount: 0.4 });
	const [lines, setLines] = useState<Line[]>([]);
	const [value, setValue] = useState("");
	const [history, setHistory] = useState<string[]>([]);
	const [cursor, setCursor] = useState(-1);
	const booted = useRef(false);
	const counter = useRef(0);

	const sections = useMemo(
		() =>
			dict.nav.links
				.filter((l) => l.href !== "#hero")
				.map((l) => ({ id: l.href.replace("#", ""), name: strip(l.label).replace(/\s+/g, "-") })),
		[dict.nav.links],
	);

	const push = useCallback((kind: Line["kind"], content: ReactNode) => {
		counter.current += 1;
		const id = counter.current;
		setLines((prev) => [...prev, { id, kind, content }]);
	}, []);

	const run = useCallback(
		(raw: string) => {
			const input = raw.trim();
			push("in", input);
			if (!input) return;
			const [head, ...args] = input.split(/\s+/);
			const cmd = ALIASES[strip(head)];
			const arg = strip(args.join(" "));
			const current = dict.experiences.find((e) => /actual|present/i.test(e.period)) ?? dict.experiences[0];

			switch (cmd) {
				case "help":
					push(
						"out",
						<span className="grid grid-cols-[minmax(9rem,auto)_1fr] gap-x-6">
							{t.help.map(([name, desc]) => (
								<Fragment key={name}>
									<span className="text-ink">{name}</span>
									<span className="text-subtle">{desc}</span>
								</Fragment>
							))}
						</span>,
					);
					break;
				case "whoami":
					push("out", <><span className="text-ink">{dict.hero.title}</span>{` — ${dict.hero.role}`}<br />{dict.hero.location}</>);
					break;
				case "now":
					push("out", <><span className="text-ink">{current.title}</span><br />{`${current.company} · ${current.period}`}</>);
					break;
				case "pwd":
					push("out", "/portfolioR");
					break;
				case "ls":
					push(
						"out",
						<span className="flex flex-wrap gap-x-6 gap-y-1">
							{sections.map((s) => (
								<span key={s.id} className="text-ink">{s.name}/</span>
							))}
							<span>cv.pdf</span>
						</span>,
					);
					break;
				case "cd": {
					const target = sections.find((s) => s.name.startsWith(arg) && arg) ?? (arg === "~" || arg === "" ? { id: "hero", name: "~" } : undefined);
					if (!target) {
						push("error", t.noSection.replace("{list}", sections.map((s) => s.name).join(" · ")));
						break;
					}
					push("accent", t.moved.replace("{section}", target.name));
					goToSection(target.id);
					break;
				}
				case "git":
					push(
						"out",
						<span className="block">
							{dict.experiences.map((e, i) => (
								<span key={`${e.company}-${e.period}`} className="grid grid-cols-[1.25rem_1fr] gap-x-2">
									<span className={cn(i === 0 ? "text-signal" : "text-subtle")} aria-hidden="true">{i === 0 ? "●" : "○"}</span>
									<span>
										<span className="text-ink">{e.company}</span>
										<span className="text-subtle">{` · ${e.period}`}</span>
										<br />
										{e.title}
									</span>
								</span>
							))}
						</span>,
					);
					break;
				case "stack": {
					const groups = arg ? dict.skills.cards.filter((c) => strip(c.title).includes(arg)) : dict.skills.cards;
					if (!groups.length) {
						push("error", t.noSection.replace("{list}", dict.skills.cards.map((c) => strip(c.title).split(" ")[0]).join(" · ")));
						break;
					}
					push(
						"out",
						<span className="block space-y-2">
							{groups.map((g) => (
								<span key={g.title} className="block">
									<span className="text-ink">{g.title}</span>
									<br />
									{g.items.join(" · ")}
								</span>
							))}
						</span>,
					);
					break;
				}
				case "projects":
					push(
						"out",
						<span className="block space-y-1">
							{dict.projects.items.map((p) => (
								<span key={p.title} className="block">
									<span className="text-ink">{p.title}</span>
									{p.links.demo ? (
										<> · <a href={p.links.demo} target="_blank" rel="noreferrer" className="link-rule">demo ↗</a></>
									) : null}
									{" · "}
									<a href={p.links.code} target="_blank" rel="noreferrer" className="link-rule">{dict.projects.codeLabel.toLowerCase()} ↗</a>
								</span>
							))}
						</span>,
					);
					break;
				case "education":
					push(
						"out",
						<span className="block">
							{dict.education.items.map((e) => (
								<span key={e.title} className="grid grid-cols-[4.5rem_1fr] gap-x-3">
									<span className="tabular text-subtle">{e.dates.match(/\d{4}/g)?.pop() ?? ""}</span>
									<span>{e.title}</span>
								</span>
							))}
						</span>,
					);
					break;
				case "contact":
					push(
						"out",
						<span className="block">
							<a href={`mailto:${CONTACT_EMAIL}`} className="link-rule text-ink">{CONTACT_EMAIL}</a>
							{dict.socialLinks.map((s) => (
								<span key={s.href} className="block">
									<a href={s.href} target="_blank" rel="noreferrer" className="link-rule">{s.label} ↗</a>
								</span>
							))}
						</span>,
					);
					break;
				case "cv": {
					const href = dict.hero.ctas.secondary.href;
					push("accent", t.downloading.replace("{file}", href.split("/").pop() ?? "cv.pdf"));
					downloadFile(withBasePath(href));
					break;
				}
				case "theme": {
					const next = toggleTheme();
					push("accent", t.themeSet.replace("{mode}", next === "dark" ? dict.ui.theme.dark : dict.ui.theme.light));
					break;
				}
				case "lang":
					push("accent", t.langSet);
					setLang(lang === "es" ? "en" : "es");
					break;
				case "retro":
					toggleRetro();
					push("accent", t.retro);
					break;
				case "clear":
					setLines([]);
					break;
				case "sudo":
					push("error", t.denied);
					break;
				case "exit":
					push("muted", t.exit);
					break;
				case "echo":
					push("out", args.join(" "));
					break;
				case "date":
					push("out", new Intl.DateTimeFormat(dict.ui.locale, { dateStyle: "full", timeStyle: "short", timeZone: "Europe/Madrid" }).format(new Date()));
					break;
				default:
					push("error", t.notFound.replace("{cmd}", head));
			}
		},
		[dict, lang, push, sections, setLang, t],
	);

	// Arranque: escribe `whoami` letra a letra la primera vez que la terminal entra en pantalla
	const runRef = useRef(run);
	useEffect(() => {
		runRef.current = run;
	}, [run]);
	const hintRef = useRef(t.hint);
	useEffect(() => {
		hintRef.current = t.hint;
	}, [t.hint]);

	useEffect(() => {
		if (!inView || booted.current) return;
		booted.current = true;
		const demo = "whoami";
		const finish = () => {
			runRef.current(demo);
			push("muted", hintRef.current);
		};
		if (reduce) {
			finish();
			return;
		}
		let i = 0;
		const timers: number[] = [];
		const step = () => {
			i += 1;
			setValue(demo.slice(0, i));
			if (i < demo.length) timers.push(window.setTimeout(step, 70 + Math.random() * 60));
			else
				timers.push(
					window.setTimeout(() => {
						setValue("");
						finish();
					}, 260),
				);
		};
		timers.push(window.setTimeout(step, 500));
		return () => timers.forEach((id) => window.clearTimeout(id));
	}, [inView, reduce, push]);

	useEffect(() => {
		const el = scrollRef.current;
		if (el) el.scrollTop = el.scrollHeight;
	}, [lines]);

	const onSubmit = (event: FormEvent) => {
		event.preventDefault();
		run(value);
		if (value.trim()) setHistory((prev) => [value.trim(), ...prev].slice(0, 30));
		setCursor(-1);
		setValue("");
	};

	const onKey = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "ArrowUp" && history.length) {
			event.preventDefault();
			const next = Math.min(cursor + 1, history.length - 1);
			setCursor(next);
			setValue(history[next]);
		} else if (event.key === "ArrowDown") {
			event.preventDefault();
			const next = cursor - 1;
			setCursor(Math.max(next, -1));
			setValue(next >= 0 ? history[next] : "");
		} else if (event.key === "Tab" && value.trim()) {
			const typed = strip(value);
			const names = [...Object.keys(ALIASES), ...sections.map((s) => `cd ${s.name}`)];
			const hit = names.find((n) => n.startsWith(typed) && n !== typed);
			if (hit) {
				event.preventDefault();
				setValue(hit);
			}
		} else if (event.key === "l" && event.ctrlKey) {
			event.preventDefault();
			setLines([]);
		}
	};

	return (
		<SectionShell id="terminal" className="pt-8 pb-24 lg:pb-32 print:hidden">
			<RuleDraw />
			<div className="grid-page gap-y-8 pt-5">
				<div className="col-span-4 md:col-span-8 lg:col-span-3">
					<p className="meta text-subtle"><ScrambleText text={t.eyebrow} /></p>
					<h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[0.95] text-ink">{t.title}</h2>
					<p className="mt-4 max-w-[38ch] text-muted">{t.description}</p>
				</div>

				<div
					ref={shellRef}
					className="terminal col-span-4 border border-rule-strong bg-surface md:col-span-8 lg:col-span-9"
					onClick={(event) => {
						if (!(event.target instanceof HTMLAnchorElement) && !window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
					}}
				>
					<div className="flex items-center gap-3 border-b border-rule px-4 py-2.5">
						<span aria-hidden="true" className="flex gap-1.5">
							<span className="h-2.5 w-2.5 border border-rule-strong" />
							<span className="h-2.5 w-2.5 border border-rule-strong" />
							<span className="h-2.5 w-2.5 bg-signal" />
						</span>
						<p className="meta flex-1 text-center text-subtle">{t.window}</p>
						<span aria-hidden="true" className="meta text-subtle">zsh</span>
					</div>

					<div ref={scrollRef} className="h-[22rem] overflow-y-auto px-4 py-4 font-mono text-[0.85rem] leading-relaxed text-muted sm:px-6 sm:text-[0.9rem]">
						<div role="log" aria-live="polite" aria-relevant="additions">
							{lines.map((line) => (
								<div
									key={line.id}
									className={cn(
										"terminal-line mb-1.5 break-words",
										line.kind === "in" && "mt-3 text-ink first:mt-0",
										line.kind === "muted" && "text-subtle",
										line.kind === "error" && "text-ink",
										line.kind === "accent" && "text-signal",
									)}
								>
									{line.kind === "in" ? (
										<>
											<span aria-hidden="true" className="text-signal">{PROMPT} </span>
											{line.content}
										</>
									) : line.kind === "error" ? (
										<>
											<span aria-hidden="true" className="text-subtle">! </span>
											{line.content}
										</>
									) : (
										line.content
									)}
								</div>
							))}
						</div>

						<form onSubmit={onSubmit} className="mt-3 flex items-baseline gap-2">
							<label htmlFor="terminal-input" className="text-signal">
								<span aria-hidden="true">{PROMPT}</span>
								<span className="sr-only">{t.inputLabel}</span>
							</label>
							<span className="relative flex-1">
								<input
									id="terminal-input"
									ref={inputRef}
									value={value}
									onChange={(event) => setValue(event.target.value)}
									onKeyDown={onKey}
									autoComplete="off"
									autoCapitalize="off"
									spellCheck={false}
									enterKeyHint="send"
									className="terminal-input w-full bg-transparent text-ink outline-none"
								/>
							</span>
						</form>
					</div>
				</div>
			</div>
		</SectionShell>
	);
}
