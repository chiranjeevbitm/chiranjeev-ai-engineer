export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  githubUrl: string;
  caseStudyUrl?: string;
  image?: string;
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
    id: "crag",
    title: "Multimodal CRAG",
    description:
      "Comprehensive RAG system with multimodal capabilities — integrating document extraction, vector indexing, and generative retrieval with Azure OpenAI.",
    category: "RAG",
    tags: ["RAG", "Azure OpenAI", "LangChain", "Vector Search"],
    githubUrl: "https://github.com/chiranjeevbitm/multimodal_crag",
    image: "/images/project_crag.png",
  },
  {
    id: "enhanced-img",
    title: "Enhanced Image Prompting",
    description:
      "Advanced image generation and enhancement pipeline using LLM-based prompt engineering and diffusion models for high-quality outputs.",
    category: "GenAI",
    tags: ["LLMs", "Diffusion", "Prompt Engineering"],
    githubUrl: "https://github.com/chiranjeevbitm/Enhanced_image_prompting",
    image: "/images/project_enhanced_img.png",
  },
  {
    id: "medguardian",
    title: "MedGuardian",
    description:
      "AI-powered medical data guardian system for secure healthcare data processing with advanced privacy-preserving ML techniques.",
    category: "Machine Learning",
    tags: ["Healthcare", "Privacy", "Deep Learning"],
    githubUrl: "https://github.com/chiranjeevbitm/medguardian",
    image: "/images/project_medguardian.png",
  },
  {
    id: "resume-builder",
    title: "ATS-Friendly AI Resume Builder",
    description:
      "Intelligent resume builder that generates ATS-optimized resumes with AI-driven content suggestions and formatting.",
    category: "GenAI",
    tags: ["AI", "NLP", "React", "ATS"],
    githubUrl: "https://github.com/chiranjeevbitm/Ats_friendly_AI_resume_builder",
    image: "/images/project_resume_builder.png",
  },
  {
    id: "shikshak",
    title: "Shikshak Sahayak",
    description:
      "AI assistant for educators — automating grading, generating lesson plans, and providing personalized learning insights.",
    category: "GenAI",
    tags: ["Education", "NLP", "Automation"],
    githubUrl: "https://github.com/chiranjeevbitm/shikshak-Sahayak",
    image: "/images/project_shikshak.png",
  },
  {
    id: "doctors-profile",
    title: "Doctors Profile",
    description:
      "Full-stack web application for managing doctor profiles, appointments, and patient records with a modern UI.",
    category: "Data Engineering",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/chiranjeevbitm/Doctors-Profile",
    image: "/images/docto-profile.png",
  },
  {
    id: "leadership-insight",
    title: "Leadership Insight Agent",
    description:
      "Multi-agent system for analyzing leadership traits and generating actionable insights from behavioral data.",
    category: "Machine Learning",
    tags: ["Agentic AI", "Analytics", "Python"],
    githubUrl: "https://github.com/chiranjeevbitm/Leadership-Insight-Agent",
    image: "/images/ledership-insight.png",
  },
  {
    id: "rdvconet",
    title: "RDVCoNet",
    description:
      "Research-driven deep convolutional network for disease detection — published work in medical image analysis.",
    category: "Machine Learning",
    tags: ["Deep Learning", "Research", "Medical Imaging"],
    githubUrl: "https://github.com/chiranjeevbitm/RDVCoNet",
    image: "/images/rdvconet.png",
  },
  {
    id: "english-quest",
    title: "English Quest — Spend Analysis",
    description:
      "AI-powered spend analysis & cost optimisation for a 400-person professional services firm. Processed 1,050+ PO line items across 5 indirect procurement categories to identify top savings opportunities with ranged estimates.",
    category: "Data Engineering",
    tags: ["Spend Analysis", "Data Cleaning", "Cost Optimisation", "Excel"],
    githubUrl: "https://github.com/chiranjeevbitm/english-quest",
    image: "/images/english-quest.png",
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