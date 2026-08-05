import PageTransition from "../components/PageTransition";

export default function Experience() {
  return (
    <PageTransition>
    <div className="bg-background text-on-surface min-h-screen bg-grid-light selection:bg-primary/20">
      <main className="pt-32 pb-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col lg:flex-row gap-gutter">
          {/* Timeline Section */}
          <section className="lg:w-2/3">
            <div className="mb-stack-lg">
              <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">
                Professional Journey
              </h1>
              <p className="text-on-surface-variant font-body-md font-semibold">
                Architecting Generative AI & Agentic Systems
              </p>
            </div>
            <div className="relative pl-8">
              {/* Vertical Timeline Line */}
              <div className="absolute left-0 top-2 bottom-0 w-px timeline-line opacity-40"></div>

              {/* Deloitte */}
              <div className="relative mb-12">
                <div className="absolute -left-[36px] top-2 w-4 h-4 bg-primary rounded-full border-4 border-background glow-ice"></div>
                <div className="glass-card-light p-stack-lg rounded-xl glow-ice">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-stack-md">
                    <div>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                        Deloitte
                      </h3>
                      <p className="font-code-sm text-code-sm text-primary font-bold tracking-widest uppercase">
                        Data Science Consultant
                      </p>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant bg-white/40 px-3 py-1 rounded-full border border-white/60 mt-2 md:mt-0">
                      Oct 2024 – Present
                    </span>
                  </div>
                  <div className="space-y-stack-md text-on-surface-variant">
                    <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-lg">
                      <p className="font-body-md text-on-surface">
                        <span className="text-primary font-bold">Featured:</span>{" "}
                        Client GenAI RFP project contributing to ~$1M initial scope.
                        Delivered production-ready Agentic AI solutions reducing
                        proposal turnaround from 4 weeks to 2 weeks. $5M+ pipeline
                        opportunity forecast across GBUs.
                      </p>
                    </div>
                    <ul className="list-none space-y-3">
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Led the GenAI COE Incubator — built multiple POCs and production pipelines across RAG, multi-agent frameworks, and MCP (server/client) deployments on Azure, NVIDIA DGX, and AWS.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Architected an RFP Automation System end-to-end: content extraction → chunking → vector indexing → Azure OpenAI inference → Azure AI Search, powering enterprise proposal generation and similarity-based retrieval.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Developed an NLQ-to-SQL Multi-Agentic System enabling business users to query enterprise databases in plain English — with automated evaluation metrics (SQL correctness, latency) and output visualizations integrated into Dataiku Flow.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Managed full production lifecycle: model/version management, prompt versioning, Azure Monitor / Insights, and incident escalation — improving response stability for GenAI apps at scale.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Conducted multiple multi-agent & RAG trainings for 1500 AI practitioners across the organization.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Built Copilot Core SDK — production-grade async multi-tenant engine with OPEV loop, Kahn's-algorithm scheduler, Lossless Context Management, and Agent-as-a-service on a message bus.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Deployed the SDK as a live AI Copilot inside Autodesk Revit — serving 500+ developers on real BIM models with Apply-then-Review safety workflow and WebSocket bridge.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Built AI-Tracing Platform — single trace_id riding the message bus across gateway + orchestrator + every worker for a complete MLflow waterfall per request plus billing-grade usage ledger.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Currently exploring Physical AI & Robotics — running imitation learning and policy training pipelines with LeRobot (Hugging Face) on physical robotic arms (SO-100, Koch v1.1).
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Investigating NVIDIA Isaac Sim for photorealistic sim-to-real transfer and synthetic data generation.
                        </p>
                      </li>
                      <li className="flex gap-3">
                        <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                          check_circle
                        </span>
                        <p className="text-on-surface">
                          Received Outstanding Performance Award 2025, Applause Award 2026, and Best Performer Award 2025.
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Tredence */}
              <div className="relative mb-12">
                <div className="absolute -left-[36px] top-2 w-4 h-4 bg-secondary rounded-full border-4 border-background shadow-[0_0_15px_rgba(2,132,199,0.3)]"></div>
                <div className="glass-card-light p-stack-lg rounded-xl">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-stack-md">
                    <div>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                        Tredence Inc.
                      </h3>
                      <p className="font-code-sm text-code-sm text-secondary font-bold tracking-widest uppercase">
                        Data Scientist
                      </p>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant bg-white/40 px-3 py-1 rounded-full border border-white/60 mt-2 md:mt-0">
                      May 2023 – Oct 2024
                    </span>
                  </div>
                  <ul className="list-none space-y-3 text-on-surface">
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">
                        arrow_forward
                      </span>
                      <p>
                        Developed end-to-end item-matching solution for supermarkets
                        using LLM-based extraction, reducing manual work by 60%.
                      </p>
                    </li>
                    <li className="flex gap-3">
                      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">
                        arrow_forward
                      </span>
                      <p>
                        Benchmarked GenAI platforms (Dataiku, Databricks, Vertex AI) for
                        vector search latency and model throughput.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Soroco */}
              <div className="relative mb-12">
                <div className="absolute -left-[36px] top-2 w-4 h-4 bg-outline rounded-full border-4 border-background"></div>
                <div className="glass-card-light p-stack-lg rounded-xl opacity-90 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-stack-md">
                    <div>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                        Soroco
                      </h3>
                      <p className="font-code-sm text-code-sm text-on-surface-variant font-bold tracking-widest uppercase">
                        ML Software Engineer
                      </p>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant mt-2 md:mt-0">
                      Dec 2021 – Apr 2023
                    </span>
                  </div>
                  <p className="text-on-surface">
                    Developed ML models and feature pipelines for large-scale behavioral
                    data analysis and A/B testing frameworks.
                  </p>
                </div>
              </div>

              {/* TCS */}
              <div className="relative">
                <div className="absolute -left-[36px] top-2 w-4 h-4 bg-outline rounded-full border-4 border-background"></div>
                <div className="glass-card-light p-stack-lg rounded-xl opacity-90 hover:opacity-100 transition-opacity">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-stack-md">
                    <div>
                      <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                        Tata Consultancy Services
                      </h3>
                      <p className="font-code-sm text-code-sm text-on-surface-variant font-bold tracking-widest uppercase">
                        Associate Software Developer
                      </p>
                    </div>
                    <span className="font-label-caps text-label-caps text-on-surface-variant mt-2 md:mt-0">
                      Nov 2020 – Dec 2021
                    </span>
                  </div>
                  <p className="text-on-surface">
                    Built cloud-native services using Azure App Services and REST APIs;
                    performed ETL for enterprise ingest pipelines.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar */}
          <aside className="lg:w-1/3 space-y-gutter">
            {/* Education Card */}
            <div className="glass-card-light p-stack-lg rounded-xl">
              <div className="flex items-center gap-stack-md mb-stack-lg">
                <span className="material-symbols-outlined text-primary">school</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                  Education
                </h2>
              </div>
              <div className="space-y-stack-lg">
                <div>
                  <p className="font-label-caps text-label-caps text-primary font-bold mb-1">
                    Master's Degree
                  </p>
                  <h4 className="font-body-md font-bold text-on-surface">
                    Liverpool John Moores University
                  </h4>
                  <p className="text-on-surface-variant text-sm font-medium">
                    Machine Learning and AI
                  </p>
                </div>
                <div className="border-t border-white/60 pt-4">
                  <p className="font-label-caps text-label-caps text-primary font-bold mb-1">
                    Postgraduate Degree
                  </p>
                  <h4 className="font-body-md font-bold text-on-surface">
                    IIIT Bangalore
                  </h4>
                  <p className="text-on-surface-variant text-sm font-medium">
                    ML & AI • Grade: 3.5/4.0
                  </p>
                </div>
                <div className="border-t border-white/60 pt-4">
                  <p className="font-label-caps text-label-caps text-primary font-bold mb-1">
                    Bachelor of Engineering
                  </p>
                  <h4 className="font-body-md font-bold text-on-surface">
                    BIT Mesra
                  </h4>
                  <p className="text-on-surface-variant text-sm font-medium">
                    Computer Science • Grade: 7.8/10 CGPA
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="glass-card-light p-stack-lg rounded-xl">
              <div className="flex items-center gap-stack-md mb-stack-lg">
                <span className="material-symbols-outlined text-secondary">
                  verified
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold">
                  Certifications
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-stack-md">
                {[
                  { initial: "C", title: "Claude Certified Architect", org: "Anthropic", colorClass: "bg-orange-500/10 text-orange-400" },
                  { initial: "C", title: "Claude Certified Associate", org: "Anthropic", colorClass: "bg-orange-500/10 text-orange-400" },
                  { initial: "N", title: "NVIDIA Certified Professional — Agentic AI", org: "NVIDIA", colorClass: "bg-primary/10 text-primary" },
                  { initial: "N", title: "NVIDIA Certified Associate — GenAI LLMs", org: "NVIDIA", colorClass: "bg-primary/10 text-primary" },
                ].map((cert) => (
                  <div
                    key={cert.title}
                    className="flex items-center gap-3 p-3 bg-white/40 rounded-lg border border-white/60"
                  >
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded font-bold ${cert.colorClass}`}
                    >
                      {cert.initial}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">
                        {cert.title}
                      </p>
                      <p className="text-xs text-on-surface-variant font-medium">
                        {cert.org}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Insight */}
            <div className="relative overflow-hidden group glass-card-light p-stack-lg rounded-xl border-primary/30">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <span className="material-symbols-outlined text-[100px] text-primary">
                  psychology
                </span>
              </div>
              <h3 className="font-label-caps text-label-caps text-primary font-bold mb-stack-sm">
                Technical Pulse
              </h3>
              <p className="font-body-md text-on-surface font-semibold relative z-10">
                Expert in Vibe coding (Cursor/Windsurf) and multi-agent orchestration.
                Transforming complex data into agentic intelligence.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
    </PageTransition>
  );
}
