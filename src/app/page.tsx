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
import { SectionDivider } from "@/components/shared/SectionDivider";

export default function Home() {
  return (
    <div className="relative min-h-screen text-[var(--foreground)] transition-colors">
      <Header />
      <main id="main-content" className="flex flex-col gap-6">
        <Hero />
        <SectionDivider />
        <SkillsGrid />
        <SectionDivider />
        <About />
        <SectionDivider />
        <ExperienceTimeline />
        <SectionDivider />
        <ProjectsGrid />
        <SectionDivider />
        <Education />
        <SectionDivider />
        <Contact />
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
