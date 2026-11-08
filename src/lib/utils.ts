import type { Transition } from "framer-motion";

export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_REVEAL: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export const scrollRevealConfig = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: EASE_REVEAL } as Transition,
};

/** Variante de `scrollRevealConfig` con retardo y, opcionalmente, entrada lateral. */
export function revealWith({ delay = 0, x = 0, duration = 0.7 }: { delay?: number; x?: number; duration?: number } = {}) {
  return {
    ...scrollRevealConfig,
    initial: { ...scrollRevealConfig.initial, x },
    whileInView: { ...scrollRevealConfig.whileInView, x: 0 },
    transition: { ...scrollRevealConfig.transition, duration, delay } as Transition,
  };
}

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBasePath(path: string): string {
  return `${basePath}${path}`;
}
