"use client";

import { cn } from "@/lib/utils";

/**
 * ─────────────────────────────────────────────────────────────────────────
 * GLASS
 * ─────────────────────────────────────────────────────────────────────────
 * Frosted, not refractive — and that's a decision, not a shortcut.
 *
 * This component used to carry true refraction: an SVG displacement map fed
 * to `backdrop-filter`, bending the background behind the panel the way a real
 * lens would. The physics worked. The rendering didn't.
 *
 * A backdrop filter operates on the element's *rectangular* border box. The
 * rounded corner is a clip applied afterwards, so on a pill the displaced
 * backdrop carries a straight seam that the clip can't hide — you get a
 * squared-off ghost sitting inside the rounded shape, reading as two
 * overlapping forms. Turning the displacement down shrinks the seam without
 * removing it, and by the point it's invisible so is the effect.
 *
 * So: blur, a tint, and a single hairline rim. It reads as glass at every
 * size, it's identical in every browser instead of Chromium-only, and there's
 * nothing to smear. Refraction is worth revisiting when `backdrop-filter`
 * respects the border radius of its own filter region.
 */
export function LiquidGlass({
  children,
  className,
  strength = "base",
  as: Tag = "div",
}: {
  children?: React.ReactNode;
  className?: string;
  /** How far the backdrop is blurred. */
  strength?: "soft" | "base" | "strong";
  /** Accepted for call-site compatibility; there's no cursor sheen any more. */
  interactive?: boolean;
  as?: "div" | "header" | "nav" | "section";
}) {
  // Set through the custom property rather than a `backdrop-blur-*` utility:
  // utilities land in a later cascade layer and would replace `.glass`'s whole
  // backdrop-filter, taking the saturation with them.
  const blur = strength === "soft" ? "12px" : strength === "strong" ? "28px" : "20px";

  return (
    <Tag
      className={cn("glass", className)}
      style={{ "--glass-blur": blur } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
