"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

const mainFlow = [
  { id: "user", label: "USER" },
  { id: "api", label: "API" },
  { id: "rag", label: "RAG" },
  { id: "vector", label: "VECTOR SEARCH" },
  { id: "llm", label: "LLM" },
  { id: "response", label: "RESPONSE" },
];

const sideFlow = [
  { id: "patient", label: "PATIENT DATA" },
  { id: "triage", label: "AI TRIAGE" },
  { id: "mews", label: "MEWS MODEL" },
  { id: "output", label: "CLINICAL OUT" },
];

function Node({ label, index, active }: { label: string; index: number; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ delay: index * 0.12, ...spring }}
      style={{
        padding: "5px 14px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "5px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.5625rem",
        fontWeight: 500,
        letterSpacing: "0.1em",
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
        textAlign: "center",
      }}
    >
      {label}
    </motion.div>
  );
}

function Connector({ index, active }: { index: number; active: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      <motion.div
        initial={{ scaleY: 0, opacity: 0 }}
        animate={active ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 0 }}
        transition={{ delay: index * 0.12 + 0.06, duration: 0.3 }}
        style={{
          width: "1px",
          height: "16px",
          background: "linear-gradient(to bottom, var(--border), var(--accent))",
          transformOrigin: "top",
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={active ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: index * 0.12 + 0.1 }}
        style={{
          width: 0,
          height: 0,
          borderLeft: "3.5px solid transparent",
          borderRight: "3.5px solid transparent",
          borderTop: "4px solid var(--accent)",
        }}
      />
    </div>
  );
}

export function SystemVisualization() {
  const [active, setActive] = useState(false);
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setActive(true), 400);
    return () => clearTimeout(timer);
  }, []);

  // Pulse animation traveling down the chain
  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setPulseIndex((i) => (i + 1) % mainFlow.length);
    }, 600);
    return () => clearInterval(interval);
  }, [active]);

  return (
    <div
      style={{
        display: "flex",
        gap: "32px",
        alignItems: "flex-start",
      }}
    >
      {/* Main flow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.12em",
            color: "var(--accent)",
            marginBottom: "8px",
            opacity: active ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          RAG PIPELINE
        </div>
        {mainFlow.map((node, i) => (
          <div key={node.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                position: "relative",
              }}
            >
              <Node label={node.label} index={i} active={active} />
              {/* Pulse highlight on active node */}
              {pulseIndex === i && active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: "absolute",
                    inset: "-1px",
                    border: "1px solid var(--accent)",
                    borderRadius: "5px",
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
            {i < mainFlow.length - 1 && <Connector index={i} active={active} />}
          </div>
        ))}
      </div>

      {/* Side flow */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, marginTop: "32px" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.5rem",
            letterSpacing: "0.12em",
            color: "var(--text-secondary)",
            marginBottom: "8px",
            opacity: active ? 1 : 0,
            transition: "opacity 0.3s ease 0.5s",
          }}
        >
          AI TRIAGE
        </div>
        {sideFlow.map((node, i) => (
          <div key={node.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Node label={node.label} index={i + mainFlow.length} active={active} />
            {i < sideFlow.length - 1 && <Connector index={i + mainFlow.length} active={active} />}
          </div>
        ))}
      </div>
    </div>
  );
}
