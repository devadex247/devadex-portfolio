"use client";

import Link from "next/link";
import { articles } from "@/content/writing";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function WritingPageContent() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div className="container" style={{ paddingBottom: "80px" }}>
        <SectionHeader
          eyebrow="// journal"
          title="Engineering logs."
          subtitle="Deep dives into software architecture, AI engines, RAG frameworks, and medical software audit trails."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {articles.map((art, i) => (
            <Reveal key={art.slug} delay={i * 0.08}>
              <Link
                href={`/writing/${art.slug}`}
                style={{
                  display: "block",
                  padding: "28px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  textDecoration: "none",
                  transition: "border-color 0.15s ease, transform 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--text-secondary)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
                aria-label={`Read deep dive: ${art.title}`}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--text-secondary)",
                    marginBottom: "12px",
                  }}
                >
                  <span>{art.date}</span>
                  <span>·</span>
                  <span>{art.readTime}</span>
                </div>

                <h2
                  style={{
                    fontSize: "1.375rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--text-primary)",
                    marginBottom: "10px",
                    lineHeight: 1.25,
                  }}
                >
                  {art.title}
                </h2>

                <p
                  style={{
                    fontSize: "0.9375rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "20px",
                  }}
                >
                  {art.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "12px",
                  }}
                >
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {art.tags.map((tag) => (
                      <span key={tag} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      color: "var(--accent)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    READ DEEP DIVE →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
