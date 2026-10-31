export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl?: string;
  caseStudyUrl?: string;
  image?: string;
  featured: boolean;
  status?: string;
  impact: { metric: string; value: string }[];
  links: { demo?: string; github?: string; article?: string };
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  langColor: string;
  updated: string;
}

export const projects: Project[] = [
  {
    id: "ap-invoice-hold-resolution",
    title: "AP Invoice Hold Resolution",
    tagline: "Multi-Agent Investigation of Held Supplier Invoices",
    description:
      "An AI multi-agent system that investigates held supplier invoices and hands AP analysts a cited root-cause report and a ready-to-send supplier email, replacing manual cross-checking of POs, goods receipts and invoices. A LangGraph orchestrator routes each hold code to one of six specialist agents, which reason over PO, GR and invoice data with GPT-4o and stream a structured report section by section over Server-Sent Events. An Email Agent drafts the supplier resolution email. Includes a dashboard with aging buckets and SLA status, a priority queue, comment threads with @mentions, and prompt-template versioning with thumbs feedback.",
    category: "GenAI",
    tags: ["LangGraph", "LangChain", "GPT-4o", "FastAPI", "React 19", "SSE", "Multi-Agent"],
    image: "/images/opt/ap-invoice-hold-resolution.jpg",
    featured: true,
    status: "Live in production",
    impact: [
      { metric: "Agents", value: "6 + 1 Email" },
      { metric: "API", value: "29 REST + SSE" },
      { metric: "Streaming", value: "Cited root cause" },
      { metric: "Test Coverage", value: "80%+ target" }
    ],
    links: {}
  },
  {
    id: "doctor-appointment-form",
    title: "Arogya Rx — Clinic Prescription Platform",
    tagline: "30-second bilingual prescriptions for clinics",
    description:
      "Clinic software for busy OPDs in Bihar and UP that produces a prescription on the doctor's own letterhead in about 30 seconds, prints generic names in capitals as NMC asks, and sends Hindi dose timings to the patient on WhatsApp. Built with a working clinic in Muzaffarpur: the print view is rebuilt pixel for pixel from the paper parchi, with a 205,507-medicine search that includes Jan Aushadhi prices, allergy and duplicate-drug checks, vitals with instant red flags, eight chronic-disease profiles, one-tap diagnosis templates, token queue and a patient timeline with HbA1c and BP trends. The core runs live at Arogya Clinic (React 19, FastAPI, PostgreSQL). The new build adds Hinglish voice-to-prescription and photo intake of old prescriptions, with the doctor confirming every line before anything prints. The public demo is a fully clickable app and landing site that runs in the browser on sample data.",
    category: "Data Engineering",
    tags: ["Healthcare", "Hindi + English", "WhatsApp", "Voice-to-Rx", "Jan Aushadhi", "React", "FastAPI", "PostgreSQL"],
    githubUrl: "https://github.com/chiranjeevbitm/arogya-rx-demo",
    image: "/images/opt/arogya-rx.jpg",
    featured: true,
    status: "Live demo",
    impact: [
      { metric: "Medicines searchable", value: "205,507" },
      { metric: "Parchi target", value: "< 30 seconds" },
      { metric: "Languages on every parchi", value: "English + हिंदी" },
      { metric: "Live clinic", value: "Muzaffarpur" }
    ],
    links: {
      demo: "https://arogya-rx-demo.vercel.app/",
      github: "https://github.com/chiranjeevbitm/arogya-rx-demo"
    }
  },
  {
    id: "guardian-observability-sdks",
    title: "Guardian & Observability SDKs",
    tagline: "Guardrails and Tracing for Any LangChain / Azure OpenAI App",
    description:
      "One Python package (v1.6.1) that adds guardrails and observability to LangChain and Azure OpenAI applications through MLflow, switched on by configuration rather than code changes. runner.guarded() extracts a value, runs the check, applies per-tenant policy, then passes, warns or blocks and persists the verdict. Checks include LLM-judge toxicity, hallucination, jailbreak and relevancy, plus schema, tool-call safety, rate limit and ground truth. Observability records one MLflow run per request with tokens, cost and failures, L1 PII masking with Presidio and detect-secrets, and hourly p95, burn-rate and error-pattern rollups. Azure target design: private-VNet MLflow on Container Apps, PostgreSQL, Key Vault, keyless Entra ID auth and Microsoft Foundry judge models.",
    category: "GenAI",
    tags: ["MLflow", "Guardrails", "LLM-as-Judge", "Azure", "Presidio", "Observability"],
    image: "/images/opt/guardian-observability-sdks.jpg",
    featured: true,
    status: "Built",
    impact: [
      { metric: "Guardian Features", value: "16" },
      { metric: "Observability Features", value: "10" },
      { metric: "Payload Tiers", value: "L1 / L2" },
      { metric: "Failure Mode", value: "Fail-open" }
    ],
    links: {}
  },
  {
    id: "ascend-agentic-harness",
    title: "Ascend Agentic Harness",
    tagline: "AI-Assisted Delivery Framework on Claude Code",
    description:
      "Contributed to a delivery framework that turns an ambiguous problem into shipped, tested software through three phases (orchestrate, build, validate) and nine skills, with a Plan Gate and one-module-at-a-time TDD. Judgement lives in the model while every deterministic step runs in tested Python. Added a GitHub Copilot path that maps the same skills, agents, MCP servers and rules onto Copilot, removing the 3 to 5 day wait for Claude Code access; guards move to a pre-commit hook and CI where Copilot cannot block mid-chat. Reached the Top 20 prototypes in the Agentic AI Hackathon (about 1,000 teams, as reported) with a two-person team building on the AP invoice platform.",
    category: "GenAI",
    tags: ["Claude Code", "Subagents", "TDD", "MCP", "GitHub Copilot"],
    image: "/images/opt/ascend-agentic-harness.jpg",
    featured: false,
    status: "Contributed",
    impact: [
      { metric: "Phases", value: "3 (OBV)" },
      { metric: "Skills", value: "9" },
      { metric: "Method", value: "TDD per module" },
      { metric: "Hackathon", value: "Top 20" }
    ],
    links: {}
  },
  {
    id: "ai-drawing-diff-pipeline",
    title: "AI Drawing Diff Pipeline",
    tagline: "Revision Comparison for Engineering Drawings (P&IDs, Vendor Prints, GA)",
    description:
      "A Python backend that detects and categorises changes between two revisions of an engineering drawing and returns annotated PDFs and review-ready results through a REST API. It pairs Azure Document Intelligence OCR with Azure OpenAI vision models to find both textual and geometric changes. Eight steps run end to end: render and preprocess with quality gates, Foreman-agent section planning (Rev B seeded with Rev A's section names), coarse crop and boundary refinement, a hybrid descriptor, parallel text and geometric diff paths, ReAct-loop validation of each candidate with a confidence score, highlighting, and PDF annotation. FastAPI exposes async comparisons (HTTP 202), per-step progress, reviews, approval and report download. Hybrid OCR plus vision, capped ReAct tool loops, and retry with backoff keep it resilient. It is the \"see what changed\" step of an AI change-impact analysis flow. Job state is currently held in memory, and one observed page with 8 sections took about 49 minutes.",
    category: "GenAI",
    tags: ["Azure Document Intelligence", "Azure OpenAI", "Vision", "ReAct Agents", "FastAPI", "OpenCV"],
    image: "/images/opt/ai-drawing-diff-pipeline.jpg",
    featured: false,
    status: "Worked on",
    impact: [
      { metric: "Pipeline", value: "8 steps, 9 agents" },
      { metric: "Diff Paths", value: "Text + Geometric" },
      { metric: "Validation", value: "ReAct, confidence-scored" },
      { metric: "API", value: "Async FastAPI" }
    ],
    links: {}
  },
  {
    id: "sitamarhi-health",
    title: "Sitamarhi Health Portal",
    tagline: "Full-Stack Healthcare Dashboard & Community Health Platform",
    description:
      "A comprehensive healthcare portal for Sitamarhi, Bihar, featuring a medical dashboard with real-time health metrics, patient management, resource tracking, and community health initiatives. Built with modern web technologies and deployed on Vercel for scalable access across the region.",
    category: "Data Engineering",
    tags: ["Healthcare", "Dashboard", "React", "Data Visualization", "Community Health"],
    githubUrl: "https://github.com/chiranjeevbitm/sitamarhi-health--portal",
    image: "/images/opt/medical-dashboard.jpg",
    featured: true,
    impact: [
      { metric: "Domain", value: "Healthcare" },
      { metric: "Platform", value: "Vercel" },
      { metric: "Stack", value: "Full-Stack" },
      { metric: "Focus", value: "Community Health" }
    ],
    links: {
      demo: "https://sitamarhi-health-portal.vercel.app/",
      github: "https://github.com/chiranjeevbitm/sitamarhi-health--portal"
    }
  },
  {
    id: "shikshak",
    title: "Shikshak Sahayak (शिक्षक सहायक)",
    tagline: "AI-Powered Teacher Assistant for 400K+ BSEB Teachers",
    description:
      "A comprehensive Hindi-first AI platform built in one weekend to support Bihar Board teachers with lesson planning, assessment generation, digital textbooks, and government notices aggregation. Deployed to production serving real users.",
    category: "GenAI",
    tags: ["Education", "NLP", "React", "FastAPI", "PostgreSQL", "Hindi-First"],
    githubUrl: "https://github.com/chiranjeevbitm/shikshak-Sahayak",
    image: "/images/opt/sikshak-sahayak.jpg",
    featured: true,
    impact: [
      { metric: "Target Users", value: "400K+" },
      { metric: "Build Time", value: "1 Weekend" },
      { metric: "Engagement", value: "642 Views" },
      { metric: "Languages", value: "Hindi/English" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/shikshak-Sahayak",
      article: "https://linkedin.com/in/chiranjeev-kumar-07071997"
    }
  },
  {
    id: "crag",
    title: "Multimodal CRAG",
    tagline: "Comprehensive RAG System with Multimodal Capabilities",
    description:
      "Enterprise-grade RAG system integrating document extraction, vector indexing, and generative retrieval with Azure OpenAI. Handles text, images, and structured data for comprehensive AI-powered search.",
    category: "RAG",
    tags: ["RAG", "Azure OpenAI", "LangChain", "Vector Search", "Multimodal"],
    githubUrl: "https://github.com/chiranjeevbitm/multimodal_crag",
    image: "/images/opt/multimodal-crag.jpg",
    featured: true,
    impact: [
      { metric: "Type", value: "Multimodal" },
      { metric: "Platform", value: "Azure OpenAI" },
      { metric: "Retrieval", value: "Hybrid Search" },
      { metric: "Deployment", value: "Production" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/multimodal_crag"
    }
  },
  {
    id: "rdvconet",
    title: "RDVCoNet: COVID-19 Detection",
    tagline: "Master's Thesis - Novel Ensemble Transfer Learning",
    description:
      "Developed an innovative deep learning model combining VGG16, ResNet50, and DenseNet for COVID-19 detection from chest X-rays. Achieved state-of-the-art accuracy. Published research with open-source implementation.",
    category: "Machine Learning",
    tags: ["Deep Learning", "Research", "Medical Imaging", "Transfer Learning", "TensorFlow"],
    githubUrl: "https://github.com/chiranjeevbitm/RDVCoNet",
    image: "/images/opt/rdvconet.jpg",
    featured: true,
    impact: [
      { metric: "Venue", value: "Elsevier (2021)" },
      { metric: "Performance", value: "SOTA" },
      { metric: "Status", value: "Published" },
      { metric: "Area", value: "Healthcare AI" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/RDVCoNet",
      article: "https://linkedin.com/in/chiranjeev-kumar-07071997"
    }
  },
  {
    id: "enhanced-img",
    title: "Enhanced Image Prompting",
    tagline: "Advanced Image Generation and Enhancement Pipeline",
    description:
      "LLM-based prompt engineering and diffusion model pipeline for high-quality image generation. Combines structured prompt optimization with advanced diffusion techniques for superior outputs.",
    category: "GenAI",
    tags: ["LLMs", "Diffusion", "Prompt Engineering", "Python"],
    githubUrl: "https://github.com/chiranjeevbitm/Enhanced_image_prompting",
    image: "/images/opt/enhanced-image.jpg",
    featured: false,
    impact: [
      { metric: "Type", value: "Image Gen" },
      { metric: "Approach", value: "LLM + Diffusion" },
      { metric: "Quality", value: "High-Fidelity" },
      { metric: "Automation", value: "End-to-End" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/Enhanced_image_prompting"
    }
  },
  {
    id: "medguardian",
    title: "MedGuardian",
    tagline: "AI-Powered Medical Data Guardian System",
    description:
      "Privacy-preserving ML system for secure healthcare data processing. Implements advanced techniques for medical data protection while maintaining AI model performance and accuracy.",
    category: "Machine Learning",
    tags: ["Healthcare", "Privacy", "Deep Learning", "Security"],
    githubUrl: "https://github.com/chiranjeevbitm/medguardian",
    image: "/images/opt/medguardian.jpg",
    featured: false,
    impact: [
      { metric: "Domain", value: "Healthcare" },
      { metric: "Focus", value: "Privacy-Preserving" },
      { metric: "Technique", value: "Federated Learning" },
      { metric: "Compliance", value: "HIPAA-Aligned" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/medguardian"
    }
  },
  {
    id: "resume-builder",
    title: "ATS-Friendly AI Resume Builder",
    tagline: "Intelligent Resume Builder with AI Content Optimization",
    description:
      "AI-powered resume builder that generates ATS-optimized resumes with intelligent content suggestions, formatting, and keyword optimization for better recruiter visibility.",
    category: "GenAI",
    tags: ["AI", "NLP", "React", "ATS", "Content Gen"],
    githubUrl: "https://github.com/chiranjeevbitm/Ats_friendly_AI_resume_builder",
    image: "/images/opt/ats-friendly-ai-resume.jpg",
    featured: false,
    impact: [
      { metric: "Type", value: "AI-Powered" },
      { metric: "Format", value: "ATS-Optimized" },
      { metric: "Features", value: "Smart Suggestions" },
      { metric: "Target", value: "Job Seekers" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/Ats_friendly_AI_resume_builder"
    }
  },
  {
    id: "leadership-insight",
    title: "Leadership Insight Agent",
    tagline: "Multi-Agent System for Leadership Analysis",
    description:
      "Multi-agent system that analyzes leadership traits from behavioral data and generates actionable insights. Demonstrates expertise in agentic AI architectures and behavioral analytics.",
    category: "Machine Learning",
    tags: ["Agentic AI", "Analytics", "Python", "Multi-Agent"],
    githubUrl: "https://github.com/chiranjeevbitm/Leadership-Insight-Agent",
    image: "/images/opt/ledership-insight.jpg",
    featured: false,
    impact: [
      { metric: "Architecture", value: "Multi-Agent" },
      { metric: "Data", value: "Behavioral" },
      { metric: "Output", value: "Actionable Insights" },
      { metric: "Domain", value: "Leadership" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/Leadership-Insight-Agent"
    }
  },
  {
    id: "english-quest",
    title: "English Quest — Spend Analysis",
    tagline: "AI-Powered Spend Analysis & Cost Optimisation",
    description:
      "Processed 1,050+ PO line items across 5 indirect procurement categories for a 400-person professional services firm. Identified top savings opportunities with ranged estimates using AI-driven analytics.",
    category: "Data Engineering",
    tags: ["Spend Analysis", "Data Cleaning", "Cost Optimisation", "Excel", "Python"],
    githubUrl: "https://github.com/chiranjeevbitm/english-quest",
    image: "/images/opt/english-quest.jpg",
    featured: false,
    impact: [
      { metric: "Items Processed", value: "1,050+" },
      { metric: "Categories", value: "5" },
      { metric: "Firm Size", value: "400 People" },
      { metric: "Focus", value: "Cost Savings" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/english-quest"
    }
  },
  {
    id: "doctors-profile",
    title: "Doctors Profile",
    tagline: "Full-Stack Healthcare Profile Management",
    description:
      "Full-stack web application for managing doctor profiles, appointments, and patient records with a modern responsive UI built with React and Node.js.",
    category: "Data Engineering",
    tags: ["React", "Node.js", "MongoDB", "Full-Stack"],
    githubUrl: "https://github.com/chiranjeevbitm/Doctors-Profile",
    image: "/images/opt/docto-profile.jpg",
    featured: false,
    impact: [
      { metric: "Stack", value: "Full-Stack" },
      { metric: "Frontend", value: "React" },
      { metric: "Backend", value: "Node.js" },
      { metric: "Database", value: "MongoDB" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/Doctors-Profile"
    }
  },
  {
    id: "copilot-core-sdk",
    title: "Copilot Core SDK",
    tagline: "Production-Grade Async Multi-Tenant AI Copilot Engine",
    description:
      "A production-grade, async, multi-tenant engine for building AI copilots. You bring tools + domain context; it provides the reasoning loop, orchestration, and serving fabric. Features the OPEV loop of typed decisions (Observe→Plan→Execute→Validate), verified_by clause eliminating hallucinated 'done' verdicts, Kahn's-algorithm scheduler for safe parallel execution (~2x faster), Lossless Context Management with append-only immutable log, and Agent-as-a-service with stateless workers on a message bus. Deployed as process roles — gateway / orchestrator / worker. Built with Postgres, Redis, RabbitMQ/Azure Service Bus with hexagonal ports for zero-code Azure migration.",
    category: "GenAI",
    tags: ["Agentic AI", "Multi-Tenant", "OPEV Loop", "Kahn's Algorithm", "Azure", "Redis", "Postgres", "RabbitMQ"],
    githubUrl: "https://github.com/chiranjeevbitm/copilot-core-sdk",
    image: "/images/opt/custom-built-copilot.jpg",
    featured: true,
    impact: [
      { metric: "Architecture", value: "OPEV Loop" },
      { metric: "Scheduler", value: "Kahn's Algorithm" },
      { metric: "Context", value: "Lossless LM" },
      { metric: "Deployment", value: "Gateway/Orch/Worker" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/copilot-core-sdk"
    }
  },
  {
    id: "revit-copilot-agent",
    title: "Revit Copilot Agent",
    tagline: "AI Copilot Inside Autodesk Revit — First Production Use Case",
    description:
      "The Copilot platform inside Autodesk Revit — the same chat UI docked in a pyRevit pane, plus an agent whose tools execute real IronPython on the live model. Features two universal primitives: revit_search_api (live .NET reflection = ground truth, no hallucinated members) and revit_run_script (agent-authored IronPython in one transaction with rollback). Includes Apply-then-Review (Keep/Undo) workflow with change ledger, WebSocket bridge (port 9100) with command_id correlation, identity end-to-end via gateway JWT, and deterministic trace engine for high-stakes fabrication tracing. Supports 500 developers via Redis presence registry.",
    category: "GenAI",
    tags: ["Revit", "Agentic AI", "IronPython", "WebSocket", "pyRevit", "BIM", "Autodesk"],
    githubUrl: "https://github.com/chiranjeevbitm/revit-copilot-agent",
    image: "/images/opt/revit-copilot-agent.jpg",
    featured: true,
    impact: [
      { metric: "Platform", value: "Autodesk Revit" },
      { metric: "Safety", value: "Apply-then-Review" },
      { metric: "Scale", value: "500 Developers" },
      { metric: "Bridge", value: "WebSocket Port 9100" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/revit-copilot-agent"
    }
  },
];

export const githubRepos: GitHubRepo[] = [
  {
    name: "multi-agent-framework",
    description:
      "Orchestration layer for multiple GenAI agents using LangGraph and custom tool execution.",
    language: "Python",
    langColor: "#7dd3fc",
    updated: "Updated 2d ago",
  },
  {
    name: "rag-eval-metrics",
    description:
      "A collection of scoring mechanisms for RAG systems: faithfulness, relevancy, and groundedness.",
    language: "Python",
    langColor: "#7dd3fc",
    updated: "Updated 5d ago",
  },
  {
    name: "dataiku-plugin-genai",
    description:
      "Custom plugin for Dataiku to integrate advanced prompt engineering workflows directly into visual flows.",
    language: "JavaScript",
    langColor: "#38bdf8",
    updated: "Updated 1w ago",
  },
];

export interface Certification {
  initial: string;
  title: string;
  org: string;
  year: string;
  cls: string;
  category: string;
  link?: string;
}

export const certifications: Certification[] = [
  // Anthropic - Claude Certifications
  { initial: "C", title: "Claude Certified Developer Associate", org: "Anthropic", year: "2026", cls: "bg-orange-500/10 text-orange-400 border-orange-500/20", category: "ai-skills" },
  { initial: "C", title: "Claude Certified Architect – Foundations", org: "Anthropic", year: "2026", cls: "bg-orange-500/10 text-orange-400 border-orange-500/20", category: "ai-skills", link: "https://lnkd.in/dz7HWYDb" },
  { initial: "C", title: "Claude Certified Associate – Foundations", org: "Anthropic", year: "2026", cls: "bg-orange-500/10 text-orange-400 border-orange-500/20", category: "ai-skills", link: "https://lnkd.in/dHEyJaUe" },

  // NVIDIA - Enterprise GPU & AI
  { initial: "N", title: "NVIDIA Certified Professional — Agentic AI", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20", category: "nvidia-genai", link: "https://www.linkedin.com/in/chiranjeev-kumar-07071997/overlay/Certifications/44238080/treasury?profileId=ACoAACQphUUB5mPzUPWuC613M212Ym5BXWG3qV8" },
  { initial: "N", title: "NVIDIA Certified Associate — GenAI Multimodal", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20", category: "nvidia-genai", link: "https://www.credly.com/badges/963eff76-3eba-4a9e-8be4-449651f12efe" },
  { initial: "N", title: "NVIDIA Certified Associate — GenAI LLMs", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20", category: "nvidia-genai", link: "https://www.credly.com/badges/c0bf9eca-9f56-4167-8b94-2a6b206cb1f3/public_url" },
  { initial: "N", title: "Nemo Toolkit & DGX", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20", category: "nvidia-genai" },

  // Google & Cloud AI
  { initial: "G", title: "Generative AI For Leaders", org: "Google", year: "2026", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", category: "google-cloud", link: "https://www.credly.com/badges/5973a15c-9d5a-457b-9d46-7c7efb07399b/public_url" },
  { initial: "G", title: "Advanced Data Analytics", org: "Google", year: "2024", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", category: "google-cloud", link: "http://coursera.org/account/accomplishments/professional-cert/ZYA1DUAYC112" },
  { initial: "G", title: "Conversational AI (Dialogflow CX)", org: "Google", year: "2024", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", category: "google-cloud" },
  { initial: "D", title: "GenAI Exchange Skill Badge", org: "Google Cloud", year: "2024", cls: "bg-blue-500/10 text-blue-400 border-blue-500/20", category: "google-cloud" },

  // Microsoft Azure
  { initial: "M", title: "Azure Data Scientist Associate", org: "Microsoft", year: "2024", cls: "bg-sky-500/10 text-sky-400 border-sky-500/20", category: "microsoft-azure", link: "https://learn.microsoft.com/en-us/users/chiranjeevkumar-7726/credentials/18a7a3339787584b?ref=https%3A%2F%2Fwww.linkedin.com%2F" },
  { initial: "M", title: "Azure AI Fundamentals", org: "Microsoft", year: "2020", cls: "bg-sky-500/10 text-sky-400 border-sky-500/20", category: "microsoft-azure" },
  { initial: "M", title: "Azure Fundamentals", org: "Microsoft", year: "2020", cls: "bg-sky-500/10 text-sky-400 border-sky-500/20", category: "microsoft-azure" },
  { initial: "A", title: "Career Essentials: GenAI", org: "Microsoft & LinkedIn", year: "2024", cls: "bg-sky-500/10 text-sky-400 border-sky-500/20", category: "microsoft-azure", link: "https://www.linkedin.com/learning/certificates/2bc49a3408f09842c3a1d1da81c24b76547a9c3c48829bfd0f5399deced5faaa?trk=share_certificate&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BTPNFi3YyS16%2BrT1xAtNThA%3D%3D" },

  // DeepLearning.AI & AI Skills
  { initial: "A", title: "Agent Skills with Anthropic", org: "DeepLearning.AI x Anthropic", year: "2026", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", category: "ai-skills" },
  { initial: "A", title: "Pair Programming with LLM", org: "DeepLearning.AI", year: "2024", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", category: "ai-skills" },
  { initial: "D", title: "Building Portable AI Agent Skills", org: "Udemy", year: "2026", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", category: "ai-skills" },
  { initial: "C", title: "Prompt Engineering Specialization", org: "Coursera", year: "2024", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", category: "ai-skills", link: "https://www.coursera.org/account/accomplishments/specialization/MZHEWFWPKB9M" },

  // Dataiku & Enterprise Platforms
  { initial: "D", title: "GenAI Practitioner", org: "Dataiku", year: "2024", cls: "bg-orange-500/10 text-orange-400 border-orange-500/20", category: "platforms" },
  { initial: "G", title: "GenAI Byte-Sized Program", org: "Tredence Inc.", year: "2023", cls: "bg-orange-500/10 text-orange-400 border-orange-500/20", category: "platforms" },
  { initial: "D", title: "Azure Databricks & Spark", org: "Udemy", year: "2023", cls: "bg-orange-500/10 text-orange-400 border-orange-500/20", category: "platforms" },

  // Security & Specialized
  { initial: "U", title: "GenAI Risk & Cyber Security", org: "Udemy", year: "2024", cls: "bg-rose-500/10 text-rose-400 border-rose-500/20", category: "specialized" },
  { initial: "S", title: "The Complete SQL Bootcamp", org: "Udemy", year: "2023", cls: "bg-rose-500/10 text-rose-400 border-rose-500/20", category: "specialized", link: "https://www.linkedin.com/in/chiranjeev-kumar-07071997/overlay/Certifications/1095455859/treasury?profileId=ACoAACQphUUB5mPzUPWuC613M212Ym5BXWG3qV8" },
  { initial: "I", title: "PG Diploma in ML & AI", org: "IIIT Bangalore", year: "2022", cls: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20", category: "specialized" },
];
