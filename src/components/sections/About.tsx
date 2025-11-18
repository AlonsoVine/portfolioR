'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { scrollRevealConfig } from "@/lib/utils";

type AboutProps = {
  paragraphs: string[];
};

export function About({ paragraphs }: AboutProps) {
  return (
    <SectionShell id="about">
      <SectionHeading
        eyebrow="Sobre mí"
        title="Conóceme mejor"
        description="Apasionado por la tecnología y siempre en busca de nuevas oportunidades para crecer profesionalmente."
      />
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div
          {...scrollRevealConfig}
          className="relative rounded-[32px] border-soft bg-gradient-to-b from-white/20 to-transparent p-2 shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl"
        >
          <div className="overflow-hidden rounded-[28px]">
            <Image
              src="/images/profile.png"
              alt="Alonso Viñé - Desarrollador y Analista"
              width={640}
              height={640}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -inset-1 rounded-[34px] border-soft opacity-70 blur-xl" />
        </motion.div>
        <motion.div
          {...scrollRevealConfig}
          transition={{ ...scrollRevealConfig.transition, delay: 0.15 }}
          className="relative rounded-3xl surface-card p-8 text-muted shadow-[0_30px_80px_rgba(15,23,42,0.35)]"
        >
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="flex flex-col gap-6">
            {paragraphs.map((text) => (
              <p key={text} className="text-lg leading-relaxed text-[var(--foreground)]">
                {text}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}

