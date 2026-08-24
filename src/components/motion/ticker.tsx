"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

type TickerProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  /**
   * true  → hold at zero until scrolled into view, then count up once (stats).
   * false → track `value` live as it changes (the pricing slider).
   */
  startOnView?: boolean;
  /**
   * Mark the arrival: the figure pops and settles into the positive colour
   * once it reaches its final value. For the headline number only — on every
   * figure at once it would be noise.
   */
  celebrate?: boolean;
};

/**
 * Spring-driven count-up. The text is written straight into the DOM node from
 * the motion value, so React isn't re-rendering sixty times a second.
 */
export function Ticker({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  startOnView = true,
  celebrate = false,
}: TickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const [landed, setLanded] = useState(false);

  const mv = useMotionValue(startOnView ? 0 : value);
  const spring = useSpring(mv, { damping: 34, stiffness: 110, mass: 1 });
  const source = reduced ? mv : spring;

  const active = startOnView ? inView : true;

  useEffect(() => {
    if (reduced) {
      mv.set(value);
      return;
    }
    if (active) {
      mv.set(value);
    } else if (startOnView) {
      // Rewind once it's off screen so the next visit gets the count again.
      mv.jump(0);
      setLanded(false);
    }
  }, [value, active, reduced, mv, startOnView]);

  useEffect(() => {
    const fmt = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    const render = (v: number) => {
      if (ref.current) ref.current.textContent = `${prefix}${fmt.format(v)}${suffix}`;
      // "Close enough" rather than exact: a spring approaches its target
      // asymptotically and would otherwise never quite arrive.
      if (celebrate && Math.abs(v - value) < Math.max(0.5, value * 0.0004)) {
        setLanded(true);
      }
    };
    render(source.get());
    const unsub = source.on("change", render);
    return () => unsub();
  }, [source, prefix, suffix, decimals, celebrate, value]);

  const label = `${prefix}${value}${suffix}`;

  if (!celebrate) {
    return (
      <span ref={ref} className={className} aria-label={label}>
        {label}
      </span>
    );
  }

  return (
    <motion.span
      ref={ref}
      aria-label={label}
      className={cn(
        "inline-block origin-left transition-colors duration-500",
        className,
        landed && "text-positive",
      )}
      animate={
        landed && !reduced
          ? { scale: [1, 1.13, 0.985, 1] }
          : { scale: 1 }
      }
      transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], times: [0, 0.4, 0.72, 1] }}
    >
      {label}
    </motion.span>
  );
}
