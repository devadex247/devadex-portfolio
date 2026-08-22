"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ArchitectureNode } from "@/content/projects";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  label?: string;
  compact?: boolean;
}

export function ArchitectureDiagram({ nodes, label, compact = false }: ArchitectureDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref}>
      {label && (
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5625rem",
            letterSpacing: "0.12em",
            color: "var(--accent)",
            marginBottom: "16px",
          }}
        >
          {label}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          overflowX: "auto",
          paddingBottom: "8px",
        }}
      >
        {nodes.map((node, i) => (
          <div key={node.id} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, ...spring }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: compact ? "7px 14px" : "10px 18px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "7px",
                minWidth: compact ? "180px" : "220px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: i === 0 ? "var(--accent)" : "var(--border)",
                  flexShrink: 0,
                  animation: i === 0 ? "pulse-dot 2s ease-in-out infinite" : "none",
                }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: compact ? "0.625rem" : "0.6875rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "var(--text-primary)",
                  }}
                >
                  {node.label}
                </div>
                {node.sublabel && !compact && (
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5625rem",
                      color: "var(--text-secondary)",
                      marginTop: "2px",
                    }}
                  >
                    {node.sublabel}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Connector */}
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={inView ? { scaleY: 1, opacity: 1 } : {}}
                transition={{ delay: i * 0.1 + 0.08, duration: 0.25 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "22px",
                  transformOrigin: "top",
                }}
              >
                <div
                  style={{
                    width: "1px",
                    height: compact ? "14px" : "20px",
                    background: "linear-gradient(to bottom, var(--border), var(--accent))",
                  }}
                />
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "3px solid transparent",
                    borderRight: "3px solid transparent",
                    borderTop: "4px solid var(--accent)",
                    marginLeft: "-2.5px",
                  }}
                />
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
