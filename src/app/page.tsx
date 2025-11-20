import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { SkillsGrid } from "@/components/sections/SkillsGrid";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import {
  aboutContent,
  education,
  experiences,
  heroContent,
  navLinks,
  projects,
  skillCards,
} from "@/data/portfolio";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.25),_transparent_55%)]" />
      <Header links={navLinks} />
      <main className="flex flex-col gap-6">
        <Hero {...heroContent} />
        <SkillsGrid groups={skillCards} />
        <About paragraphs={aboutContent.textBlocks} />
        <ExperienceTimeline experiences={experiences} />
        <ProjectsGrid projects={projects} />
        <Education items={education} />
        <Contact />
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
