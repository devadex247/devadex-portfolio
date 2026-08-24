"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { labExperiments } from "@/content/experience";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

const statusColors: Record<string, string> = {
  ACTIVE: "var(--status-green, #16a34a)",
  ONGOING: "var(--accent)",
  RESEARCH: "var(--text-secondary)",
};

export function AIEngineeringLab() {
  return (
    <section
      id="lab"
      className="section"
      aria-labelledby="lab-heading"
      style={{ background: "var(--bg)" }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="// ai-lab"
          title="AI Engineering Lab."
          subtitle="Ongoing experiments. Each may become a system, article, or product."
        />

        {/* Lab console frame */}
        <Reveal>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "12px",
              overflow: "hidden",
              background: "var(--surface)",
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 20px",
                borderBottom: "1px solid var(--border)",
                background: "var(--bg)",
              }}
            >
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5625rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.1em",
                }}
              >
                ADEXTECHHUB :: AI ENGINEERING LAB
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5625rem",
                  color: "var(--accent)",
                  letterSpacing: "0.08em",
                }}
              >
                STATUS: ACTIVE
              </span>
            </div>

            {/* Experiments list */}
            <div style={{ padding: "8px 0" }}>
              {labExperiments.map((exp, i) => (
                <LabEntry key={exp.id} experiment={exp} index={i} />
              ))}
            </div>

            {/* Footer prompt */}
            <div
              style={{
                padding: "12px 20px",
                borderTop: "1px solid var(--border)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ color: "var(--accent)" }}>$</span>
              <span>lab --list --status=active</span>
              <span
                style={{
                  display: "inline-block",
                  width: "7px",
                  height: "13px",
                  background: "var(--text-secondary)",
                  animation: "blink 1s step-end infinite",
                  verticalAlign: "middle",
                }}
              />
            </div>
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          .lab-entry-row {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            padding: 14px 16px !important;
          }
          .lab-entry-meta {
            width: 100% !important;
            justify-content: space-between !important;
            padding-left: 34px !important;
          }
        }
      `}</style>
    </section>
  );
}

function LabEntry({
  experiment,
  index,
}: {
  experiment: (typeof labExperiments)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.06, ...spring }}
      className="lab-entry-row"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "20px",
        padding: "16px 20px",
        borderBottom: index < labExperiments.length - 1 ? "1px solid var(--border-subtle, #f0f0f0)" : "none",
        transition: "background 0.15s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "var(--accent-subtle)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "transparent";
      }}
    >
      {/* ID & Title */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", flex: 1, minWidth: 0, width: "100%" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.625rem",
            color: "var(--text-secondary)",
            width: "20px",
            flexShrink: 0,
            marginTop: "2px",
          }}
        >
          {experiment.id}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "0.02em",
              marginBottom: "3px",
            }}
          >
            {experiment.title}
          </div>
          <div
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
            }}
          >
            {experiment.description}
          </div>
        </div>
      </div>

      {/* Meta: Tags + Status */}
      <div className="lab-entry-meta" style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>
        {/* Tags */}
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexShrink: 0,
            flexWrap: "wrap",
            justifyContent: "flex-start",
            maxWidth: "200px",
          }}
        >
          {experiment.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: "2px 7px",
                border: "1px solid var(--border)",
                borderRadius: "3px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.5rem",
                color: "var(--text-secondary)",
                letterSpacing: "0.05em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            flexShrink: 0,
            minWidth: "64px",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              width: "5px",
              height: "5px",
              borderRadius: "50%",
              background: statusColors[experiment.status],
              flexShrink: 0,
              animation: experiment.status === "ACTIVE" ? "pulse-dot 2s ease-in-out infinite" : "none",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              color: statusColors[experiment.status],
              letterSpacing: "0.08em",
            }}
          >
            {experiment.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
