"use client";

import Link from "next/link";
import VerticalCutReveal from "@/components/motion/vertical-cut-reveal";
import { Reveal } from "@/components/motion/reveal";
import { PointerLight } from "@/components/motion/pointer-light";
import { RuleDraw } from "@/components/motion/rule";
import { LiquidGlass } from "@/components/motion/glass";
import { Button } from "@/components/ui/button";
import { commission, cta } from "@/lib/content";

export function Hero() {
  return (
    <section
      data-surface="dark"
      className="relative overflow-hidden border-b border-white/10 bg-background"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bleed absolute inset-0" />
        <PointerLight size="48rem 34rem" intensity={0.32} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(32rem 22rem at 22% 82%, hsl(36 72% 54% / 0.16), transparent 66%)",
          }}
        />
        {/* Ruling survives onto the dark ground, just barely — the paper motif
            persists underneath the glass rather than being abandoned. */}
        <div className="ruled-fade absolute inset-0 opacity-25" />
      </div>

      <div className="container relative flex flex-col items-start pb-24 pt-24 md:pb-32 md:pt-28">
        <Reveal y={8} immediate>
          <p className="label-mono">Estate sales · San Fernando Valley</p>
        </Reveal>
        <RuleDraw className="mt-2.5 w-64" accent delay={0.15} immediate />

        <h1 className="display-xl mt-10 max-w-5xl text-foreground">
          <VerticalCutReveal
            splitBy="lines"
            wordLevelClassName="pb-[0.12em] -mb-[0.12em]"
            staggerFrom="first"
            staggerDuration={0.16}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            {"Someone kept these things well.\nWe'll see them off the same way."}
          </VerticalCutReveal>
        </h1>

        <Reveal delay={0.5} immediate className="mt-9 max-w-xl">
          <p className="lead">
            Well Kept Estates runs estate sales across the Valley — sorting,
            pricing, staging, and running the sale itself, so a family
            doesn&apos;t have to. You don&apos;t lift a finger, and you get a
            written record of where everything went.
          </p>
        </Reveal>

        <Reveal delay={0.62} immediate className="mt-11">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Button asChild size="lg" variant="paper">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            <Button asChild size="lg" variant="outline">
                <Link href="/#how-it-works">See how a sale goes</Link>
              </Button>
          </div>
        </Reveal>

        {/* The fee, on glass — a card floating over the lit ground, where the
            refraction actually has something to work with. */}
        <Reveal delay={0.75} immediate className="mt-16 w-full max-w-lg">
          <LiquidGlass
            strength="strong"
            interactive
            className="glass-round px-6 py-5"
          >
            <p className="label-mono">Our fee</p>
            <p className="mt-2 whitespace-nowrap font-mono text-xl text-foreground sm:text-2xl">
              {commission.rateLabel} of gross
              <span className="mx-2 text-foreground/35">·</span>
              {commission.minimumLabel} minimum
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Stated on the first call, not buried in the contract.
            </p>
          </LiquidGlass>
        </Reveal>
      </div>
    </section>
  );
}
