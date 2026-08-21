"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/content/site";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const filtered = siteConfig.commandPalette.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const open = useCallback(() => {
    setIsOpen(true);
    setQuery("");
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  const execute = useCallback(
    (item: (typeof siteConfig.commandPalette)[0]) => {
      close();
      if (item.external) {
        window.open(item.href, "_blank", "noopener noreferrer");
      } else if (item.href.startsWith("/#")) {
        const id = item.href.slice(2);
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          router.push(item.href);
        }
      } else {
        router.push(item.href);
      }
    },
    [close, router]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? close() : open();
      }
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, open, close]);

  return (
    <>
      {/* Trigger hint - visible in nav */}
      <button
        onClick={open}
        aria-label="Open command palette"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 10px",
          border: "1px solid var(--border)",
          borderRadius: "6px",
          background: "transparent",
          color: "var(--text-secondary)",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6875rem",
          cursor: "pointer",
          transition: "border-color 0.15s ease, color 0.15s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text-secondary)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
        }}
      >
        <span>⌘K</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={close}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(4px)",
                zIndex: 1000,
              }}
            />

            {/* Palette */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={spring}
              role="dialog"
              aria-label="Command palette"
              aria-modal="true"
              style={{
                position: "fixed",
                top: "20%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                maxWidth: "560px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                overflow: "hidden",
                zIndex: 1001,
                boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "14px 16px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                  }}
                >
                  $
                </span>
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    color: "var(--text-primary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.875rem",
                  }}
                />
                <kbd
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6875rem",
                    color: "var(--text-secondary)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    padding: "2px 6px",
                  }}
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              <ul
                style={{ padding: "8px", listStyle: "none", maxHeight: "300px", overflowY: "auto" }}
                role="listbox"
              >
                {filtered.length === 0 ? (
                  <li
                    style={{
                      padding: "12px 16px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    No results for &ldquo;{query}&rdquo;
                  </li>
                ) : (
                  filtered.map((item) => (
                    <motion.li
                      key={item.href}
                      whileHover={{ x: 4 }}
                      transition={spring}
                    >
                      <button
                        onClick={() => execute(item)}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                          color: "var(--text-primary)",
                          transition: "background 0.1s ease",
                          textAlign: "left",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "var(--accent-subtle)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        }}
                        role="option"
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <span
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "0.6875rem",
                              color: "var(--accent)",
                            }}
                          >
                            &gt;
                          </span>
                          <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                            {item.label}
                          </span>
                          {item.external && (
                            <span
                              style={{
                                fontSize: "0.6875rem",
                                color: "var(--text-secondary)",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              ↗
                            </span>
                          )}
                        </div>
                        <kbd
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6875rem",
                            color: "var(--text-secondary)",
                            border: "1px solid var(--border)",
                            borderRadius: "4px",
                            padding: "1px 6px",
                          }}
                        >
                          {item.key}
                        </kbd>
                      </button>
                    </motion.li>
                  ))
                )}
              </ul>

              {/* Footer */}
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "8px 16px",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    color: "var(--text-secondary)",
                    letterSpacing: "0.08em",
                  }}
                >
                  ADEXTECHHUB COMMAND INTERFACE
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
