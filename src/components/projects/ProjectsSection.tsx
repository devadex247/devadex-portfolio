"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { projects, type Project } from "@/content/projects";
import { MagneticCard } from "@/components/ui/MagneticCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

type FilterTag = "ALL" | "AI" | "FULL-STACK" | "BACKEND" | "OPEN SOURCE";

const filters: FilterTag[] = ["ALL", "AI", "FULL-STACK", "BACKEND", "OPEN SOURCE"];

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <MagneticCard
      style={{
        height: "100%",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link
        href={`/work/${project.slug}`}
        style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none" }}
        data-cursor-label="VIEW →"
        aria-label={`View ${project.title} case study`}
      >
        {/* Card top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.1em",
            }}
          >
            {project.category}
          </span>
          <div style={{ display: "flex", gap: "5px" }}>
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--border)",
              }}
            />
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--border)",
              }}
            />
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "var(--accent)",
                opacity: 0.7,
              }}
            />
          </div>
        </div>

        {/* Card body */}
        <div
          style={{
            flex: 1,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: large ? "1.75rem" : "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--text-primary)",
                marginBottom: "10px",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                maxWidth: large ? "480px" : "none",
              }}
            >
              {project.longDescription}
            </p>
          </div>

          {large && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                marginTop: "auto",
                paddingTop: "8px",
              }}
            >
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {!large && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "auto" }}>
              {project.technologies.slice(0, 4).map((tech) => (
                <span key={tech} className="tech-tag">
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5625rem",
                    color: "var(--text-secondary)",
                    padding: "3px 8px",
                  }}
                >
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 20px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            {project.demo && (
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                }}
              >
                LIVE DEMO ↗
              </span>
            )}
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-secondary)",
                letterSpacing: "0.08em",
              }}
            >
              GITHUB ↗
            </span>
          </div>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.08em",
            }}
          >
            VIEW CASE STUDY →
          </span>
        </div>
      </Link>
    </MagneticCard>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<FilterTag>("ALL");

  const filtered = projects.filter(
    (p) => activeFilter === "ALL" || p.filterTags.includes(activeFilter as any)
  );

  const featured = filtered.find((p) => p.slug === "medos");
  const mediums = filtered.filter((p) => p.slug !== "medos" && p.featured);

  return (
    <section
      id="work"
      className="section"
      aria-labelledby="work-heading"
      style={{ background: "var(--bg)" }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="// work"
          title="Selected projects."
          subtitle="Systems I've designed, built, and shipped."
        />

        {/* Filters */}
        <Reveal>
          <div
            role="tablist"
            aria-label="Project filters"
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "32px",
              flexWrap: "wrap",
            }}
          >
            {filters.map((f) => (
              <motion.button
                key={f}
                role="tab"
                aria-selected={activeFilter === f}
                onClick={() => setActiveFilter(f)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={spring}
                style={{
                  padding: "7px 16px",
                  borderRadius: "6px",
                  border: activeFilter === f ? "1px solid var(--accent)" : "1px solid var(--border)",
                  background: activeFilter === f ? "var(--accent-subtle)" : "transparent",
                  color: activeFilter === f ? "var(--accent)" : "var(--text-secondary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  transition: "color 0.15s ease, border-color 0.15s ease, background 0.15s ease",
                }}
              >
                {f}
              </motion.button>
            ))}
          </div>
        </Reveal>

        {/* Bento grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Large featured — MedOS */}
            {featured && (
              <Reveal>
                <div style={{ marginBottom: "16px", minHeight: "320px" }}>
                  <ProjectCard project={featured} large />
                </div>
              </Reveal>
            )}

            {/* Medium cards — OgaMetrics + Get2Learn */}
            {mediums.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                }}
              >
                {mediums.map((project, i) => (
                  <Reveal key={project.slug} delay={i * 0.07}>
                    <div style={{ minHeight: "280px", height: "100%" }}>
                      <ProjectCard project={project} />
                    </div>
                  </Reveal>
                ))}
              </div>
            )}

            {filtered.length === 0 && (
              <div
                style={{
                  padding: "80px 24px",
                  textAlign: "center",
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-secondary)",
                  fontSize: "0.875rem",
                  border: "1px dashed var(--border)",
                  borderRadius: "12px",
                }}
              >
                // no projects match filter — more coming
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <Link
              href="/work"
              className="btn-ghost"
              style={{ display: "inline-flex" }}
            >
              VIEW ALL PROJECTS →
            </Link>
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #work .container > div:last-child > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
