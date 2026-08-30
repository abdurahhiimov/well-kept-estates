"use client";

import Image from "next/image";

/**
 * The mark, oversized and cropped by the right edge of the hero.
 *
 * The right half of the hero was dead space, and every attempt to fill it with
 * a panel — a settlement-report teaser, a process rail — put a second piece of
 * UI in a section whose job is to make one statement. This is atmosphere
 * instead of content: it sits in the decorative layer behind the type, so it
 * never takes a column away from the words, and it disappears below lg where
 * there is no dead space to fill.
 */
export function HeroWatermark() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.06] lg:block"
    >
      <Image
        src="/logo-emblem-reversed.png"
        alt=""
        width={706}
        height={525}
        className="h-[34rem] w-auto"
      />
    </div>
  );
}
