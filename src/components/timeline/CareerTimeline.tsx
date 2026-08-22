"use client";

import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

export function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <section
      id="experience"
      className="section"
      aria-labelledby="experience-heading"
      style={{ background: "var(--surface)" }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="// git log --all"
          title="Engineering journey."
          subtitle="System version history — each role a new module deployed."
        />

        <div
          ref={containerRef}
          style={{ position: "relative", paddingLeft: "48px", maxWidth: "680px" }}
        >
          {/* Animated SVG path */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "16px",
              top: 0,
              bottom: 0,
              width: "1px",
            }}
          >
            {/* Background track */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--border)",
              }}
            />
            {/* Animated fill */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to bottom, var(--accent), var(--border))",
                scaleY,
                transformOrigin: "top",
              }}
            />
          </div>

          {/* Timeline entries */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {experience.map((entry, i) => (
              <TimelineEntry key={entry.id} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineEntry({
  entry,
  index,
}: {
  entry: (typeof experience)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20, scale: 0.95 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.1, ...spring }}
      style={{ position: "relative", paddingBottom: "48px" }}
    >
      {/* Timeline node */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-38px",
          top: "24px",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: entry.current ? "var(--accent)" : "var(--surface)",
          border: `2px solid ${entry.current ? "var(--accent)" : "var(--border)"}`,
          zIndex: 1,
          boxShadow: entry.current ? "0 0 0 3px var(--accent-subtle)" : "none",
          animation: entry.current ? "pulse-dot 2s ease-in-out infinite" : "none",
        }}
      />

      {/* Entry card */}
      <div
        style={{
          background: "var(--bg)",
          border: `1px solid ${entry.current ? "var(--accent)" : "var(--border)"}`,
          borderRadius: "10px",
          padding: "24px",
        }}
      >
        {/* Commit label */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            letterSpacing: "0.1em",
            color: entry.current ? "var(--accent)" : "var(--text-secondary)",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>{entry.commitId}</span>
          <span style={{ color: "var(--border)" }}>·</span>
          <span>{entry.type}</span>
          {entry.current && (
            <span
              style={{
                padding: "1px 6px",
                background: "var(--accent-subtle)",
                color: "var(--accent)",
                borderRadius: "3px",
                fontSize: "0.5rem",
              }}
            >
              CURRENT
            </span>
          )}
        </div>

        <h3
          style={{
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}
        >
          {entry.role}
        </h3>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            marginBottom: "16px",
            display: "flex",
            gap: "10px",
          }}
        >
          <span>{entry.company}</span>
          <span>·</span>
          <span>{entry.period}</span>
        </div>

        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.7,
            marginBottom: "16px",
          }}
        >
          {entry.description}
        </p>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            marginBottom: "20px",
          }}
        >
          {entry.highlights.map((h) => (
            <li
              key={h}
              style={{
                display: "flex",
                gap: "8px",
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
              }}
            >
              <span
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  flexShrink: 0,
                  marginTop: "3px",
                }}
              >
                ›
              </span>
              {h}
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {entry.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
