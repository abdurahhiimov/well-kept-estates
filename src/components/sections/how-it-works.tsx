"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { processSteps } from "@/lib/content";

export function HowItWorks() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Progress line grows as the list scrolls through the middle of the viewport.
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 65%", "end 55%"],
  });
  const fill = useSpring(scrollYProgress, { damping: 30, stiffness: 120 });

  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl">
          <Reveal>
            <SectionLabel>How it works</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-md text-foreground">
              From the first walkthrough to the last receipt.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-6 max-w-xl">
              About two to three weeks, start to finish — and I do the lifting at
              every step. Here&apos;s how a sale goes.
            </p>
          </Reveal>
        </div>

        <div ref={railRef} className="relative mt-16 max-w-4xl">
          {/* rail track */}
          <div
            aria-hidden
            className="absolute bottom-2 top-2 w-px bg-border"
            style={{ left: "1.5rem" }}
          />
          {/* rail fill — grows on scroll (static full height under reduced motion) */}
          <motion.div
            aria-hidden
            className="absolute bottom-2 top-2 w-px origin-top bg-stamp"
            style={{ left: "1.5rem", scaleY: reduced ? 1 : fill }}
          />

          <ol>
            {processSteps.map((step, i) => (
              <li
                key={step.title}
                className="relative grid grid-cols-[3rem_1fr] gap-6 pb-12 last:pb-0"
              >
                {/* Squared numeral cell — a line number, not a bubble. */}
                <div className="relative flex justify-center">
                  <Reveal y={0} delay={0.05}>
                    <span className="z-10 grid size-8 place-items-center border border-border bg-background font-mono text-xs font-medium text-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Reveal>
                </div>
                <Reveal delay={0.05} className="min-w-0 pt-0.5">
                  <p className="label-mono">{step.week}</p>
                  <h3 className="mt-1.5 display-sm text-foreground">
                    {step.title}
                  </h3>
                  <RuleDraw className="mt-3 max-w-2xl" delay={0.12} />
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
