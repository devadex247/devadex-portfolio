"use client";

import Link from "next/link";
import { siteConfig } from "@/content/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--bg)",
        padding: "48px 0 32px",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "40px",
            alignItems: "start",
            marginBottom: "40px",
          }}
        >
          {/* Brand */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "var(--text-primary)",
                display: "block",
                marginBottom: "6px",
              }}
            >
              ADEXTECHHUB
            </Link>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-secondary)",
                letterSpacing: "0.1em",
                marginBottom: "4px",
              }}
            >
              AI ENGINEER · SOFTWARE ENGINEER
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--text-secondary)",
                letterSpacing: "0.1em",
              }}
            >
              LAGOS, NIGERIA
            </div>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            {[
              { label: "Work", href: "/#work" },
              { label: "Engineering", href: "/engineering" },
              { label: "Writing", href: "/writing" },
              { label: "Experience", href: "/experience" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.04em",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Code signature */}
        <div
          style={{
            padding: "16px 20px",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
            marginBottom: "32px",
            lineHeight: 1.7,
          }}
        >
          <span style={{ color: "var(--accent)" }}>while</span>
          <span style={{ color: "var(--text-primary)" }}>(alive) {"{"}</span>
          <br />
          <span style={{ paddingLeft: "24px" }}></span>
          <span style={{ color: "var(--text-primary)" }}>build();</span>
          <br />
          <span style={{ paddingLeft: "24px" }}></span>
          <span style={{ color: "var(--text-primary)" }}>learn();</span>
          <br />
          <span style={{ paddingLeft: "24px" }}></span>
          <span style={{ color: "var(--text-primary)" }}>ship();</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>{"}"}</span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              color: "var(--text-secondary)",
              letterSpacing: "0.06em",
            }}
          >
            © {currentYear} ADEKUNLE ABDULMUHEEZ — ADEXTECHHUB
          </span>

          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "GitHub", href: siteConfig.github },
              { label: "LinkedIn", href: siteConfig.linkedin },
              { label: "X", href: siteConfig.twitter },
              { label: "Email", href: `mailto:${siteConfig.email}` },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.label !== "Email" ? "_blank" : undefined}
                rel={link.label !== "Email" ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.5625rem",
                  color: "var(--text-secondary)",
                  letterSpacing: "0.08em",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 640px) {
          footer .container > div:first-child {
            grid-template-columns: 1fr !important;
          }
          footer .container > div:last-child {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
}
