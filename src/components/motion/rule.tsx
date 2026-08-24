"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * A hairline that draws itself left-to-right when scrolled into view.
 * This is the site's main motion idiom — the page rules itself as you read,
 * the way someone would draw a line under a figure.
 */
export function RuleDraw({
  className,
  delay = 0,
  duration = 0.9,
  accent = false,
  immediate = false,
}: {
  className?: string;
  delay?: number;
  duration?: number;
  /** Draw in stamp red rather than the neutral rule colour. */
  accent?: boolean;
  /** Draw on mount rather than on scroll — for rules above the fold. */
  immediate?: boolean;
}) {
  const reduced = useReducedMotion();
  const tone = accent ? "bg-stamp/70" : "bg-border";

  if (reduced) {
    return <div aria-hidden className={cn("h-px w-full", tone, className)} />;
  }

  return (
    <motion.div
      aria-hidden
      className={cn("h-px w-full origin-left", tone, className)}
      initial={{ scaleX: 0 }}
      {...(immediate
        ? { animate: { scaleX: 1 } }
        : {
            whileInView: { scaleX: 1 },
            viewport: { once: true, margin: "-10% 0px" },
          })}
      transition={{ duration, delay, ease: EASE }}
    />
  );
}

/**
 * Section label — the mono caption plus a rule that draws under it. Replaces
 * the uppercase-tracked coloured "eyebrow" that appeared above every heading.
 */
export function SectionLabel({
  children,
  className,
  accent = true,
  immediate = false,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: boolean;
  immediate?: boolean;
}) {
  return (
    <div className={cn("mb-5 max-w-[16rem]", className)}>
      <p className="label-mono">{children}</p>
      <RuleDraw
        className="mt-2"
        accent={accent}
        delay={0.1}
        duration={0.7}
        immediate={immediate}
      />
    </div>
  );
}

/**
 * Rubber stamp. Presses in with a slight overshoot and settles off-square,
 * the way a hand stamp lands. Used for the SAMPLE mark on the report.
 */
export function Stamp({
  children,
  className,
  angle = -6,
  delay = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  angle?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <span
        className={cn("stamp", className)}
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={cn("stamp", className)}
      initial={{ opacity: 0, scale: 1.75, rotate: angle - 10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: angle }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        delay,
        type: "spring",
        stiffness: 420,
        damping: 17,
        mass: 0.7,
      }}
    >
      {children}
    </motion.span>
  );
}
