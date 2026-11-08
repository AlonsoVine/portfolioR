"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { RevealText } from "./RevealText";
import { EASE_OUT_EXPO } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  index?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function SectionHeading({ eyebrow, index, title, description, actions }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 text-center text-[var(--foreground)] md:text-left">
      {eyebrow && (
        <span
          className="inline-flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] md:justify-start"
          style={{ color: "var(--accent-warm)" }}
        >
          {index ? (
            <>
              <span className="font-display tabular text-sm tracking-[0.2em]">{index}</span>
              <motion.span
                aria-hidden="true"
                className="h-px w-10 origin-left bg-[var(--accent-warm)]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.1 }}
              />
            </>
          ) : null}
          <span className="opacity-90">{eyebrow}</span>
        </span>
      )}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[0.01em]">
            <RevealText text={title} />
          </h2>
          {description && (
            <motion.p
              className="mt-4 text-base text-muted md:text-lg"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.25 }}
            >
              {description}
            </motion.p>
          )}
        </div>
        {actions && <div className="flex justify-center md:justify-end">{actions}</div>}
      </div>
    </div>
  );
}
