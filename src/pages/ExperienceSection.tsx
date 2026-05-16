export default function ExperienceSection() {
  const timeline = [
    {
      company: "Deloitte",
      role: "Data Science Consultant",
      period: "Oct 2024 – Present",
      color: "bg-primary",
      textColor: "text-primary",
      featured:
        "Bechtel GenAI RFP project contributing to ~$1M initial scope. Delivered production-ready Agentic AI solutions reducing proposal turnaround from 4 weeks to 2 weeks.",
      highlights: [
        'Architected <span class="text-primary font-semibold">NLQ-to-SQL agent</span> in Dataiku for natural language enterprise querying.',
        "Led incubator GenAI COE projects: RAG, multi-agent frameworks, MCP across Azure & AWS.",
        "Implemented enterprise proposal system with Azure AI Search.",
      ],
    },
    {
      company: "Tredence Inc.",
      role: "Data Scientist",
      period: "May 2023 – Oct 2024",
      color: "bg-secondary",
      textColor: "text-secondary",
      highlights: [
        "Developed item-matching solution for supermarkets using LLM extraction, reducing manual work by 60%.",
        "Benchmarked GenAI platforms (Dataiku, Databricks, Vertex AI) for vector search latency.",
      ],
    },
    {
      company: "Soroco",
      role: "ML Software Engineer",
      period: "Dec 2021 – Apr 2023",
      color: "bg-outline",
      textColor: "text-on-surface-variant",
      highlights: [
        "Developed ML models and feature pipelines for behavioral data analysis and A/B testing.",
      ],
    },
    {
      company: "Tata Consultancy Services",
      role: "Associate Software Developer",
      period: "Nov 2020 – Dec 2021",
      color: "bg-outline",
      textColor: "text-on-surface-variant",
      highlights: [
        "Built cloud-native services using Azure App Services and REST APIs.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-on-background dark:bg-[#131313] selection:bg-primary/20">
      <main className="pt-28 pb-stack-lg max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col lg:flex-row gap-gutter">
          <section className="lg:w-2/3">
            <div className="mb-stack-lg">
              <h1 className="font-headline-xl text-headline-xl text-[var(--on-surface)] mb-2">Professional Journey</h1>
              <p className="text-[var(--on-surface-variant)] font-body-md font-semibold">Architecting Generative AI & Agentic Systems</p>
            </div>
            <div className="relative pl-8">
              <div className="absolute left-0 top-2 bottom-0 w-px timeline-line opacity-40"></div>
              {timeline.map((item, i) => (
                <div key={item.company} className="relative mb-12 last:mb-0">
                  <div className={`absolute -left-[36px] top-2 w-4 h-4 ${item.color} rounded-full border-4 border-background dark:border-[#131313] ${i === 0 ? "glow-ice" : ""}`}></div>
                  <div className={`glass-card-light p-stack-lg rounded-xl ${i === 0 ? "glow-ice" : ""}`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-stack-md">
                      <div>
                        <h3 className="font-headline-lg text-headline-lg text-[var(--on-surface)] font-bold">{item.company}</h3>
                        <p className={`font-code-sm text-code-sm ${item.textColor} font-bold tracking-widest uppercase`}>{item.role}</p>
                      </div>
                      <span className="font-label-caps text-label-caps text-on-surface-variant bg-white/40 px-3 py-1 rounded-full border border-white/60 mt-2 md:mt-0 dark:bg-white/10 dark:border-white/10">
                        {item.period}
                      </span>
                    </div>
                    <div className="space-y-stack-md">
                      {item.featured && (
                        <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-lg dark:bg-[#d0bcff]/5">
                          <p className="font-body-md text-[var(--on-surface)]"><span className="text-primary dark:text-[#d0bcff] font-bold">Featured:</span> {item.featured}</p>
                        </div>
                      )}
                      <ul className="list-none space-y-3">
                        {item.highlights.map((h, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="material-symbols-outlined text-primary dark:text-[#d0bcff] text-[18px] shrink-0">{i < 2 ? "check_circle" : "arrow_forward"}</span>
                            <p className="text-[var(--on-surface)]" dangerouslySetInnerHTML={{ __html: h }} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <aside className="lg:w-1/3 space-y-gutter">
            <div className="glass-card-light p-stack-lg rounded-xl">
              <div className="flex items-center gap-stack-md mb-stack-lg">
                <span className="material-symbols-outlined text-primary dark:text-[#d0bcff]">school</span>
                <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)] font-bold">Education</h2>
              </div>
              <div className="space-y-stack-lg">
                {[
                  { label: "Master's Degree", school: "Liverpool John Moores University", detail: "Machine Learning and AI &bull; 73% (Distinction)" },
                  { label: "Postgraduate Degree", school: "IIIT Bangalore", detail: "ML & AI &bull; Grade: 3.5/4.0" },
                  { label: "Bachelor of Engineering", school: "BIT Mesra", detail: "Computer Science &bull; Grade: 7.8/10 CGPA" },
                ].map((e, i) => (
                  <div key={e.label}>
                    {i > 0 && <div className="border-t border-white/60 pt-4 dark:border-white/10" />}
                    <p className="font-label-caps text-label-caps text-primary dark:text-[#d0bcff] font-bold mb-1">{e.label}</p>
                    <h4 className="font-body-md font-bold text-[var(--on-surface)]">{e.school}</h4>
                    <p className="text-[var(--on-surface-variant)] text-sm font-medium">{e.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card-light p-stack-lg rounded-xl">
              <div className="flex items-center gap-stack-md mb-stack-lg">
                <span className="material-symbols-outlined text-secondary dark:text-[#4cd7f6]">verified</span>
                <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)] font-bold">Certifications</h2>
              </div>
              <div className="grid grid-cols-1 gap-stack-md">
                {[
                  { initial: "N", title: "Certified Agentic AI", org: "NVIDIA", cls: "bg-primary/10 text-primary" },
                  { initial: "G", title: "Generative AI For Leaders", org: "Google", cls: "bg-secondary/10 text-secondary" },
                  { initial: "D", title: "GenAI Practitioner", org: "Dataiku", cls: "bg-tertiary/10 text-tertiary" },
                  { initial: "M", title: "Azure Data Scientist", org: "Microsoft", cls: "bg-primary/10 text-primary" },
                ].map((cert) => (
                  <div key={cert.title} className="flex items-center gap-3 p-3 bg-white/40 rounded-lg border border-white/60 dark:bg-white/5 dark:border-white/10">
                    <div className={`w-8 h-8 flex items-center justify-center rounded font-bold ${cert.cls}`}>{cert.initial}</div>
                    <div>
                      <p className="text-sm font-bold text-[var(--on-surface)]">{cert.title}</p>
                      <p className="text-xs text-[var(--on-surface-variant)] font-medium">{cert.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}