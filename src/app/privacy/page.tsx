import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/site";
import { contact } from "@/lib/content";

const EFFECTIVE = "September 18, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Well Kept Estates collects through this site, why, and how to ask us to change or delete it.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy", path: "/privacy" },
        ])}
      />

      <article className="pb-24 pt-24 md:pb-32 md:pt-28">
        <div className="container">
          <header className="max-w-3xl">
            <Reveal immediate>
              <SectionLabel immediate>Privacy</SectionLabel>
            </Reveal>
            <Reveal delay={0.05} immediate>
              <h1 className="display-lg text-foreground">Privacy policy</h1>
            </Reveal>
            <Reveal delay={0.1} immediate>
              <p className="lead mt-7">
                This page covers what this website collects, why, and what you
                can do about it. It does not cover the estate sale itself —
                that&apos;s covered in the written agreement you&apos;d sign
                separately.
              </p>
            </Reveal>
            <Reveal delay={0.15} immediate>
              <p className="mt-6 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                Effective {EFFECTIVE}
              </p>
            </Reveal>
          </header>

          <div className="prose-body mt-16 flex max-w-2xl flex-col gap-6 text-foreground/90">
            <RuleDraw />

            <h2 className="display-sm mt-4 text-foreground">
              What this site collects
            </h2>
            <p>
              The only information this site collects is what you type into
              the contact or walkthrough-request form: your name, email, and
              message, and — only if you choose to include them — a phone
              number, city, organization, or role. Nothing is collected from
              you just by visiting the site.
            </p>

            <h2 className="display-sm mt-4 text-foreground">
              What it&apos;s used for
            </h2>
            <p>
              To read your message and respond to it — usually to schedule a
              walkthrough or answer a question. That&apos;s the only use.
              Nothing you submit is sold, rented, or used for marketing
              without your say-so, and nothing is shared with anyone outside
              the two services below.
            </p>

            <h2 className="display-sm mt-4 text-foreground">
              Who else touches it
            </h2>
            <p>
              Two services process form submissions on our behalf, strictly to
              deliver them: <strong>Resend</strong>, which sends your message
              to our inbox by email, and <strong>Netlify</strong>, which hosts
              this site and keeps ordinary server logs (the kind any web host
              keeps — request times, IP addresses, browser type) for security
              and uptime, not for tracking. Neither service is permitted to
              use your information for its own purposes.
            </p>

            <h2 className="display-sm mt-4 text-foreground">
              Cookies, analytics, and tracking
            </h2>
            <p>
              This site does not currently run analytics, advertising pixels,
              or tracking cookies of any kind. The typefaces are self-hosted
              at build time rather than loaded from Google&apos;s font
              servers, so even that common source of a third-party request
              isn&apos;t present. If that changes — for example, if we start
              measuring ad performance — this section will say so first, with
              a new effective date above, before the change goes live.
            </p>

            <h2 className="display-sm mt-4 text-foreground">
              Do Not Track
            </h2>
            <p>
              Because this site doesn&apos;t track visitors across other
              sites, there&apos;s currently nothing for a browser&apos;s Do
              Not Track signal to opt you out of. If that ever changes,
              we&apos;ll explain here how we handle that signal at the time.
            </p>

            <h2 className="display-sm mt-4 text-foreground">
              Your choices
            </h2>
            <p>
              Email{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-foreground underline decoration-stamp/50 underline-offset-4 transition-colors hover:decoration-stamp"
              >
                {contact.email}
              </a>{" "}
              at any time to see what we have on file for you, correct it, or
              have it deleted. One person reads every message, so you&apos;ll
              hear back directly rather than from a ticketing system. This
              applies whether or not you&apos;re a California resident and
              whether or not the California Consumer Privacy Act technically
              covers a business this size — we&apos;d rather just honor the
              request.
            </p>

            <h2 className="display-sm mt-4 text-foreground">Children</h2>
            <p>
              This site is a business-to-consumer service aimed at adults
              handling an estate, and it doesn&apos;t knowingly collect
              information from anyone under 13.
            </p>

            <h2 className="display-sm mt-4 text-foreground">
              Changes to this policy
            </h2>
            <p>
              If what we collect or how we use it changes, this page changes
              first, and the effective date at the top will move. We won&apos;t
              expand what we collect or how we use it without updating this
              page.
            </p>

            <h2 className="display-sm mt-4 text-foreground">Questions</h2>
            <p>
              <a
                href={`mailto:${contact.email}`}
                className="text-foreground underline decoration-stamp/50 underline-offset-4 transition-colors hover:decoration-stamp"
              >
                {contact.email}
              </a>{" "}
              or{" "}
              <a
                href={contact.phoneHref}
                className="text-foreground underline decoration-stamp/50 underline-offset-4 transition-colors hover:decoration-stamp"
              >
                {contact.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
