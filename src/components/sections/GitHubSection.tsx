"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { siteConfig } from "@/content/site";
import { projects } from "@/content/projects";

const repos = projects.map((p) => ({
  name: p.slug,
  language: p.slug === "get2learn" ? "Python" : "TypeScript",
  description: p.description,
  href: p.github,
  updated: "recently",
  visibility: "Public",
}));

export function GitHubSection() {
  return (
    <section
      id="github"
      className="section"
      aria-labelledby="github-heading"
      style={{ background: "var(--bg)" }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="// open source"
          title="Open source work."
          subtitle={`Engineering evidence — ${siteConfig.githubHandle} on GitHub.`}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
        >
          {repos.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 0.07}>
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${repo.name} on GitHub`}
                style={{
                  display: "block",
                  padding: "20px",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  textDecoration: "none",
                  transition: "border-color 0.15s ease, transform 0.15s ease",
                  height: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--text-secondary)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "none";
                }}
              >
                {/* Repo header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "12px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {/* Folder icon */}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <path
                        d="M2 3.5A1.5 1.5 0 013.5 2h3.879a1.5 1.5 0 011.06.44l.94.94H13a1.5 1.5 0 011.5 1.5v7A1.5 1.5 0 0113 13.5H3A1.5 1.5 0 011.5 12V5A1.5 1.5 0 013 3.5H2z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "var(--accent)",
                      }}
                    >
                      {repo.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5rem",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border)",
                      borderRadius: "3px",
                      padding: "1px 5px",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {repo.visibility.toUpperCase()}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.6,
                    marginBottom: "16px",
                  }}
                >
                  {repo.description}
                </p>

                {/* Meta */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    marginTop: "auto",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div
                      style={{
                        width: "9px",
                        height: "9px",
                        borderRadius: "50%",
                        background: repo.language === "TypeScript" ? "#3178c6" : "#3572A5",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.5625rem",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {repo.language}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.5625rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Updated {repo.updated}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* View all */}
        <Reveal delay={0.2}>
          <div style={{ marginTop: "32px", textAlign: "center" }}>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ display: "inline-flex" }}
            >
              VIEW ALL REPOSITORIES ↗
            </a>
          </div>
        </Reveal>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          #github .container > div:first-of-type + div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
