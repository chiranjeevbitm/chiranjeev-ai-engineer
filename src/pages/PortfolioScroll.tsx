import { useRef, useEffect, useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom";
import HomeSection from "./HomeSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";

const SECTION_NAMES = ["home", "experience", "skills", "projects"];

export default function PortfolioScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { onOpenResume, onActiveSectionChange } = useOutletContext<{
    onOpenResume: () => void;
    onActiveSectionChange: (section: string) => void;
  }>();
  const [activeSection, setActiveSection] = useState("home");

  // Sync active section to Layout → Navbar
  useEffect(() => {
    onActiveSectionChange(activeSection);
  }, [activeSection, onActiveSectionChange]);

  // Track active section via IntersectionObserver (no scroll interference)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.15) {
            const id = entry.target.getAttribute("id");
            if (id && SECTION_NAMES.includes(id)) {
              setActiveSection(id);
              window.history.replaceState(null, "", `#${id}`);
            }
          }
        }
      },
      { threshold: [0.15, 0.5] }
    );

    const sections = container.querySelectorAll<HTMLElement>(".snap-start");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const section = container.children[index] as HTMLElement;
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(SECTION_NAMES[index]);
      window.history.replaceState(null, "", `#${SECTION_NAMES[index]}`);
    }
  }, []);

  const handleSectionNav = (section: string) => {
    const idx = SECTION_NAMES.indexOf(section);
    if (idx >= 0) scrollToSection(idx);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth"
      style={{ scrollBehavior: "auto" }}
    >
      <div className="snap-start min-h-screen" id="home">
        <HomeSection onNavigate={handleSectionNav} onOpenResume={onOpenResume} />
      </div>
      <div className="snap-start min-h-screen" id="experience">
        <ExperienceSection />
      </div>
      <div className="snap-start min-h-screen" id="skills">
        <SkillsSection onOpenResume={onOpenResume} />
      </div>
      <div className="snap-start min-h-screen" id="projects">
        <ProjectsSection />
      </div>
    </div>
  );
}