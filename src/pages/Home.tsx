import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="bg-background text-on-surface min-h-screen bg-grid-light selection:bg-primary/20">
        {/* Hero Section */}
        <section className="relative min-h-[819px] flex flex-col justify-center items-center px-margin-mobile md:px-margin-desktop py-24 overflow-hidden pt-32">
          <div className="absolute inset-0 z-0 opacity-40">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 blur-[140px] rounded-full"></div>
          </div>
          <div className="relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-primary/20 bg-white/60 backdrop-blur-md text-primary font-code-sm text-code-sm shadow-sm">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Available for Strategic AI Consulting
            </div>
            <h1 className="font-headline-xl text-headline-xl mb-6 tracking-tight">
              <span className="text-on-surface">Architecting the Future of</span>
              <br />
              <span className="text-gradient">Generative AI & Agentic Systems</span>
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mb-10">
              Full-Stack AI Engineer specializing in production-grade RAG solutions,
              multi-agent architectures, end-to-end LLM applications, and modern UI
              development with React and TypeScript. Building intelligent interfaces
              that bridge complex AI systems with seamless user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/Chiranjeev_GenAI_5+years.pdf"
                download
                className="px-8 py-4 bg-primary text-on-primary font-label-caps text-label-caps rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
              >
                <span className="material-symbols-outlined">download</span>
                Download Resume (PDF)
              </a>
              <Link
                to="/experience"
                className="px-8 py-4 bg-white/60 backdrop-blur-md border border-white text-on-surface font-label-caps text-label-caps rounded-xl flex items-center justify-center gap-2 hover:bg-white/80 transition-all shadow-sm"
              >
                View Experience
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg"
          id="about"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            <div className="md:col-span-2 glass-card-light p-10 rounded-xl glow-hover-light transition-all">
              <h2 className="font-headline-lg text-headline-lg text-primary mb-6">
                Strategic Consultant
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                I bridge the gap between complex AI architecture and polished user
                interfaces. With a Master's from Liverpool John Moores University and
                extensive experience at{" "}
                <span className="text-on-surface font-semibold">Deloitte</span> and{" "}
                <span className="text-on-surface font-semibold">Tredence</span>, I lead
                the delivery of GenAI COE projects while building modern full-stack
                applications with React, TypeScript, and Tailwind CSS.
              </p>
            </div>
            <div className="glass-card-light p-10 rounded-xl glow-hover-light transition-all flex flex-col justify-between">
              <div>
                <div className="font-label-caps text-label-caps text-secondary mb-2">
                  EDUCATION
                </div>
                <div className="font-headline-lg text-headline-lg text-on-surface mb-2 tracking-tighter">
                  Master's in ML & AI
                </div>
                <div className="font-body-md text-body-md text-on-surface-variant">
                  Liverpool John Moores University
                </div>
              </div>
              <div className="mt-8 border-t border-white/50 pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-primary">school</span>
                  </div>
                  <div>
                    <div className="font-body-md text-body-md text-on-surface">
                      IIIT Bangalore
                    </div>
                    <div className="font-code-sm text-code-sm text-on-surface-variant">
                      Postgrad, 3.5/4.0 GPA
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-24"
          id="projects"
        >
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="font-label-caps text-label-caps text-secondary">
                PORTFOLIO
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mt-2">
                Production-Grade AI
              </h2>
            </div>
            <div className="hidden md:block">
              <span className="font-code-sm text-code-sm text-on-surface-variant">
                Curated High-Impact Deployments
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Project 1 */}
            <div className="glass-card-light rounded-xl overflow-hidden group border-none">
              <div className="h-48 overflow-hidden bg-slate-200 relative">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[64px] text-primary/40">
                    account_balance
                  </span>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/60 text-primary rounded-lg font-code-sm text-code-sm backdrop-blur-md border border-white shadow-sm">
                  Enterprise
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">
                  RFP Automation System
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">
                  Architected an enterprise proposal generation system using Azure OpenAI
                  and Azure AI Search. Reduced turnaround time by 50%.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white/60 text-on-surface-variant rounded-lg font-code-sm text-code-sm border border-white shadow-sm">
                    Azure OpenAI
                  </span>
                  <span className="px-2 py-1 bg-white/60 text-on-surface-variant rounded-lg font-code-sm text-code-sm border border-white shadow-sm">
                    RAG
                  </span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="glass-card-light rounded-xl overflow-hidden group border-none">
              <div className="h-48 overflow-hidden bg-slate-200 relative">
                <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[64px] text-secondary/40">
                    database
                  </span>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/60 text-secondary rounded-lg font-code-sm text-code-sm backdrop-blur-md border border-white shadow-sm">
                  Analytics
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">
                  NLQ-to-SQL Agent
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">
                  Developed a multi-agent system in Dataiku enabling natural language
                  querying of enterprise databases with automated evaluation metrics.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white/60 text-on-surface-variant rounded-lg font-code-sm text-code-sm border border-white shadow-sm">
                    Dataiku
                  </span>
                  <span className="px-2 py-1 bg-white/60 text-on-surface-variant rounded-lg font-code-sm text-code-sm border border-white shadow-sm">
                    Agentic AI
                  </span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="glass-card-light rounded-xl overflow-hidden group border-none">
              <div className="h-48 overflow-hidden bg-slate-200 relative">
                <div className="w-full h-full bg-gradient-to-br from-primary/30 to-tertiary/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[64px] text-primary/40">
                    compare_arrows
                  </span>
                </div>
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/60 text-tertiary rounded-lg font-code-sm text-code-sm backdrop-blur-md border border-white shadow-sm">
                  Automation
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-3">
                  Item Matching Solution
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-3">
                  End-to-end catalog normalization for retail giants using LLM-based
                  extraction and rule-based reconciliation.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-white/60 text-on-surface-variant rounded-lg font-code-sm text-code-sm border border-white shadow-sm">
                    Python
                  </span>
                  <span className="px-2 py-1 bg-white/60 text-on-surface-variant rounded-lg font-code-sm text-code-sm border border-white shadow-sm">
                    NLP
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="bg-surface py-24 border-y border-white/50" id="skills">
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div className="text-center mb-16">
              <span className="font-label-caps text-label-caps text-primary">
                TECH STACK
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mt-2">
                Expertise & Frameworks
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                { label: "Python", color: "primary" },
                { label: "LLMs", color: "secondary" },
                { label: "RAG", color: "primary" },
                { label: "LangChain", color: "default" },
                { label: "Azure OpenAI", color: "default" },
                { label: "Dataiku", color: "default" },
                { label: "Multi-Agent Orchestration", color: "secondary" },
                { label: "PyTorch", color: "default" },
                { label: "Vector Search", color: "default" },
                { label: "Agentic Systems", color: "primary" },
              ].map((skill) => (
                <span
                  key={skill.label}
                  className={`px-6 py-3 rounded-full border font-code-sm text-code-sm glow-hover-light transition-all cursor-default shadow-sm ${
                    skill.color === "primary"
                      ? "border-primary/20 bg-white/60 text-primary"
                      : skill.color === "secondary"
                      ? "border-secondary/20 bg-white/60 text-secondary"
                      : "border-white bg-white/60 text-on-surface"
                  }`}
                >
                  {skill.label}
                </span>
              ))}
            </div>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "Deloitte", label: "Current Consultant" },
                { value: "Distinction", label: "Master's Degree" },
                { value: "1500", label: "Practitioners Trained" },
                { value: "$5M+", label: "Forecast Opportunity" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-6 glass-card-light rounded-xl">
                  <div className="font-headline-lg text-headline-lg text-on-surface mb-1">
                    {stat.value}
                  </div>
                  <div className="font-label-caps text-label-caps text-on-surface-variant">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}