"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type IntentOption = {
	value: string;
	label: string;
};

type Props = {
	id?: string;
	options: IntentOption[];
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	placeholder: string;
	ariaInvalid?: boolean;
	ariaDescribedBy?: string;
	required?: boolean;
};

export function IntentSelect({
	id,
	options,
	value,
	onChange,
	onBlur,
	placeholder,
	ariaInvalid,
	ariaDescribedBy,
	required,
}: Props) {
	const [open, setOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);
	const optionRefs = useRef<(HTMLLIElement | null)[]>([]);

	const selectedIndex = options.findIndex((o) => o.value === value);
	const selectedOption = options[selectedIndex];
	const listboxId = id ? `${id}-listbox` : undefined;

	useEffect(() => {
		if (!open) return;
		const handler = (event: MouseEvent) => {
			const target = event.target as Node;
			if (
				triggerRef.current &&
				!triggerRef.current.contains(target) &&
				panelRef.current &&
				!panelRef.current.contains(target)
			) {
				setOpen(false);
				onBlur?.();
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open, onBlur]);

	useEffect(() => {
		if (open) {
			const idx = selectedIndex >= 0 ? selectedIndex : 0;
			setActiveIndex(idx);
		}
	}, [open, selectedIndex]);

	useEffect(() => {
		if (open && activeIndex >= 0) {
			optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
		}
	}, [open, activeIndex]);

	const handleSelect = (val: string) => {
		onChange(val);
		setOpen(false);
		triggerRef.current?.focus();
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
		if (!open) {
			if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				setOpen(true);
			}
			return;
		}
		switch (event.key) {
			case "Escape":
				event.preventDefault();
				setOpen(false);
				triggerRef.current?.focus();
				onBlur?.();
				break;
			case "ArrowDown":
				event.preventDefault();
				setActiveIndex((i) => Math.min(i + 1, options.length - 1));
				break;
			case "ArrowUp":
				event.preventDefault();
				setActiveIndex((i) => Math.max(i - 1, 0));
				break;
			case "Home":
				event.preventDefault();
				setActiveIndex(0);
				break;
			case "End":
				event.preventDefault();
				setActiveIndex(options.length - 1);
				break;
			case "Enter":
			case " ":
				event.preventDefault();
				if (activeIndex >= 0) handleSelect(options[activeIndex].value);
				break;
		}
	};

	return (
		<div className="relative">
			<button
				ref={triggerRef}
				id={id}
				type="button"
				role="combobox"
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listboxId}
				aria-invalid={ariaInvalid}
				aria-describedby={ariaDescribedBy}
				aria-required={required}
				onClick={() => setOpen((prev) => !prev)}
				onKeyDown={handleKeyDown}
				onBlur={(event) => {
					if (!panelRef.current?.contains(event.relatedTarget as Node)) {
						onBlur?.();
					}
				}}
				className={cn(
					"flex w-full items-center justify-between gap-2 rounded-xl border bg-white/5 px-4 py-2.5 text-left text-sm text-[var(--foreground)] outline-none transition-all hover:bg-white/10 focus:bg-white/10",
					ariaInvalid
						? "border-rose-400/70 focus:border-rose-400"
						: "border-soft focus:border-amber-300",
				)}
			>
				<span className={cn("truncate", selectedOption ? "" : "text-[var(--foreground)]/40")}>
					{selectedOption?.label ?? placeholder}
				</span>
				<ChevronDown
					className={cn(
						"h-4 w-4 shrink-0 text-[var(--foreground)]/60 transition-transform duration-300",
						open && "rotate-180 text-[var(--accent-warm)]",
					)}
					aria-hidden="true"
				/>
			</button>

			<AnimatePresence>
				{open ? (
					<motion.div
						ref={panelRef}
						initial={{ opacity: 0, y: -6, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.97 }}
						transition={{ duration: 0.18, ease: "easeOut" }}
						className="absolute inset-x-0 top-full z-30 mt-2 origin-top overflow-hidden rounded-2xl border border-soft/70 bg-[var(--surface-panel)] shadow-[0_24px_60px_rgba(15,23,42,0.55)] backdrop-blur-xl"
						style={{ transformOrigin: "top center" }}
					>
						<ul
							id={listboxId}
							role="listbox"
							tabIndex={-1}
							aria-activedescendant={
								activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
							}
							className="max-h-72 overflow-auto p-1.5"
						>
							{options.map((opt, idx) => {
								const isSelected = opt.value === value;
								const isActive = idx === activeIndex;
								return (
									<li
										key={opt.value}
										id={`${id}-option-${idx}`}
										role="option"
										aria-selected={isSelected}
										ref={(el) => {
											optionRefs.current[idx] = el;
										}}
										onClick={() => handleSelect(opt.value)}
										onMouseEnter={() => setActiveIndex(idx)}
										className={cn(
											"flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
											isActive
												? "bg-white/10 text-[var(--foreground)]"
												: "text-[var(--foreground)]/80",
											isSelected && !isActive && "text-[var(--foreground)]",
										)}
									>
										<span className="truncate">{opt.label}</span>
										{isSelected ? (
											<Check
												className="h-4 w-4 shrink-0 text-[var(--accent-warm)]"
												aria-hidden="true"
											/>
										) : null}
									</li>
								);
							})}
						</ul>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	);
}
