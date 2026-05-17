import { motion } from "framer-motion";
import { Award, BookOpen, Code2, Users, Zap, ExternalLink } from "lucide-react";
import CodeBlock from "../components/CodeBlock";
import AIStatusBar from "../components/AIStatusBar";
import AnimatedBlobs from "../components/AnimatedBlobs";
import MagneticButton from "../components/MagneticButton";

interface Props {
  onNavigate: (section: string) => void;
  onOpenResume: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function HomeSection({ onNavigate }: Props) {
  const stats = [
    { icon: <Zap className="w-5 h-5" />, value: "20+", label: "AI/ML Certifications" },
    { icon: <Award className="w-5 h-5" />, value: "73%", label: "Master's Distinction" },
    { icon: <Users className="w-5 h-5" />, value: "1.9K+", label: "LinkedIn Followers" },
    { icon: <Code2 className="w-5 h-5" />, value: "Top 0.5%", label: "Kaggle Notebooks" },
  ];

  return (
    <div className="min-h-screen bg-grid-light selection:bg-primary/20 bg-background text-on-background dark:bg-[#131313] relative">
      <AnimatedBlobs />
      {/* Hero Section */}
      <section className="relative min-h-screen md:min-h-screen flex flex-col justify-center md:justify-center items-center px-margin-mobile md:px-margin-desktop py-12 md:py-24 overflow-visible md:overflow-hidden pt-24 md:pt-32 snap-start">
        {/* Parallax glow */}
        <motion.div
          className="absolute inset-0 z-[1] opacity-40"
          animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.5, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[140px] rounded-full"></div>
        </motion.div>
        <div className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AIStatusBar />
          </motion.div>
          
          {/* Badge Row */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-white/60 backdrop-blur-md text-primary font-code-sm text-code-sm shadow-sm dark:bg-white/5">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Available for Strategic AI Consulting
            </span>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md text-purple-400 font-code-sm text-code-sm shadow-sm">
              <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              NVIDIA Certified Agentic AI
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-headline-xl text-headline-xl mb-6 tracking-tight"
          >
            <span className="text-[var(--on-surface)]">Chiranjeev Kumar</span>
            <br />
            <span className="text-gradient">Data Science Consultant @ Deloitte</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body-md text-body-md text-[var(--on-surface-variant)] max-w-2xl mx-auto mb-6"
          >
            Production GenAI Specialist building enterprise-scale multi-agent systems, 
            RAG pipelines, and MCP architectures. <strong className="text-[var(--on-surface)]">Dual Master's in AI/ML</strong> | 
            <strong className="text-purple-400"> NVIDIA Certified</strong> | 
            <strong className="text-[var(--on-surface)]"> Top 0.5% Kaggle</strong>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <CodeBlock />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          >
            <MagneticButton
              onClick={() => onNavigate("skills")}
              className="px-8 py-4 bg-primary text-on-primary font-label-caps text-label-caps rounded-xl shadow-xl shadow-primary/20 dark:bg-[#d0bcff] dark:text-[#3c0091]"
            >
              Explore My Work
            </MagneticButton>
            <MagneticButton
              onClick={() => onNavigate("experience")}
              className="px-8 py-4 bg-white/60 backdrop-blur-md border border-white text-[var(--on-surface)] font-label-caps text-label-caps rounded-xl dark:bg-white/5 dark:border-white/10 text-[var(--on-surface)]"
            >
              My Journey
            </MagneticButton>
          </motion.div>
          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-0"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                className="p-4 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-accent group"
              >
                <div className="text-primary dark:text-cyan-400 mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-2xl font-bold text-[var(--on-surface)] mb-1">{stat.value}</div>
                <div className="text-xs text-[var(--on-surface-variant)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-0 md:py-stack-lg snap-start"
        id="about"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 glass-card-light p-10 rounded-xl glow-hover-light transition-all"
          >
            <h2 className="font-headline-lg text-headline-lg text-primary dark:text-[#d0bcff] mb-6">
              Production GenAI Specialist
            </h2>
            <div className="space-y-4 font-body-md text-body-md text-on-surface-variant leading-relaxed text-[var(--on-surface-variant)]">
              <p>
                I'm a Data Science Consultant at <strong className="text-[var(--on-surface)]">Deloitte</strong> specializing in 
                <strong className="text-[var(--on-surface)]"> Production Generative AI</strong>, <strong className="text-[var(--on-surface)]">Agentic Systems</strong>, 
                and <strong className="text-[var(--on-surface)]">Multi-Agent Architectures</strong>.
              </p>
              <p>
                Currently leading GenAI COE initiatives — designing, developing, and deploying 
                enterprise-scale AI solutions across Azure, AWS, and NVIDIA DGX infrastructure. 
                From RAG pipelines to MCP servers, I bridge research and production.
              </p>
              <p>
                With a <strong className="text-[var(--on-surface)]">Master's in AI/ML from LJMU (73% Distinction)</strong> and 
                a <strong className="text-[var(--on-surface)]">PG Diploma from IIIT Bangalore (3.5/4 GPA)</strong>, 
                I combine academic rigor with a builder's mindset — shipping production apps in weekends 
                (like Shikshak Sahayak for 400K+ teachers) while delivering enterprise-grade systems.
              </p>
              <p className="text-primary dark:text-[#d0bcff] font-medium">
                My mission: Make AI accessible, practical, and impactful — from classroom teachers in Bihar to Fortune 500 enterprises.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <a
                href="https://linkedin.com/in/chiranjeev-kumar-07071997"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 text-primary dark:text-[#d0bcff] rounded-lg hover:bg-primary/20 transition-all font-label-caps text-label-caps"
              >
                <ExternalLink className="w-4 h-4" /> Connect on LinkedIn
              </a>
              <a
                href="https://github.com/chiranjeevbitm"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-[var(--on-surface)] rounded-lg hover:bg-white/10 transition-all font-label-caps text-label-caps"
              >
                <Code2 className="w-4 h-4" /> View GitHub
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="glass-card-light p-8 rounded-xl glow-hover-light transition-all">
              <div className="font-label-caps text-label-caps text-secondary dark:text-[#4cd7f6] mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> EDUCATION
              </div>
              <div className="font-headline-lg text-headline-lg text-[var(--on-surface)] mb-1 tracking-tighter">73% Distinction</div>
              <div className="font-body-md text-body-md text-[var(--on-surface-variant)] mb-4">Master's in ML & AI — LJMU</div>
              <div className="border-t border-white/50 pt-4 dark:border-white/10 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm dark:bg-white/10">
                    <span className="material-symbols-outlined text-primary dark:text-[#d0bcff] text-[20px]">school</span>
                  </div>
                  <div>
                    <div className="font-body-md text-body-md text-[var(--on-surface)] text-sm font-semibold">IIIT Bangalore</div>
                    <div className="font-code-sm text-code-sm text-[var(--on-surface-variant)] text-xs">PG Diploma, 3.5/4.0 GPA</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/80 flex items-center justify-center shadow-sm dark:bg-white/10">
                    <span className="material-symbols-outlined text-primary dark:text-[#d0bcff] text-[20px]">school</span>
                  </div>
                  <div>
                    <div className="font-body-md text-body-md text-[var(--on-surface)] text-sm font-semibold">BIT Mesra</div>
                    <div className="font-code-sm text-code-sm text-[var(--on-surface-variant)] text-xs">B.E. Computer Science, 7.8/10</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card-light p-8 rounded-xl glow-hover-light transition-all">
              <div className="font-label-caps text-label-caps text-purple-400 mb-2 flex items-center gap-2">
                <Award className="w-4 h-4" /> NVIDIA CERTIFIED
              </div>
              <div className="font-body-md text-body-md text-[var(--on-surface)] font-semibold mb-2">Certified Agentic AI</div>
              <div className="font-code-sm text-code-sm text-[var(--on-surface-variant)]">GenAI Multimodal • GenAI LLMs • Nemo Toolkit & DGX</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Agentic AI", "Multimodal", "LLMs", "DGX"].map((b) => (
                  <span key={b} className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs rounded-lg font-code-sm">{b}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Skills Summary */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-surface py-24 border-y border-white/50 snap-start dark:bg-[#1c1b1b] dark:border-white/5"
        id="skills-summary"
      >
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="font-label-caps text-label-caps text-primary dark:text-[#d0bcff]">CAREER HIGHLIGHTS</span>
            <h2 className="font-headline-xl text-headline-xl text-[var(--on-surface)] mt-2">Impact by the Numbers</h2>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: "22+", label: "Professional Certifications", icon: "✅" },
              { value: "4", label: "Enterprise Roles (TCS → Deloitte)", icon: "📈" },
              { value: "9+", label: "Production Projects", icon: "🚀" },
              { value: "1,900+", label: "LinkedIn Community", icon: "👥" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                className="text-center p-6 glass-card-light rounded-xl hover:scale-105 transition-all duration-300"
              >
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="font-headline-lg text-headline-lg text-[var(--on-surface)] mb-1">{stat.value}</div>
                <div className="font-label-caps text-label-caps text-[var(--on-surface-variant)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
