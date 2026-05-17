import { useRef, useEffect, useCallback, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import HomeSection from "./HomeSection";
import ExperienceSection from "./ExperienceSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import Footer from "../components/Footer";

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

    // Use passive observer - no scroll interference, just track position
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

    const sections = container.querySelectorAll<HTMLElement>("[data-section]");
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  // Track scroll position for ScrollToTop button
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      setScrollTopVisible(container.scrollTop > 400);
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const section = container.children[index] as HTMLElement;
    if (section) {
      // Account for fixed navbar height (80px desktop, 64px mobile)
      const navbarH = window.innerWidth < 768 ? 64 : 80;
      const top = section.getBoundingClientRect().top + container.scrollTop - navbarH;
      container.scrollTo({ top, behavior: "smooth" });
      setActiveSection(SECTION_NAMES[index]);
      window.history.replaceState(null, "", `#${SECTION_NAMES[index]}`);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  const handleSectionNav = (section: string) => {
    const idx = SECTION_NAMES.indexOf(section);
    if (idx >= 0) scrollToSection(idx);
  };

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto relative"
    >
      <div className="snap-start min-h-screen" id="home" data-section>
        <HomeSection onNavigate={handleSectionNav} onOpenResume={onOpenResume} />
      </div>
      <div className="snap-start min-h-screen" id="experience" data-section>
        <ExperienceSection />
      </div>
      <div className="snap-start min-h-screen" id="skills" data-section>
        <SkillsSection onOpenResume={onOpenResume} />
      </div>
      <div className="snap-start min-h-screen" id="projects" data-section>
        <ProjectsSection />
      </div>
      {/* Footer inside snap container */}
      <div className="snap-start" data-section>
        <Footer />
      </div>

      {/* Scroll to Top Button (^) - inside container so it's visible */}
      <AnimatePresence>
        {scrollTopVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-110 active:scale-95 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}