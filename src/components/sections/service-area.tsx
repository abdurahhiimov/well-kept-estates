"use client";

import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { ValleyMap } from "@/components/sections/valley-map";
import { serviceArea } from "@/lib/content";

export function ServiceArea() {
  return (
    <section
      data-surface="dark"
      className="relative overflow-hidden border-y border-white/10 bg-background py-24 md:py-32"
    >
      <div aria-hidden className="bleed pointer-events-none absolute inset-0 opacity-70" />

      <div className="container relative">
        <div className="max-w-xl">
          <Reveal>
            <SectionLabel>Where we work</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-md text-foreground">We stay close to home.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-6">
              This is a Valley business, on purpose. Staying local means I can
              get to a house quickly, know what sells here, and be there on sale
              day myself — not send a crew across the county.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Map band with the service area named on glass over it. */}
      <Reveal delay={0.1} y={28} className="relative mt-14">
        <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[1.5rem] border border-white/10">
          <ValleyMap />
        </div>
      </Reveal>

      <div className="container relative mt-10">
        {/* The lists stay: the pins carry the geography, but a screen reader
            needs the towns as text, and so does anyone scanning quickly. */}
        <Reveal className="max-w-3xl">
          <RuleDraw />
          <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-border py-3.5">
            <span className="label-mono">Core area</span>
            <span className="text-foreground">{serviceArea.core.join(" · ")}</span>
          </div>
          <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-border py-3.5">
            <span className="label-mono">Also serving</span>
            <span className="text-foreground/80">
              {serviceArea.extended.join(" · ")}
            </span>
          </div>
          <p className="mt-5 text-sm text-muted-foreground">
            Just outside these? Ask anyway — I&apos;ll tell you honestly if
            I&apos;m the right fit.{" "}
            <span className="text-foreground/40">
              Map data © OpenStreetMap contributors, tiles © CARTO.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
