"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only on desktop
    if (window.innerWidth < 768) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const lerp = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(lerp);
    };
    const rafId = requestAnimationFrame(lerp);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor]");
      setIsHovering(!!isInteractive);
      const label = target.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") || "";
      setCursorLabel(label);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div className="custom-cursor" aria-hidden="true">
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "10px" : "7px",
          height: isHovering ? "10px" : "7px",
          background: "var(--text-primary)",
          borderRadius: "50%",
          transition: "width 0.2s ease, height 0.2s ease",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: isHovering ? "44px" : "32px",
          height: isHovering ? "44px" : "32px",
          border: "1.5px solid var(--text-primary)",
          borderRadius: "50%",
          transition: "width 0.15s ease, height 0.15s ease, opacity 0.15s ease",
          opacity: isHovering ? 0.6 : 0.3,
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "difference",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {cursorLabel && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.45rem",
              letterSpacing: "0.08em",
              color: "var(--text-primary)",
              whiteSpace: "nowrap",
            }}
          >
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
}
