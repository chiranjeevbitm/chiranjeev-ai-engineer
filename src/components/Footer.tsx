const LAST_UPDATED = "May 17, 2026";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { label: "LinkedIn", href: "https://linkedin.com/in/chiranjeev-kumar-07071997", followers: "1.9K+" },
    { label: "GitHub", href: "https://github.com/chiranjeevbitm", followers: "Open Source" },
    { label: "Kaggle", href: "https://kaggle.com/chiranjeevbit", followers: "Top 0.5%" },
    { label: "Medium", href: "https://medium.com/@chiranjeevkumar47", followers: "Blog" },
    { label: "Email", href: "mailto:chiranjeev@example.com", followers: "Contact" },
  ];

  return (
    <footer className="w-full py-stack-lg border-t backdrop-blur-md transition-colors border-white/50 bg-white/40 dark:border-[var(--border)] dark:bg-[var(--bg-surface)]/50">
      <div className="flex flex-col items-center max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop gap-3">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-gutter">
          <div className="text-center md:text-left">
            <div className="font-code-sm text-code-sm text-[var(--text-muted)]">
              © {currentYear} Chiranjeev Kumar. Production GenAI Specialist.
            </div>
            <div className="font-code-sm text-code-sm text-[var(--text-muted)]/60 text-xs mt-1">
              Dual Master's in AI/ML • NVIDIA Certified • Top 0.5% Kaggle
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-gutter">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 font-body-md text-body-md text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
              >
                {link.label}
                <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)]/40">
                  {link.followers}
                </span>
              </a>
            ))}
          </div>
        </div>
        {/* Last Updated Badge */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-white/5 border border-white/80 dark:border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="font-code-sm text-[10px] text-[var(--text-muted)]/70">
            Last updated: {LAST_UPDATED}
          </span>
        </div>
      </div>
    </footer>
  );
}
