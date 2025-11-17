'use client';

import { motion } from "framer-motion";
import { Braces, Cpu, Figma, MessageCircle, MousePointerClick, Server, Sparkles, Terminal } from "lucide-react";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { Skill } from "@/data/portfolio";
import { scrollRevealConfig } from "@/lib/utils";

const skillIconMap = {
  "mouse-pointer": MousePointerClick,
  braces: Braces,
  server: Server,
  terminal: Terminal,
  sparkles: Sparkles,
  figma: Figma,
  cpu: Cpu,
  "message-circle": MessageCircle,
} as const;

type SkillsGridProps = {
  skills: Skill[];
};

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <SectionShell id="skills" className="relative">
      <SectionHeading
        eyebrow="Stack"
        title="Skills & frameworks"
        description="Cards modulares con hover elevado, glow y placeholders de iconos. La etiqueta y categoría se actualizarán con el contenido definitivo."
      />
      <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((skill, index) => {
          const Icon = skillIconMap[skill.icon];
          return (
            <motion.div
              key={skill.label}
              {...scrollRevealConfig}
              transition={{ delay: index * 0.05, duration: 0.55 }}
              className="group relative overflow-hidden rounded-2xl surface-card p-6 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-200/10 via-transparent to-rose-300/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <Icon className="relative z-10 mb-6 h-8 w-8 text-muted transition-transform duration-300 group-hover:scale-110" />
              <div className="relative z-10">
                <p className="text-lg font-semibold text-[var(--foreground)]">{skill.label}</p>
                <span className="text-sm uppercase tracking-[0.3em] text-subtle">{skill.category}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}

