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
  screenshots?: ProjectScreenshot[];
}

export interface ProjectScreenshotHotspot {
  x: number;
  y: number;
  title: string;
  description: string;
}

export interface ProjectScreenshot {
  id: string;
  title: string;
  caption: string;
  url: string;
  device?: "desktop" | "mobile" | "tablet";
  category?: "Dashboard" | "Workflow" | "Mobile" | "Analytics" | "Architecture" | "CLI";
  hotspots?: ProjectScreenshotHotspot[];
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
    screenshots: [
      {
        id: "medos-overview",
        title: "Ward Clinical Overview",
        caption: "Real-time hospital ward overview displaying active patient status, MEWS scoring, and triage priority.",
        url: "/images/projects/medos/overview.png",
        device: "desktop",
        category: "Dashboard",
        hotspots: [
          { x: 25, y: 40, title: "Patient Roster", description: "Realtime Supabase subscription displaying active hospital ward beds." },
          { x: 72, y: 30, title: "MEWS Engine", description: "Automated risk score calculation based on patient vital inputs." }
        ]
      },
      {
        id: "medos-triage",
        title: "AI MEWS Triage Matrix",
        caption: "Interactive clinical triage dashboard enforcing evidence-based Modified Early Warning Scores.",
        url: "/images/projects/medos/triage.png",
        device: "desktop",
        category: "Workflow",
        hotspots: [
          { x: 50, y: 45, title: "Vital Matrix", description: "Deterministic scoring algorithm validating physiological trends." }
        ]
      },
      {
        id: "medos-audit",
        title: "Immutable Audit Log",
        caption: "Append-only Postgres audit trail recording every state change with user signature and timestamp.",
        url: "/images/projects/medos/audit.png",
        device: "desktop",
        category: "Analytics"
      },
      {
        id: "medos-mobile",
        title: "Mobile Nurse Viewport",
        caption: "Optimized mobile view for clinical staff carrying handheld ward devices.",
        url: "/images/projects/medos/mobile.png",
        device: "mobile",
        category: "Mobile"
      }
    ]
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
    screenshots: [
      {
        id: "ogametrics-dashboard",
        title: "Multi-Tenant Analytics Dashboard",
        caption: "Data ingestion pipeline status, automated CSV schema normalization, and embeddings index stats.",
        url: "/images/projects/ogametrics/dashboard.png",
        device: "desktop",
        category: "Analytics",
        hotspots: [
          { x: 30, y: 35, title: "Schema Detection", description: "Heuristic data type parser normalizing raw uploaded CSVs." }
        ]
      },
      {
        id: "ogametrics-rag",
        title: "RAG Vector Query Interface",
        caption: "Grounded natural language search returning precise analytical responses backed by vector similarity.",
        url: "/images/projects/ogametrics/rag-search.png",
        device: "desktop",
        category: "Workflow",
        hotspots: [
          { x: 60, y: 55, title: "Context Retrieval", description: "LangChain vector store retrieval grounding LLM output." }
        ]
      },
      {
        id: "ogametrics-mobile",
        title: "Mobile Query Interface",
        caption: "Mobile view showing quick natural language business queries on the go.",
        url: "/images/projects/ogametrics/mobile.png",
        device: "mobile",
        category: "Mobile"
      }
    ]
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
    screenshots: [
      {
        id: "get2learn-overview",
        title: "Curated Learning Hub",
        caption: "Unified developer learning platform displaying progress tracking, playlists, and topic roadmaps.",
        url: "/images/projects/get2learn/overview.png",
        device: "desktop",
        category: "Dashboard"
      },
      {
        id: "get2learn-roadmap",
        title: "Personalized Recommendation View",
        caption: "ML-driven content recommendations tailored to developer tech stack goals.",
        url: "/images/projects/get2learn/roadmap.png",
        device: "desktop",
        category: "Workflow"
      },
      {
        id: "get2learn-mobile",
        title: "Mobile Learning View",
        caption: "Responsive mobile viewport for watching technical video guides on mobile.",
        url: "/images/projects/get2learn/mobile.png",
        device: "mobile",
        category: "Mobile"
      }
    ]
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
    screenshots: [
      {
        id: "rankbloom-hero",
        title: "Spotlight Card Landing View",
        caption: "Cinematic dark UI with interactive cursor-tracking spotlight animation.",
        url: "/images/projects/rankbloom/hero.png",
        device: "desktop",
        category: "Dashboard"
      },
      {
        id: "rankbloom-chat",
        title: "Chat Bloom AI Assistant",
        caption: "Embedded streaming AI support chat powered by Vercel AI SDK.",
        url: "/images/projects/rankbloom/ai-chat.png",
        device: "desktop",
        category: "Workflow"
      },
      {
        id: "rankbloom-mobile",
        title: "Mobile Layout Preview",
        caption: "Responsive mobile viewport of agency services showcase.",
        url: "/images/projects/rankbloom/mobile.png",
        device: "mobile",
        category: "Mobile"
      }
    ]
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
    screenshots: [
      {
        id: "text-stream-cli",
        title: "CLI Terminal Stream Input",
        caption: "Command line text analyzer reading stdin stream and outputting formatted metrics.",
        url: "/images/projects/text-stream/terminal.png",
        device: "desktop",
        category: "CLI"
      },
      {
        id: "text-stream-output",
        title: "Clipboard Pipeline Execution",
        caption: "Direct stdout pipe to system clipboard with instant whitespace normalization.",
        url: "/images/projects/text-stream/output.png",
        device: "desktop",
        category: "Analytics"
      }
    ]
  },
  {
    slug: "spatial-nexus",
    title: "Spatial Nexus",
    category: "GEOSPATIAL · FULL-STACK · MAPPING",
    tags: ["Geospatial", "Mapping", "Full-Stack"],
    filterTags: ["FULL-STACK", "AI"],
    description: "Interactive geospatial data platform with real-time mapping.",
    longDescription:
      "A full-stack geospatial intelligence platform that transforms raw location data into interactive, real-time maps and spatial analytics. Built for developers and organizations that need to visualize, query, and act on geographic data at scale.",
    technologies: ["React", "TypeScript", "Mapbox GL", "Node.js", "PostgreSQL", "PostGIS"],
    featured: false,
    featuredSize: "small",
    architecture: [
      { id: "data", label: "LOCATION DATA", sublabel: "Raw coordinates" },
      { id: "ingestion", label: "DATA INGESTION", sublabel: "Streaming pipeline" },
      { id: "postgis", label: "POSTGIS", sublabel: "Spatial indexing" },
      { id: "api", label: "SPATIAL API", sublabel: "GeoJSON endpoints" },
      { id: "mapbox", label: "MAPBOX GL", sublabel: "Vector tile rendering" },
      { id: "ui", label: "INTERACTIVE MAP", sublabel: "Real-time UI" },
    ],
    problem:
      "Geospatial data is notoriously hard to work with — raw coordinates are meaningless without proper indexing, rendering, and querying tools. Most teams rely on expensive GIS software or heavyweight platforms that are slow to integrate and hard to customize.",
    product:
      "Spatial Nexus is a full-stack geospatial platform that ingests location data, stores it with PostGIS spatial indexing, exposes it via a clean GeoJSON API, and renders it as interactive vector tile maps using Mapbox GL. The result is a fast, customizable spatial intelligence layer that any team can plug into their workflow.",
    decisions: [
      "PostGIS chosen for native spatial indexing and powerful geometric query operators (ST_Within, ST_Distance, etc.)",
      "Mapbox GL for client-side vector tile rendering — performant at scale without server-side map generation",
      "GeoJSON as the canonical data format throughout the pipeline for maximum interoperability",
      "PostgreSQL as the primary database to leverage the mature PostGIS ecosystem",
    ],
    challenges: [
      "Efficiently indexing and querying large volumes of point and polygon geometry data without query timeouts",
      "Keeping map rendering performant when displaying thousands of concurrent spatial features",
      "Designing an intuitive API for spatial queries that abstracts PostGIS complexity for consuming apps",
    ],
    results: [
      "Live demo deployed at spatial-nexus.vercel.app",
      "Interactive map with real-time spatial querying operational",
      "PostGIS-backed spatial API with GeoJSON endpoints",
    ],
    improvements: [
      "Add real-time data streaming via WebSockets for live location tracking",
      "Implement heatmap and clustering layers for high-density point datasets",
      "Build an admin dashboard for managing spatial datasets and access control",
      "Add raster tile support for satellite imagery overlays",
    ],
    github: "https://github.com/spatial-nexus",
    demo: "https://spatial-nexus.vercel.app/",
    screenshots: [
      {
        id: "spatial-nexus-map",
        title: "Interactive Mapbox GL Map",
        caption: "Real-time vector tile rendering with point clustering and geographic boundary filtering.",
        url: "/images/projects/spatial-nexus/map.png",
        device: "desktop",
        category: "Dashboard",
        hotspots: [
          { x: 45, y: 50, title: "Vector Layer", description: "Mapbox GL client-side vector rendering of PostGIS data points." }
        ]
      },
      {
        id: "spatial-nexus-postgis",
        title: "Spatial API GeoJSON View",
        caption: "High-speed API endpoints querying PostGIS ST_Within spatial queries.",
        url: "/images/projects/spatial-nexus/postgis-api.png",
        device: "desktop",
        category: "Analytics"
      },
      {
        id: "spatial-nexus-mobile",
        title: "Mobile Field Inspector View",
        caption: "Mobile-responsive geospatial query tool for field inspectors.",
        url: "/images/projects/spatial-nexus/mobile.png",
        device: "mobile",
        category: "Mobile"
      }
    ]
  },
  {
    slug: "africut-sell-ai",
    title: "AfriCut Sell AI",
    category: "AI · SOCIAL COMMERCE · CONTENT GENERATION",
    tags: ["AI", "Social Commerce", "Content Generation"],
    filterTags: ["AI", "FULL-STACK"],
    description: "AI-powered social commerce platform for African merchants.",
    longDescription:
      "A full-stack, AI-powered social commerce and content generation platform designed for African and global merchants, creators, and entrepreneurs. Bridges the gap between raw product footage and high-converting, ready-to-publish social media sales kits for WhatsApp, Instagram, TikTok, Facebook, and X.",
    technologies: ["TypeScript", "Vite", "Google Gemini AI", "Dala Studio", "Node.js"],
    featured: false,
    featuredSize: "small",
    architecture: [
      { id: "video", label: "PRODUCT FOOTAGE", sublabel: "Raw video input" },
      { id: "gemini", label: "GEMINI AI", sublabel: "Content analysis" },
      { id: "dala", label: "DALA STUDIO", sublabel: "Media processing" },
      { id: "generator", label: "CONTENT ENGINE", sublabel: "Sales copy + captions" },
      { id: "kit", label: "SALES KIT", sublabel: "Multi-platform export" },
    ],
    aiArchitecture: [
      { id: "footage", label: "PRODUCT VIDEO" },
      { id: "vision", label: "VISION AI", sublabel: "Gemini multimodal" },
      { id: "copy", label: "COPY GENERATION", sublabel: "Sales-optimized text" },
      { id: "output", label: "SOCIAL KIT", sublabel: "Platform-ready content" },
    ],
    problem:
      "African micro and small businesses lack the tools and resources to produce high-converting social media content from their raw product footage. Content creation is time-consuming, expensive, and requires skills most merchants do not have — leaving enormous sales potential untapped on WhatsApp, Instagram, TikTok, and beyond.",
    product:
      "AfriCut Sell AI is a mobile-first platform powered by Google Gemini AI and Dala Studio. Merchants upload raw product videos, and the AI engine analyzes the footage, generates platform-specific sales copy, captions, and hashtags, and packages everything into a ready-to-publish social media sales kit for WhatsApp, Instagram, TikTok, Facebook, and X.",
    decisions: [
      "Google Gemini AI chosen for its multimodal capabilities — analyzing both video content and generating contextual sales copy in a single model",
      "Mobile-first design as the primary interface, reflecting how African merchants predominantly use smartphones for business",
      "Vite for a fast, lightweight frontend build with minimal overhead",
      "Platform-specific output formats (WhatsApp, Instagram, TikTok) to maximize content relevance and engagement",
      "Dala Studio for media processing and content packaging into polished sales kits",
    ],
    challenges: [
      "Generating sales copy that resonates with culturally diverse African markets and local buying behaviors",
      "Processing and analyzing video content in real time without excessive latency on mobile connections",
      "Producing platform-appropriate formats for multiple social networks with distinct character limits, aspect ratios, and tone requirements",
      "Designing a UX simple enough for non-technical merchants to use with zero onboarding friction",
    ],
    results: [
      "Live demo deployed at afri-cut-sell-7e47.vercel.app",
      "End-to-end pipeline from product video to social sales kit operational",
      "Multi-platform output covering WhatsApp, Instagram, TikTok, Facebook, and X",
      "Powered by Gemini AI with mobile-first interface optimized for African merchants",
    ],
    improvements: [
      "Add support for audio-only product pitches as an input modality",
      "Build a merchant dashboard to manage, schedule, and track published content",
      "Integrate direct publishing to social platforms via their APIs",
      "Add analytics to track which AI-generated content drives the most sales conversions",
    ],
    github: "https://github.com/devadex247/africut-sell-AI",
    demo: "https://afri-cut-sell-7e47.vercel.app/",
    screenshots: [
      {
        id: "africut-upload",
        title: "Mobile Product Video Ingest",
        caption: "Mobile-first raw product video uploader with real-time video processing status.",
        url: "/images/projects/africut-sell-ai/mobile-app.png",
        device: "mobile",
        category: "Mobile"
      },
      {
        id: "africut-kit",
        title: "Generated Social Sales Kit",
        caption: "Multi-platform export kit generating tailored captions and hashtags for WhatsApp, TikTok, and IG.",
        url: "/images/projects/africut-sell-ai/sales-kit.png",
        device: "desktop",
        category: "Workflow",
        hotspots: [
          { x: 50, y: 35, title: "Gemini Vision AI", description: "Multimodal video analysis generating conversion-focused sales copy." }
        ]
      }
    ]
  },
  {
    slug: "spatial-nexus",
    title: "Spatial Nexus",
    category: "GEOSPATIAL · FULL-STACK · MAPPING",
    tags: ["Geospatial", "Mapping", "Full-Stack"],
    filterTags: ["FULL-STACK", "AI"],
    description: "Interactive geospatial data platform with real-time mapping.",
    longDescription:
      "A full-stack geospatial intelligence platform that transforms raw location data into interactive, real-time maps and spatial analytics. Built for developers and organizations that need to visualize, query, and act on geographic data at scale.",
    technologies: ["React", "TypeScript", "Mapbox GL", "Node.js", "PostgreSQL", "PostGIS"],
    featured: false,
    featuredSize: "small",
    architecture: [
      { id: "data", label: "LOCATION DATA", sublabel: "Raw coordinates" },
      { id: "ingestion", label: "DATA INGESTION", sublabel: "Streaming pipeline" },
      { id: "postgis", label: "POSTGIS", sublabel: "Spatial indexing" },
      { id: "api", label: "SPATIAL API", sublabel: "GeoJSON endpoints" },
      { id: "mapbox", label: "MAPBOX GL", sublabel: "Vector tile rendering" },
      { id: "ui", label: "INTERACTIVE MAP", sublabel: "Real-time UI" },
    ],
    problem:
      "Geospatial data is notoriously hard to work with — raw coordinates are meaningless without proper indexing, rendering, and querying tools. Most teams rely on expensive GIS software or heavyweight platforms that are slow to integrate and hard to customize.",
    product:
      "Spatial Nexus is a full-stack geospatial platform that ingests location data, stores it with PostGIS spatial indexing, exposes it via a clean GeoJSON API, and renders it as interactive vector tile maps using Mapbox GL. The result is a fast, customizable spatial intelligence layer that any team can plug into their workflow.",
    decisions: [
      "PostGIS chosen for native spatial indexing and powerful geometric query operators (ST_Within, ST_Distance, etc.)",
      "Mapbox GL for client-side vector tile rendering — performant at scale without server-side map generation",
      "GeoJSON as the canonical data format throughout the pipeline for maximum interoperability",
      "PostgreSQL as the primary database to leverage the mature PostGIS ecosystem",
    ],
    challenges: [
      "Efficiently indexing and querying large volumes of point and polygon geometry data without query timeouts",
      "Keeping map rendering performant when displaying thousands of concurrent spatial features",
      "Designing an intuitive API for spatial queries that abstracts PostGIS complexity for consuming apps",
    ],
    results: [
      "Live demo deployed at spatial-nexus.vercel.app",
      "Interactive map with real-time spatial querying operational",
      "PostGIS-backed spatial API with GeoJSON endpoints",
    ],
    improvements: [
      "Add real-time data streaming via WebSockets for live location tracking",
      "Implement heatmap and clustering layers for high-density point datasets",
      "Build an admin dashboard for managing spatial datasets and access control",
      "Add raster tile support for satellite imagery overlays",
    ],
    github: "https://github.com/spatial-nexus",
    demo: "https://spatial-nexus.vercel.app/",
  },
  {
    slug: "africut-sell-ai",
    title: "AfriCut Sell AI",
    category: "AI · SOCIAL COMMERCE · CONTENT GENERATION",
    tags: ["AI", "Social Commerce", "Content Generation"],
    filterTags: ["AI", "FULL-STACK"],
    description: "AI-powered social commerce platform for African merchants.",
    longDescription:
      "A full-stack, AI-powered social commerce and content generation platform designed for African and global merchants, creators, and entrepreneurs. Bridges the gap between raw product footage and high-converting, ready-to-publish social media sales kits for WhatsApp, Instagram, TikTok, Facebook, and X.",
    technologies: ["TypeScript", "Vite", "Google Gemini AI", "Dala Studio", "Node.js"],
    featured: false,
    featuredSize: "small",
    architecture: [
      { id: "video", label: "PRODUCT FOOTAGE", sublabel: "Raw video input" },
      { id: "gemini", label: "GEMINI AI", sublabel: "Content analysis" },
      { id: "dala", label: "DALA STUDIO", sublabel: "Media processing" },
      { id: "generator", label: "CONTENT ENGINE", sublabel: "Sales copy + captions" },
      { id: "kit", label: "SALES KIT", sublabel: "Multi-platform export" },
    ],
    aiArchitecture: [
      { id: "footage", label: "PRODUCT VIDEO" },
      { id: "vision", label: "VISION AI", sublabel: "Gemini multimodal" },
      { id: "copy", label: "COPY GENERATION", sublabel: "Sales-optimized text" },
      { id: "output", label: "SOCIAL KIT", sublabel: "Platform-ready content" },
    ],
    problem:
      "African micro and small businesses lack the tools and resources to produce high-converting social media content from their raw product footage. Content creation is time-consuming, expensive, and requires skills most merchants do not have — leaving enormous sales potential untapped on WhatsApp, Instagram, TikTok, and beyond.",
    product:
      "AfriCut Sell AI is a mobile-first platform powered by Google Gemini AI and Dala Studio. Merchants upload raw product videos, and the AI engine analyzes the footage, generates platform-specific sales copy, captions, and hashtags, and packages everything into a ready-to-publish social media sales kit for WhatsApp, Instagram, TikTok, Facebook, and X.",
    decisions: [
      "Google Gemini AI chosen for its multimodal capabilities — analyzing both video content and generating contextual sales copy in a single model",
      "Mobile-first design as the primary interface, reflecting how African merchants predominantly use smartphones for business",
      "Vite for a fast, lightweight frontend build with minimal overhead",
      "Platform-specific output formats (WhatsApp, Instagram, TikTok) to maximize content relevance and engagement",
      "Dala Studio for media processing and content packaging into polished sales kits",
    ],
    challenges: [
      "Generating sales copy that resonates with culturally diverse African markets and local buying behaviors",
      "Processing and analyzing video content in real time without excessive latency on mobile connections",
      "Producing platform-appropriate formats for multiple social networks with distinct character limits, aspect ratios, and tone requirements",
      "Designing a UX simple enough for non-technical merchants to use with zero onboarding friction",
    ],
    results: [
      "Live demo deployed at afri-cut-sell-7e47.vercel.app",
      "End-to-end pipeline from product video to social sales kit operational",
      "Multi-platform output covering WhatsApp, Instagram, TikTok, Facebook, and X",
      "Powered by Gemini AI with mobile-first interface optimized for African merchants",
    ],
    improvements: [
      "Add support for audio-only product pitches as an input modality",
      "Build a merchant dashboard to manage, schedule, and track published content",
      "Integrate direct publishing to social platforms via their APIs",
      "Add analytics to track which AI-generated content drives the most sales conversions",
    ],
    github: "https://github.com/devadex247/africut-sell-AI",
    demo: "https://afri-cut-sell-7e47.vercel.app/",
  },
];
