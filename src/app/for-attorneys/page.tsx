import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/forms/lead-form";
import { contact } from "@/lib/content";

import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "For attorneys & fiduciaries",
  description:
    "Estate sales with an itemized, timestamped settlement report and donation receipts — documentation built for probate attorneys and licensed professional fiduciaries who have a duty to account.",
  alternates: { canonical: "/for-attorneys" },
};

const values = [
  {
    title: "An itemized, timestamped ledger",
    body: "Notable pieces listed line by line with the price and the time they sold; everyday goods totalled by lot. Exported as a clean PDF for the file.",
  },
  {
    title: "Donation receipts, tracked",
    body: "Non-cash charitable contributions logged with receipts and fair-market notes, ready for the estate's return.",
  },
  {
    title: "One-page reconciliation",
    body: "Gross sales, the 30% fee, and net proceeds to the estate — reconciled plainly, with no mystery deductions.",
  },
  {
    title: "One accountable contact",
    body: "You work directly with the person who ran the sale. Questions are answered by the one who was in the room.",
  },
];

const steps = [
  {
    title: "Refer the matter",
    body: "Send it over. I confirm scope and timeline and coordinate access with the family or your office.",
  },
  {
    title: "The sale, documented as it runs",
    body: "I sort, price, and run the sale — logging each line as it happens, and arranging donation or haul-away for what's left.",
  },
  {
    title: "Report and proceeds",
    body: "You receive the settlement report, donation receipts, and net proceeds on a schedule that fits your accounting.",
  },
];

export default function ForAttorneysPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "For attorneys & fiduciaries", path: "/for-attorneys" },
        ])}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="ruled-fade absolute inset-0 opacity-60" />
        </div>
        <div className="container pb-16 pt-24 md:pb-24 md:pt-28">
          <Reveal immediate>
            <SectionLabel immediate>For attorneys &amp; fiduciaries</SectionLabel>
          </Reveal>
          <Reveal delay={0.05} immediate>
            <h1 className="max-w-3xl display-lg text-foreground">
              Estate sales you can put in the file.
            </h1>
          </Reveal>
          <Reveal delay={0.1} immediate>
            <p className="lead mt-8 max-w-2xl">
              When you have a duty to account for a decedent&apos;s assets,
              &ldquo;we sold everything for a fair price&rdquo; doesn&apos;t cut
              it. Well Kept Estates gives you a written, timestamped record of
              the sale and every donation — the kind of documentation that holds
              up in an accounting.
            </p>
          </Reveal>
          <Reveal delay={0.15} immediate>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
              <Button asChild size="lg" variant="ink">
                  <Link href="#inquiry">Refer a matter</Link>
                </Button>
              <a
                href={contact.phoneHref}
                className="font-mono text-sm text-foreground/75 underline decoration-stamp/40 underline-offset-4 transition-colors hover:text-foreground hover:decoration-stamp"
              >
                {contact.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What you get — set as a schedule, not a card grid */}
      <section className="py-20 md:py-24">
        <div className="container">
          <Reveal>
            <h2 className="max-w-2xl display-md text-foreground">
              Built for the part you have to defend.
            </h2>
          </Reveal>
          <Stagger gap={0.08} className="mt-12 max-w-3xl">
            <RuleDraw />
            {values.map((v, i) => (
              <StaggerItem key={v.title}>
                <div className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-rule/60 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                  <span className="font-mono text-xs text-stamp">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="display-sm text-foreground">
                      {v.title}
                    </h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
                      {v.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Why it matters */}
      <section className="border-y border-border bg-secondary/50 py-20 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <SectionLabel>Why the record matters</SectionLabel>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-display text-2xl font-medium leading-[1.45] text-foreground sm:text-[1.75rem]">
                Executors, administrators, trustees, and conservators all answer
                to someone — the court, the beneficiaries, or both. The
                settlement report is built to make that accounting simple:{" "}
                <span className="italic text-stamp">
                  what sold, for how much, when, and where the proceeds went.
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 max-w-xl">
              <RuleDraw />
              <p className="pt-4 text-muted-foreground">
                It won&apos;t give you legal advice — that&apos;s your job. It
                will give you a straight answer to &ldquo;where did the personal
                property go, and what did it bring?&rdquo; without you having to
                chase it.{" "}
                <Link
                  href="/the-record"
                  className="text-foreground underline decoration-stamp/40 underline-offset-4 transition-colors hover:decoration-stamp"
                >
                  What a defensible record contains
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process for professionals */}
      <section className="py-20 md:py-24">
        <div className="container">
          <Reveal>
            <h2 className="display-md text-foreground">
              How it fits your matter.
            </h2>
          </Reveal>
          <Stagger gap={0.1} className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <p className="font-mono text-xs text-stamp">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <div aria-hidden className="mt-3 h-px w-full bg-border" />
                <h3 className="mt-4 display-sm text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Inquiry form */}
      <section
        id="inquiry"
        className="scroll-mt-24 border-t border-border bg-secondary/50 py-20 md:py-24"
      >
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Reveal>
                <h2 className="display-md text-foreground">
                  Refer a matter.
                </h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="lead mt-6 max-w-md">
                  Tell me a little about the estate and the timeline. I read
                  every inquiry myself and reply within one business day — no
                  intake queue, no account manager.
                </p>
              </Reveal>
              <Reveal delay={0.1} className="mt-10 max-w-sm">
                <RuleDraw />
                <div className="grid grid-cols-[5rem_1fr] items-baseline gap-4 border-b border-rule/50 py-3">
                  <span className="label-mono">Phone</span>
                  <a
                    href={contact.phoneHref}
                    className="font-mono text-sm text-foreground hover:text-stamp"
                  >
                    {contact.phone}
                  </a>
                </div>
                <div className="grid grid-cols-[5rem_1fr] items-baseline gap-4 border-b border-rule/50 py-3">
                  <span className="label-mono">Email</span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="truncate font-mono text-sm text-foreground hover:text-stamp"
                  >
                    {contact.email}
                  </a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.1} y={24}>
              <LeadForm variant="attorney" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
