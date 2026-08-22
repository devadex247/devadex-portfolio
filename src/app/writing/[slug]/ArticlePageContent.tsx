"use client";

import Link from "next/link";
import type { Article } from "@/content/writing";

// Simple custom markdown-like formatter to render structured articles nicely
function renderContent(text: string) {
  const lines = text.split("\n");
  let isCode = false;
  let codeContent: string[] = [];

  return lines.map((line, i) => {
    // Handle Code Blocks
    if (line.trim().startsWith("```")) {
      if (isCode) {
        isCode = false;
        const codeText = codeContent.join("\n");
        codeContent = [];
        return (
          <pre
            key={i}
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "20px",
              overflowX: "auto",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--text-primary)",
              lineHeight: 1.6,
              margin: "24px 0",
            }}
          >
            <code>{codeText}</code>
          </pre>
        );
      } else {
        isCode = true;
        return null;
      }
    }

    if (isCode) {
      codeContent.push(line);
      return null;
    }

    // Headings
    if (line.startsWith("# ")) {
      return (
        <h1
          key={i}
          className="text-display"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--text-primary)",
            margin: "32px 0 16px",
          }}
        >
          {line.substring(2)}
        </h1>
      );
    }

    if (line.startsWith("## ")) {
      return (
        <h2
          key={i}
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            margin: "28px 0 12px",
            letterSpacing: "-0.01em",
          }}
        >
          {line.substring(3)}
        </h2>
      );
    }

    if (line.startsWith("### ")) {
      return (
        <h3
          key={i}
          style={{
            fontSize: "1.1875rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            margin: "24px 0 10px",
          }}
        >
          {line.substring(4)}
        </h3>
      );
    }

    // Horizontal Rule
    if (line.trim() === "---") {
      return (
        <hr
          key={i}
          style={{
            border: "none",
            borderTop: "1px solid var(--border)",
            margin: "36px 0",
          }}
        />
      );
    }

    // Lists
    if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
      const item = line.trim().substring(2);
      return (
        <ul key={i} style={{ paddingLeft: "20px", margin: "8px 0" }}>
          <li
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
            }}
          >
            {parseBold(item)}
          </li>
        </ul>
      );
    }

    if (/^\d+\.\s/.test(line.trim())) {
      const item = line.trim().replace(/^\d+\.\s/, "");
      return (
        <ol key={i} style={{ paddingLeft: "20px", margin: "8px 0" }}>
          <li
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.75,
            }}
          >
            {parseBold(item)}
          </li>
        </ol>
      );
    }

    // Empty Lines
    if (line.trim() === "") {
      return <div key={i} style={{ height: "12px" }} />;
    }

    // Paragraph (normal line)
    return (
      <p
        key={i}
        style={{
          fontSize: "0.9375rem",
          color: "var(--text-secondary)",
          lineHeight: 1.75,
          marginBottom: "16px",
        }}
      >
        {parseBold(line)}
      </p>
    );
  });
}

// Helper to parse `**bold**` and ``code`` style tags inline
function parseBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "var(--text-primary)", fontWeight: 650 }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "4px",
            padding: "2px 6px",
            color: "var(--accent)",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export function ArticlePageContent({ article }: { article: Article }) {
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Breadcrumbs */}
      <div
        className="container"
        style={{ paddingTop: "40px", paddingBottom: "20px" }}
      >
        <nav aria-label="Breadcrumb">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--text-secondary)",
            }}
          >
            <Link
              href="/"
              style={{ color: "var(--text-secondary)", transition: "color 0.15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              home
            </Link>
            <span>/</span>
            <Link
              href="/writing"
              style={{ color: "var(--text-secondary)", transition: "color 0.15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              writing
            </Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>{article.slug}</span>
          </div>
        </nav>
      </div>

      {/* Header */}
      <header
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "60px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--text-secondary)",
              marginBottom: "16px",
            }}
          >
            <span>{article.date}</span>
            <span>·</span>
            <span>{article.readTime}</span>
          </div>

          <h1
            className="text-display"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              color: "var(--text-primary)",
              lineHeight: 1.15,
              marginBottom: "24px",
              maxWidth: "880px",
            }}
          >
            {article.title}
          </h1>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {article.tags.map((tag) => (
              <span key={tag} className="tech-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Content body */}
      <article className="container" style={{ padding: "60px 24px 100px", maxWidth: "800px" }}>
        {renderContent(article.content)}
      </article>

      {/* Footer Back navigation */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "32px 0",
        }}
      >
        <div className="container">
          <Link
            href="/writing"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.08em",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            ← BACK TO WRITING
          </Link>
        </div>
      </div>
    </div>
  );
}
