"use client";

import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { engineeringSkills } from "@/content/experience";

export function EngineeringSection() {
  const domains = Object.entries(engineeringSkills);

  return (
    <section
      id="engineering-skills"
      className="section"
      aria-labelledby="engineering-heading"
      style={{ background: "var(--surface)" }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="// engineering"
          title="How I think about engineering."
          subtitle="Organized by domain — not a skills list with fake percentages."
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
          }}
        >
          {domains.map(([domain, data], i) => (
            <Reveal key={domain} delay={i * 0.07}>
              <div
                style={{
                  padding: "28px",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                }}
              >
                {/* Domain header */}
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.625rem",
                      letterSpacing: "0.14em",
                      color: "var(--accent)",
                      marginBottom: "6px",
                    }}
                  >
                    {domain}
                  </div>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {data.description}
                  </p>
                </div>

                {/* Skill chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                  {data.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        display: "inline-block",
                        padding: "4px 10px",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem",
                        color: "var(--text-secondary)",
                        letterSpacing: "0.04em",
                        transition: "border-color 0.15s ease, color 0.15s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--accent)";
                        (e.currentTarget as HTMLSpanElement).style.color = "var(--accent)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLSpanElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLSpanElement).style.color = "var(--text-secondary)";
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #engineering-skills .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
