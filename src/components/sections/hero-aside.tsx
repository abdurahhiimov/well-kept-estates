"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { LiquidGlass } from "@/components/motion/glass";
import { processSteps, sampleLedger } from "@/lib/content";

/**
 * The right-hand column of the hero.
 *
 * Two candidates live here while we decide which one earns the space. The
 * toggle is compiled out of production builds — `process.env.NODE_ENV` is
 * inlined by the bundler, so the dead branch never ships.
 */

/** Five lines chosen to show the range: furniture, kitchen, art, rug, donation. */
const teaserRows = [0, 1, 5, 6, 7].map((i) => sampleLedger.rows[i]);

function LedgerTeaser() {
  return (
    <LiquidGlass strength="strong" interactive className="glass-round p-6">
      <figure
        aria-label="Sample settlement report: five logged lines with times, amounts, and a donation receipt."
        className="m-0"
      >
        <figcaption className="flex items-baseline justify-between gap-3">
          <span className="label-mono">Settlement report</span>
          <span className="stamp px-2 py-0.5 text-[0.58rem]">Sample</span>
        </figcaption>

        <div className="mt-5 flex flex-col">
          {teaserRows.map((row) => (
            <div
              key={row.item}
              className="flex items-baseline justify-between gap-4 border-b border-white/10 py-2.5 first:border-t first:border-white/10"
            >
              <span className="min-w-0 flex-1 truncate text-[0.9rem] text-foreground/90">
                {row.item}
              </span>
              <span className="shrink-0 font-mono text-[0.68rem] text-muted-foreground">
                {row.time}
              </span>
              <span
                className={
                  "shrink-0 text-right font-mono text-[0.82rem] tabular-nums " +
                  (row.receipt ? "text-muted-foreground" : "text-foreground")
                }
              >
                {row.receipt ? `rec. ${row.receipt}` : `$${row.price}`}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-4 font-mono text-[0.68rem] leading-relaxed text-muted-foreground">
          5 of {sampleLedger.totals.itemsSold} lines · logged as it sold, not
          reconstructed after
        </p>

        <Link
          href="/#reporting"
          className="mt-4 inline-block font-mono text-[0.72rem] uppercase tracking-[0.08em] text-stamp underline decoration-stamp/40 underline-offset-4 transition-colors hover:decoration-stamp"
        >
          See the full report
        </Link>
      </figure>
    </LiquidGlass>
  );
}

function ProcessRail() {
  return (
    <LiquidGlass strength="strong" interactive className="glass-round p-6">
      <p className="label-mono">How a sale goes</p>
      <ol className="mt-5 flex flex-col">
        {processSteps.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-4 border-b border-white/10 py-3 first:border-t first:border-white/10"
          >
            <span className="shrink-0 font-mono text-[0.68rem] text-stamp">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0">
              <span className="block font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">
                {step.week}
              </span>
              <span className="mt-0.5 block text-[0.92rem] leading-snug text-foreground/90">
                {step.title}
              </span>
            </span>
          </li>
        ))}
      </ol>
      <Link
        href="/#how-it-works"
        className="mt-4 inline-block font-mono text-[0.72rem] uppercase tracking-[0.08em] text-stamp underline decoration-stamp/40 underline-offset-4 transition-colors hover:decoration-stamp"
      >
        Read the whole process
      </Link>
    </LiquidGlass>
  );
}

export function HeroAside() {
  const [variant, setVariant] = useState<"ledger" | "rail">("ledger");
  const isDev = process.env.NODE_ENV === "development";

  return (
    <Reveal delay={0.7} immediate className="w-full">
      {isDev && (
        <div className="mb-3 flex gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.08em]">
          {(["ledger", "rail"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setVariant(v)}
              className={
                "rounded-sm border px-2.5 py-1 transition-colors " +
                (variant === v
                  ? "border-stamp/60 bg-stamp/20 text-foreground"
                  : "border-white/15 text-muted-foreground hover:text-foreground")
              }
            >
              {v}
            </button>
          ))}
          <span className="self-center pl-1 text-muted-foreground/70">
            dev only
          </span>
        </div>
      )}
      {variant === "ledger" ? <LedgerTeaser /> : <ProcessRail />}
    </Reveal>
  );
}
