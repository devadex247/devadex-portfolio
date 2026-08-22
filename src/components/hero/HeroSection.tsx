"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { SystemVisualization } from "./SystemVisualization";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, clipPath: "inset(0 0 100% 0)" },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: spring,
  },
};

const bootVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, ...spring },
  }),
};

function StatusDot() {
  return (
    <motion.span
      animate={{ opacity: [1, 0.3, 1], scale: [1, 0.8, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{
        display: "inline-block",
        width: "7px",
        height: "7px",
        borderRadius: "50%",
        background: "var(--status-green, #16a34a)",
        marginRight: "8px",
        verticalAlign: "middle",
      }}
    />
  );
}

function HeroAvatar() {
  const [imgError, setImgError] = useState(false);
  const avatarSrc = siteConfig.avatar || "/avatar.jpg";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      style={{
        position: "relative",
        marginTop: "8px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "96px",
          height: "96px",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1.5px solid var(--border)",
          background: "var(--surface)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
          transition: "border-color 0.2s ease, transform 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarSrc}
            alt={siteConfig.name}
            onError={() => setImgError(true)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          /* Fallback when image is not yet uploaded into public/avatar.jpg */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, var(--surface) 0%, var(--bg) 100%)",
              color: "var(--accent)",
              fontFamily: "var(--font-mono)",
              textAlign: "center",
              padding: "8px",
            }}
            title="Place your picture at public/avatar.jpg"
          >
            <span style={{ fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.04em" }}>
              AA
            </span>
            <span style={{ fontSize: "0.5rem", color: "var(--text-secondary)", marginTop: "2px" }}>
              avatar.jpg
            </span>
          </div>
        )}
      </div>

      {/* Online indicator beacon */}
      <div
        style={{
          position: "absolute",
          bottom: "-4px",
          right: "-4px",
          background: "var(--surface)",
          borderRadius: "50%",
          padding: "3px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
        title="Open to Work / Active"
      >
        <span
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "var(--status-green, #16a34a)",
            display: "block",
          }}
        />
      </div>
    </motion.div>
  );
}

function BackgroundFragments() {
  const fragments = [
    { text: "const rag = new RAGPipeline({ model: 'gpt-4o' });", x: "5%", y: "20%", opacity: 0.04 },
    { text: "SELECT * FROM embeddings WHERE tenant_id = $1;", x: "60%", y: "15%", opacity: 0.04 },
    { text: "await vectorStore.similaritySearch(query, k=5);", x: "10%", y: "70%", opacity: 0.04 },
    { text: "@app.post('/api/ingest')", x: "55%", y: "75%", opacity: 0.04 },
    { text: "graph.add_node('retrieve', retriever.invoke)", x: "70%", y: "40%", opacity: 0.035 },
    { text: "type: 'spring', stiffness: 400, damping: 25", x: "3%", y: "45%", opacity: 0.035 },
    { text: "MEWS_SCORE >= 5 → CLINICAL_ALERT", x: "40%", y: "88%", opacity: 0.04 },
  ];

  return (
    <>
      {fragments.map((f, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: f.x,
            top: f.y,
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            color: "var(--text-primary)",
            opacity: f.opacity,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {f.text}
        </div>
      ))}
    </>
  );
}

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [bootDone, setBootDone] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 500], [0, 50]);
  const vizY = useTransform(scrollY, [0, 500], [0, 125]);
  const metaY = useTransform(scrollY, [0, 500], [0, 75]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const timer = setTimeout(() => setBootDone(true), 800);

    const onMouse = (e: MouseEvent) => {
      if (mq.matches) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero section"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: "80px",
      }}
    >
      {/* Layer 1: Background code fragments */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          y: reducedMotion ? 0 : bgY,
          x: reducedMotion ? 0 : mousePos.x * 0.1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <BackgroundFragments />
      </motion.div>

      {/* Layer 2: System visualization */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "max(5vw, 40px)",
          top: "50%",
          transform: "translateY(-50%)",
          y: reducedMotion ? 0 : vizY,
          x: reducedMotion ? 0 : mousePos.x * 0.25,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.85,
        }}
      >
        <SystemVisualization />
      </motion.div>

      {/* Layer 3: Hero typography */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 2 }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: "720px" }}
        >
          {/* Boot sequence */}
          <motion.div
            variants={itemVariants}
            style={{
              marginBottom: "32px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                flexDirection: "column",
                gap: "3px",
                padding: "10px 14px",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                background: "var(--surface)",
              }}
            >
              {siteConfig.bootMessages.map((msg, i) => (
                <motion.div
                  key={msg}
                  custom={i}
                  variants={bootVariants}
                  initial="hidden"
                  animate="visible"
                  style={{
                    color: i === 0 ? "var(--accent)" : i === siteConfig.bootMessages.length - 1 ? "var(--status-green, #16a34a)" : "var(--text-secondary)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {i === 0 && <StatusDot />}
                  {msg}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Name & Avatar Row */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "24px",
              marginBottom: "12px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ marginBottom: "8px" }}>
                <span className="sys-label" style={{ color: "var(--text-secondary)" }}>
                  whoami
                </span>
              </div>
              <h1
                className="text-display"
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  color: "var(--text-primary)",
                  margin: 0,
                  lineHeight: 1.02,
                }}
              >
                Adekunle<br />
                <span style={{ color: "var(--text-secondary)", fontWeight: 300 }}>AbdulMuheez</span>
              </h1>
            </div>

            {/* Profile Picture / Avatar */}
            <HeroAvatar />
          </motion.div>

          {/* Title */}
          <motion.div variants={itemVariants} style={{ marginBottom: "32px" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px 14px",
                border: "1px solid var(--border)",
                borderRadius: "4px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: "var(--text-primary)",
                }}
              >
                AI ENGINEER & FULL-STACK SOFTWARE ENGINEER
              </span>
            </div>
          </motion.div>

          {/* Main statement */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.3,
              marginBottom: "20px",
              letterSpacing: "-0.02em",
            }}
          >
            {siteConfig.tagline}
          </motion.p>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: "1.0625rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              marginBottom: "40px",
              maxWidth: "560px",
            }}
          >
            {siteConfig.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <Link href="/#work" className="btn-primary" data-cursor-label="VIEW →">
              EXPLORE MY WORK
            </Link>
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              data-cursor-label="OPEN →"
            >
              GITHUB ↗
            </a>
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              data-cursor-label="PDF →"
            >
              RESUME
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Layer 4: Foreground metadata */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          x: "-50%",
          y: reducedMotion ? 0 : metaY,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: "1px",
            height: "32px",
            background: "var(--border)",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--text-secondary)",
            letterSpacing: "0.1em",
            writingMode: "vertical-rl",
          }}
        >
          SCROLL
        </span>
      </motion.div>
    </section>
  );
}
