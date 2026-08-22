"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const evolution = [
  { id: "frontend", label: "FRONTEND", desc: "React, JavaScript, UI systems" },
  { id: "fullstack", label: "FULL-STACK", desc: "Node.js, APIs, databases" },
  { id: "backend", label: "BACKEND", desc: "FastAPI, PostgreSQL, serverless" },
  { id: "ai", label: "AI ENGINEERING", desc: "RAG, agents, LLMs, embeddings" },
  { id: "systems", label: "INTELLIGENT SYSTEMS", desc: "Production AI, multi-tenant platforms", highlight: true },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="section"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* Left: text */}
          <div>
            <SectionHeader
              eyebrow="// whoami"
              title="I build. I experiment. I ship."
              subtitle="Adekunle AbdulMuheez is a Software + AI Engineer focused on practical software systems and modern AI."
            />

            <Reveal delay={0.1}>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "0.9375rem" }}>
                  Currently focused on serverless full-stack architectures, RAG systems, agentic workflows
                  (LangGraph, CrewAI), and shipping AI features into real products across health, education,
                  and business analytics.
                </p>
                <p style={{ color: "var(--text-secondary)", lineHeight: 1.75, fontSize: "0.9375rem" }}>
                  I believe software engineering is about building systems that solve real problems — not
                  collecting technologies. Every tool I use is in service of something worth shipping.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "var(--status-green, #16a34a)",
                      animation: "pulse-dot 2s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--status-green, #16a34a)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    OPEN TO WORK — AI & Software Engineering roles
                  </span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: engineering progression */}
          <Reveal delay={0.15}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-secondary)",
                  marginBottom: "20px",
                }}
              >
                ENGINEERING PROGRESSION
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                {evolution.map((step, i) => (
                  <div
                    key={step.id}
                    style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <Reveal delay={i * 0.07}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "12px 16px",
                          border: step.highlight
                            ? "1px solid var(--accent)"
                            : "1px solid var(--border)",
                          borderRadius: "8px",
                          background: step.highlight ? "var(--accent-subtle)" : "var(--surface)",
                          minWidth: "280px",
                          transition: "border-color 0.2s ease",
                        }}
                      >
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            background: step.highlight ? "var(--accent)" : "var(--border)",
                            flexShrink: 0,
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.6875rem",
                              fontWeight: 600,
                              letterSpacing: "0.1em",
                              color: step.highlight ? "var(--accent)" : "var(--text-primary)",
                            }}
                          >
                            {step.label}
                          </div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--text-secondary)",
                              marginTop: "2px",
                            }}
                          >
                            {step.desc}
                          </div>
                        </div>
                      </div>
                    </Reveal>
                    {i < evolution.length - 1 && (
                      <div
                        style={{
                          width: "1px",
                          height: "16px",
                          background: "var(--border)",
                          marginLeft: "23px",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
