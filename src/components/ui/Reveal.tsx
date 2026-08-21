"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const spring = { type: "spring" as const, stiffness: 400, damping: 25 };

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  direction?: "up" | "left" | "none";
}

export function Reveal({ children, delay = 0, className, style, direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const initial =
    direction === "up"
      ? { opacity: 0, y: 30 }
      : direction === "left"
      ? { opacity: 0, x: -20 }
      : { opacity: 0 };

  const animate = inView
    ? { opacity: 1, y: 0, x: 0 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ ...spring, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
