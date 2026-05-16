import CodeBlock from "../components/CodeBlock";

interface Props {
  onNavigate: (section: string) => void;
  onOpenResume: () => void;
}

export default function HomeSection({ onNavigate }: Props) {
  return (
    <div className="min-h-screen bg-grid-light selection:bg-primary/20 bg-background text-on-background dark:bg-[#131313]">
      {/* Hero Section */}
      <section className="relative min-h-[819px] flex flex-col justify-center items-center px-margin-mobile md:px-margin-desktop py-24 overflow-hidden pt-32 snap-start">
        <div className="absolute inset-0 z-0 opacity-40">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[140px] rounded-full"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/20 bg-white/60 backdrop-blur-md text-primary font-code-sm text-code-sm shadow-sm dark:bg-white/5">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            Available for Strategic AI Consulting
          </div>
          <h1 className="font-headline-xl text-headline-xl mb-6 tracking-tight">
            <span className="text-[var(--on-surface)]">Architecting the Future of</span>
            <br />
            <span className="text-gradient">Generative AI & Agentic Systems</span>
          </h1>
          <p className="font-body-md text-body-md text-[var(--on-surface-variant)] max-w-2xl mx-auto mb-4">
            Full-Stack AI Engineer specializing in production-grade RAG solutions,
            multi-agent architectures, end-to-end LLM applications, and modern UI
            development with React and TypeScript. Building intelligent interfaces
            that bridge complex AI systems with seamless user experiences.
          </p>
          <CodeBlock />
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              onClick={() => onNavigate("skills")}
              className="px-8 py-4 bg-primary text-on-primary font-label-caps text-label-caps rounded-xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 dark:bg-[#d0bcff] dark:text-[#3c0091]"
            >
              Explore My Work
            </button>
            <button
              onClick={() => onNavigate("experience")}
              className="px-8 py-4 bg-white/60 backdrop-blur-md border border-white text-[var(--on-surface)] font-label-caps text-label-caps rounded-xl hover:bg-white/80 transition-all shadow-sm dark:bg-white/5 dark:border-white/10 text-[var(--on-surface)]"
            >
              My Journey
            </button>
          </div>
          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce">
            <span className="material-symbols-outlined text-on-surface-variant/40 text-3xl text-[var(--on-surface-variant)]/40">
              keyboard_double_arrow_down
            </span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg snap-start" id="about">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <div className="md:col-span-2 glass-card-light p-10 rounded-xl glow-hover-light transition-all">
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
          </div>
          <div className="glass-card-light p-10 rounded-xl glow-hover-light transition-all flex flex-col justify-between">
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
          </div>
        </div>
      </section>

      {/* Skills Summary */}
      <section className="bg-surface py-24 border-y border-white/50 snap-start dark:bg-[#1c1b1b] dark:border-white/5" id="skills-summary">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16">
            <span className="font-label-caps text-label-caps text-primary dark:text-[#d0bcff]">TECH STACK</span>
            <h2 className="font-headline-xl text-headline-xl text-[var(--on-surface)] mt-2 text-[var(--on-surface)]">Expertise & Frameworks</h2>
          </div>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "Deloitte", label: "Current Consultant" },
              { value: "Distinction", label: "Master's Degree" },
              { value: "700+", label: "Practitioners Trained" },
              { value: "$5M+", label: "Forecast Opportunity" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 glass-card-light rounded-xl">
                <div className="font-headline-lg text-headline-lg text-[var(--on-surface)] mb-1 text-[var(--on-surface)]">{stat.value}</div>
                <div className="font-label-caps text-label-caps text-[var(--on-surface-variant)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}