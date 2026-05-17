import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ExternalLink, Mail, Code } from "lucide-react";
import { certifications } from "../data/projects";

interface Props {
  onOpenResume?: () => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

type SkillCategory = 'genai' | 'mlai' | 'cloud' | 'data' | 'frameworks' | 'soft';

interface Skill {
  name: string;
  level: number;
  category: SkillCategory;
}

export default function SkillsSection({ onOpenResume }: Props) {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('genai');

  const handleResume = onOpenResume || (() => {
    window.open("/Chiranjeev_GenAI_5+years.pdf", "_blank");
  });

  const skillCategories = [
    { id: 'genai' as SkillCategory, label: 'GenAI & LLMs', icon: '🤖', count: 8 },
    { id: 'mlai' as SkillCategory, label: 'ML & AI', icon: '🧠', count: 7 },
    { id: 'cloud' as SkillCategory, label: 'Cloud & Infra', icon: '☁️', count: 7 },
    { id: 'data' as SkillCategory, label: 'Data & DB', icon: '💾', count: 6 },
    { id: 'frameworks' as SkillCategory, label: 'Frameworks', icon: '⚙️', count: 7 },
    { id: 'soft' as SkillCategory, label: 'Leadership', icon: '👥', count: 6 },
  ];

  const allSkills: Skill[] = [
    // GenAI & LLMs
    { name: 'Multi-Agent Systems', level: 5, category: 'genai' },
    { name: 'Agentic AI Development', level: 5, category: 'genai' },
    { name: 'RAG Pipelines', level: 5, category: 'genai' },
    { name: 'LLM Guardrails', level: 5, category: 'genai' },
    { name: 'Prompt Engineering', level: 5, category: 'genai' },
    { name: 'MCP (Model Context Protocol)', level: 4, category: 'genai' },
    { name: 'Agent Ops', level: 4, category: 'genai' },
    { name: 'Physical AI', level: 3, category: 'genai' },
    // ML & AI
    { name: 'Deep Learning', level: 5, category: 'mlai' },
    { name: 'Transfer Learning', level: 5, category: 'mlai' },
    { name: 'Computer Vision', level: 4, category: 'mlai' },
    { name: 'NLP', level: 4, category: 'mlai' },
    { name: 'Scikit-Learn', level: 5, category: 'mlai' },
    { name: 'PyTorch', level: 4, category: 'mlai' },
    { name: 'TensorFlow/Keras', level: 4, category: 'mlai' },
    // Cloud & Infrastructure
    { name: 'Azure OpenAI', level: 5, category: 'cloud' },
    { name: 'Azure AI Studio', level: 5, category: 'cloud' },
    { name: 'AWS Bedrock', level: 3, category: 'cloud' },
    { name: 'NVIDIA DGX', level: 4, category: 'cloud' },
    { name: 'Kubernetes', level: 3, category: 'cloud' },
    { name: 'Docker', level: 4, category: 'cloud' },
    { name: 'Azure Databricks', level: 4, category: 'cloud' },
    // Data & Databases
    { name: 'PySpark', level: 4, category: 'data' },
    { name: 'Vector Databases', level: 4, category: 'data' },
    { name: 'Neo4J (Knowledge Graphs)', level: 3, category: 'data' },
    { name: 'PostgreSQL', level: 4, category: 'data' },
    { name: 'SQL', level: 5, category: 'data' },
    { name: 'Pandas/NumPy', level: 5, category: 'data' },
    // Frameworks & Tools
    { name: 'LangChain', level: 5, category: 'frameworks' },
    { name: 'LangGraph', level: 5, category: 'frameworks' },
    { name: 'FastAPI', level: 5, category: 'frameworks' },
    { name: 'React', level: 4, category: 'frameworks' },
    { name: 'Streamlit/Gradio', level: 4, category: 'frameworks' },
    { name: 'Python', level: 5, category: 'frameworks' },
    { name: 'Git/GitHub', level: 5, category: 'frameworks' },
    // Soft Skills
    { name: 'Team Leadership', level: 4, category: 'soft' },
    { name: 'Stakeholder Management', level: 4, category: 'soft' },
    { name: 'Technical Writing', level: 5, category: 'soft' },
    { name: 'System Design', level: 4, category: 'soft' },
    { name: 'Agile/Scrum', level: 4, category: 'soft' },
    { name: 'Production Deployment', level: 5, category: 'soft' },
  ];

  const filteredSkills = allSkills.filter(s => s.category === activeCategory);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="min-h-screen selection:bg-primary/30 bg-background text-on-background dark:bg-[#131313] text-[var(--on-surface)]"
    >
      <main className="pt-28 pb-stack-lg px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Header Section */}
        <motion.div variants={fadeIn} className="mb-stack-lg">
          <h1 className="font-headline-xl text-headline-xl mb-stack-sm bg-gradient-to-r from-on-surface to-on-surface-variant bg-clip-text text-transparent dark:bg-none dark:text-white">
            Technical Arsenal
          </h1>
          <p className="font-body-md text-body-md text-[var(--on-surface-variant)] max-w-2xl">
            A comprehensive breakdown of my expertise in Generative AI, Machine Learning, and Full-Stack Architecture.
          </p>
        </motion.div>

        {/* Resume CTA */}
        <motion.div variants={fadeIn} className="mb-stack-lg">
          <div className="glass-card-light p-stack-lg rounded-xl flex flex-col md:flex-row items-center justify-between gap-gutter relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50"></div>
            <div className="flex items-center gap-gutter">
              <div className="p-stack-md bg-primary/10 rounded-xl border border-primary/20">
                <Download className="w-8 h-8 text-primary dark:text-[#d0bcff]" />
              </div>
              <div>
                <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)]">Comprehensive Resume</h2>
                <p className="font-body-md text-body-md text-[var(--on-surface-variant)]">Last updated: 2026 • PDF Format</p>
              </div>
            </div>
            <button onClick={handleResume}
              className="w-full md:w-auto bg-primary dark:bg-[#d0bcff] text-on-primary dark:text-[#3c0091] px-10 py-5 rounded-xl font-label-caps text-label-caps text-center flex items-center justify-center gap-stack-sm hover:shadow-[0_0_30px_rgba(125,211,252,0.3)] transition-all hover:-translate-y-1">
              <Download className="w-5 h-5" /> Download PDF Resume
            </button>
          </div>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3 mb-stack-lg"
        >
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg scale-105'
                  : 'bg-white/5 border border-white/10 text-black dark:text-gray-300 hover:bg-white/10'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeCategory === cat.id ? 'bg-white/20 text-white' : 'bg-white/10 text-black dark:text-gray-400'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Skills Grid with Progress Bars */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-stack-lg"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="p-5 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-base font-semibold text-[var(--on-surface)]">{skill.name}</h3>
                <span className="text-cyan-400 text-xs font-medium">{skill.level}/5</span>
              </div>
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${(skill.level / 5) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.03 }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Wall - Categorized */}
        <motion.section
          id="certifications"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-stack-lg"
        >
          <h2 className="font-headline-lg text-headline-lg mb-stack-md border-l-4 border-primary pl-4 text-[var(--on-surface)] dark:border-[#d0bcff]">
            Certifications & Credentials <span className="text-sm text-[var(--on-surface-variant)] font-normal">({certifications.length})</span>
          </h2>

          {[
            { key: "nvidia-genai", label: "NVIDIA GenAI & GPU", icon: "🚀", color: "border-l-purple-500 bg-purple-500/5", badge: "bg-purple-500/10 text-purple-400" },
            { key: "google-cloud", label: "Google Cloud & AI", icon: "☁️", color: "border-l-blue-500 bg-blue-500/5", badge: "bg-blue-500/10 text-blue-400" },
            { key: "microsoft-azure", label: "Microsoft Azure", icon: "📦", color: "border-l-sky-500 bg-sky-500/5", badge: "bg-sky-500/10 text-sky-400" },
            { key: "ai-skills", label: "AI Skills & DeepLearning.AI", icon: "🧠", color: "border-l-emerald-500 bg-emerald-500/5", badge: "bg-emerald-500/10 text-emerald-400" },
            { key: "platforms", label: "Enterprise Platforms", icon: "⚙️", color: "border-l-orange-500 bg-orange-500/5", badge: "bg-orange-500/10 text-orange-400" },
            { key: "specialized", label: "Security & Specialized", icon: "🔒", color: "border-l-rose-500 bg-rose-500/5", badge: "bg-rose-500/10 text-rose-400" },
          ].map((group, gi) => {
            const groupCerts = certifications.filter(c => c.category === group.key);
            if (groupCerts.length === 0) return null;
            return (
              <motion.div
                key={group.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: gi * 0.08, duration: 0.4 }}
                className={`mb-4 p-4 rounded-xl border-l-4 ${group.color} border border-white/60 dark:border-white/10`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">{group.icon}</span>
                  <h3 className="font-headline-lg text-headline-lg text-[var(--on-surface)]">{group.label}</h3>
                  <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-code-sm ${group.badge}`}>
                    {groupCerts.length} certs
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {groupCerts.map((cert, ci) => (
                    <motion.div
                      key={cert.title}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ci * 0.04, duration: 0.3 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="flex items-center gap-2 p-2.5 bg-white/60 rounded-lg border border-white/80 hover:shadow-md transition-all dark:bg-white/5 dark:border-white/10"
                    >
                      <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-[10px] border shrink-0 ${cert.cls}`}>
                        {cert.initial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[var(--on-surface)] truncate leading-tight">{cert.title}</p>
                        <p className="text-[9px] text-[var(--on-surface-variant)] truncate">{cert.org} • {cert.year}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        {/* Awards Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-stack-lg"
        >
          <h2 className="font-headline-lg text-headline-lg mb-stack-md border-l-4 border-primary pl-4 text-[var(--on-surface)] dark:border-[#d0bcff]">
            Awards & Recognition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { company: "Deloitte", title: "Outstanding Performance Award", desc: "For technical contributions to Bechtel GenAI RFP project.", icon: "🏆" },
              { company: "Deloitte", title: "Applause Award", desc: "For training enablement and knowledge-sharing in GenAI.", icon: "👏" },
              { company: "Tredence Inc.", title: "Pat on the Back Award", desc: "Recognition for excellence in Catalog Normalization automation.", icon: "🎖️" },
            ].map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="glass-card-light p-stack-md rounded-xl border-l-4 border-primary/40 glow-hover-light dark:border-[#d0bcff]/40"
              >
                <div className="text-2xl mb-2">{a.icon}</div>
                <div className="text-primary dark:text-[#d0bcff] font-bold mb-1 text-sm">{a.company}</div>
                <h4 className="font-body-md text-body-md font-semibold text-[var(--on-surface)]">{a.title}</h4>
                <p className="font-body-md text-body-md text-[var(--on-surface-variant)] text-sm">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Social Proof Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mb-stack-lg"
        >
          <div className="glass-card-light p-stack-lg rounded-xl">
            <h2 className="font-headline-lg text-headline-lg mb-stack-md text-[var(--on-surface)]">
              Digital Presence
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">
              {[
                { platform: "LinkedIn", followers: "1,900+", metric: "Followers", href: "https://linkedin.com/in/chiranjeev-kumar-07071997", color: "text-blue-400" },
                { platform: "Kaggle", followers: "Top 0.5%", metric: "Rank (1029/225K)", href: "https://kaggle.com/chiranjeevbit", color: "text-cyan-400" },
                { platform: "GitHub", followers: "Open Source", metric: "Projects & Contributions", href: "https://github.com/chiranjeevbitm", color: "text-white" },
                { platform: "LinkedIn Articles", followers: "3.5K+", metric: "Total Impressions", href: "https://linkedin.com/in/chiranjeev-kumar-07071997", color: "text-blue-400" },
              ].map((item) => (
                <a
                  key={item.platform}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-white/40 rounded-lg border border-white/60 hover:bg-white/80 transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-label-caps text-label-caps ${item.color}`}>{item.platform}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--on-surface-variant)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-2xl font-bold text-[var(--on-surface)]">{item.followers}</div>
                  <div className="text-xs text-[var(--on-surface-variant)]">{item.metric}</div>
                </a>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="glass-card-light p-stack-lg rounded-2xl text-center border-primary/10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <h2 className="font-headline-lg text-headline-lg mb-stack-md text-[var(--on-surface)]">Let's Build the Future Together</h2>
          <p className="font-body-md text-body-md text-[var(--on-surface-variant)] mb-stack-lg max-w-xl mx-auto">
            Currently available for high-impact consulting in Agentic Systems, Multi-Agent Architectures, and Enterprise GenAI.
          </p>
          <div className="flex flex-wrap justify-center gap-stack-md">
            {[
              { icon: <Mail className="w-4 h-4" />, label: "Email", href: "mailto:chiranjeev@example.com" },
              { icon: <ExternalLink className="w-4 h-4" />, label: "LinkedIn", href: "https://linkedin.com/in/chiranjeev-kumar-07071997" },
              { icon: <Code className="w-4 h-4" />, label: "GitHub", href: "https://github.com/chiranjeevbitm" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 rounded-lg font-label-caps text-label-caps hover:bg-primary hover:text-on-primary hover:border-primary transition-all group text-[var(--on-surface-variant)] dark:hover:bg-[#d0bcff] dark:hover:text-[#3c0091] dark:hover:border-[#d0bcff]">
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </motion.section>
      </main>
    </motion.div>
  );
}
