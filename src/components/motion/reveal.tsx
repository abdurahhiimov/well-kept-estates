"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Vertical offset the content travels in from. */
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  /**
   * Animate on mount rather than on scroll. Use for anything above the fold —
   * scroll-triggered reveals leave first-paint content invisible until the
   * visitor happens to scroll, which on a landing page reads as a blank screen.
   */
  immediate?: boolean;
};

/**
 * Scroll-triggered fade/slide. Honors prefers-reduced-motion by rendering the
 * content in its final state with no transform.
 */
export function Reveal({
  children,
  className,
  y = 18,
  delay = 0,
  duration = 0.6,
  once = true,
  immediate = false,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  const motionProps = immediate
    ? { animate: { opacity: 1, y: 0 } }
    : {
        whileInView: { opacity: 1, y: 0 },
        viewport: { once, margin: "-12% 0px" },
      };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      {...motionProps}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container + item. Wrap items in <Stagger> and mark each child with
 * <StaggerItem>. Reduced motion collapses to a plain, instant render.
 */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px" }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
