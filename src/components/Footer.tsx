import { useTheme } from "../context/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className={`w-full py-stack-lg border-t backdrop-blur-md transition-colors ${
        isDark
          ? "border-[var(--border)] bg-[var(--bg-surface)]/50"
          : "border-white/50 bg-white/40"
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop gap-gutter">
        <div className="font-code-sm text-code-sm text-[var(--text-muted)]">
          © 2024 Chiranjeev Kumar. Engineered for Intelligence.
        </div>
        <div className="flex gap-gutter">
          <a
            href="https://linkedin.com/in/chiranjeev-bitm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body-md text-body-md text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/chiranjeevbitm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body-md text-body-md text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="#"
            className="font-body-md text-body-md text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Kaggle
          </a>
          <a
            href="mailto:chiranjeev@example.com"
            className="font-body-md text-body-md text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
