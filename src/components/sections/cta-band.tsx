"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { PointerLight } from "@/components/motion/pointer-light";
import { LiquidGlass } from "@/components/motion/glass";
import { Button } from "@/components/ui/button";
import { contact, cta } from "@/lib/content";

export function CtaBand() {
  return (
    <section
      data-surface="dark"
      className="relative overflow-hidden bg-background"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bleed absolute inset-0" />
        <PointerLight size="40rem 28rem" intensity={0.34} />
        <div className="ruled-fade absolute inset-0 opacity-20" />
      </div>

      <div className="container relative py-24 md:py-36">
        <Reveal y={18}>
          <div className="max-w-3xl">
            <p className="label-mono">The first step</p>
            <h2 className="display-lg mt-7 text-foreground">Ready when you are.</h2>
            <p className="lead mt-7 max-w-xl">
              It starts with a free walkthrough — I come see the house, we talk
              it through, and you decide from there. No fee, no obligation.
            </p>

            <div className="mt-12 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <Button asChild size="lg" variant="paper">
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              <LiquidGlass
                  strength="base"
                  interactive
                  className="glass-pill px-7 py-2.5 leading-none"
                >
                  <a
                    href={contact.phoneHref}
                    className="font-mono text-sm tracking-[0.06em] text-foreground"
                  >
                    {contact.phone}
                  </a>
                </LiquidGlass>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
