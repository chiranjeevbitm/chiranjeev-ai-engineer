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

export const certifications = [
  { initial: "N", title: "Certified Agentic AI", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400" },
  { initial: "N", title: "GenAI Multimodal Associate", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400" },
  { initial: "N", title: "GenAI LLMs Associate", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400" },
  { initial: "G", title: "Generative AI For Leaders", org: "Google", year: "2026", cls: "bg-blue-500/10 text-blue-400" },
  { initial: "A", title: "Agent Skills with Anthropic", org: "DeepLearning.AI x Anthropic", year: "2026", cls: "bg-green-500/10 text-green-400" },
  { initial: "M", title: "Azure Data Scientist Associate", org: "Microsoft", year: "2024", cls: "bg-sky-500/10 text-sky-400" },
  { initial: "G", title: "Advanced Data Analytics", org: "Google", year: "2024", cls: "bg-blue-500/10 text-blue-400" },
  { initial: "D", title: "GenAI Practitioner", org: "Dataiku", year: "2024", cls: "bg-orange-500/10 text-orange-400" },
  { initial: "C", title: "Prompt Engineering Specialization", org: "Coursera", year: "2024", cls: "bg-yellow-500/10 text-yellow-400" },
  { initial: "G", title: "Conversational AI (Dialogflow CX)", org: "Google", year: "2024", cls: "bg-blue-500/10 text-blue-400" },
  { initial: "A", title: "Career Essentials: GenAI", org: "Microsoft & LinkedIn", year: "2024", cls: "bg-sky-500/10 text-sky-400" },
  { initial: "D", title: "GenAI Exchange Skill Badge", org: "Google Cloud", year: "2024", cls: "bg-blue-500/10 text-blue-400" },
  { initial: "N", title: "Nemo Toolkit & DGX", org: "NVIDIA", year: "2025", cls: "bg-purple-500/10 text-purple-400" },
  { initial: "G", title: "GenAI Byte-Sized Program", org: "Tredence Inc.", year: "2023", cls: "bg-green-500/10 text-green-400" },
  { initial: "M", title: "Azure AI Fundamentals", org: "Microsoft", year: "2020", cls: "bg-sky-500/10 text-sky-400" },
  { initial: "M", title: "Azure Fundamentals", org: "Microsoft", year: "2020", cls: "bg-sky-500/10 text-sky-400" },
  { initial: "U", title: "GenAI Risk & Cyber Security", org: "Udemy", year: "2024", cls: "bg-red-500/10 text-red-400" },
  { initial: "D", title: "Building Portable AI Agent Skills", org: "Udemy", year: "2026", cls: "bg-red-500/10 text-red-400" },
  { initial: "A", title: "Pair Programming with LLM", org: "DeepLearning.AI", year: "2024", cls: "bg-green-500/10 text-green-400" },
  { initial: "S", title: "The Complete SQL Bootcamp", org: "Udemy", year: "2023", cls: "bg-red-500/10 text-red-400" },
  { initial: "D", title: "Azure Databricks & Spark", org: "Udemy", year: "2023", cls: "bg-red-500/10 text-red-400" },
  { initial: "I", title: "PG Diploma in ML & AI", org: "IIIT Bangalore", year: "2022", cls: "bg-indigo-500/10 text-indigo-400" },
];