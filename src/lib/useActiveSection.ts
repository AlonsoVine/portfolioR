"use client";

import { useEffect, useState } from "react";

export function useActiveSection(sectionIds: string[]): string | null {
	const [activeId, setActiveId] = useState<string | null>(null);
	const key = sectionIds.join(",");

	useEffect(() => {
		if (typeof window === "undefined") return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
				if (visible[0]) {
					setActiveId(visible[0].target.id);
				}
			},
			{
				rootMargin: "-40% 0px -50% 0px",
				threshold: [0, 0.25, 0.5, 0.75, 1],
			},
		);

		const elements = sectionIds
			.map((id) => document.getElementById(id))
			.filter((el): el is HTMLElement => el !== null);

		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, [key, sectionIds]);

	return activeId;
}
