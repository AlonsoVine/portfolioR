import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
	id: string;
	children: ReactNode;
	className?: string;
};

export function SectionShell({ id, children, className }: SectionShellProps) {
	return (
		<section id={id} className={cn("relative w-full scroll-mt-16", className)}>
			<div className="page">{children}</div>
		</section>
	);
}
