import { ReactNode } from "react";
import { CopyLinkButton } from "../ui/CopyLinkButton";

type Tone = "amber" | "rose" | "violet" | "emerald" | "sky";
type Position =
	| "top"
	| "left"
	| "right"
	| "bottom"
	| "top-left"
	| "top-right"
	| "bottom-left"
	| "bottom-right";

type SectionShellProps = {
	id: string;
	children: ReactNode;
	className?: string;
	tone?: Tone;
	position?: Position;
};

const toneRgb: Record<Tone, string> = {
	amber: "251, 191, 36",
	rose: "244, 114, 182",
	violet: "167, 139, 250",
	emerald: "52, 211, 153",
	sky: "56, 189, 248",
};

const positionAt: Record<Position, string> = {
	top: "circle at top",
	left: "circle at left",
	right: "circle at right",
	bottom: "circle at bottom",
	"top-left": "circle at top left",
	"top-right": "circle at top right",
	"bottom-left": "circle at bottom left",
	"bottom-right": "circle at bottom right",
};

export function SectionShell({
	id,
	children,
	className,
	tone,
	position,
}: SectionShellProps) {
	const backgroundImage =
		tone && position
			? `radial-gradient(${positionAt[position]}, rgba(${toneRgb[tone]}, 0.18), transparent 65%)`
			: undefined;

	return (
		<section id={id} className={`group/section relative isolate w-full scroll-mt-32 ${className ?? ""}`}>
			{backgroundImage ? (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 -inset-y-24 -z-10"
					style={{ backgroundImage }}
				/>
			) : null}
			<CopyLinkButton sectionId={id} />
			<div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
				{children}
			</div>
		</section>
	);
}
