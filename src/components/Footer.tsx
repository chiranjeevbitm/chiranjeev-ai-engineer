import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const isDark =
    location.pathname === "/skills" || location.pathname === "/projects";

  return (
    <footer
      className={`w-full py-stack-lg border-t ${
        isDark
          ? "border-darkGlacier-border/20 bg-darkGlacier-surface/50"
          : "border-white/50 bg-white/40"
      } backdrop-blur-md`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop gap-gutter">
        <div
          className={`font-code-sm text-code-sm ${
            isDark ? "text-on-surface-variant" : "text-on-surface-variant"
          }`}
        >
          © 2024 Chiranjeev Kumar. Engineered for Intelligence.
        </div>
        <div className="flex gap-gutter">
          <a
            href="https://linkedin.com/in/chiranjeev-bitm"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-body-md text-body-md transition-colors ${
              isDark
                ? "text-on-surface-variant hover:text-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/chiranjeevbitm"
            target="_blank"
            rel="noopener noreferrer"
            className={`font-body-md text-body-md transition-colors ${
              isDark
                ? "text-on-surface-variant hover:text-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            GitHub
          </a>
          <a
            href="#"
            className={`font-body-md text-body-md transition-colors ${
              isDark
                ? "text-on-surface-variant hover:text-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Kaggle
          </a>
          <a
            href="mailto:chiranjeev@example.com"
            className={`font-body-md text-body-md transition-colors ${
              isDark
                ? "text-on-surface-variant hover:text-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}