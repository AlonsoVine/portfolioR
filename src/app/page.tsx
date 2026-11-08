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
import { SectionIndex } from "@/components/ui/SectionIndex";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <SkillsGrid />
        <About />
        <ExperienceTimeline />
        <ProjectsGrid />
        <Education />
        <Contact />
      </main>
      <SectionIndex />
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}
