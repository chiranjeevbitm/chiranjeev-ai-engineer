import { motion } from "framer-motion";
import CodeBlock from "../components/CodeBlock";

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
  return (
    <div className="min-h-screen bg-grid-light selection:bg-primary/20 bg-background text-on-background dark:bg-[#131313]">
      {/* Hero Section */}
      <section className="relative min-h-[819px] flex flex-col justify-center items-center px-margin-mobile md:px-margin-desktop py-24 overflow-hidden pt-32 snap-start">
        {/* Parallax glow */}
        <motion.div
          className="absolute inset-0 z-0 opacity-40"
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
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/20 bg-white/60 backdrop-blur-md text-primary font-code-sm text-code-sm shadow-sm dark:bg-white/5"
          >
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Available for Strategic AI Consulting
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-headline-xl text-headline-xl mb-6 tracking-tight"
          >
            <span className="text-[var(--on-surface)]">Architecting the Future of</span>
            <br />
            <span className="text-gradient">Generative AI & Agentic Systems</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body-md text-body-md text-[var(--on-surface-variant)] max-w-2xl mx-auto mb-4"
          >
            Full-Stack AI Engineer specializing in production-grade RAG solutions,
            multi-agent architectures, end-to-end LLM applications, and modern UI
            development with React and TypeScript. Building intelligent interfaces
            that bridge complex AI systems with seamless user experiences.
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
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => onNavigate("skills")}
              className="px-8 py-4 bg-primary text-on-primary font-label-caps text-label-caps rounded-xl shadow-xl shadow-primary/20 dark:bg-[#d0bcff] dark:text-[#3c0091]"
            >
              Explore My Work
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              onClick={() => onNavigate("experience")}
              className="px-8 py-4 bg-white/60 backdrop-blur-md border border-white text-[var(--on-surface)] font-label-caps text-label-caps rounded-xl dark:bg-white/5 dark:border-white/10 text-[var(--on-surface)]"
            >
              My Journey
            </motion.button>
          </motion.div>
          {/* Scroll indicator */}
          <motion.div
            className="mt-16 animate-bounce"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="material-symbols-outlined text-on-surface-variant/40 text-3xl text-[var(--on-surface-variant)]/40">
              keyboard_double_arrow_down
            </span>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg snap-start"
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
              Strategic Consultant
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-[var(--on-surface-variant)]">
              I bridge the gap between complex AI architecture and polished user
              interfaces. With a Master's from Liverpool John Moores University and
              extensive experience at{" "}
              <span className="text-[var(--on-surface)] font-semibold">Deloitte</span> and{" "}
              <span className="text-[var(--on-surface)] font-semibold">Tredence</span>, I lead
              the delivery of GenAI COE projects while building modern full-stack
              applications with React, TypeScript, and Tailwind CSS.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card-light p-10 rounded-xl glow-hover-light transition-all flex flex-col justify-between"
          >
            <div>
              <div className="font-label-caps text-label-caps text-secondary dark:text-[#4cd7f6] mb-2">EDUCATION</div>
              <div className="font-headline-lg text-headline-lg text-[var(--on-surface)] mb-2 tracking-tighter text-[var(--on-surface)]">73% Distinction</div>
              <div className="font-body-md text-body-md text-[var(--on-surface-variant)]">Master's in ML & AI</div>
            </div>
            <div className="mt-8 border-t border-white/50 pt-6 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm dark:bg-white/10">
                  <span className="material-symbols-outlined text-primary dark:text-[#d0bcff]">school</span>
                </div>
                <div>
                  <div className="font-body-md text-body-md text-[var(--on-surface)]">IIIT Bangalore</div>
                  <div className="font-code-sm text-code-sm text-[var(--on-surface-variant)]">Postgrad, 3.5/4.0 GPA</div>
                </div>
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
            <span className="font-label-caps text-label-caps text-primary dark:text-[#d0bcff]">TECH STACK</span>
            <h2 className="font-headline-xl text-headline-xl text-[var(--on-surface)] mt-2 text-[var(--on-surface)]">Expertise & Frameworks</h2>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: "Deloitte", label: "Current Consultant" },
              { value: "Distinction", label: "Master's Degree" },
              { value: "700+", label: "Practitioners Trained" },
              { value: "$5M+", label: "Forecast Opportunity" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={statVariants}
                className="text-center p-6 glass-card-light rounded-xl"
              >
                <div className="font-headline-lg text-headline-lg text-[var(--on-surface)] mb-1 text-[var(--on-surface)]">{stat.value}</div>
                <div className="font-label-caps text-label-caps text-[var(--on-surface-variant)]">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
