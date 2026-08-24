export interface Project {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  filterTags: ("AI" | "FULL-STACK" | "BACKEND" | "OPEN SOURCE")[];
  description: string;
  longDescription: string;
  technologies: string[];
  featured: boolean;
  featuredSize: "large" | "medium" | "small";
  image?: string;
  architecture: ArchitectureNode[];
  aiArchitecture?: ArchitectureNode[];
  problem: string;
  product: string;
  decisions: string[];
  challenges: string[];
  results: string[];
  improvements: string[];
  github: string;
  demo?: string;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel?: string;
  branch?: string;
}

export const projects: Project[] = [
  {
    slug: "medos",
    title: "MedOS AI",
    category: "HEALTHTECH · AI · SAAS",
    tags: ["Healthtech", "AI", "SaaS"],
    filterTags: ["AI", "FULL-STACK"],
    description: "AI-powered healthcare operating platform.",
    longDescription:
      "Serverless-first AI-augmented hospital management system. Enforces RBAC at the middleware layer, includes an AI Triage Engine using the MEWS algorithm, and logs every write to an immutable audit trail.",
    technologies: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL", "AI", "RBAC"],
    featured: true,
    featuredSize: "large",
    architecture: [
      { id: "user", label: "USER" },
      { id: "nextjs", label: "NEXT.JS 15", sublabel: "App Router + Middleware" },
      { id: "auth", label: "AUTH / RBAC", sublabel: "Middleware-layer enforcement" },
      { id: "api", label: "API / SERVER ACTIONS", sublabel: "Type-safe server actions" },
      { id: "supabase", label: "SUPABASE", sublabel: "Realtime + Storage" },
      { id: "postgres", label: "POSTGRESQL", sublabel: "Persistent data layer" },
      { id: "ai", label: "AI SERVICES", sublabel: "Triage Engine" },
      { id: "audit", label: "AUDIT TRAIL", sublabel: "Immutable write log" },
    ],
    aiArchitecture: [
      { id: "patient", label: "PATIENT DATA" },
      { id: "mews", label: "AI TRIAGE", sublabel: "MEWS Algorithm" },
      { id: "model", label: "MODEL", sublabel: "Clinical scoring" },
      { id: "output", label: "CLINICAL OUTPUT", sublabel: "Structured response" },
    ],
    problem:
      "Hospital management systems are fragmented, paper-heavy, and lack real-time clinical decision support. Patient triage is often manual and delayed, creating risk in high-volume environments.",
    product:
      "MedOS AI is a serverless-first hospital management system built on Next.js 15 and Supabase. It enforces role-based access control at the middleware layer, includes a clinical AI Triage Engine built on the MEWS (Modified Early Warning Score) algorithm, and writes every mutation to an immutable audit trail for compliance and accountability.",
    decisions: [
      "Serverless-first with Next.js Server Actions for zero cold-start latency on core flows",
      "RBAC enforced at the middleware layer, not just in UI — preventing unauthorized access at the routing level",
      "MEWS algorithm chosen for clinical scoring: evidence-based, lightweight, auditable",
      "Supabase for Realtime subscriptions on ward dashboards with row-level security",
      "Immutable audit log implemented as append-only Postgres table with write-only service role",
    ],
    challenges: [
      "Implementing multi-tenant RBAC where staff roles differ per department (doctor, nurse, admin, ward manager) with correct data isolation",
      "Making MEWS scoring deterministic and auditable — every score change must be traceable to source vitals",
      "Designing an immutable audit trail that is performant under high write volume",
      "Keeping the UI fast while subscribing to realtime ward updates across multiple concurrent users",
    ],
    results: [
      "Live demo deployed at medosapp.vercel.app with working authentication, RBAC, and triage flows",
      "Immutable audit trail captures all write events with user, timestamp, and action metadata",
      "MEWS engine produces clinical risk scores from vital sign inputs",
    ],
    improvements: [
      "Add a proper LLM layer to generate natural-language clinical summaries from MEWS scores",
      "Implement lab result integration for richer clinical context",
      "Add offline-capable PWA mode for wards with unreliable connectivity",
      "Build proper multi-hospital tenancy with subdomain isolation",
    ],
    github: "https://github.com/devadex247/medos",
    demo: "https://medosapp.vercel.app/",
  },
  {
    slug: "ogametrics",
    title: "OgaMetrics AI",
    category: "AI · ANALYTICS · RAG · SAAS",
    tags: ["AI", "Analytics", "RAG", "SaaS"],
    filterTags: ["AI", "BACKEND", "FULL-STACK"],
    description: "Multi-tenant analytics and RAG platform.",
    longDescription:
      "A multi-tenant analytics and RAG platform that turns raw business data into searchable AI insights. Automates ingestion, cleaning, embeddings, and vector search to deliver fast, intelligent answers for SMEs and enterprise.",
    technologies: ["FastAPI", "Next.js", "TypeScript", "PostgreSQL", "LangChain", "Vector Search", "RAG"],
    featured: true,
    featuredSize: "medium",
    architecture: [
      { id: "data", label: "CSV / BUSINESS DATA", sublabel: "Raw input" },
      { id: "ingestion", label: "INGESTION", sublabel: "File processing" },
      { id: "cleaning", label: "CLEANING", sublabel: "Normalization" },
      { id: "schema", label: "SCHEMA DETECTION", sublabel: "Auto-typing" },
      { id: "storage", label: "STRUCTURED STORAGE", sublabel: "PostgreSQL" },
      { id: "embeddings", label: "EMBEDDINGS", sublabel: "Text vectorization" },
      { id: "vector", label: "VECTOR SEARCH", sublabel: "Similarity retrieval" },
      { id: "rag", label: "RAG", sublabel: "Context + LLM" },
      { id: "insights", label: "AI INSIGHTS", sublabel: "Structured answers" },
    ],
    problem:
      "SMEs and enterprise teams sit on large amounts of structured business data (CSV exports, spreadsheets, reports) but lack the infrastructure to query that data intelligently. Analytics platforms are expensive and require data engineering expertise.",
    product:
      "OgaMetrics AI is a multi-tenant platform that automates the full data pipeline from raw CSV ingestion through cleaning, schema detection, normalization, embedding generation, and vector indexing. Once data is indexed, users can ask natural-language questions and receive AI-generated answers grounded in their specific business data.",
    decisions: [
      "FastAPI backend chosen for its async-first design and native Python AI/ML library compatibility",
      "Multi-tenant architecture with tenant-scoped vector stores for data isolation",
      "Schema detection runs heuristics to auto-identify data types, reducing manual configuration",
      "RAG architecture grounds LLM responses in tenant-specific data, preventing hallucination",
      "Embeddings generated per-chunk for fine-grained retrieval quality",
    ],
    challenges: [
      "Handling messy real-world CSVs: mixed types, missing values, inconsistent headers, encoding issues",
      "Keeping vector search fast as data volumes grow without expensive infrastructure",
      "Ensuring tenant data isolation in a shared vector index",
      "Evaluating retrieval quality — knowing when RAG is returning relevant vs. irrelevant context",
    ],
    results: [
      "Live demo deployed at ogametrics.vercel.app",
      "Full pipeline from CSV upload to AI query working end-to-end",
      "Multi-tenant data isolation implemented with scoped vector collections",
    ],
    improvements: [
      "Add retrieval evaluation metrics to measure RAG quality per tenant",
      "Support Excel and JSON in addition to CSV inputs",
      "Build an agentic layer for multi-step analytical workflows",
      "Add streaming responses for faster perceived performance on large datasets",
    ],
    github: "https://github.com/devadex247/ogametrics",
    demo: "https://ogametrics.vercel.app/",
  },
  {
    slug: "get2learn",
    title: "Get2Learn",
    category: "EDTECH · FULL-STACK · RECOMMENDATION",
    tags: ["EdTech", "Full-Stack"],
    filterTags: ["FULL-STACK", "BACKEND"],
    description: "Curated technical learning platform with personalized recommendations.",
    longDescription:
      "A curated technical learning platform helping developers and students discover, organize, and track high-quality educational video content. Dependency-free frontend with a scalable FastAPI backend, custom playlists, and personalized recommendations.",
    technologies: ["FastAPI", "Python", "React", "PostgreSQL", "Recommendation Engine"],
    featured: true,
    featuredSize: "medium",
    architecture: [
      { id: "discover", label: "DISCOVER", sublabel: "Curated content" },
      { id: "organize", label: "ORGANIZE", sublabel: "Custom playlists" },
      { id: "learn", label: "LEARN", sublabel: "Structured paths" },
      { id: "track", label: "TRACK", sublabel: "Progress monitoring" },
      { id: "personalize", label: "PERSONALIZE", sublabel: "Recommendations" },
    ],
    problem:
      "Developer learning resources are scattered across YouTube, documentation sites, and course platforms with no unified way to discover, organize, and track quality technical content. Learners waste time searching instead of learning.",
    product:
      "Get2Learn is a curated technical learning platform with a dependency-free frontend and a scalable FastAPI backend. Users can discover high-quality video content, create custom playlists, track learning progress, and receive personalized recommendations based on their history and goals.",
    decisions: [
      "FastAPI for the backend: async-first, schema-validated, easy to extend with ML-based recommendations",
      "Dependency-free frontend to keep bundle size minimal and page load fast",
      "Custom playlist system built as first-class feature rather than an afterthought",
      "Content curation manual at first to ensure quality — algorithmic discovery added later",
    ],
    challenges: [
      "Building a recommendation engine that is useful with limited user history (cold start problem)",
      "Keeping content quality high without a dedicated editorial team",
      "Designing a UX that makes finding content fast rather than adding to the noise",
    ],
    results: [
      "Live demo deployed at get2learn.vercel.app",
      "Full playlist and progress tracking system operational",
      "Personalized recommendation system implemented",
    ],
    improvements: [
      "Add collaborative filtering for recommendations based on similar user behavior",
      "Build a community layer: users can suggest and rate resources",
      "Add spaced repetition for key concepts within learning paths",
      "Integrate with GitHub to track practical projects alongside theory",
    ],
    github: "https://github.com/devadex247/get2learn",
    demo: "https://get2learn.vercel.app/",
  },
  {
    slug: "rankbloom",
    title: "RankBloom",
    category: "WEB AGENCY · SEO · AI",
    tags: ["Web Design", "SEO", "AI"],
    filterTags: ["FULL-STACK", "AI"],
    description: "Premium SEO & Web Solutions agency site with AI support.",
    longDescription:
      "A high-performance, aesthetically driven web agency platform focused on helping businesses scale through fast, SEO-optimized websites and an integrated AI customer support chatbot.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Vite", "Vercel AI SDK"],
    featured: false,
    featuredSize: "small",
    architecture: [
      { id: "landing", label: "LANDING", sublabel: "Interactive UI" },
      { id: "animations", label: "ANIMATIONS", sublabel: "Intersection Observer" },
      { id: "ai_chat", label: "AI SUPPORT", sublabel: "Vercel AI SDK" },
    ],
    problem:
      "Small businesses need fast, SEO-optimized, mobile-ready websites but often lack technical capabilities or budget for high-end agency setups. Additionally, customer support for incoming leads is bottlenecked by manual responses.",
    product:
      "RankBloom is a high-performance web agency site featuring dynamic UI animations, cinematic backgrounds, and an integrated Chat Bloom AI powered by the Vercel AI SDK to provide 24/7 automated customer support and lead capture.",
    decisions: [
      "Vanilla HTML/CSS/JS with Vite for maximum performance and minimum bundle size",
      "Intersection Observer API for scroll-based animations instead of heavy libraries",
      "Vercel AI SDK for the Chat Bloom AI, enabling streaming responses directly in the browser",
    ],
    challenges: [
      "Optimizing cinematic video backgrounds without hurting core web vitals and load times",
      "Building complex, interactive mouse-tracking spotlight cards with vanilla JavaScript",
      "Seamlessly integrating an AI chatbot interface into a purely static front-end",
    ],
    results: [
      "Live demo deployed at rankbloom.vercel.app",
      "Perfect Lighthouse scores across performance and SEO",
      "Fully functional streaming AI chat interface",
    ],
    improvements: [
      "Add a proper lead management backend to capture inquiries from the AI chat",
      "Migrate to Next.js for better routing and built-in image optimization",
      "Implement a headless CMS for dynamic portfolio updates",
    ],
    github: "https://github.com/devadex247/rankbloom",
    demo: "https://rankbloom.vercel.app",
  },
  {
    slug: "text-stream",
    title: "Text-Stream CLI",
    category: "CLI UTILITY · PYTHON",
    tags: ["CLI", "Python", "Tooling"],
    filterTags: ["BACKEND", "OPEN SOURCE"],
    description: "Zero-dependency text metrics and formatting CLI.",
    longDescription:
      "A high-speed CLI text pipeline that ingests raw input, calculates structural text metrics, normalizes whitespace formatting, and streams sanitized data directly back to the system clipboard.",
    technologies: ["Python", "CLI", "Regex"],
    featured: false,
    featuredSize: "small",
    architecture: [
      { id: "input", label: "RAW TEXT", sublabel: "Terminal stdin" },
      { id: "metrics", label: "ANALYZER", sublabel: "Word/char counts" },
      { id: "format", label: "FORMATTER", sublabel: "Whitespace normalizer" },
      { id: "clipboard", label: "CLIPBOARD", sublabel: "OS Native Pipe" },
    ],
    problem:
      "Dealing with messy, poorly formatted text (extra tabs, duplicate spaces, broken line breaks) requires manual cleanup. Developers and writers need a fast way to get structural metrics and sanitize strings instantly without leaving the terminal.",
    product:
      "Text-Stream CLI is a dependency-free Python tool that calculates structural text metrics (word count, reading time) and normalizes formatting, instantly copying the cleaned result to the Windows or macOS system clipboard.",
    decisions: [
      "Zero dependencies: built entirely with native Python core modules so no pip install is required",
      "Auto-clipboard sync using native OS pipelines (clip on Windows, pbcopy on macOS) for immediate utility",
      "Interactive multi-line terminal input via EOF signals (Ctrl+Z or Ctrl+D) for easy pasting",
    ],
    challenges: [
      "Handling multi-line input streams elegantly across different operating systems",
      "Writing robust regex and parsing logic to handle all edge cases of messy whitespace",
      "Interfacing natively with the clipboard without external libraries like pyperclip",
    ],
    results: [
      "Available open-source on GitHub",
      "Instantly sanitizes large blocks of text",
      "Cross-platform support for Windows and macOS clipboards",
    ],
    improvements: [
      "Add support for Linux xclip/xsel clipboards",
      "Implement markdown parsing to strip or convert formatting",
      "Add a file input flag to process entire text documents directly",
    ],
    github: "https://github.com/devadex247/text-stream",
  },
];
