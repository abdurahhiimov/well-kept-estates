"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { faqs } from "@/lib/content";

/**
 * Native <details> would be simpler, but the answers need to be in the DOM
 * and readable whether or not anything is open — assistants and crawlers take
 * the text as it is served, and a collapsed <details> body is easy for an
 * extractor to treat as hidden. So the markup is a plain heading-and-paragraph
 * pair; only the height is animated.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-24 py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>Common questions</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-md text-foreground">
              What people ask before they call.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-6">
              Straight answers, including the ones that talk you out of hiring
              me. If your question isn&apos;t here, ask it on the phone — it
              costs nothing to find out.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 max-w-3xl">
          <RuleDraw />
          <ul>
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <li key={item.q} className="border-b border-rule/60">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      className="flex w-full items-baseline gap-5 py-5 text-left transition-colors hover:text-stamp"
                    >
                      <span className="font-mono text-xs text-stamp">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="display-sm flex-1 text-foreground">
                        {item.q}
                      </span>
                      <span
                        aria-hidden
                        className="mt-1 font-mono text-lg leading-none text-muted-foreground transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                      >
                        +
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${i}`}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pl-[3.1rem] leading-relaxed text-muted-foreground">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
