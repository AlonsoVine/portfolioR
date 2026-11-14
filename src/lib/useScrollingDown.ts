"use client";

import { useEffect, useState } from "react";

/**
 * En pantallas estrechas, `true` mientras el usuario baja leyendo: los botones flotantes se apartan para no tapar
 * el texto y vuelven al subir o al pararse. En pantallas anchas siempre es `false`.
 */
export function useScrollingDown(maxWidth = 640) {
	const [down, setDown] = useState(false);

	useEffect(() => {
		let prev = window.scrollY;
		let idle = 0;
		const onScroll = () => {
			const y = window.scrollY;
			if (window.innerWidth < maxWidth) {
				if (y > prev + 4) setDown(true);
				else if (y < prev - 4) setDown(false);
				window.clearTimeout(idle);
				idle = window.setTimeout(() => setDown(false), 900);
			}
			prev = y;
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.clearTimeout(idle);
		};
	}, [maxWidth]);

	return down;
}
