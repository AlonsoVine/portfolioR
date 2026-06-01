export function SectionDivider() {
	return (
		<div
			aria-hidden="true"
			className="mx-auto flex w-full max-w-sm items-center gap-4 px-4 py-2 print:hidden"
		>
			<span
				className="h-px flex-1"
				style={{
					backgroundImage:
						"linear-gradient(to right, transparent, var(--divider-line))",
				}}
			/>
			<span
				className="text-[11px] tracking-[0.6em]"
				style={{
					fontFamily: "var(--font-cinzel)",
					color: "var(--divider-ornament)",
				}}
			>
				✦
			</span>
			<span
				className="h-px flex-1"
				style={{
					backgroundImage:
						"linear-gradient(to left, transparent, var(--divider-line))",
				}}
			/>
		</div>
	);
}
