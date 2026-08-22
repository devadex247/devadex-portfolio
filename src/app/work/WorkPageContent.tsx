"use client";

import Link from "next/link";
import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

export function WorkPageContent() {
  return (
    <div style={{ paddingTop: "120px" }}>
      <div className="container" style={{ paddingBottom: "80px" }}>
        <SectionHeader
          eyebrow="// work"
          title="All projects."
          subtitle="Systems I've designed, architected, and shipped."
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <Link
                href={`/work/${project.slug}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  gap: "24px",
                  padding: "24px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  textDecoration: "none",
                  transition: "border-color 0.15s ease, transform 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--text-secondary)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
                aria-label={`View ${project.title} case study`}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--text-secondary)",
                    width: "24px",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div>
                  <h2
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      marginBottom: "6px",
                    }}
                  >
                    {project.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      marginBottom: "12px",
                    }}
                  >
                    {project.description}
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span key={tech} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5625rem",
                      color: "var(--text-secondary)",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6875rem",
                      color: "var(--accent)",
                      marginTop: "8px",
                    }}
                  >
                    →
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
