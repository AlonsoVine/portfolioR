"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => undefined;

/** true tras hidratar; evita el patrón `useEffect(() => setMounted(true))`. */
export function useIsClient(): boolean {
	return useSyncExternalStore(
		noopSubscribe,
		() => true,
		() => false,
	);
}
