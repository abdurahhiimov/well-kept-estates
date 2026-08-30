"use client";

import Image from "next/image";
import Link from "next/link";
import { Wordmark } from "@/components/site/wordmark";

export type MarkVariant = "badge" | "reversed" | "emblem" | "overhang";

/**
 * Candidates for the mark in the header bar.
 *
 * The problem all of these are answering: the supplied badge has its own cream
 * background and its own frame, so dropping it into a dark bar puts a bordered
 * plate inside a bordered bar — a box in a box — and the opaque cream reads far
 * heavier than the hairline mono nav beside it. Every fix either removes the
 * plate or stops pretending the badge fits a 96px strip.
 */
export function SiteMark({ variant }: { variant: MarkVariant }) {
  const label = "Well Kept Estates — home";

  if (variant === "overhang") {
    // The badge stops competing for room inside the bar by refusing to stay in
    // it — pressed over the edge, the way a seal sits over the edge of a page.
    return (
      <>
        {/* Absolutely positioned, so the flex row needs a stand-in or the nav
            runs straight under the badge. */}
        <span aria-hidden className="block w-[6.5rem] shrink-0 md:w-[8.5rem]" />
      <Link href="/" aria-label={label} className="absolute left-6 top-4 z-10">
        <Image
          src="/logo-badge.png"
          alt="Well Kept Estates"
          width={440}
          height={480}
          priority
          className="h-[6.5rem] w-auto drop-shadow-[0_10px_24px_rgb(0_0_0/0.45)] md:h-[8.5rem]"
        />
      </Link>
      </>
    );
  }

  if (variant === "emblem") {
    return (
      <Link href="/" aria-label={label} className="flex shrink-0 items-center">
        <Image
          src="/logo-emblem-reversed.png"
          alt="Well Kept Estates"
          width={706}
          height={525}
          priority
          className="h-11 w-auto md:h-14"
        />
      </Link>
    );
  }

  if (variant === "reversed") {
    // No plate at all: the emblem knocked out to cream so it carries the same
    // weight as the type standing next to it.
    return (
      <Link
        href="/"
        aria-label={label}
        className="flex shrink-0 items-center gap-3.5"
      >
        <Image
          src="/logo-emblem-reversed.png"
          alt=""
          width={706}
          height={525}
          priority
          className="h-10 w-auto md:h-12"
        />
        <Wordmark size="md" />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      aria-label={label}
      className="ml-2 flex shrink-0 items-center md:ml-5"
    >
      <Image
        src="/logo-badge.png"
        alt="Well Kept Estates"
        width={440}
        height={480}
        priority
        className="h-[4.5rem] w-auto md:h-[5.5rem]"
      />
    </Link>
  );
}
