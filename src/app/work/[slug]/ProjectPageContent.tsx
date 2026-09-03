"use client";

import Link from "next/link";
import { ArchitectureDiagram } from "@/components/architecture/ArchitectureDiagram";
import { ProjectScreenshotGallery } from "@/components/projects/ProjectScreenshotGallery";
import type { Project } from "@/content/projects";

const bodyText: React.CSSProperties = {
  fontSize: "0.9375rem",
  color: "var(--text-secondary)",
  lineHeight: 1.75,
};

function CaseStudySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`section-${title.replace(/\s/g, "-").toLowerCase()}`}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{ width: "24px", height: "1px", background: "var(--accent)" }} />
        <h2
          id={`section-${title.replace(/\s/g, "-").toLowerCase()}`}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function ProjectPageContent({ project }: { project: Project }) {
  return (
    <div style={{ paddingTop: "80px" }}>
      {/* Breadcrumb */}
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "20px" }}>
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
              href="/work"
              style={{ color: "var(--text-secondary)", transition: "color 0.15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              work
            </Link>
            <span>/</span>
            <span style={{ color: "var(--text-primary)" }}>{project.slug}</span>
          </div>
        </nav>
      </div>

      {/* Hero header */}
      <header
        style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--surface)",
          padding: "60px 0",
        }}
      >
        <div className="container">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              letterSpacing: "0.12em",
              color: "var(--accent)",
              display: "block",
              marginBottom: "16px",
            }}
          >
            {project.category}
          </span>
          <h1
            className="text-display"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "var(--text-primary)", marginBottom: "20px" }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              maxWidth: "640px",
              lineHeight: 1.65,
              marginBottom: "32px",
            }}
          >
            {project.longDescription}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
            {project.technologies.map((tech) => (
              <span key={tech} className="tech-tag">{tech}</span>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary"
                aria-label={`View ${project.title} live demo`}>
                LIVE DEMO ↗
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost"
              aria-label={`View ${project.title} source code on GitHub`}>
              GITHUB ↗
            </a>
          </div>

          {/* Screenshot Space Gallery */}
          <ProjectScreenshotGallery project={project} />
        </div>
      </header>

      {/* Case study content */}
      <div className="container" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="project-detail-grid">
          {/* Main content */}
          <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
            <CaseStudySection title="THE PROBLEM">
              <p style={bodyText}>{project.problem}</p>
            </CaseStudySection>

            <CaseStudySection title="THE PRODUCT">
              <p style={bodyText}>{project.product}</p>
            </CaseStudySection>

            <CaseStudySection title="ENGINEERING DECISIONS">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {project.decisions.map((d, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px" }}>
                    <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", flexShrink: 0, marginTop: "3px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p style={bodyText}>{d}</p>
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            <CaseStudySection title="CHALLENGES">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {project.challenges.map((c, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px" }}>
                    <span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", flexShrink: 0, marginTop: "3px" }}>›</span>
                    <p style={bodyText}>{c}</p>
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            <CaseStudySection title="RESULTS">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {project.results.map((r, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px" }}>
                    <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", flexShrink: 0, marginTop: "3px" }}>✓</span>
                    <p style={bodyText}>{r}</p>
                  </li>
                ))}
              </ul>
            </CaseStudySection>

            <CaseStudySection title="WHAT I WOULD IMPROVE">
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {project.improvements.map((imp, i) => (
                  <li key={i} style={{ display: "flex", gap: "12px" }}>
                    <span style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)", fontSize: "0.75rem", flexShrink: 0, marginTop: "3px" }}>→</span>
                    <p style={bodyText}>{imp}</p>
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          </div>

          {/* Sidebar: architecture */}
          <div style={{ position: "sticky", top: "80px" }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.5625rem",
                letterSpacing: "0.12em",
                color: "var(--text-secondary)",
                marginBottom: "24px",
              }}
            >
              // ARCHITECTURE
            </div>

            <ArchitectureDiagram nodes={project.architecture} label="MAIN FLOW" compact />

            {project.aiArchitecture && (
              <div style={{ marginTop: "32px" }}>
                <ArchitectureDiagram nodes={project.aiArchitecture} label="AI SYSTEM" compact />
              </div>
            )}

            <div
              style={{
                marginTop: "40px",
                padding: "20px",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                background: "var(--surface)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5rem",
                  letterSpacing: "0.12em",
                  color: "var(--text-secondary)",
                  marginBottom: "16px",
                }}
              >
                // LINKS
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--accent)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    LIVE DEMO ↗
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.06em",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  GITHUB ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back navigation */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "32px 0" }}>
        <div className="container">
          <Link
            href="/work"
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
            ← BACK TO WORK
          </Link>
        </div>
      </div>
    </div>
  );
}
