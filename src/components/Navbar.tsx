import { useState, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  onOpenResume: () => void;
  activeSection?: string;
}

const navLinks = [
  { section: "home", label: "Home" },
  { section: "experience", label: "Experience" },
  { section: "skills", label: "Skills" },
  { section: "projects", label: "Projects" },
];

const SECTION_NAMES = ["home", "experience", "skills", "projects"];

export default function Navbar({ onOpenResume, activeSection }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  const scrollToSection = (section: string) => {
    const container = document.querySelector(".snap-y") as HTMLElement;
    if (!container) {
      window.location.hash = section;
      return;
    }
    const idx = SECTION_NAMES.indexOf(section);
    const el = container.children[idx] as HTMLElement;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", "#" + section);
    }
    setMobileOpen(false);
  };

  const isActive = useCallback(
    (section: string) => activeSection === section,
    [activeSection]
  );

  return (
    <header className="fixed top-0 w-full z-50 h-20 backdrop-blur-xl border-b transition-all duration-300 bg-white/70 border-gray-200/50 dark:bg-[#121212]/90 dark:border-[#121212]/80">
      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full">
        <button
          onClick={() => scrollToSection("home")}
          className="font-headline-lg text-headline-lg font-bold tracking-tighter text-[#0f172a] dark:text-[#e5e2e1]"
        >
          Chiranjeev Kumar
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-gutter">
          {navLinks.map((link) => (
            <div key={link.section} className="relative flex flex-col items-center">
              <button
                onClick={() => scrollToSection(link.section)}
                className={`font-label-caps text-label-caps transition-all duration-200 pb-1 ${
                  isActive(link.section)
                    ? "text-[#0ea5e9] dark:text-[#d0bcff]"
                    : "text-[#475569] hover:text-[#0ea5e9] dark:text-[#cbc3d7] dark:hover:text-[#d0bcff]"
                }`}
              >
                {link.label}
              </button>
              <span
                className={`absolute -bottom-1 left-0 w-full h-[2px] rounded-full transition-all duration-200 ${
                  isActive(link.section)
                    ? "bg-[#0ea5e9] dark:bg-[#d0bcff] scale-x-100"
                    : "bg-transparent scale-x-0"
                }`}
              />
            </div>
          ))}
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-xl transition-all bg-gray-100/80 border border-gray-200 text-[#475569] hover:text-[#0ea5e9] hover:bg-gray-200 dark:bg-white/5 dark:border-white/10 dark:text-[#cbc3d7] dark:hover:text-[#d0bcff] dark:hover:bg-white/10"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="material-symbols-outlined">
              {isDark ? "light_mode" : "dark_mode"}
            </span>
          </button>
          <button
            onClick={onOpenResume}
            className="ml-2 px-6 py-2 font-label-caps text-label-caps rounded-xl transition-all active:scale-95 bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20 dark:bg-[#d0bcff] dark:text-[#3c0091] dark:shadow-lg dark:shadow-[#d0bcff]/20"
          >
            Resume
          </button>
        </nav>

        {/* Mobile menu button */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden flex items-center">
          <span className="material-symbols-outlined text-[#0ea5e9] dark:text-[#d0bcff]">
            {mobileOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden backdrop-blur-xl border-t bg-white/95 border-gray-200 dark:bg-[#121212]/95 dark:border-[#121212]/80">
          <div className="px-margin-mobile py-stack-md space-y-stack-sm">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`block font-label-caps text-label-caps py-2 w-full text-left transition-colors ${
                  isActive(link.section)
                    ? "text-[#0ea5e9] dark:text-[#d0bcff]"
                    : "text-[#475569] dark:text-[#cbc3d7]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMobileOpen(false); onOpenResume(); }}
              className="block text-center w-full px-6 py-2 bg-[#0ea5e9] text-white font-label-caps text-label-caps rounded-xl dark:bg-[#d0bcff] dark:text-[#3c0091]"
            >
              Resume
            </button>
          </div>
        </div>
      )}
    </header>
  );
}