export interface ExperienceEntry {
  id: string;
  commitId: string;
  period: string;
  startYear: number;
  endYear: number | null;
  role: string;
  company: string;
  type: "ROLE INITIALIZED" | "SYSTEM EXPANDED" | "MODULE DEPLOYED";
  description: string;
  highlights: string[];
  technologies: string[];
  current: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    id: "freelance-2022",
    commitId: "COMMIT 2022.01",
    period: "2022 – 2023",
    startYear: 2022,
    endYear: 2023,
    role: "Full Stack Developer",
    company: "Freelance",
    type: "ROLE INITIALIZED",
    description:
      "Built end-to-end web applications for SMEs and early-stage startups — React frontends, Node.js APIs, and Postgres data layers.",
    highlights: [
      "Delivered admin dashboards, learning platforms, and lightweight SaaS tools",
      "Built full-stack applications from design to deployment",
      "Established client-facing development processes for early-stage startups",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "TypeScript", "REST APIs"],
    current: false,
  },
  {
    id: "adextech-2023",
    commitId: "COMMIT 2023.01",
    period: "2023 – Present",
    startYear: 2023,
    endYear: null,
    role: "Software + AI Engineer",
    company: "AdexTech Hub",
    type: "SYSTEM EXPANDED",
    description:
      "Designing and shipping AI-powered web platforms — from RAG analytics systems to AI-augmented healthcare tools.",
    highlights: [
      "Built MedOS AI: serverless-first hospital management system with AI Triage",
      "Shipped OgaMetrics AI: multi-tenant RAG analytics platform",
      "Developed Get2Learn: curated learning platform with recommendation engine",
      "Production deployments across multi-tenant architectures",
    ],
    technologies: ["Next.js", "FastAPI", "LangChain", "LangGraph", "CrewAI", "Supabase", "PostgreSQL"],
    current: true,
  },
];

export const labExperiments = [
  {
    id: "01",
    title: "Building RAG Pipelines",
    description: "Architecting retrieval-augmented generation systems with evaluation and grounding.",
    status: "ACTIVE",
    tags: ["RAG", "LangChain", "Vector Search"],
  },
  {
    id: "02",
    title: "Agentic Workflows",
    description: "Multi-step agent architectures with LangGraph and tool-calling patterns.",
    status: "ACTIVE",
    tags: ["LangGraph", "Agents", "Tool Calling"],
  },
  {
    id: "03",
    title: "Retrieval Evaluation",
    description: "Measuring and improving retrieval quality: precision, recall, NDCG in production.",
    status: "ONGOING",
    tags: ["Evaluation", "Metrics", "Quality"],
  },
  {
    id: "04",
    title: "Context Engineering",
    description: "Structuring context windows for long-context LLMs and multi-turn conversations.",
    status: "ONGOING",
    tags: ["Context", "Prompting", "LLMs"],
  },
  {
    id: "05",
    title: "Tool Calling Architectures",
    description: "Designing reliable function-calling schemas for agentic systems.",
    status: "RESEARCH",
    tags: ["Tool Calling", "JSON Schema", "Agents"],
  },
  {
    id: "06",
    title: "Local LLM Experiments",
    description: "Running Ollama-based local models for private, offline AI workloads.",
    status: "RESEARCH",
    tags: ["Ollama", "Local LLMs", "Privacy"],
  },
];

export const engineeringSkills = {
  "AI ENGINEERING": {
    description: "Building production AI systems, not wrappers.",
    skills: ["RAG", "LLMs", "AI Agents", "Embeddings", "Vector Search", "Context Engineering", "Retrieval Evaluation", "LangChain", "LangGraph", "LlamaIndex", "CrewAI", "OpenAI", "Ollama", "Hugging Face"],
  },
  BACKEND: {
    description: "APIs and data systems that scale.",
    skills: ["FastAPI", "Node.js", "REST APIs", "PostgreSQL", "Authentication", "Multi-tenancy", "Supabase", "Serverless", "PyTorch", "scikit-learn", "Pandas"],
  },
  "FULL STACK": {
    description: "End-to-end product engineering.",
    skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Svelte", "Server Components", "Server Actions", "SaaS Architecture"],
  },
  INFRASTRUCTURE: {
    description: "Shipping and maintaining systems.",
    skills: ["Git", "GitHub", "Vercel", "Supabase", "Cloud Deployments", "CI/CD"],
  },
};
