'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { GithubIcon, Linkedin, Twitter } from "lucide-react";
import { socialLinks } from "@/data/portfolio";

const socialIconMap = {
  linkedin: Linkedin,
  github: GithubIcon,
  twitter: Twitter,
} as const;

type HeroProps = {
  title: string;
  subtitle: string;
  ctas: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

export function Hero({ title, subtitle, ctas }: HeroProps) {
  const { scrollY } = useScroll();
  const translate = useTransform(scrollY, [0, 400], [0, -40]);
  const rotate = useTransform(scrollY, [0, 400], [0, -3]);

  return (
    <div id="hero" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.25),_transparent_55%)]" />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 pb-28 pt-40 text-center text-[var(--foreground)] sm:px-6 lg:px-8">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border-soft bg-white/10 px-6 py-2 text-xs uppercase tracking-[0.45em]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Desarrollador y Analista
        </motion.div>
        <motion.h1
          className="max-w-4xl text-4xl font-semibold leading-tight tracking-wide sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="max-w-3xl text-lg text-muted"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.85 }}
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={ctas.primary.href}
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 px-8 py-3 text-base font-semibold text-slate-900 shadow-[0_20px_60px_rgba(248,212,128,0.35)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {ctas.primary.label}
            <span className="absolute inset-0 rounded-full bg-white/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </a>
          <a
            href={ctas.secondary.href}
            className="inline-flex items-center gap-2 rounded-full border-soft px-8 py-3 text-base font-semibold text-[var(--foreground)] transition-colors duration-300 hover:border-strong"
          >
            {ctas.secondary.label}
          </a>
        </motion.div>
        <motion.div
          style={{ y: translate, rotate }}
          className="relative mt-14 w-full max-w-3xl rounded-[32px] surface-card p-3 shadow-[0_20px_90px_rgba(15,23,42,0.45)] backdrop-blur-2xl"
        >
          <div className="relative overflow-hidden rounded-[24px] border-soft bg-gradient-to-b from-slate-900 to-slate-950">
            <Image
              src="/images/profile.png"
              alt="Alonso Viñé - Desarrollador y Analista"
              width={1200}
              height={1200}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </motion.div>
        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {socialLinks.map((social) => {
            const Icon = socialIconMap[social.icon];
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              className="group inline-flex h-12 w-12 items-center justify-center rounded-full border-soft text-[var(--foreground)] transition-all duration-300 hover:-translate-y-1 hover:border-strong"
              >
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

