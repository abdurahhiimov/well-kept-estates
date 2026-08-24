import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/site";
import { commission, cta } from "@/lib/content";

const PUBLISHED = "2026-08-24";
const MODIFIED = "2026-08-24";

export const metadata: Metadata = {
  title: "Accounting for personal property in a probate estate",
  description:
    "Why the contents of a house are the hardest asset in an estate to account for, what a defensible record of a sale actually contains, and how to ask an estate sale company for one.",
  alternates: { canonical: "/the-record" },
};

/* Questions specific to this page, so the article can be quoted as answers
   without competing with the homepage FAQ for the same queries. */
const questions = [
  {
    q: "How do you account for personal property in a probate estate?",
    a: "The personal property in an estate is accounted for the same way as any other asset: what it was, what it brought, and where the money went. In practice that means an itemized record of the sale showing notable pieces individually with their sale prices, bulk goods totalled by category, donation receipts for anything given away, and a total that reconciles to the funds delivered to the estate.",
  },
  {
    q: "Does every item in an estate need to be listed individually?",
    a: "No, and any company promising to itemize a whole house is describing something it will not do. The standard is materiality: pieces that carry real value are listed individually, everyday household goods are totalled by lot or category. What matters is that the categories are honest, the totals reconcile, and nothing left the house without appearing somewhere in the record.",
  },
  {
    q: "What records should an estate sale company give an executor?",
    a: "At minimum: an itemized settlement report for notable items with prices and timestamps, category totals for bulk goods, receipts for any charitable donation, a clear statement of the commission charged, and a net figure that matches what was actually paid to the estate. Ask for a sample of that report before signing anything.",
  },
];

export default function TheRecordPage() {
  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            headline: "Accounting for personal property in a probate estate",
            description: metadata.description as string,
            path: "/the-record",
            published: PUBLISHED,
            modified: MODIFIED,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "The record", path: "/the-record" },
          ]),
          faqSchema(questions),
        ]}
      />

      <article className="pb-24 pt-24 md:pb-32 md:pt-28">
        <div className="container">
          <header className="max-w-3xl">
            <Reveal immediate>
              <SectionLabel immediate>The record</SectionLabel>
            </Reveal>
            <Reveal delay={0.05} immediate>
              <h1 className="display-lg text-foreground">
                Accounting for personal property in a probate estate
              </h1>
            </Reveal>
            <Reveal delay={0.1} immediate>
              <p className="lead mt-7">
                Every other asset in an estate leaves a paper trail on its own.
                The contents of the house are the exception, and the reason so
                many accountings get questioned.
              </p>
            </Reveal>
            <Reveal delay={0.15} immediate>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                Written for executors, administrators, trustees and the
                attorneys advising them
              </p>
            </Reveal>
          </header>

          <div className="prose-body mt-16 flex max-w-2xl flex-col gap-6 text-foreground/90">
            <RuleDraw />

            <h2 className="display-sm mt-4 text-foreground">
              Everything else in the estate documents itself
            </h2>
            <p>
              A brokerage account produces statements. A house produces a
              closing statement. A car produces a title transfer. By the time
              anyone asks what happened to those assets, the answer already
              exists in writing and was created by someone with no stake in the
              outcome.
            </p>
            <p>
              The contents of the home produce nothing. Furniture, jewelry,
              tools, art, the contents of forty years of closets — none of it
              generates a record on its own. Whatever documentation exists is
              documentation somebody chose to create, and in most estate sales
              nobody chooses to.
            </p>
            <p>
              That is the gap. It is also, not coincidentally, where nearly
              every dispute between beneficiaries starts.
            </p>

            <h2 className="display-sm mt-6 text-foreground">
              What most families actually receive
            </h2>
            <p>
              The industry norm is a check and a number. The sale ran, it
              brought in some amount, the company took its percentage, here is
              the balance. Sometimes there is a one-page summary. Often there is
              not even that.
            </p>
            <p>
              Consider what that leaves an executor holding. Someone asks what
              happened to their grandmother&apos;s ring. The honest answer is
              that it either sold, or was donated, or is still in a drawer, and
              there is no way to tell which. The executor is not being evasive —
              they genuinely do not know, because nobody wrote it down.
            </p>
            <p>
              A fiduciary who has to account to a court is in a worse position
              again. &ldquo;We sold everything for a fair price&rdquo; is not an
              accounting. It is a summary of an accounting that was never made.
            </p>

            <h2 className="display-sm mt-6 text-foreground">
              What a defensible record contains
            </h2>
            <p>
              The useful standard here is materiality, borrowed from ordinary
              accounting practice: the detail should match what is at stake. Be
              suspicious of any company promising to itemize an entire house.
              Nobody itemizes four thousand objects in an afternoon, and a
              promise that cannot be kept is worse than an honest limit.
            </p>
            <p>What a record can honestly contain:</p>
            <ul className="ml-5 flex list-disc flex-col gap-2 marker:text-stamp">
              <li>
                <strong className="text-foreground">
                  Notable pieces, individually.
                </strong>{" "}
                Furniture, jewelry, art, tools, collectibles — anything a
                beneficiary might reasonably ask about later, listed with what
                it sold for and when.
              </li>
              <li>
                <strong className="text-foreground">
                  Everyday goods, by the lot.
                </strong>{" "}
                Kitchenware, linens, books, garage contents — totalled by
                category. Nobody needs to know a three-dollar mug sold at 11:42.
              </li>
              <li>
                <strong className="text-foreground">
                  Donations, with receipts.
                </strong>{" "}
                Anything given away, with the receipt attached, so the estate
                can substantiate the deduction and the beneficiary can see it
                was given rather than taken.
              </li>
              <li>
                <strong className="text-foreground">
                  A commission stated plainly.
                </strong>{" "}
                The percentage, applied to gross, shown as a line — not folded
                into a net figure that arrives without explanation.
              </li>
              <li>
                <strong className="text-foreground">
                  A total that reconciles.
                </strong>{" "}
                The sum of the record equals the money delivered. If those two
                numbers do not match, nothing above it matters.
              </li>
            </ul>
            <p>
              Two properties make the difference between a record and a
              retelling. It has to be written{" "}
              <em className="not-italic text-foreground">as the sale runs</em>,
              not reconstructed from memory on Monday — a contemporaneous record
              is harder to dispute for the same reason a contemporaneous note is
              in any other context. And it has to account for everything one way
              or another: sold, donated, or held back for family. An item that
              appears nowhere is the item somebody will ask about.
            </p>

            <h2 className="display-sm mt-6 text-foreground">
              What to ask before you hire anyone
            </h2>
            <p>
              You do not need to take anybody&apos;s word on this, including
              mine. Four questions separate companies that keep records from
              companies that do not:
            </p>
            <ul className="ml-5 flex list-disc flex-col gap-2 marker:text-stamp">
              <li>Can I see a sample settlement report before I sign?</li>
              <li>What gets listed individually, and where is the line?</li>
              <li>Do I get receipts for whatever is donated?</li>
              <li>When do I get paid, and does the report match the payment?</li>
            </ul>
            <p>
              A company that keeps a real record answers all four immediately,
              because the answers already exist. Hesitation on the first
              question tells you what you need to know.
            </p>

            <h2 className="display-sm mt-6 text-foreground">
              How this works here
            </h2>
            <p>
              Well Kept Estates writes the record as the sale runs and hands it
              over at the close of sale day, together with the proceeds — notable
              pieces line by line with prices and times, everyday goods totalled
              by lot, donations backed by receipts, the {commission.rateLabel}{" "}
              commission shown as its own line, and a net that reconciles to the
              cash counted out before anyone leaves the house.
            </p>
            <p>
              None of that is complicated. It is simply a decision to write
              things down while they are happening, which is the whole of it.
            </p>

            <p className="mt-4 border-l-2 border-border pl-5 text-sm text-muted-foreground">
              This is a description of how estate sale reporting works in
              practice, not legal or tax advice. An executor&apos;s specific
              duties depend on the estate and the jurisdiction — that is a
              question for the attorney advising the matter.
            </p>
          </div>

          <div className="mt-16 flex max-w-2xl flex-col gap-6">
            <RuleDraw accent />
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Button asChild size="lg" variant="ink">
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
              <Link
                href="/for-attorneys"
                className="font-mono text-sm text-foreground underline decoration-stamp/40 underline-offset-4 transition-colors hover:decoration-stamp"
              >
                Referring a probate matter →
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
