"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { siteConfig } from "@/content/site";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

export function CredibilityStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
      }}
    >
      <div className="container">
        <div
          className="credibility-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}
        >
          {siteConfig.metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, ...spring }}
              className="credibility-item"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                padding: "32px 20px",
                borderRight: i < siteConfig.metrics.length - 1 ? "1px solid var(--border)" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "clamp(1.5rem, 4vw, 1.75rem)",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}
              >
                {metric.value}
              </span>
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginTop: "4px",
                }}
              >
                {metric.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.625rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {metric.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        @media (max-width: 768px) {
          .credibility-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .credibility-grid .credibility-item:nth-child(2) {
            border-right: none !important;
          }
          .credibility-grid .credibility-item:nth-child(1),
          .credibility-grid .credibility-item:nth-child(2) {
            border-bottom: 1px solid var(--border) !important;
          }
        }
        @media (max-width: 480px) {
          .credibility-grid .credibility-item {
            padding: 24px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
