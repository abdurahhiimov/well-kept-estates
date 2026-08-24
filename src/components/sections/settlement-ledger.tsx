"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel, Stamp } from "@/components/motion/rule";
import { Ticker } from "@/components/motion/ticker";
import { sampleLedger } from "@/lib/content";

const { estateLabel, rows, totals } = sampleLedger;

export function SettlementLedger() {
  return (
    <section id="reporting" className="scroll-mt-24 py-20 md:py-28">
      <div className="container">
        <div className="max-w-2xl">
          <Reveal>
            <SectionLabel>The record</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-md text-foreground">
              Every dollar, written down.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lead mt-6 max-w-xl">
              When the sale closes you get a settlement report — the notable
              pieces listed line by line with what they brought and when,
              everyday goods totalled by the lot, and every donation backed by a
              receipt. Then I count out your proceeds, same day.
            </p>
          </Reveal>
        </div>

        {/* ── The mock report ─────────────────────────────────────────────
            Styled as a page from a book of accounts: ruled rows, a red margin
            line, figures in mono, and a pressed SAMPLE stamp. */}
        <Reveal delay={0.1} y={24} className="mt-14">
          <figure
            aria-label="Sample settlement report showing itemized sales, lot totals, timestamps, donation receipts, commission, and net proceeds to the estate."
            className="mx-auto max-w-3xl border border-border bg-card"
          >
            {/* masthead */}
            <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
              <div className="min-w-0">
                <p className="display-sm text-foreground">
                  Settlement report
                </p>
                <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                  {estateLabel}
                </p>
              </div>
              <Stamp className="shrink-0 px-2.5 py-1 text-[0.62rem]">
                Sample
              </Stamp>
            </div>

            {/* summary strip */}
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border px-5 py-5 sm:px-7">
              <div>
                <p className="label-mono">Gross sales</p>
                <Ticker
                  value={totals.gross}
                  prefix="$"
                  celebrate
                  className="mt-1 block font-mono text-3xl font-medium tabular-nums text-foreground sm:text-4xl"
                />
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                Logged as it sold — not reconstructed after
              </p>
            </div>

            {/* column header */}
            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-border px-5 py-2.5 sm:grid-cols-[1.7fr_0.7fr_auto_auto] sm:px-7">
              <span className="label-mono">Item</span>
              <span className="label-mono hidden sm:block">Category</span>
              <span className="label-mono hidden text-right sm:block">Time</span>
              <span className="label-mono text-right">Amount</span>
            </div>

            {/* rows — rule in one at a time on scroll */}
            <div className="margin-rule sm:[&>*]:pl-0">
              <Stagger gap={0.09}>
                {rows.map((row) => {
                  const donated = row.category === "Donation";
                  return (
                    <StaggerItem key={`${row.item}-${row.time}`}>
                      <div className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-rule/50 px-5 py-3 transition-colors hover:bg-secondary/40 sm:grid-cols-[1.7fr_0.7fr_auto_auto] sm:px-7">
                        <span className="min-w-0 truncate text-sm text-foreground">
                          {row.item}
                          <span className="ml-2 font-mono text-xs text-muted-foreground sm:hidden">
                            {row.time}
                          </span>
                        </span>

                        <span className="hidden font-mono text-xs text-muted-foreground sm:block">
                          {row.category}
                        </span>
                        <span className="hidden text-right font-mono text-xs text-muted-foreground sm:block">
                          {row.time}
                        </span>

                        <span className="text-right font-mono text-sm tabular-nums">
                          {donated ? (
                            <span className="text-xs text-muted-foreground">
                              rec. {row.receipt}
                            </span>
                          ) : (
                            <span className="text-foreground">
                              ${row.price.toLocaleString()}
                            </span>
                          )}
                        </span>
                      </div>
                    </StaggerItem>
                  );
                })}
              </Stagger>
            </div>

            {/* excerpt note */}
            <p className="border-b border-border px-5 py-2.5 font-mono text-xs text-muted-foreground sm:px-7">
              Showing 9 of {totals.itemsSold} lines from a single estate.
            </p>

            {/* footer totals */}
            <div className="grid gap-px bg-border sm:grid-cols-3">
              <FooterStat label="Items sold" value={totals.itemsSold} />
              <FooterStat label="Donations logged" value={totals.donations} />
              <FooterStat
                label="Commission (30%)"
                value={totals.commission}
                prefix="$"
              />
            </div>
            <div className="flex items-center justify-between gap-4 bg-foreground px-5 py-5 text-background sm:px-7">
              <span className="font-mono text-xs uppercase tracking-[0.12em]">
                Net to the estate
              </span>
              <Ticker
                value={totals.net}
                prefix="$"
                className="font-mono text-2xl font-medium tabular-nums"
              />
            </div>
          </figure>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-xl">
          <RuleDraw />
          <p className="pt-4 text-sm leading-relaxed text-muted-foreground">
            The same report goes to families and, when there&apos;s a probate
            matter, to their attorney or fiduciary.{" "}
            <a
              href="/for-attorneys"
              className="text-foreground underline decoration-stamp/50 underline-offset-4 transition-colors hover:decoration-stamp"
            >
              More on that here.
            </a>{" "}
            Why estates need this kind of record at all is{" "}
            <a
              href="/the-record"
              className="text-foreground underline decoration-stamp/50 underline-offset-4 transition-colors hover:decoration-stamp"
            >
              written up in full
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FooterStat({
  label,
  value,
  prefix,
}: {
  label: string;
  value: number;
  prefix?: string;
}) {
  return (
    <div className="bg-card px-5 py-4 sm:px-7">
      <p className="label-mono">{label}</p>
      <Ticker
        value={value}
        prefix={prefix}
        className="mt-1 block font-mono text-xl font-medium tabular-nums text-foreground"
      />
    </div>
  );
}
