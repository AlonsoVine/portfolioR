"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Configura framer-motion globalmente para respetar
 * prefers-reduced-motion del sistema operativo del usuario.
 * Aplica a todas las animaciones de framer dentro de su árbol.
 */
export function MotionGate({ children }: { children: ReactNode }) {
	return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
