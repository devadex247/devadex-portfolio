import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL("https://adextechhub.dev"),
  title: {
    default: "Adekunle AbdulMuheez — AI Engineer & Full-Stack Software Engineer",
    template: "%s | Adekunle AbdulMuheez",
  },
  description:
    "I design and build intelligent software systems — from production APIs and full-stack platforms to RAG pipelines, AI agents, and AI-powered products. Based in Lagos, Nigeria.",
  keywords: [
    "AI Engineer",
    "Full-Stack Software Engineer",
    "RAG",
    "LLMs",
    "AI Agents",
    "Software Engineering",
    "FastAPI",
    "Next.js",
    "LangChain",
    "LangGraph",
    "Nigeria",
    "Adekunle AbdulMuheez",
    "ADEXTECHHUB",
  ],
  authors: [{ name: "Adekunle AbdulMuheez", url: "https://github.com/devadex247" }],
  creator: "Adekunle AbdulMuheez",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adextechhub.dev",
    siteName: "ADEXTECHHUB",
    title: "Adekunle AbdulMuheez — AI Engineer & Full-Stack Software Engineer",
    description:
      "I design and build intelligent software systems — from production APIs and full-stack platforms to RAG pipelines, AI agents, and AI-powered products.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@a_abdulmuheez",
    creator: "@a_abdulmuheez",
    title: "Adekunle AbdulMuheez — AI Engineer & Full-Stack Software Engineer",
    description:
      "I design and build intelligent software systems — from production APIs and full-stack platforms to RAG pipelines, AI agents, and AI-powered products.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// Prevent flash of wrong theme
const themeScript = `
  (function() {
    try {
      var stored = localStorage.getItem('theme');
      var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var theme = stored || preferred;
      document.documentElement.setAttribute('data-theme', theme);
    } catch(e) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  })();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=JetBrains+Mono:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Theme toggle - fixed position */}
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 800,
          }}
        >
          <ThemeToggle />
        </div>

        <CustomCursor />
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
