import PageTransition from "../components/PageTransition";

export default function Skills() {
  return (
    <PageTransition>
    <div className="bg-darkGlacier-surface text-on-surface min-h-screen bg-grid-dark selection:bg-primary/30 selection:text-primary">
      <main className="pt-32 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Header Section */}
        <section className="mb-stack-lg">
          <h1 className="font-headline-xl text-headline-xl mb-stack-sm bg-gradient-to-r from-on-surface to-on-surface-variant bg-clip-text text-transparent dark:bg-none dark:text-white">
            Technical Arsenal
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            A comprehensive breakdown of my expertise in Generative AI, Machine
            Learning, and Full-Stack Architecture, engineered for production-grade
            intelligence.
          </p>
        </section>

        {/* Resume Download CTA */}
        <section className="mb-stack-lg">
          <div className="glass-card-dark p-stack-lg rounded-xl flex flex-col md:flex-row items-center justify-between gap-gutter relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50"></div>
            <div className="flex items-center gap-gutter">
              <div className="p-stack-md bg-primary/10 rounded-xl border border-primary/20">
                <span className="material-symbols-outlined text-primary text-4xl">
                  description
                </span>
              </div>
              <div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Comprehensive Resume
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Last updated: Oct 2024 • PDF Format (215 KB)
                </p>
              </div>
            </div>
            <a
              href="/Chiranjeev_GenAI_5+years.pdf"
              download
              className="w-full md:w-auto bg-primary text-on-primary px-10 py-5 rounded-xl font-label-caps text-label-caps text-center flex items-center justify-center gap-stack-sm hover:shadow-[0_0_30px_rgba(125,211,252,0.3)] transition-all transform hover:-translate-y-1"
            >
              <span className="material-symbols-outlined">download</span>
              Download PDF Resume
            </a>
          </div>
        </section>

        {/* Bento Grid Skills */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg">
          {/* GenAI & LLMs */}
          <div className="md:col-span-8 glass-card-dark p-stack-md rounded-xl transition-all glow-hover-dark">
            <div className="flex items-center gap-stack-sm mb-stack-md">
              <span className="material-symbols-outlined text-primary">psychology</span>
              <h3 className="font-headline-lg text-headline-lg">GenAI & LLMs</h3>
            </div>
            <div className="flex flex-wrap gap-stack-sm">
              {[
                "Prompt Engineering",
                "RAG Pipelines",
                "LangChain",
                "LangGraph",
                "Agentic Systems",
                "Multi-Agent Orchestration",
                "Haystack",
                "Hallucination Scoring",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-primary/5 border border-primary/20 text-primary font-code-sm text-code-sm rounded-lg hover:bg-primary/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-stack-md border-t border-primary/10 pt-stack-sm">
              <p className="font-body-md text-body-md text-on-surface-variant italic text-sm">
                Specializing in production-grade multi-agent frameworks and MCP
                server/client deployments.
              </p>
            </div>
          </div>

          {/* LLM Deployment */}
          <div className="md:col-span-4 glass-card-dark p-stack-md rounded-xl transition-all glow-hover-dark">
            <div className="flex items-center gap-stack-sm mb-stack-md">
              <span className="material-symbols-outlined text-secondary">cloud_done</span>
              <h3 className="font-headline-lg text-headline-lg">LLM Deployment</h3>
            </div>
            <ul className="space-y-stack-sm">
              {[
                "Azure OpenAI",
                "NVIDIA DGX",
                "Azure AI Search",
                "AWS / GCP Inference",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-stack-sm font-code-sm text-code-sm text-on-surface-variant"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(125,211,252,0.8)]"></span>{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          <div className="md:col-span-4 glass-card-dark p-stack-md rounded-xl transition-all glow-hover-dark">
            <div className="flex items-center gap-stack-sm mb-stack-md">
              <span className="material-symbols-outlined text-primary">terminal</span>
              <h3 className="font-headline-lg text-headline-lg">Languages</h3>
            </div>
            <div className="space-y-stack-md">
              <div className="bg-white/5 p-stack-sm rounded-lg border border-white/5">
                <p className="font-label-caps text-label-caps text-primary/70 mb-1">
                  CORE
                </p>
                <p className="font-body-md text-body-md text-on-surface">
                  Python, PySpark, SQL
                </p>
              </div>
              <div className="bg-white/5 p-stack-sm rounded-lg border border-white/5">
                <p className="font-label-caps text-label-caps text-primary/70 mb-1">
                  FRAMEWORKS
                </p>
                <p className="font-body-md text-body-md text-on-surface">
                  React, Streamlit, Flask
                </p>
              </div>
            </div>
          </div>

          {/* MLOps & Architecture */}
          <div className="md:col-span-8 glass-card-dark p-stack-md rounded-xl transition-all glow-hover-dark">
            <div className="flex items-center gap-stack-sm mb-stack-md">
              <span className="material-symbols-outlined text-primary">
                settings_suggest
              </span>
              <h3 className="font-headline-lg text-headline-lg">
                MLOps & Architecture
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
              <div>
                <h4 className="font-label-caps text-label-caps text-primary mb-stack-sm">
                  TOOLS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Docker", "Kubernetes", "CI/CD", "MLflow"].map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-0.5 border border-primary/20 font-code-sm text-code-sm rounded-lg bg-white/5"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-label-caps text-label-caps text-primary mb-stack-sm">
                  PLATFORMS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Dataiku", "Vertex AI", "Databricks"].map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-0.5 border border-primary/20 font-code-sm text-code-sm rounded-lg bg-white/5"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards Section */}
        <section className="mb-stack-lg">
          <h2 className="font-headline-lg text-headline-lg mb-stack-md border-l-4 border-primary pl-4">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { company: "Deloitte", title: "Applause Award", desc: "For training enablement and knowledge-sharing in GenAI." },
              { company: "Deloitte", title: "Outstanding Performance", desc: "Technical contributions to the Client GenAI RFP project." },
              { company: "Tredence Inc.", title: "Pat on the Back", desc: "Recognition for excellence in Catalog Normalization automation." },
            ].map((award) => (
              <div
                key={award.title}
                className="glass-card-dark p-stack-md rounded-xl border-l-4 border-primary/40 glow-hover-dark"
              >
                <div className="text-primary font-bold mb-2">{award.company}</div>
                <h4 className="font-body-md text-body-md font-semibold text-on-surface">
                  {award.title}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant text-sm">
                  {award.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications Gallery */}
        <section className="mb-stack-lg">
          <h2 className="font-headline-lg text-headline-lg mb-stack-md">
            Expertise Verified
          </h2>
          <div className="flex flex-wrap gap-stack-md">
            {[
              "NVIDIA Agentic AI",
              "Azure Data Scientist",
              "Dataiku GenAI Practitioner",
              "Google GenAI For Leaders",
            ].map((cert) => (
              <div
                key={cert}
                className="bg-primary/5 border border-primary/20 px-stack-md py-stack-sm rounded-full flex items-center gap-2 hover:bg-primary/10 transition-colors cursor-default"
              >
                <span className="material-symbols-outlined text-primary text-sm">
                  verified
                </span>
                <span className="font-label-caps text-label-caps text-on-surface">
                  {cert}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="glass-card-dark p-stack-lg rounded-2xl text-center border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h2 className="font-headline-lg text-headline-lg mb-stack-md">
            Let's Build the Future Together
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg max-w-xl mx-auto">
            Currently looking for high-impact opportunities in Agentic Systems and
            Enterprise GenAI Architecture.
          </p>
          <div className="flex flex-wrap justify-center gap-stack-md">
            {[
              { icon: "alternate_email", label: "Email", href: "mailto:chiranjeev@example.com" },
              { icon: "link", label: "LinkedIn", href: "https://linkedin.com/in/chiranjeev-bitm" },
              { icon: "code", label: "GitHub", href: "https://github.com/chiranjeevbitm" },
              { icon: "database", label: "Kaggle", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-stack-sm px-stack-md py-stack-sm bg-white/5 border border-white/10 rounded-lg font-label-caps text-label-caps hover:bg-primary hover:text-on-primary hover:border-primary transition-all group"
              >
                <span className="material-symbols-outlined group-hover:text-on-primary">
                  {link.icon}
                </span>
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
    </PageTransition>
  );
}
