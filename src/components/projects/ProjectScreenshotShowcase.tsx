"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, ExternalLink, ArrowRight, Image as ImageIcon } from "lucide-react";
import type { Project, ProjectScreenshot } from "@/content/projects";

interface ProjectScreenshotShowcaseProps {
  projects: Project[];
}

export function ProjectScreenshotShowcase({ projects }: ProjectScreenshotShowcaseProps) {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedScreenshot, setSelectedScreenshot] = useState<{
    project: Project;
    screenshot: ProjectScreenshot;
  } | null>(null);

  const filterTags = ["ALL", "AI", "FULL-STACK", "BACKEND", "OPEN SOURCE"];

  const filteredProjects = projects.filter(
    (p) => activeFilter === "ALL" || p.filterTags.includes(activeFilter as any)
  );

  return (
    <div className="screenshot-showcase-grid">
      {/* Category filter tabs */}
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px" }}>
        {filterTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveFilter(tag)}
            style={{
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "0.6875rem",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              border: activeFilter === tag ? "1px solid var(--accent)" : "1px solid var(--border)",
              background: activeFilter === tag ? "var(--accent-subtle)" : "transparent",
              color: activeFilter === tag ? "var(--accent)" : "var(--text-secondary)",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Grid of Projects with Screenshot Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "24px",
        }}
      >
        {filteredProjects.map((project) => {
          const mainScreenshotUrl = project.screenshots?.[0]?.url || project.image || `/images/projects/${project.slug}.png`;
          const count = project.screenshots?.length || 1;

          return (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
              className="screenshot-card"
            >
              {/* Card Device Browser Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 16px",
                  background: "var(--bg)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div style={{ display: "flex", gap: "5px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border)" }} />
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--border)" }} />
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent)", opacity: 0.7 }} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5625rem",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {project.category}
                </span>
              </div>

              {/* Card Screenshot Preview Area */}
              <div
                style={{
                  height: "200px",
                  background: "var(--bg)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={mainScreenshotUrl}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />

                {/* Overlay Badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "12px",
                    background: "rgba(0,0,0,0.75)",
                    backdropFilter: "blur(6px)",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "0.625rem",
                    fontFamily: "var(--font-mono)",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <ImageIcon size={12} />
                  <span>{count} SCREENSHOTS</span>
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1 }}>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                  {project.title}
                </h3>
                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "16px", flex: 1 }}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "20px" }}>
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Footer link */}
                <Link
                  href={`/work/${project.slug}`}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    fontWeight: 600,
                    color: "var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "auto",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  <span>EXPLORE SCREENSHOT SPACE</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
