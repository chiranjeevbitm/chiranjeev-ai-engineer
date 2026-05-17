import { useState, useCallback, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

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
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar appearance
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 w-full z-50 h-16 md:h-20 backdrop-blur-xl border-b transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-[#121212]/95 shadow-sm"
          : "bg-white/70 dark:bg-[#121212]/90"
      } border-gray-200/50 dark:border-[#121212]/80`}
    >
      <div className="flex justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full">
        <button
          onClick={() => scrollToSection("home")}
          className="font-headline-lg text-headline-lg font-bold tracking-tighter text-[#0f172a] dark:text-[#e5e2e1] truncate max-w-[200px] sm:max-w-none"
        >
          Chiranjeev Kumar
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-gutter">
          {navLinks.map((link) => (
            <div key={link.section} className="relative flex flex-col items-center">
              <button
                onClick={() => scrollToSection(link.section)}
                className={`px-3 py-2 font-label-caps text-label-caps rounded-lg transition-all duration-200 ${
                  isActive(link.section)
                    ? "text-[#0ea5e9] dark:text-[#d0bcff] bg-primary/5 dark:bg-[#d0bcff]/10"
                    : "text-[#475569] hover:text-[#0ea5e9] dark:text-[#cbc3d7] dark:hover:text-[#d0bcff]"
                }`}
              >
                {link.label}
              </button>
            </div>
          ))}
          {/* Theme Toggle */}
          <ThemeToggle />
          <button
            onClick={onOpenResume}
            className="ml-2 px-5 py-2 font-label-caps text-label-caps rounded-xl transition-all active:scale-95 bg-[#0ea5e9] text-white shadow-lg shadow-[#0ea5e9]/20 dark:bg-[#d0bcff] dark:text-[#3c0091] dark:shadow-lg dark:shadow-[#d0bcff]/20"
          >
            Resume
          </button>
        </nav>

        {/* Mobile hamburger button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative w-5 h-4">
              <span
                className={`absolute left-0 block w-full h-[2px] bg-[#0ea5e9] dark:bg-[#d0bcff] rounded-full transition-all duration-300 ${
                  mobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 block w-full h-[2px] bg-[#0ea5e9] dark:bg-[#d0bcff] rounded-full transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block w-full h-[2px] bg-[#0ea5e9] dark:bg-[#d0bcff] rounded-full transition-all duration-300 ${
                  mobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown with slide animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="backdrop-blur-xl border-t bg-white/95 border-gray-200 dark:bg-[#121212]/95 dark:border-[#121212]/80">
          <div className="px-margin-mobile py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.section}
                onClick={() => scrollToSection(link.section)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-label-caps text-label-caps transition-colors ${
                  isActive(link.section)
                    ? "text-[#0ea5e9] dark:text-[#d0bcff] bg-primary/5 dark:bg-[#d0bcff]/10"
                    : "text-[#475569] dark:text-[#cbc3d7] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => { setMobileOpen(false); onOpenResume(); }}
                className="block text-center w-full px-6 py-3 bg-[#0ea5e9] text-white font-label-caps text-label-caps rounded-xl dark:bg-[#d0bcff] dark:text-[#3c0091]"
              >
                Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}