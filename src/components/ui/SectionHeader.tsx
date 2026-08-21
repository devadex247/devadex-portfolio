"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

export function SectionHeader({ eyebrow, title, subtitle, align = "left" }: SectionHeaderProps) {
  return (
    <Reveal>
      <div style={{ textAlign: align, marginBottom: "64px" }}>
        <div
          className="section-eyebrow"
          style={{ justifyContent: align === "center" ? "center" : "flex-start" }}
        >
          <span className="sys-label" style={{ color: "var(--accent)" }}>
            {eyebrow}
          </span>
        </div>
        <h2
          className="text-display"
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "var(--text-primary)",
            marginBottom: subtitle ? "16px" : 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              maxWidth: "540px",
              margin: align === "center" ? "0 auto" : undefined,
              lineHeight: 1.6,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}
