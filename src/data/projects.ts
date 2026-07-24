export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl: string;
  caseStudyUrl?: string;
  image?: string;
  featured: boolean;
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
    id: "sitamarhi-health",
    title: "Sitamarhi Health Portal",
    tagline: "Full-Stack Healthcare Dashboard & Community Health Platform",
    description:
      "A comprehensive healthcare portal for Sitamarhi, Bihar, featuring a medical dashboard with real-time health metrics, patient management, resource tracking, and community health initiatives. Built with modern web technologies and deployed on Vercel for scalable access across the region.",
    category: "Data Engineering",
    tags: ["Healthcare", "Dashboard", "React", "Data Visualization", "Community Health"],
    githubUrl: "https://github.com/chiranjeevbitm/sitamarhi-health--portal",
    image: "/images/medical-dashboard.png",
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
    image: "/images/sikshak-sahayak.png",
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
    image: "/images/multimodal-crag.png",
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
    image: "/images/rdvconet.png",
    featured: true,
    impact: [
      { metric: "Grade", value: "73% ⭐" },
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
    image: "/images/enhanced-image.png",
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
    image: "/images/medguardian.png",
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
    image: "/images/ats-friendly-ai-resume.png",
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
    image: "/images/ledership-insight.png",
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
    image: "/images/english-quest.png",
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
    image: "/images/docto-profile.png",
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
    image: "/images/custom built copilot.png",
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
    image: "/images/revit copilot agent.png",
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
  {
    id: "ai-tracing-platform",
    title: "AI-Tracing Platform",
    tagline: "Generic AI-Agent Platform + Production Revit Copilot",
    description:
      "The 30-second picture: one generic AI-agent platform (copilot-sdk/) plus one real production use case (revit-agent/) built on top of it. The core design creed: the SDK is a generic core; domain knowledge lives only in tools and context providers, and the core never changes. Features two separate WebSocket channels — Chat channel (browser/WebView2 UI → Gateway /ws/chat) and Bridge channel (pyRevit plugin → revit-agent's Bridge ws://:9100). Includes AI Tracing with one trace_id riding the bus across gateway + orchestrator + every worker for a single MLflow waterfall and billing-grade usage ledger.",
    category: "GenAI",
    tags: ["Agentic AI", "Multi-Agent", "Orchestration", "Revit", "Azure", "Tracing", "MLflow"],
    githubUrl: "https://github.com/chiranjeevbitm/ai-tracing-platform",
    image: "/images/overall project.jpeg",
    featured: true,
    impact: [
      { metric: "Architecture", value: "Generic Core + Domain" },
      { metric: "Channels", value: "Chat + Bridge WS" },
      { metric: "Tracing", value: "End-to-End MLflow" },
      { metric: "Portability", value: "Zero Code Change" }
    ],
    links: {
      github: "https://github.com/chiranjeevbitm/ai-tracing-platform"
    }
  }
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
  // NVIDIA - Enterprise GPU & AI
  { initial: "N", title: "Certified Agentic AI", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20", category: "nvidia-genai", link: "https://www.linkedin.com/in/chiranjeev-kumar-07071997/overlay/Certifications/44238080/treasury?profileId=ACoAACQphUUB5mPzUPWuC613M212Ym5BXWG3qV8" },
  { initial: "N", title: "GenAI Multimodal Associate", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20", category: "nvidia-genai", link: "https://www.credly.com/badges/963eff76-3eba-4a9e-8be4-449651f12efe" },
  { initial: "N", title: "GenAI LLMs Associate", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400 border-purple-500/20", category: "nvidia-genai", link: "https://www.credly.com/badges/c0bf9eca-9f56-4167-8b94-2a6b206cb1f3/public_url" },
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
