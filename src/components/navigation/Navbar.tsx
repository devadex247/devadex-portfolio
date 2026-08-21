"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/content/site";
import { CommandPalette } from "./CommandPalette";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, ...spring }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          height: "60px",
          transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
          background: scrolled ? "rgba(var(--bg-rgb, 247, 247, 245), 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
      >
        <div
          className="container"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "var(--text-primary)",
            }}
          >
            ADEXTECHHUB
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary navigation"
            style={{ display: "flex", alignItems: "center", gap: "32px" }}
            className="nav-desktop"
          >
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontSize: "0.875rem",
                  color: "var(--text-secondary)",
                  transition: "color 0.15s ease",
                  fontWeight: 450,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="nav-desktop">
            <CommandPalette />

            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--text-secondary)",
                transition: "color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              GitHub ↗
            </a>

            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Resume"
              style={{
                padding: "7px 16px",
                background: "var(--text-primary)",
                color: "var(--bg)",
                borderRadius: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.06em",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLAnchorElement).style.color = "white";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background = "var(--text-primary)";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
              }}
            >
              RESUME
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="nav-mobile-btn"
            style={{
              display: "none",
              flexDirection: "column",
              gap: "4px",
              padding: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: "var(--text-primary)",
                transition: "transform 0.2s ease",
                transform: mobileOpen ? "rotate(45deg) translateY(4px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: "var(--text-primary)",
                transition: "opacity 0.2s ease",
                opacity: mobileOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "20px",
                height: "1.5px",
                background: "var(--text-primary)",
                transition: "transform 0.2s ease",
                transform: mobileOpen ? "rotate(-45deg) translateY(-4px)" : "none",
              }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={spring}
            style={{
              position: "fixed",
              top: "60px",
              left: 0,
              right: 0,
              zIndex: 899,
              background: "var(--bg)",
              borderBottom: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <nav
              aria-label="Mobile navigation"
              style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "4px" }}
            >
              {siteConfig.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ...spring }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: "block",
                      padding: "12px 0",
                      fontSize: "1.125rem",
                      fontWeight: 500,
                      color: "var(--text-primary)",
                      borderBottom: "1px solid var(--border-subtle)",
                    }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  GitHub ↗
                </a>
                <a
                  href={siteConfig.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  LinkedIn ↗
                </a>
                <a
                  href={siteConfig.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                  }}
                >
                  Resume ↗
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        [data-theme="dark"] header {
          background: ${scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent"} !important;
        }
      `}</style>
    </>
  );
}
