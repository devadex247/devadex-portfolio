"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Smartphone,
  Layers,
  ZoomIn,
  ZoomOut,
  Info,
  ExternalLink,
} from "lucide-react";
import type { Project, ProjectScreenshot } from "@/content/projects";

interface ProjectScreenshotGalleryProps {
  project: Project;
  title?: string;
  subtitle?: string;
}

export function ProjectScreenshotGallery({
  project,
  title = "INTERFACE SHOWCASE",
  subtitle = "Interactive device mockups, feature breakdowns, and system views.",
}: ProjectScreenshotGalleryProps) {
  const screenshots = project.screenshots || [];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const categories = [
    "ALL",
    ...Array.from(new Set(screenshots.map((s) => s.category).filter(Boolean))),
  ] as string[];

  const filteredScreenshots = screenshots.filter(
    (s) => activeCategory === "ALL" || s.category === activeCategory
  );

  const currentScreenshot: ProjectScreenshot | undefined =
    filteredScreenshots[selectedIndex] || filteredScreenshots[0] || screenshots[0];

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % (filteredScreenshots.length || 1));
    setActiveHotspot(null);
    setZoomLevel(1);
  }, [filteredScreenshots.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex(
      (prev) => (prev - 1 + filteredScreenshots.length) % (filteredScreenshots.length || 1)
    );
    setActiveHotspot(null);
    setZoomLevel(1);
  }, [filteredScreenshots.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handleNext, handlePrev]);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const isMobile = currentScreenshot?.device === "mobile";

  return (
    <section className="screenshot-gallery-root" style={{ margin: "48px 0" }}>
      {/* Header */}
      <div style={{ marginBottom: "24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
            <span style={{ width: "16px", height: "1px", background: "var(--accent)" }} />
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "var(--accent)",
              }}
            >
              // {title}
            </span>
          </div>
          <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>{subtitle}</p>
        </div>

        {/* Category Filters */}
        {categories.length > 2 && (
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedIndex(0);
                }}
                style={{
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  border: activeCategory === cat ? "1px solid var(--accent)" : "1px solid var(--border)",
                  background: activeCategory === cat ? "var(--accent-subtle)" : "transparent",
                  color: activeCategory === cat ? "var(--accent)" : "var(--text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Showcase Device Frame */}
      <div
        style={{
          position: "relative",
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 24px 48px rgba(0,0,0,0.18)",
        }}
      >
        {/* Device Frame Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 18px",
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {/* Traffic lights for Desktop / Device indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {!isMobile ? (
              <>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
              </>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--accent)", fontSize: "0.6875rem", fontFamily: "var(--font-mono)" }}>
                <Smartphone size={14} />
                <span>MOBILE VIEWPORT</span>
              </div>
            )}
          </div>

          {/* Simulated Browser URL Bar */}
          {!isMobile && (
            <div
              style={{
                flex: 1,
                maxWidth: "420px",
                margin: "0 16px",
                padding: "4px 14px",
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <span style={{ color: "var(--status-green)", fontSize: "0.6rem" }}>🔒</span>
              <span style={{ color: "var(--text-primary)" }}>
                https://{project.slug}.devadex.app/{currentScreenshot?.category?.toLowerCase() || "view"}
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.625rem",
                color: "var(--text-secondary)",
                padding: "2px 8px",
                borderRadius: "4px",
                background: "var(--accent-subtle)",
              }}
            >
              {selectedIndex + 1} / {filteredScreenshots.length}
            </span>
            <button
              onClick={() => setLightboxOpen(true)}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                borderRadius: "6px",
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.6875rem",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                transition: "border-color 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
              title="Open full screen lightbox"
            >
              <Maximize2 size={13} />
              <span className="hidden-mobile">EXPAND</span>
            </button>
          </div>
        </div>

        {/* Device Content Canvas */}
        <div
          style={{
            position: "relative",
            minHeight: isMobile ? "440px" : "380px",
            maxHeight: "560px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--bg)",
            padding: isMobile ? "32px 16px" : "0",
            overflow: "hidden",
          }}
        >
          {/* Mobile phone frame wrapper if device === 'mobile' */}
          <div
            style={{
              width: isMobile ? "280px" : "100%",
              height: isMobile ? "480px" : "100%",
              borderRadius: isMobile ? "28px" : "0",
              border: isMobile ? "8px solid #1a1a1a" : "none",
              boxShadow: isMobile ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
              position: "relative",
              overflow: "hidden",
              background: "var(--surface)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Mobile Camera Notch */}
            {isMobile && (
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "60px",
                  height: "12px",
                  background: "#1a1a1a",
                  borderRadius: "10px",
                  zIndex: 20,
                }}
              />
            )}

            {/* Main Screenshot Image or Styled Fallback */}
            {currentScreenshot && !imageError[currentScreenshot.id] ? (
              <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img
                  src={currentScreenshot.url}
                  alt={currentScreenshot.title}
                  onError={() => setImageError((prev) => ({ ...prev, [currentScreenshot.id]: true }))}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: isMobile ? "cover" : "contain",
                    display: "block",
                  }}
                />

                {/* Hotspots callouts over image */}
                {currentScreenshot.hotspots?.map((hotspot, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: `${hotspot.x}%`,
                      top: `${hotspot.y}%`,
                      transform: "translate(-50%, -50%)",
                      zIndex: 15,
                    }}
                  >
                    <button
                      onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                      style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "var(--accent)",
                        color: "white",
                        border: "2px solid #ffffff",
                        boxShadow: "0 0 12px var(--accent)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        fontFamily: "var(--font-mono)",
                        animation: "pulse-dot 2s infinite",
                      }}
                      title={hotspot.title}
                    >
                      {idx + 1}
                    </button>

                    {activeHotspot === idx && (
                      <div
                        style={{
                          position: "absolute",
                          bottom: "30px",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "220px",
                          padding: "12px",
                          background: "var(--surface)",
                          border: "1px solid var(--accent)",
                          borderRadius: "8px",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                          zIndex: 30,
                        }}
                      >
                        <div style={{ fontWeight: 600, fontSize: "0.75rem", color: "var(--text-primary)", marginBottom: "4px" }}>
                          {hotspot.title}
                        </div>
                        <div style={{ fontSize: "0.6875rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                          {hotspot.description}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* High-end Styled Fallback Preview Card (if user hasn't uploaded actual PNG yet) */
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "360px",
                  padding: "40px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "radial-gradient(circle at center, var(--accent-subtle) 0%, var(--surface) 80%)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "var(--accent-subtle)",
                    border: "1px solid var(--accent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                    marginBottom: "16px",
                  }}
                >
                  {isMobile ? <Smartphone size={28} /> : <Monitor size={28} />}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.625rem",
                    color: "var(--accent)",
                    letterSpacing: "0.12em",
                    marginBottom: "8px",
                  }}
                >
                  [ SCREENSHOT PLACEHOLDER ]
                </div>

                <h4 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                  {currentScreenshot?.title}
                </h4>

                <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", maxWidth: "420px", marginBottom: "20px" }}>
                  {currentScreenshot?.caption}
                </p>

                <div
                  style={{
                    padding: "8px 14px",
                    borderRadius: "6px",
                    border: "1px dashed var(--border)",
                    background: "var(--bg)",
                    fontSize: "0.6875rem",
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-secondary)",
                  }}
                >
                  Image path: <code style={{ color: "var(--accent)" }}>{currentScreenshot?.url}</code>
                </div>
              </div>
            )}
          </div>

          {/* Carousel Arrows */}
          {filteredScreenshots.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                style={{
                  position: "absolute",
                  left: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 10,
                  transition: "all 0.15s ease",
                }}
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                style={{
                  position: "absolute",
                  right: "16px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  zIndex: 10,
                  transition: "all 0.15s ease",
                }}
                aria-label="Next screenshot"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </div>

        {/* Screenshot Caption Footer */}
        <div
          style={{
            padding: "16px 20px",
            background: "var(--surface)",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginRight: "10px",
              }}
            >
              {currentScreenshot?.title}
            </span>
            <span style={{ fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
              {currentScreenshot?.caption}
            </span>
          </div>

          {currentScreenshot?.hotspots && currentScreenshot.hotspots.length > 0 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--accent)",
              }}
            >
              <Info size={14} />
              <span>Click numbered dots for feature details</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Carousel Strip */}
      {filteredScreenshots.length > 1 && (
        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "16px",
            overflowX: "auto",
            paddingBottom: "8px",
            scrollbarWidth: "none",
          }}
        >
          {filteredScreenshots.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedIndex(idx);
                setActiveHotspot(null);
              }}
              style={{
                flexShrink: 0,
                width: "120px",
                height: "76px",
                borderRadius: "8px",
                overflow: "hidden",
                border: selectedIndex === idx ? "2px solid var(--accent)" : "1px solid var(--border)",
                background: "var(--surface)",
                cursor: "pointer",
                position: "relative",
                padding: 0,
                opacity: selectedIndex === idx ? 1 : 0.6,
                transition: "all 0.15s ease",
              }}
            >
              {!imageError[item.id] ? (
                <img
                  src={item.url}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)", fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                  {item.title}
                </div>
              )}
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  background: "rgba(0,0,0,0.7)",
                  color: "#fff",
                  fontSize: "0.55rem",
                  fontFamily: "var(--font-mono)",
                  padding: "2px 4px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {lightboxOpen && currentScreenshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              background: "rgba(0, 0, 0, 0.92)",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              padding: "24px",
            }}
          >
            {/* Top Modal Toolbar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#ffffff",
                marginBottom: "16px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 700 }}>{currentScreenshot.title}</h3>
                <p style={{ fontSize: "0.8125rem", opacity: 0.7 }}>{currentScreenshot.caption}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() => setZoomLevel((z) => (z === 1 ? 1.5 : 1))}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "6px",
                    padding: "8px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                  }}
                >
                  {zoomLevel === 1 ? <ZoomIn size={16} /> : <ZoomOut size={16} />}
                  <span>{zoomLevel}x</span>
                </button>

                <button
                  onClick={() => setLightboxOpen(false)}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "none",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Image Viewport */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "auto",
              }}
            >
              {!imageError[currentScreenshot.id] ? (
                <img
                  src={currentScreenshot.url}
                  alt={currentScreenshot.title}
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "80vh",
                    objectFit: "contain",
                    transform: `scale(${zoomLevel})`,
                    transition: "transform 0.2s ease",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <div style={{ color: "#fff", textAlign: "center", fontFamily: "var(--font-mono)" }}>
                  <p style={{ fontSize: "1.125rem", marginBottom: "8px" }}>Image path:</p>
                  <code style={{ color: "var(--accent)" }}>{currentScreenshot.url}</code>
                </div>
              )}

              {/* Prev / Next Modal buttons */}
              {filteredScreenshots.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    style={{
                      position: "absolute",
                      left: "16px",
                      background: "rgba(255,255,255,0.15)",
                      border: "none",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button
                    onClick={handleNext}
                    style={{
                      position: "absolute",
                      right: "16px",
                      background: "rgba(255,255,255,0.15)",
                      border: "none",
                      color: "#fff",
                      borderRadius: "50%",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
