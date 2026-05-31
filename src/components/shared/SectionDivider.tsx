export function SectionDivider() {
	return (
		<div
			aria-hidden="true"
			className="mx-auto flex w-full max-w-sm items-center gap-4 px-4 py-2"
		>
			<span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/15" />
			<span
				className="text-[11px] tracking-[0.6em] text-white/30"
				style={{ fontFamily: "var(--font-cinzel)" }}
			>
				✦
			</span>
			<span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/15" />
		</div>
	);
}
