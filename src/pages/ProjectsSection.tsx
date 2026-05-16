import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, githubRepos } from "../data/projects";

const repoVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All Systems");
  const categories = ["All Systems", "GenAI", "RAG", "Machine Learning", "Data Engineering"];

  const filtered =
    filter === "All Systems"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background text-on-background dark:bg-[#131313] text-[var(--on-surface)] selection:bg-primary/30">
      <main className="pt-28 pb-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <header className="mb-stack-lg">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full mb-stack-md dark:bg-[#d0bcff]/10 dark:border-[#d0bcff]/20">
            <span className="w-2 h-2 rounded-full bg-primary dark:bg-[#d0bcff] animate-pulse shadow-[0_0_8px_#7dd3fc]"></span>
            <span className="font-code-sm text-code-sm text-primary dark:text-[#d0bcff]">Available for AI Consulting</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-[var(--on-surface)] mb-stack-sm tracking-tight">Technical Showcase</h1>
          <p className="text-[var(--on-surface-variant)] max-w-2xl font-body-md text-body-md leading-relaxed">
            Exploring the intersection of Generative AI, RAG architectures, and scalable Data Engineering.
          </p>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-stack-sm mb-stack-lg"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-xl font-code-sm text-code-sm transition-colors ${
                filter === cat
                  ? "bg-primary dark:bg-[#d0bcff] text-on-primary dark:text-[#3c0091] shadow-lg shadow-primary/20"
                  : "bg-white/5 border border-primary/20 text-on-surface-variant hover:border-primary/50 hover:bg-white/10 dark:border-[#d0bcff]/20 dark:hover:border-[#d0bcff]/50"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-gutter mb-20">
          <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="glass-card-light p-stack-md rounded-xl flex flex-col h-full group glow-hover-light"
            >
              <div className="h-56 w-full rounded-lg overflow-hidden mb-stack-md border border-primary/10 relative dark:border-[#d0bcff]/10">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 dark:bg-[#d0bcff]/10"></div>
                {project.image ? (
                  <img src={project.image} alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[64px] text-primary/40 dark:text-[#d0bcff]/40">folder_open</span>
                  </div>
                )}
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-code-sm text-code-sm text-primary dark:text-[#d0bcff] bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 dark:bg-[#d0bcff]/10 dark:border-[#d0bcff]/20">{project.category}</span>
                  <span className="material-symbols-outlined text-outline">auto_awesome</span>
                </div>
                <h3 className="font-headline-lg text-headline-lg text-[var(--on-surface)] mb-2 group-hover:text-primary dark:group-hover:text-[#d0bcff] transition-colors">{project.title}</h3>
                <p className="text-[var(--on-surface-variant)] font-body-md text-body-md mb-stack-md leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-stack-md">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-code-sm text-code-sm px-2 py-1 bg-white/5 rounded-lg border border-primary/10 text-[var(--on-surface)] dark:border-[#d0bcff]/10 text-[var(--on-surface)]">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-stack-md pt-stack-md border-t border-primary/10 dark:border-[#d0bcff]/10">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary dark:text-[#d0bcff] font-label-caps text-label-caps hover:brightness-110">
                  <span className="material-symbols-outlined text-[18px]">code</span> View GitHub
                </a>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-stack-lg">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary dark:text-[#d0bcff] text-[32px]">folder_open</span>
              <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)]">Latest from GitHub</h2>
            </div>
            <a href="https://github.com/chiranjeevbitm" target="_blank" rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-primary dark:hover:text-[#d0bcff] transition-colors flex items-center gap-2 group">
              <span className="font-label-caps text-label-caps">Follow @chiranjeev</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">open_in_new</span>
            </a>
          </div>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-stack-md"
          >
            {githubRepos.map((repo) => (
              <motion.div
                key={repo.name}
                variants={repoVariants}
                whileHover={{ y: -2 }}
                className="bg-white/5 border border-primary/10 p-stack-md rounded-xl hover:border-primary/50 hover:bg-white/10 transition-all group dark:border-[#d0bcff]/10 dark:hover:border-[#d0bcff]/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-code-sm text-code-sm text-primary dark:text-[#d0bcff] font-bold">{repo.name}</span>
                  <span className="material-symbols-outlined text-primary/40 text-[16px] dark:text-[#d0bcff]/40">star</span>
                </div>
                <p className="text-[var(--on-surface-variant)] text-body-md text-sm mb-4 line-clamp-2 leading-relaxed">{repo.description}</p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor, boxShadow: `0 0 8px ${repo.langColor}` }}></span>
                    <span className="text-[12px] text-outline font-code-sm">{repo.language}</span>
                  </div>
                  <span className="text-[12px] text-outline font-code-sm">{repo.updated}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="glass-card-light p-12 rounded-2xl border-primary/20 text-center relative overflow-hidden dark:border-[#d0bcff]/20"
        >
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)] mb-stack-md tracking-tight">Interested in collaborating?</h2>
          <p className="text-[var(--on-surface-variant)] font-body-md text-body-md max-w-xl mx-auto mb-stack-lg leading-relaxed">
            Currently focusing on Agentic AI and multi-agent systems.
          </p>
          <a href="mailto:chiranjeev@example.com"
            className="inline-flex bg-primary dark:bg-[#d0bcff] text-on-primary dark:text-[#3c0091] px-10 py-3.5 rounded-xl font-label-caps text-label-caps items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
            <span className="material-symbols-outlined">mail</span> Send an Email
          </a>
        </motion.section>
      </main>
    </div>
  );
}