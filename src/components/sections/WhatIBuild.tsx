"use client";

import { MagneticCard } from "@/components/ui/MagneticCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const cards = [
  {
    id: "01",
    title: "AI SYSTEMS",
    description: "Building production AI, not wrappers.",
    skills: ["RAG", "LLMs", "Agents", "Embeddings", "Vector Search", "Context Engineering"],
    visual: "⬡",
    color: "var(--accent)",
  },
  {
    id: "02",
    title: "BACKEND SYSTEMS",
    description: "APIs and data systems that hold.",
    skills: ["APIs", "FastAPI", "Node.js", "PostgreSQL", "Authentication", "Multi-tenancy"],
    visual: "⬡",
    color: "var(--text-secondary)",
  },
  {
    id: "03",
    title: "FULL-STACK PRODUCTS",
    description: "End-to-end product engineering.",
    skills: ["TypeScript", "React", "Next.js", "Server Architecture", "SaaS"],
    visual: "⬡",
    color: "var(--text-secondary)",
  },
  {
    id: "04",
    title: "AI PRODUCT INTEGRATION",
    description: "Weaving AI into real products.",
    skills: ["AI Workflows", "Tool Calling", "AI Features", "Automation", "Intelligent Interfaces"],
    visual: "⬡",
    color: "var(--text-secondary)",
  },
];

export function WhatIBuild() {
  return (
    <section
      id="capabilities"
      className="section"
      aria-labelledby="capabilities-heading"
      style={{ background: "var(--bg)" }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="// capabilities"
          title="What I build."
          subtitle="Systems organized by domain — not a technology list."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 0.07}>
              <MagneticCard
                style={{
                  height: "100%",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Card header */}
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        color: "var(--text-secondary)",
                        letterSpacing: "0.1em",
                        display: "block",
                        marginBottom: "8px",
                      }}
                    >
                      {card.id}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        color: "var(--text-primary)",
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  {/* Small technical visual */}
                  <div
                    aria-hidden="true"
                    style={{
                      width: "28px",
                      height: "28px",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.875rem",
                      color: "var(--border)",
                    }}
                  >
                    {card.id === "01" ? "◈" : card.id === "02" ? "⬡" : card.id === "03" ? "▣" : "◉"}
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                  }}
                >
                  {card.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
                  {card.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        border: "1px solid var(--border)",
                        borderRadius: "3px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        color: "var(--text-secondary)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </MagneticCard>
            </Reveal>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 1024px) {
          #capabilities .container > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          #capabilities .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
