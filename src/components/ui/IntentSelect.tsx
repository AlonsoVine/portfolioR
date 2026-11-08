"use client";

import { AnimatePresence, motion } from "framer-motion";
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

	const openList = () => {
		setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
		setOpen(true);
	};

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
				openList();
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
				onClick={() => (open ? setOpen(false) : openList())}
				onKeyDown={handleKeyDown}
				onBlur={(event) => {
					if (!panelRef.current?.contains(event.relatedTarget as Node)) {
						onBlur?.();
					}
				}}
				className="field flex items-center justify-between gap-2 text-left"
			>
				<span className={cn("truncate", selectedOption ? "" : "text-muted")}>
					{selectedOption?.label ?? placeholder}
				</span>
				<span aria-hidden="true" className={cn("meta shrink-0 text-subtle transition-transform duration-300", open && "rotate-180 text-ink")}>
					↓
				</span>
			</button>

			<AnimatePresence>
				{open ? (
					<motion.div
						ref={panelRef}
						initial={{ opacity: 0, y: -6, scale: 0.97 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.97 }}
						transition={{ duration: 0.18, ease: "easeOut" }}
						className="absolute inset-x-0 top-full z-30 -mt-px origin-top overflow-hidden rounded-[2px] border border-ink bg-paper"
						style={{ transformOrigin: "top center" }}
					>
						<ul
							id={listboxId}
							role="listbox"
							tabIndex={-1}
							aria-activedescendant={
								activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
							}
							className="max-h-72 overflow-auto"
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
											"flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-[0.95rem]",
											isActive ? "bg-surface text-ink" : "text-muted",
											isSelected && "text-ink",
										)}
									>
										<span className="truncate">{opt.label}</span>
										{isSelected ? (
											<span aria-hidden="true" className="signal-dot" />
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
