import { useState } from "react";
import { projects, githubRepos } from "../data/projects";
import PageTransition from "../components/PageTransition";

export default function Projects() {
  const [filter, setFilter] = useState("All Systems");
  const categories = ["All Systems", "GenAI", "RAG", "Machine Learning", "Data Engineering"];

  const filteredProjects =
    filter === "All Systems"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <PageTransition>
    <div className="bg-darkGlacier-surface text-on-surface min-h-screen selection:bg-primary/30 selection:text-primary">
      <main className="pt-32 pb-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Header Section */}
        <header className="mb-stack-lg">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-stack-md">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#7dd3fc]"></span>
            <span className="font-code-sm text-code-sm text-primary">
              Available for AI Consulting
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-stack-sm tracking-tight">
            Technical Showcase
          </h1>
          <p className="text-on-surface-variant max-w-2xl font-body-md text-body-md leading-relaxed">
            Exploring the intersection of Generative AI, RAG architectures, and
            scalable Data Engineering. A curated selection of production-grade systems
            and research publications.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-stack-sm mb-stack-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl font-code-sm text-code-sm transition-all ${
                filter === cat
                  ? "bg-primary text-on-primary shadow-lg shadow-primary/20"
                  : "bg-white/5 border border-primary/20 text-on-surface-variant hover:border-primary/50 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-20">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card-dark p-stack-md rounded-xl glow-hover-dark transition-all flex flex-col h-full group"
            >
              <div className="h-56 w-full rounded-lg overflow-hidden mb-stack-md border border-primary/10 relative">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                      (e.target as HTMLImageElement).parentElement!.classList.add(
                        "flex",
                        "items-center",
                        "justify-center"
                      );
                      (e.target as HTMLImageElement).parentElement!.innerHTML = `
                        <span class="material-symbols-outlined text-[64px] text-primary/40">folder_open</span>
                      `;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[64px] text-primary/40">
                  folder_open
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-code-sm text-code-sm text-primary bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
                    {project.category}
                  </span>
                  <span className="material-symbols-outlined text-outline">
                    {project.category === "RAG"
                      ? "library_books"
                      : project.category === "GenAI"
                      ? "auto_awesome"
                      : project.category === "Machine Learning"
                      ? "psychology"
                      : "storage"}
                  </span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-on-surface-variant font-body-md text-body-md mb-stack-md leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-stack-md">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-code-sm text-code-sm px-2 py-1 bg-white/5 rounded-lg border border-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-stack-md pt-stack-md border-t border-primary/10">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary font-label-caps text-label-caps hover:brightness-110"
                >
                  <span className="material-symbols-outlined text-[18px]">code</span>{" "}
                  View GitHub
                </a>
                {project.caseStudyUrl && (
                  <a
                    href={project.caseStudyUrl}
                    className="flex items-center gap-2 text-on-surface-variant font-label-caps text-label-caps hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      article
                    </span>{" "}
                    Case Study
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Latest from GitHub */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-stack-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[32px]">
                folder_open
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Latest from GitHub
              </h2>
            </div>
            <a
              href="https://github.com/chiranjeevbitm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 group"
            >
              <span className="font-label-caps text-label-caps">
                Follow @chiranjeev
              </span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                open_in_new
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md">
            {githubRepos.map((repo) => (
              <div
                key={repo.name}
                className="bg-white/5 border border-primary/10 p-stack-md rounded-xl hover:border-primary/50 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-code-sm text-code-sm text-primary font-bold">
                    {repo.name}
                  </span>
                  <span className="material-symbols-outlined text-primary/40 text-[16px]">
                    star
                  </span>
                </div>
                <p className="text-on-surface-variant text-body-md text-sm mb-4 line-clamp-2 leading-relaxed">
                  {repo.description}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        backgroundColor: repo.langColor,
                        boxShadow: `0 0 8px ${repo.langColor}`,
                      }}
                    ></span>
                    <span className="text-[12px] text-outline font-code-sm">
                      {repo.language}
                    </span>
                  </div>
                  <span className="text-[12px] text-outline font-code-sm">
                    {repo.updated}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="glass-card-dark p-12 rounded-2xl border-primary/20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-stack-md tracking-tight">
            Interested in collaborating?
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md max-w-xl mx-auto mb-stack-lg leading-relaxed">
            Currently focusing on Agentic AI and multi-agent systems. Let's discuss how
            GenAI can transform your enterprise architecture.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <a
              href="mailto:chiranjeev@example.com"
              className="bg-primary text-on-primary px-10 py-3.5 rounded-xl font-label-caps text-label-caps flex items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all"
            >
              <span className="material-symbols-outlined">mail</span> Send an Email
            </a>
            <button className="bg-white/5 border border-primary/20 text-on-surface px-10 py-3.5 rounded-xl font-label-caps text-label-caps hover:bg-white/10 hover:border-primary/30 transition-all">
              Schedule a Meeting
            </button>
          </div>
        </section>
      </main>
    </div>
    </PageTransition>
  );
}
