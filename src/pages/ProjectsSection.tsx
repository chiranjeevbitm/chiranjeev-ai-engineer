import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Star, FolderOpen, Mail, Play } from "lucide-react";
import { projects, githubRepos, type Project } from "../data/projects";
import { Collapsible, ToggleButton } from "../components/Collapsible";
import { useMode } from "../context/ModeContext";

const INITIAL_COUNT = 6;

function ProjectCard({ project }: { project: Project }) {
  const { is3D } = useMode();
  const [open, setOpen] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);

  // Tilt toward the pointer in 3D mode. Written straight to the node, no state.
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!is3D || e.pointerType === "touch") return;
    const el = tiltRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  const demo = project.links.demo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.97 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div
        ref={tiltRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`${is3D ? "tilt-card" : "hover:-translate-y-1 transition-transform duration-300"} glass-card-light p-stack-md rounded-xl flex flex-col group glow-hover-light`}
      >
        <div className="h-48 w-full rounded-lg overflow-hidden mb-stack-md border border-primary/10 relative dark:border-[#d0bcff]/10">
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500 z-10 dark:bg-[#d0bcff]/10"></div>
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FolderOpen className="w-16 h-16 text-primary/40 dark:text-[#d0bcff]/40" />
            </div>
          )}
          {project.status && (
            <div className="absolute top-3 left-3 z-20">
              <span className="px-2 py-1 bg-emerald-500/90 text-black text-xs font-semibold rounded-full">{project.status}</span>
            </div>
          )}
          {project.featured && (
            <div className="absolute top-3 right-3 z-20">
              <span className="px-2 py-1 bg-yellow-500/90 text-black text-xs font-semibold rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" /> Featured
              </span>
            </div>
          )}
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="shrink-0 font-code-sm text-code-sm text-primary dark:text-[#d0bcff] bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20 dark:bg-[#d0bcff]/10 dark:border-[#d0bcff]/20">
              {project.category}
            </span>
            <span className="text-xs text-[var(--on-surface-variant)] text-right line-clamp-2">{project.tagline}</span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-[var(--on-surface)] mb-2 group-hover:text-primary dark:group-hover:text-[#d0bcff] transition-colors">
            {project.title}
          </h3>
          <p className={`text-[var(--on-surface-variant)] font-body-md text-body-md leading-relaxed ${open ? "" : "line-clamp-3"}`}>
            {project.description}
          </p>

          <Collapsible open={open}>
            <div className="pt-stack-md">
              {project.impact.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-stack-md p-3 bg-gray-100 rounded-lg dark:bg-black/40">
                  {project.impact.map((item, i) => (
                    <div key={i}>
                      <div className="text-sm font-bold text-cyan-600 dark:text-cyan-400">{item.value}</div>
                      <div className="text-[10px] text-gray-600 dark:text-[var(--on-surface-variant)]">{item.metric}</div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-code-sm text-code-sm px-2 py-1 bg-white/5 rounded-lg border border-primary/10 text-[var(--on-surface)] dark:border-[#d0bcff]/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Collapsible>
        </div>

        <div className="flex flex-wrap items-center gap-x-stack-md gap-y-1 pt-stack-md mt-stack-md border-t border-primary/10 dark:border-[#d0bcff]/10">
          <ToggleButton open={open} onClick={() => setOpen((o) => !o)} closedLabel="Details" openLabel="Hide details" />
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary dark:text-[#d0bcff] font-label-caps text-label-caps hover:brightness-110">
              <Play className="w-4 h-4" /> Live demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary dark:text-[#d0bcff] font-label-caps text-label-caps hover:brightness-110">
              <Code2 className="w-4 h-4" /> GitHub
            </a>
          )}
          {project.links.article && (
            <a href={project.links.article} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--on-surface-variant)] font-label-caps text-label-caps hover:text-primary dark:hover:text-[#d0bcff] transition-colors">
              <ExternalLink className="w-4 h-4" /> Article
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState("All Systems");
  const [showAll, setShowAll] = useState(false);
  const [reposOpen, setReposOpen] = useState(false);
  const categories = ["All Systems", "GenAI", "RAG", "Machine Learning", "Data Engineering"];

  const filtered =
    filter === "All Systems"
      ? projects
      : projects.filter((p) => p.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - visible.length;

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
            From weekend hacks to enterprise production systems — end-to-end AI solutions that solve real problems.
          </p>
        </header>

        <div className="flex flex-wrap gap-stack-sm mb-stack-lg">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setShowAll(false); }}
              className={`px-5 py-2 rounded-xl font-code-sm text-code-sm transition-all active:scale-95 ${
                filter === cat
                  ? "bg-primary dark:bg-[#d0bcff] text-on-primary dark:text-[#3c0091] shadow-lg shadow-primary/20"
                  : "bg-white/5 border border-primary/20 text-on-surface-variant hover:border-primary/50 hover:bg-white/10 dark:border-[#d0bcff]/20 dark:hover:border-[#d0bcff]/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter items-start mb-6">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length > INITIAL_COUNT && (
          <div className="flex justify-center mb-16">
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="px-6 py-2.5 rounded-xl border border-primary/30 text-primary dark:text-[#d0bcff] dark:border-[#d0bcff]/30 font-code-sm text-code-sm hover:bg-primary/10 dark:hover:bg-[#d0bcff]/10 transition-colors active:scale-95"
            >
              {showAll ? "Show fewer projects" : `Show ${hiddenCount} more project${hiddenCount === 1 ? "" : "s"}`}
            </button>
          </div>
        )}

        <section className="mb-16">
          <div className="flex items-center justify-between mb-stack-md">
            <div className="flex items-center gap-3">
              <FolderOpen className="w-7 h-7 text-primary dark:text-[#d0bcff]" />
              <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)]">Latest from GitHub</h2>
            </div>
            <ToggleButton open={reposOpen} onClick={() => setReposOpen((o) => !o)} closedLabel="Show" openLabel="Hide" />
          </div>
          <Collapsible open={reposOpen}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-md pb-2">
              {githubRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="bg-white/5 border border-primary/10 p-stack-md rounded-xl hover:border-primary/50 hover:bg-white/10 transition-all group dark:border-[#d0bcff]/10 dark:hover:border-[#d0bcff]/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-code-sm text-code-sm text-primary dark:text-[#d0bcff] font-bold">{repo.name}</span>
                    <Star className="w-4 h-4 text-primary/40 dark:text-[#d0bcff]/40" />
                  </div>
                  <p className="text-[var(--on-surface-variant)] text-body-md text-sm mb-4 line-clamp-2 leading-relaxed">{repo.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: repo.langColor, boxShadow: `0 0 8px ${repo.langColor}` }}></span>
                      <span className="text-[12px] text-outline font-code-sm">{repo.language}</span>
                    </div>
                    <span className="text-[12px] text-outline font-code-sm">{repo.updated}</span>
                  </div>
                </div>
              ))}
            </div>
          </Collapsible>
          <a href="https://github.com/chiranjeevbitm" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-2 text-on-surface-variant hover:text-primary dark:hover:text-[#d0bcff] transition-colors">
            <span className="font-label-caps text-label-caps">Follow @chiranjeev on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="glass-card-light p-8 md:p-12 rounded-2xl border-primary/20 text-center relative overflow-hidden dark:border-[#d0bcff]/20"
        >
          <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)] mb-stack-md tracking-tight">Let's Build Something Together</h2>
          <p className="text-[var(--on-surface-variant)] font-body-md text-body-md max-w-xl mx-auto mb-stack-lg leading-relaxed">
            Currently focusing on Agentic AI, Multi-Agent Systems, and MCP Architectures.
            Open to consulting and collaboration opportunities.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <a href="mailto:chiranjeevkumar47@gmail.com"
              className="inline-flex justify-center bg-primary dark:bg-[#d0bcff] text-on-primary dark:text-[#3c0091] px-8 py-3.5 rounded-xl font-label-caps text-label-caps items-center gap-2 shadow-xl shadow-primary/20 hover:scale-105 transition-all">
              <Mail className="w-4 h-4" /> Email me
            </a>
            <a href="https://linkedin.com/in/chiranjeev-kumar-07071997" target="_blank" rel="noopener noreferrer"
              className="inline-flex justify-center bg-white/5 border border-white/10 text-[var(--on-surface)] px-8 py-3.5 rounded-xl font-label-caps text-label-caps items-center gap-2 hover:bg-white/10 hover:scale-105 transition-all">
              <ExternalLink className="w-4 h-4" /> LinkedIn
            </a>
            <a href="https://github.com/chiranjeevbitm" target="_blank" rel="noopener noreferrer"
              className="inline-flex justify-center bg-white/5 border border-white/10 text-[var(--on-surface)] px-8 py-3.5 rounded-xl font-label-caps text-label-caps items-center gap-2 hover:bg-white/10 hover:scale-105 transition-all">
              <Code2 className="w-4 h-4" /> GitHub
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
