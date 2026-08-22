// Site-wide content data — single source of truth
export const siteConfig = {
  name: "Adekunle AbdulMuheez",
  brand: "ADEXTECHHUB",
  role: "AI Engineer & Full-Stack Software Engineer",
  tagline: "I build intelligent software systems.",
  description:
    "I design and build intelligent software systems — from production APIs and full-stack platforms to RAG pipelines, AI agents, and AI-powered products.",
  location: "Lagos, Nigeria",
  status: "open_to_work" as const,
  avatar: "/avatar.jpg", // Place your photo in public/avatar.jpg (or .png / external url)
  email: "adextechhub@gmail.com",
  github: "https://github.com/devadex247",
  githubHandle: "@devadex247",
  linkedin: "https://linkedin.com/in/adekunleabdulmuheez/",
  linkedinHandle: "@adekunleabdulmuheez",
  twitter: "https://x.com/a_abdulmuheez/",
  twitterHandle: "@a_abdulmuheez",
  resume:
    "https://adextechhub.lovable.app/__l5e/assets-v1/009c2a2f-06d6-4ce4-8427-e18a2a979da1/Adekunle_AbdulMuheez_Resume.pdf",
  metrics: [
    { value: "03+", label: "Years Experience", sub: "since 2022" },
    { value: "15+", label: "Projects Shipped", sub: "production" },
    { value: "AI", label: "Software Engineering", sub: "systems first" },
    { value: "NG", label: "Lagos, Nigeria", sub: "open to remote" },
  ],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "Engineering", href: "/engineering" },
    { label: "Writing", href: "/writing" },
    { label: "Experience", href: "/experience" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/contact" },
  ],
  commandPalette: [
    { label: "View Work", href: "/#work", key: "W" },
    { label: "About", href: "/#about", key: "A" },
    { label: "Engineering", href: "/engineering", key: "E" },
    { label: "Writing", href: "/writing", key: "B" },
    { label: "Experience", href: "/experience", key: "X" },
    { label: "GitHub", href: "https://github.com/devadex247", key: "G", external: true },
    { label: "LinkedIn", href: "https://linkedin.com/in/adekunleabdulmuheez/", key: "L", external: true },
    { label: "Contact", href: "/contact", key: "C" },
  ],
  bootMessages: [
    "SYSTEM.KERNEL :: v2.4.1 ONLINE",
    "INITIALIZING PORTFOLIO...",
    "LOADING ENGINEERING SYSTEMS...",
    "AI MODULES READY",
    "DATABASE CONNECTION: STABLE",
    "STATUS: ONLINE",
  ],
};
