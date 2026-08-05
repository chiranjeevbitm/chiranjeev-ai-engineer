import { motion } from "framer-motion";
import { Award, BookOpen, ExternalLink, Calendar, Newspaper, TrendingUp, ChevronRight } from "lucide-react";
import { certifications } from "../data/projects";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const timelineEntry = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export default function ExperienceSection() {
  const timeline = [
    {
      company: "Deloitte",
      role: "Data Science Consultant",
      period: "Oct 2024 – Present",
      color: "bg-primary",
      textColor: "text-primary",
      logo: "D",
      featured:
        "Client GenAI RFP project contributing to ~$1M initial scope. Delivered production-ready Agentic AI solutions reducing proposal turnaround from 4 weeks to 2 weeks.",
      highlights: [
        'Architected NLQ-to-SQL agent in Dataiku for natural language enterprise querying.',
        "Led incubator GenAI COE projects: RAG, multi-agent frameworks, MCP across Azure & AWS.",
        "Built Copilot Core SDK — production-grade async multi-tenant engine with OPEV loop, Kahn's-algorithm scheduler, and Lossless Context Management.",
        "Delivered Revit Copilot Agent — first production use case: AI copilot inside Autodesk Revit with Apply-then-Review safety workflow.",
        "Architected AI-Tracing Platform — generic agent platform + domain adapter pattern enabling zero-code Azure migration.",
        "Implemented enterprise proposal system with Azure AI Search.",
        "Led end-to-end delivery of production-grade GenAI systems handling enterprise-scale workloads with microservices orchestration (Postgres, Redis, RabbitMQ, Azure Service Bus).",
        "Designed hexagonal architecture for maximum portability — zero-code migration across cloud environments via dependency injection and env swaps.",
        "Managed cross-functional teams as technical lead, coordinating between architects, domain experts, and platform engineers to ship production releases.",
        "Established engineering best practices: import boundary enforcement via CI tests, stateless workers for horizontal scaling, and exactly-once semantics on at-least-once transport.",
        "Received Outstanding Performance Award for GenAI contributions.",
      ],
    },
    {
      company: "Tredence Inc.",
      role: "Data Scientist",
      period: "May 2023 – Oct 2024",
      color: "bg-secondary",
      textColor: "text-secondary",
      logo: "T",
      highlights: [
        "Developed item-matching solution for supermarkets using LLM extraction, reducing manual work by 60%.",
        "Benchmarked GenAI platforms (Dataiku, Databricks, Vertex AI) for vector search latency.",
        "Received 'Pat on the Back' award for Catalog Normalization automation.",
        "Completed GenAI Byte-Sized program with practical application focus.",
      ],
    },
    {
      company: "Soroco",
      role: "ML Software Engineer",
      period: "Dec 2021 – Apr 2023",
      color: "bg-outline",
      textColor: "text-on-surface-variant",
      logo: "S",
      highlights: [
        "Developed ML models and feature pipelines for behavioral data analysis and A/B testing.",
        "Worked on large-scale data analysis for enterprise process mining.",
      ],
    },
    {
      company: "Tata Consultancy Services",
      role: "Associate Software Developer",
      period: "Nov 2020 – Dec 2021",
      color: "bg-outline",
      textColor: "text-on-surface-variant",
      logo: "T",
      highlights: [
        "Built cloud-native services using Azure App Services and REST APIs.",
        "Microsoft Azure certified — AI Fundamentals and Azure Fundamentals.",
      ],
    },
  ];

  const articles = [
    {
      title: "Challenges in Building Production-Grade GenAI Applications And How to Mitigate Them",
      platform: "LinkedIn",
      impressions: "450+",
      date: "~3 months ago",
      link: "https://linkedin.com/in/chiranjeev-kumar-07071997",
    },
    {
      title: "The Future is Here: From Vibe Coding to AI Agents – My $0 OpenClaw Journey",
      platform: "LinkedIn",
      impressions: "789",
      date: "~3 months ago",
      link: "https://linkedin.com/in/chiranjeev-kumar-07071997",
    },
    {
      title: "My Journey into Physical AI and Robotic Arms with LeRobot",
      platform: "LinkedIn",
      impressions: "1,214",
      date: "~9 months ago",
      link: "https://linkedin.com/in/chiranjeev-kumar-07071997",
    },
    {
      title: "My Epic Journey Through the GenAI Exchange Program",
      platform: "Medium",
      impressions: "351",
      date: "2025",
      link: "https://medium.com/@chiranjeevkumar47",
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
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="relative pl-8"
            >
              <div className="absolute left-0 top-2 bottom-0 w-px timeline-line opacity-40"></div>
              {timeline.map((item, i) => (
                <motion.div key={item.company} variants={timelineEntry} className="relative mb-12 last:mb-0">
                  <div className={`absolute -left-[36px] top-2 w-5 h-5 ${item.color} rounded-full border-4 border-background dark:border-[#131313] ${i === 0 ? "glow-ice" : ""} flex items-center justify-center`}>
                    <span className="text-[8px] text-white font-bold">{item.logo}</span>
                  </div>
                  <div className={`glass-card-light p-stack-lg rounded-xl ${i === 0 ? "glow-ice" : ""}`}>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-stack-md">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-headline-lg text-headline-lg text-[var(--on-surface)] font-bold">{item.company}</h3>
                          {i === 0 && (
                            <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/30 text-green-400 text-[10px] rounded-full font-code-sm">Current</span>
                          )}
                        </div>
                        <p className={`font-code-sm text-code-sm ${item.textColor} font-bold tracking-widest uppercase`}>{item.role}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 font-label-caps text-label-caps text-on-surface-variant bg-white/40 px-3 py-1 rounded-full border border-white/60 mt-2 md:mt-0 dark:bg-white/10 dark:border-white/10">
                        <Calendar className="w-3 h-3" /> {item.period}
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
                            <p className="text-[var(--on-surface)]">{h}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>
          <aside className="lg:w-1/3 space-y-gutter">
            {/* Education */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card-light p-stack-lg rounded-xl"
            >
              <div className="flex items-center gap-3 mb-stack-lg">
                <BookOpen className="w-6 h-6 text-primary dark:text-[#d0bcff]" />
                <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)] font-bold">Education</h2>
              </div>
              <div className="space-y-stack-lg">
                {[
                  { label: "Master's Degree", school: "Liverpool John Moores University", detail: "Machine Learning and AI • 73% (Distinction)", highlight: "73% Distinction" },
                  { label: "Postgraduate Degree", school: "IIIT Bangalore", detail: "ML & AI • Grade: 3.5/4.0", highlight: "3.5/4.0 GPA" },
                  { label: "Bachelor of Engineering", school: "BIT Mesra", detail: "Computer Science • 7.8/10 CGPA", highlight: "7.8/10" },
                ].map((e, i) => (
                  <motion.div
                    key={e.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    {i > 0 && <div className="border-t border-white/60 pt-4 dark:border-white/10" />}
                    <p className="font-label-caps text-label-caps text-primary dark:text-[#d0bcff] font-bold mb-1">{e.label}</p>
                    <h4 className="font-body-md font-bold text-[var(--on-surface)]">{e.school}</h4>
                    <p className="text-[var(--on-surface-variant)] text-sm font-medium">{e.detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications - Compact Preview */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card-light p-stack-lg rounded-xl"
            >
              <div className="flex items-center gap-3 mb-stack-lg">
                <Award className="w-6 h-6 text-secondary dark:text-[#4cd7f6]" />
                <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)] font-bold">Certifications</h2>
                <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-white/60 dark:bg-white/10 text-[var(--on-surface-variant)] font-code-sm">
                  {certifications.length}
                </span>
              </div>

              {/* Featured Certification */}
              {(() => {
                const featured = certifications.find(c => c.title === "Certified Agentic AI") || certifications[0];
                const Card = featured.link ? 'a' : 'div';
                const cardProps = featured.link ? { href: featured.link, target: "_blank", rel: "noopener noreferrer" } : {};
                return (
                  <Card
                    {...cardProps}
                    className={`flex items-center gap-3 p-3 bg-white/40 rounded-xl border border-white/60 dark:bg-white/5 dark:border-white/10 mb-4 ${
                      featured.link ? 'cursor-pointer hover:bg-white/80 dark:hover:bg-white/10 hover:border-primary/30 transition-all' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm border shrink-0 ${featured.cls}`}>
                      {featured.initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[var(--on-surface)] truncate">{featured.title}</p>
                      <p className="text-[10px] text-[var(--on-surface-variant)]">{featured.org} • {featured.year}</p>
                    </div>
                    {featured.link && (
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--on-surface-variant)]/50 shrink-0" />
                    )}
                    <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse shrink-0" />
                  </Card>
                );
              })()}

              {/* Quick Stats Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  { key: "nvidia-genai", label: "NVIDIA", icon: "🚀", color: "text-purple-400", bgColor: "bg-purple-500/10" },
                  { key: "google-cloud", label: "Google", icon: "☁️", color: "text-blue-400", bgColor: "bg-blue-500/10" },
                  { key: "microsoft-azure", label: "Azure", icon: "📦", color: "text-sky-400", bgColor: "bg-sky-500/10" },
                  { key: "ai-skills", label: "AI Skills", icon: "🧠", color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
                ].map((group) => {
                  const count = certifications.filter(c => c.category === group.key).length;
                  return (
                    <span key={group.key} className={`inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full ${group.bgColor} ${group.color} font-code-sm`}>
                      <span>{group.icon}</span>
                      <span>{group.label}</span>
                      <span className="opacity-70">({count})</span>
                    </span>
                  );
                })}
              </div>

              <a
                href="/#certifications"
                className="inline-flex items-center gap-1 text-primary dark:text-[#d0bcff] text-sm font-code-sm hover:underline group"
              >
                View all {certifications.length} certifications <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Articles & Thought Leadership */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card-light p-stack-lg rounded-xl"
            >
              <div className="flex items-center gap-3 mb-stack-lg">
                <Newspaper className="w-6 h-6 text-primary dark:text-[#d0bcff]" />
                <h2 className="font-headline-lg text-headline-lg text-[var(--on-surface)] font-bold">Articles & Insights</h2>
              </div>
              <div className="space-y-3">
                {articles.map((article, i) => (
                  <motion.a
                    key={i}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.3 }}
                    className="block p-3 bg-white/40 rounded-lg border border-white/60 hover:bg-white/80 transition-all dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 group"
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[var(--on-surface)] group-hover:text-primary dark:group-hover:text-[#d0bcff] transition-colors line-clamp-2">
                          {article.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-[var(--on-surface-variant)] bg-white/60 px-1.5 py-0.5 rounded dark:bg-white/10">{article.platform}</span>
                          <span className="text-[10px] text-[var(--on-surface-variant)] flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> {article.impressions} impressions
                          </span>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-[var(--on-surface-variant)] shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.a>
                ))}
              </div>
              <a
                href="https://linkedin.com/in/chiranjeev-kumar-07071997"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary dark:text-[#d0bcff] text-sm font-code-sm mt-4 hover:underline"
              >
                Follow on LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </aside>
        </div>
      </main>
    </div>
  );
}
