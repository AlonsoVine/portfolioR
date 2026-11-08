"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useLanguage } from "@/i18n";
import { CONTACT_EMAIL } from "@/data/portfolio";
import { EASE_OUT_EXPO, cn, withBasePath } from "@/lib/utils";
import {
	OPEN_PALETTE_EVENT,
	copyText,
	downloadFile,
	goToSection,
	isTypingTarget,
	readTheme,
	toggleRetro,
	toggleTheme,
} from "@/lib/siteActions";
import { Portal, useInertOutside } from "../shared/Portal";

type Command = {
	id: string;
	group: "nav" | "actions" | "links";
	label: string;
	hint?: string;
	run: () => void | Promise<void>;
};

const normalize = (text: string) =>
	text
		.normalize("NFD")
		.replace(/\p{M}/gu, "")
		.toLowerCase();

/** Coincidencia por subsecuencia: «exp» encuentra «Experiencia», «cv pdf» encuentra «Descargar el CV en PDF». */
function matches(label: string, query: string) {
	const haystack = normalize(label);
	return normalize(query)
		.split(/\s+/)
		.filter(Boolean)
		.every((word) => {
			let i = 0;
			for (const ch of haystack) if (ch === word[i]) i += 1;
			return i === word.length;
		});
}

export function CommandPalette() {
	const { dict, lang, setLang } = useLanguage();
	const { palette } = dict.ui;
	const reduce = useReducedMotion();
	const [open, setOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [active, setActive] = useState(0);
	const [notice, setNotice] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);
	const listId = useId();
	useInertOutside(open);

	const close = useCallback(() => setOpen(false), []);
	const show = useCallback(() => {
		setQuery("");
		setActive(0);
		setNotice("");
		setOpen(true);
	}, []);

	useEffect(() => {
		const onKey = (event: KeyboardEvent) => {
			const combo = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
			if (combo) {
				event.preventDefault();
				if (open) close();
				else show();
				return;
			}
			if (event.key === "/" && !isTypingTarget(event.target) && !open) {
				event.preventDefault();
				show();
			}
		};
		const onOpen = () => show();
		window.addEventListener("keydown", onKey);
		window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
		return () => {
			window.removeEventListener("keydown", onKey);
			window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
		};
	}, [open, show, close]);

	useEffect(() => {
		if (!open) return;
		const id = window.requestAnimationFrame(() => inputRef.current?.focus());
		return () => window.cancelAnimationFrame(id);
	}, [open]);

	const commands = useMemo<Command[]>(() => {
		const nav = dict.nav.links.map((link, i) => ({
			id: `nav-${link.href}`,
			group: "nav" as const,
			label: link.label,
			hint: String(i).padStart(2, "0"),
			run: () => goToSection(link.href.replace("#", "")),
		}));
		const nextMode = typeof document !== "undefined" && readTheme() === "dark" ? dict.ui.theme.light : dict.ui.theme.dark;
		const actions: Command[] = [
			{ id: "terminal", group: "actions", label: palette.actions.terminal, hint: "$", run: () => {
				goToSection("terminal");
				window.setTimeout(() => document.getElementById("terminal-input")?.focus({ preventScroll: true }), 450);
			} },
			{ id: "theme", group: "actions", label: palette.actions.theme.replace("{mode}", nextMode.toLowerCase()), run: () => { toggleTheme(); } },
			{ id: "lang", group: "actions", label: palette.actions.lang, hint: lang === "es" ? "EN" : "ES", run: () => setLang(lang === "es" ? "en" : "es") },
			{ id: "copy", group: "actions", label: palette.actions.copyEmail, hint: CONTACT_EMAIL, run: async () => {
				const ok = await copyText(CONTACT_EMAIL);
				setNotice(ok ? palette.done.copied : palette.done.failed.replace("{email}", CONTACT_EMAIL));
			} },
			{ id: "cv", group: "actions", label: palette.actions.cv, hint: "PDF", run: () => downloadFile(withBasePath(dict.hero.ctas.secondary.href)) },
			{ id: "print", group: "actions", label: palette.actions.print, run: () => window.setTimeout(() => window.print(), 200) },
			{ id: "retro", group: "actions", label: palette.actions.retro, hint: "↑↑↓↓←→←→BA", run: toggleRetro },
			{ id: "top", group: "actions", label: palette.actions.top, run: () => goToSection("hero") },
		];
		const links: Command[] = dict.socialLinks.map((social) => ({
			id: `link-${social.href}`,
			group: "links",
			label: social.label,
			hint: "↗",
			run: () => {
				window.open(social.href, "_blank", "noopener,noreferrer");
			},
		}));
		return [...nav, ...actions, ...links];
		// `open` refresca la etiqueta del tema cada vez que se abre
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dict, lang, setLang, palette, open]);

	const visible = useMemo(() => (query ? commands.filter((c) => matches(c.label, query)) : commands), [commands, query]);
	const safeActive = Math.min(active, Math.max(visible.length - 1, 0));

	const execute = async (command: Command | undefined) => {
		if (!command) return;
		await command.run();
		if (command.id !== "copy") close();
	};

	const onInputKey = (event: ReactKeyboardEvent<HTMLInputElement>) => {
		if (event.key === "ArrowDown") {
			event.preventDefault();
			setActive((safeActive + 1) % Math.max(visible.length, 1));
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setActive((safeActive - 1 + visible.length) % Math.max(visible.length, 1));
		} else if (event.key === "Enter") {
			event.preventDefault();
			void execute(visible[safeActive]);
		} else if (event.key === "Escape") {
			event.preventDefault();
			close();
		} else if (event.key === "Tab") {
			event.preventDefault();
		}
	};

	useEffect(() => {
		document.getElementById(`${listId}-${safeActive}`)?.scrollIntoView({ block: "nearest" });
	}, [safeActive, listId]);

	const groups: Array<Command["group"]> = ["nav", "actions", "links"];
	let index = -1;

	return (
		<Portal>
			<AnimatePresence>
				{open ? (
					<motion.div
						key="palette"
						role="dialog"
						aria-modal="true"
						aria-label={palette.label}
						className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh] print:hidden"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduce ? 0 : 0.2 }}
					>
						<div aria-hidden="true" className="palette-scrim absolute inset-0" onClick={close} />
						<motion.div
							className="relative w-full max-w-[40rem] border border-rule-strong bg-surface"
							initial={reduce ? false : { y: -12, scale: 0.985 }}
							animate={{ y: 0, scale: 1 }}
							exit={reduce ? undefined : { y: -8, scale: 0.99 }}
							transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
						>
							<div className="flex items-center gap-3 border-b border-rule px-5">
								<span aria-hidden="true" className="font-mono text-signal">&gt;</span>
								<input
									ref={inputRef}
									value={query}
									onChange={(event) => {
										setQuery(event.target.value);
										setActive(0);
									}}
									onKeyDown={onInputKey}
									role="combobox"
									aria-expanded="true"
									aria-controls={listId}
									aria-activedescendant={visible.length ? `${listId}-${safeActive}` : undefined}
									aria-autocomplete="list"
									aria-label={palette.placeholder}
									placeholder={palette.placeholder}
									spellCheck={false}
									autoComplete="off"
									className="palette-input h-14 w-full bg-transparent font-mono text-[0.95rem] text-ink outline-none placeholder:text-subtle"
								/>
								<kbd className="meta hidden text-subtle sm:inline">esc</kbd>
							</div>

							<ul id={listId} role="listbox" aria-label={palette.label} className="max-h-[min(60vh,26rem)] overflow-y-auto py-2">
								{groups.map((group) => {
									const items = visible.filter((c) => c.group === group);
									if (!items.length) return null;
									return (
										<li key={group} role="presentation">
											<p aria-hidden="true" className="meta px-5 pb-1 pt-3 text-subtle">
												{palette.groups[group]}
											</p>
											<ul role="presentation">
												{items.map((command) => {
													index += 1;
													const i = index;
													const selected = i === safeActive;
													return (
														<li
															key={command.id}
															id={`${listId}-${i}`}
															role="option"
															aria-selected={selected}
															onMouseMove={() => setActive(i)}
															onClick={() => void execute(command)}
															className={cn(
																"relative flex cursor-pointer items-baseline gap-4 px-5 py-2.5",
																selected ? "text-ink" : "text-muted",
															)}
														>
															<span aria-hidden="true" className={cn("palette-bar absolute inset-y-1 left-0 w-0.5 bg-signal", selected ? "opacity-100" : "opacity-0")} />
															<span className="flex-1">{command.label}</span>
															{command.hint ? <span className="meta shrink-0 text-subtle">{command.hint}</span> : null}
														</li>
													);
												})}
											</ul>
										</li>
									);
								})}
								{!visible.length ? <li className="px-5 py-6 text-muted">{palette.empty.replace("{q}", query)}</li> : null}
							</ul>

							<div className="flex items-center justify-between gap-4 border-t border-rule px-5 py-3">
								<p className="meta text-subtle">{palette.footer}</p>
								<p role="status" aria-live="polite" className="meta text-signal">
									{notice}
								</p>
							</div>
						</motion.div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</Portal>
	);
}
