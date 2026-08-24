"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/**
 * A warm pool of light that follows the cursor across a dark section.
 *
 * Two details make the difference between this feeling alive and feeling
 * broken. It listens on the window rather than the section, so the light is
 * already in the right place when the pointer arrives instead of being stuck
 * wherever it was last seen. And it stays hidden until the pointer actually
 * moves — the earlier version parked a glow dead centre on load and read as a
 * static blob nobody could explain.
 */
export function PointerLight({
  size = "48rem 34rem",
  intensity = 0.3,
}: {
  size?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [live, setLive] = useState(false);

  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const sx = useSpring(mx, { stiffness: 70, damping: 24, mass: 1 });
  const sy = useSpring(my, { stiffness: 70, damping: 24, mass: 1 });
  const light = useMotionTemplate`radial-gradient(${size} at ${sx}% ${sy}%, hsl(var(--stamp) / ${intensity}), transparent 68%)`;

  useEffect(() => {
    if (reduced) return;
    function onMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
      setLive(true);
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my, reduced]);

  if (reduced) return null;

  return (
    <motion.div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{ backgroundImage: light }}
      animate={{ opacity: live ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    />
  );
}
