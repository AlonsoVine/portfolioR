'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "../shared/SectionHeading";
import { SectionShell } from "../shared/SectionShell";
import { Project } from "@/data/portfolio";
import { scrollRevealConfig } from "@/lib/utils";

type ProjectsGridProps = {
  projects: Project[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  return (
    <SectionShell id="projects">
      <SectionHeading
        eyebrow="Casos"
        title="Proyectos destacados"
        description="Cards preparadas para mockups con efecto hover: elevación, tilt suave, zoom de imagen y chips animados."
      />
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            {...scrollRevealConfig}
            transition={{ delay: index * 0.08 }}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl surface-card shadow-[0_30px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_120px_rgba(251,191,36,0.35)]"
          >
            <div className="relative overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={800}
                className="h-60 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent opacity-80" />
            </div>
            <div className="flex flex-1 flex-col gap-6 p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-subtle">Proyecto</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--foreground)]">{project.title}</h3>
                <p className="mt-3 text-base text-muted">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-full border-soft bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.3em] text-subtle transition-all duration-300 group-hover:border-strong"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-4 text-sm font-semibold">
                <a
                  href={project.links.demo}
                  className="inline-flex items-center gap-2 rounded-full border-soft px-5 py-2 text-[var(--foreground)] transition-colors duration-300 hover:border-strong"
                >
                  View Demo
                </a>
                <a
                  href={project.links.code}
                  className="inline-flex items-center gap-2 rounded-full border-soft px-5 py-2 text-muted transition-colors duration-300 hover:border-strong hover:text-[var(--foreground)]"
                >
                  View Code
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}

