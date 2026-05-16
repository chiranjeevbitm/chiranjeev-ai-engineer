interface Props {
  onOpenResume?: () => void;
}

export default function SkillsSection({ onOpenResume }: Props) {
  const handleResume = onOpenResume || (() => {
    window.open("/Chiranjeev_GenAI_5+years.pdf", "_blank");
  });

  return (
    <div className="min-h-screen selection:bg-primary/30 bg-background text-on-background dark:bg-[#131313] text-[var(--on-surface)]">
      <main className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <section className="mb-stack-lg">
          <h1 className="font-headline-xl text-headline-xl mb-stack-sm bg-gradient-to-r from-on-surface to-on-surface-variant bg-clip-text text-transparent dark:from-on-surface dark:to-on-surface-variant">
            Technical Arsenal
          </h1>
          <p className="font-body-md text-body-md text-[var(--on-surface-variant)] max-w-2xl">
            A comprehensive breakdown of my expertise in Generative AI, Machine Learning, and Full-Stack Architecture.
          </p>
        </section>

        <section className="mb-stack-lg">
          <div className="glass-card-light p-stack-lg rounded-xl flex flex-col md:flex-row items-center justify-between gap-gutter relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50"></div>
            <div className="flex items-center gap-gutter">
              <div className="p-stack-md bg-primary/10 rounded-xl border border-primary/20">
                <span className="material-symbols-outlined text-primary dark:text-[#d0bcff] text-4xl">description</span>
              </div>
              <div>
                <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)]">Comprehensive Resume</h2>
                <p className="font-body-md text-body-md text-[var(--on-surface-variant)]">Last updated: Oct 2024 &bull; PDF Format (215 KB)</p>
              </div>
            </div>
            <button onClick={handleResume}
              className="w-full md:w-auto bg-primary dark:bg-[#d0bcff] text-on-primary dark:text-[#3c0091] px-10 py-5 rounded-xl font-label-caps text-label-caps text-center flex items-center justify-center gap-stack-sm hover:shadow-[0_0_30px_rgba(125,211,252,0.3)] transition-all hover:-translate-y-1">
              <span className="material-symbols-outlined">download</span> Download PDF Resume
            </button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg">
          <div className="md:col-span-8 glass-card-light p-stack-md rounded-xl glow-hover-light">
            <div className="flex items-center gap-stack-sm mb-stack-md">
              <span className="material-symbols-outlined text-primary dark:text-[#d0bcff]">psychology</span>
              <h3 className="font-headline-lg text-headline-lg text-[var(--on-surface)]">GenAI & LLMs</h3>
            </div>
            <div className="flex flex-wrap gap-stack-sm">
              {["Prompt Engineering","RAG Pipelines","LangChain","LangGraph","Agentic Systems","Multi-Agent Orchestration","Haystack","Hallucination Scoring"].map(s => (
                <span key={s} className="px-3 py-1 bg-primary/5 border border-primary/20 text-primary dark:text-[#d0bcff] dark:border-[#d0bcff]/20 font-code-sm text-code-sm rounded-lg hover:bg-primary/20 transition-colors">{s}</span>
              ))}
            </div>
            <div className="mt-stack-md border-t border-primary/10 pt-stack-sm dark:border-[#d0bcff]/10">
              <p className="font-body-md text-body-md text-on-surface-variant italic text-sm text-[var(--on-surface-variant)]">Specializing in production-grade multi-agent frameworks and MCP server/client deployments.</p>
            </div>
          </div>

          <div className="md:col-span-4 glass-card-light p-stack-md rounded-xl glow-hover-light">
            <div className="flex items-center gap-stack-sm mb-stack-md">
              <span className="material-symbols-outlined text-secondary dark:text-[#4cd7f6]">cloud_done</span>
              <h3 className="font-headline-lg text-headline-lg text-[var(--on-surface)]">LLM Deployment</h3>
            </div>
            <ul className="space-y-stack-sm">
              {["Azure OpenAI","NVIDIA DGX","Azure AI Search","AWS / GCP Inference"].map(item => (
                <li key={item} className="flex items-center gap-stack-sm font-code-sm text-code-sm text-[var(--on-surface-variant)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-[#d0bcff] shadow-[0_0_8px_rgba(125,211,252,0.8)]"></span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4 glass-card-light p-stack-md rounded-xl glow-hover-light">
            <div className="flex items-center gap-stack-sm mb-stack-md">
              <span className="material-symbols-outlined text-primary dark:text-[#d0bcff]">terminal</span>
              <h3 className="font-headline-lg text-headline-lg text-[var(--on-surface)]">Languages</h3>
            </div>
            <div className="space-y-stack-md">
              <div className="bg-white/5 p-stack-sm rounded-lg border border-white/5 dark:border-white/10">
                <p className="font-label-caps text-label-caps text-primary/70 mb-1 dark:text-[#d0bcff]/70">CORE</p>
                <p className="font-body-md text-body-md text-[var(--on-surface)]">Python, PySpark, SQL</p>
              </div>
              <div className="bg-white/5 p-stack-sm rounded-lg border border-white/5 dark:border-white/10">
                <p className="font-label-caps text-label-caps text-primary/70 mb-1 dark:text-[#d0bcff]/70">FRAMEWORKS</p>
                <p className="font-body-md text-body-md text-[var(--on-surface)]">React, Streamlit, Flask</p>
              </div>
            </div>
          </div>

          <div className="md:col-span-8 glass-card-light p-stack-md rounded-xl glow-hover-light">
            <div className="flex items-center gap-stack-sm mb-stack-md">
              <span className="material-symbols-outlined text-primary dark:text-[#d0bcff]">settings_suggest</span>
              <h3 className="font-headline-lg text-headline-lg text-[var(--on-surface)]">MLOps & Architecture</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
              <div>
                <h4 className="font-label-caps text-label-caps text-primary mb-stack-sm dark:text-[#d0bcff]">TOOLS</h4>
                <div className="flex flex-wrap gap-2">
                  {["Docker","Kubernetes","CI/CD","MLflow"].map(t => (
                    <span key={t} className="px-2 py-0.5 border border-primary/20 font-code-sm text-code-sm rounded-lg bg-white/5 text-[var(--on-surface)] dark:border-[#d0bcff]/20 text-[var(--on-surface)]">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-label-caps text-label-caps text-primary mb-stack-sm dark:text-[#d0bcff]">PLATFORMS</h4>
                <div className="flex flex-wrap gap-2">
                  {["Dataiku","Vertex AI","Databricks"].map(p => (
                    <span key={p} className="px-2 py-0.5 border border-primary/20 font-code-sm text-code-sm rounded-lg bg-white/5 text-[var(--on-surface)] dark:border-[#d0bcff]/20 text-[var(--on-surface)]">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-stack-lg">
          <h2 className="font-headline-lg text-headline-lg mb-stack-md border-l-4 border-primary pl-4 text-[var(--on-surface)] dark:border-[#d0bcff]">Awards & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { company: "Deloitte", title: "Applause Award", desc: "For training enablement and knowledge-sharing in GenAI." },
              { company: "Deloitte", title: "Outstanding Performance", desc: "Technical contributions to the Bechtel GenAI RFP project." },
              { company: "Tredence Inc.", title: "Pat on the Back", desc: "Recognition for excellence in Catalog Normalization automation." },
            ].map(a => (
              <div key={a.title} className="glass-card-light p-stack-md rounded-xl border-l-4 border-primary/40 glow-hover-light dark:border-[#d0bcff]/40">
                <div className="text-primary dark:text-[#d0bcff] font-bold mb-2">{a.company}</div>
                <h4 className="font-body-md text-body-md font-semibold text-[var(--on-surface)]">{a.title}</h4>
                <p className="font-body-md text-body-md text-[var(--on-surface-variant)] text-sm">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card-light p-stack-lg rounded-2xl text-center border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h2 className="font-headline-lg text-headline-lg mb-stack-md text-[var(--on-surface)]">Let's Build the Future Together</h2>
          <p className="font-body-md text-body-md text-[var(--on-surface-variant)] mb-stack-lg max-w-xl mx-auto">Currently looking for high-impact opportunities in Agentic Systems and Enterprise GenAI Architecture.</p>
          <div className="flex flex-wrap justify-center gap-stack-md">
            {[
              { icon: "alternate_email", label: "Email", href: "mailto:chiranjeev@example.com" },
              { icon: "link", label: "LinkedIn", href: "https://linkedin.com/in/chiranjeev-bitm" },
              { icon: "code", label: "GitHub", href: "https://github.com/chiranjeevbitm" },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-stack-sm px-stack-md py-stack-sm bg-white/5 border border-white/10 rounded-lg font-label-caps text-label-caps hover:bg-primary hover:text-on-primary hover:border-primary transition-all group text-[var(--on-surface-variant)] dark:hover:bg-[#d0bcff] dark:hover:text-[#3c0091] dark:hover:border-[#d0bcff]">
                <span className="material-symbols-outlined group-hover:text-on-primary dark:group-hover:text-[#3c0091]">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}