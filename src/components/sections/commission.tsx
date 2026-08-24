"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { Ticker } from "@/components/motion/ticker";
import { commission } from "@/lib/content";

// Anchored to the published minimum rather than an arbitrary round number.
const MIN = 1500;
const MAX = 60000;
const STEP = 250;

const included = [
  "The free walkthrough and a written plan",
  "Sorting, pricing, and research on anything that might be worth more",
  "Staging the house and running every sale day",
  "Listings, photos, and signage to bring buyers in",
  "Your settlement report and donation receipts",
];

export function Commission() {
  const [gross, setGross] = useState(10000);

  const fee = Math.max(gross * commission.rate, commission.minimum);
  const minApplies = gross * commission.rate < commission.minimum;
  const net = Math.max(gross - fee, 0);
  const feePct = gross > 0 ? Math.min((fee / gross) * 100, 100) : 0;

  return (
    <section
      id="pricing"
      className="scroll-mt-24 border-y border-border bg-secondary/50 py-20 md:py-28"
    >
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-20">
          {/* Left — the plain-language case */}
          <div>
            <Reveal>
              <SectionLabel>Pricing</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-md text-foreground">
                One fee, named on the first call.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lead mt-6 max-w-lg">
                {commission.rateLabel} of gross sales, with a{" "}
                {commission.minimumLabel} minimum so a small sale is still worth
                doing properly. It comes out of what the sale brings in — never
                out of your pocket up front.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="label-mono mt-10">What that covers</p>
              <ul className="mt-3">
                {included.map((line) => (
                  <li
                    key={line}
                    className="grid grid-cols-[1.5rem_1fr] items-baseline gap-2 border-b border-rule/50 py-3"
                  >
                    <span
                      aria-hidden
                      className="font-mono text-xs text-stamp"
                    >
                      ✓
                    </span>
                    <span className="text-foreground/90">{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Whatever doesn&apos;t sell, I arrange the donation pickup or a
                hauler on your schedule. That&apos;s billed by them, at their
                price — I don&apos;t mark it up and I don&apos;t take a cut.
              </p>
            </Reveal>
          </div>

          {/* Right — the calculator, set as a worksheet */}
          <Reveal delay={0.1} y={24}>
            <div className="border border-border bg-card p-6 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="gross" className="label-mono">
                  Estimated gross sales
                </label>
                <Ticker
                  value={gross}
                  prefix="$"
                  startOnView={false}
                  className="font-mono text-xl font-medium tabular-nums text-foreground"
                />
              </div>

              <input
                id="gross"
                type="range"
                min={MIN}
                max={MAX}
                step={STEP}
                value={gross}
                onChange={(e) => setGross(Number(e.target.value))}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none bg-secondary accent-stamp"
                aria-describedby="gross-hint"
              />
              <div
                id="gross-hint"
                className="mt-2 flex justify-between font-mono text-[0.7rem] text-muted-foreground"
              >
                <span>${MIN.toLocaleString()}</span>
                <span>Drag to estimate your sale</span>
                <span>${MAX.toLocaleString()}</span>
              </div>

              {/* proportion bar — squared, like a printed bar on a statement */}
              <div className="mt-8 flex h-2.5 overflow-hidden border border-border">
                <div
                  className="h-full bg-stamp transition-[width] duration-500 ease-out motion-reduce:transition-none"
                  style={{ width: `${feePct}%` }}
                />
                <div
                  className="h-full bg-foreground transition-[width] duration-500 ease-out motion-reduce:transition-none"
                  style={{ width: `${100 - feePct}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between font-mono text-[0.7rem] text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 bg-stamp" /> Our fee
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="size-2 bg-foreground" /> You keep
                </span>
              </div>

              {/* breakdown */}
              <dl className="mt-8">
                <RuleDraw />
                <Row label="Gross sales">
                  <Ticker value={gross} prefix="$" startOnView={false} />
                </Row>
                <Row
                  label={
                    <span className="inline-flex items-center gap-2">
                      Our fee ({commission.rateLabel})
                      {minApplies && (
                        <span className="stamp px-1.5 py-0.5 text-[0.58rem]">
                          Minimum
                        </span>
                      )}
                    </span>
                  }
                >
                  <span className="text-muted-foreground">
                    −<Ticker value={fee} prefix="$" startOnView={false} />
                  </span>
                </Row>
                <div className="mt-3 flex items-center justify-between bg-foreground px-4 py-3.5 text-background">
                  <dt className="font-mono text-xs uppercase tracking-[0.12em]">
                    You keep
                  </dt>
                  <dd>
                    <Ticker
                      value={net}
                      prefix="$"
                      startOnView={false}
                      className="font-mono text-2xl font-medium tabular-nums"
                    />
                  </dd>
                </div>
              </dl>

              <p className="mt-4 font-mono text-[0.7rem] leading-relaxed text-muted-foreground">
                e.g. $10,000 in sales → $3,000 fee. No setup costs, no hourly
                charges.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  children,
}: {
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-rule/50 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-mono font-medium tabular-nums text-foreground">
        {children}
      </dd>
    </div>
  );
}
