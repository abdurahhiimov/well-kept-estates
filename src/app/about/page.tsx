import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, site } from "@/lib/site";
import { commission, contact, cta, serviceArea } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Well Kept Estates is a one-person estate sale company serving the San Fernando Valley — 30% of gross, $1,500 minimum, and a written settlement report on every sale.",
  alternates: { canonical: "/about" },
};

/*
  This page exists to make the *business* a recognisable entity — consistent
  name, contact details, service area and profiles that a search engine or an
  assistant can match against listings elsewhere. It is deliberately about the
  company rather than a named individual: entity resolution works on the
  business, and a solo operator has no obligation to publish a personal name
  to be findable.
*/
const facts = [
  { k: "Founded", v: "2026" },
  { k: "Based in", v: "San Fernando Valley, Los Angeles County, California" },
  { k: "Serves", v: [...serviceArea.core, ...serviceArea.extended].join(", ") },
  { k: "Services", v: "Full-service estate sales — pricing, staging, sale days, settlement reporting" },
  { k: "Fee", v: `${commission.rateLabel} of gross sales, ${commission.minimumLabel} minimum` },
  { k: "Languages", v: "English, Russian" },
  { k: "Payments taken", v: "Cash, credit and debit at the sale" },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <section className="pb-24 pt-24 md:pb-32 md:pt-28">
        <div className="container">
          <div className="max-w-3xl">
            <Reveal immediate>
              <SectionLabel immediate>About</SectionLabel>
            </Reveal>
            <Reveal delay={0.05} immediate>
              <h1 className="display-lg text-foreground">
                A small company, on purpose.
              </h1>
            </Reveal>
            <Reveal delay={0.1} immediate>
              <p className="lead mt-7">
                Well Kept Estates runs estate sales across the San Fernando
                Valley. One person takes the call, walks the house, prices the
                contents, runs the sale, and writes the report — which is the
                whole idea rather than a limitation to grow out of.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div className="flex max-w-2xl flex-col gap-6 text-foreground/90">
              <h2 className="display-sm text-foreground">Why it started</h2>
              <p>
                Families get handed an impossible job at the worst possible
                time: a whole house of belongings to deal with, usually on a
                deadline set by a sale or a lease, usually while they are still
                grieving or simply worn out. Most of them have never done it
                before and will never do it again.
              </p>
              <p>
                What they get from the industry is a check and a number. The
                sale happened, it made this much, here is the balance. No record
                of what sold, no receipts for what was given away, no way to
                answer a sibling who asks about a specific piece six months
                later.
              </p>

              <h2 className="display-sm mt-4 text-foreground">
                What&apos;s different here
              </h2>
              <p>
                Every sale produces a written settlement report — notable pieces
                listed line by line with what they brought and when, everyday
                goods totalled by lot, donations backed by receipts, and a net
                figure that reconciles to the cash counted out on sale day.{" "}
                <Link
                  href="/the-record"
                  className="text-foreground underline decoration-stamp/40 underline-offset-4 transition-colors hover:decoration-stamp"
                >
                  Written up in full here
                </Link>
                .
              </p>
              <p>
                The fee is {commission.rateLabel} of gross with a{" "}
                {commission.minimumLabel} minimum, published on the site and
                said out loud on the first call rather than buried in a
                contract. Cleanout is not offered — that is a different job,
                done well by other people, and it gets arranged for you and
                billed by them at their price.
              </p>

              <h2 className="display-sm mt-4 text-foreground">
                Working in two languages
              </h2>
              <p>
                Sales are run in English and Russian. In a Valley with a large
                Russian-speaking community, being able to explain a fee
                structure to an eighty-year-old in her own language is not a
                marketing line — it is the difference between her understanding
                the agreement and nodding along to it.
              </p>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <Button asChild size="lg" variant="ink">
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
                <a
                  href={contact.phoneHref}
                  className="font-mono text-sm text-foreground underline decoration-stamp/40 underline-offset-4 transition-colors hover:decoration-stamp"
                >
                  {contact.phone}
                </a>
              </div>
            </div>

            {/* A plain, machine-readable summary of the business. */}
            <Reveal delay={0.1} className="lg:pt-2">
              <p className="label-mono">The business</p>
              <RuleDraw className="mt-2" accent />
              <dl className="mt-1">
                {facts.map((f) => (
                  <div
                    key={f.k}
                    className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-rule/60 py-3.5"
                  >
                    <dt className="label-mono">{f.k}</dt>
                    <dd className="text-sm leading-relaxed text-foreground">
                      {f.v}
                    </dd>
                  </div>
                ))}
                <div className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-b border-rule/60 py-3.5">
                  <dt className="label-mono">Elsewhere</dt>
                  <dd className="text-sm">
                    {site.sameAs.map((url) => (
                      <a
                        key={url}
                        href={url}
                        rel="me noopener"
                        target="_blank"
                        className="font-mono text-foreground underline decoration-stamp/40 underline-offset-4 transition-colors hover:decoration-stamp"
                      >
                        Instagram
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
