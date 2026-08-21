"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
  onClick?: () => void;
}

export function MagneticCard({
  children,
  className,
  style,
  intensity = 1,
  onClick,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [lifted, setLifted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4 * intensity;
    const rotateY = ((x - centerX) / centerX) * 4 * intensity;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setLifted(false);
  };

  const handleMouseEnter = () => setLifted(true);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      animate={{
        rotateX: reducedMotion ? 0 : tilt.x,
        rotateY: reducedMotion ? 0 : tilt.y,
        y: lifted && !reducedMotion ? -6 : 0,
        scale: lifted && !reducedMotion ? 1.01 : 1,
      }}
      transition={spring}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        cursor: "pointer",
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
