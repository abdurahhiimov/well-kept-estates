import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { RuleDraw, SectionLabel } from "@/components/motion/rule";
import { LeadForm } from "@/components/forms/lead-form";
import { contact, serviceArea } from "@/lib/content";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free estate-sale walkthrough in the San Fernando Valley. Call, email, or send a note — one person reads every message.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const cities = [...serviceArea.core, ...serviceArea.extended];

  const details = [
    {
      label: "Call or text",
      value: contact.phone,
      href: contact.phoneHref,
      mono: true,
    },
    {
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
      mono: true,
    },
    {
      label: "Service area",
      value: `${cities.slice(0, -1).join(", ")}, and ${cities[cities.length - 1]}`,
    },
    {
      label: "Response",
      value: "Within one business day",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    <section className="pb-16 pt-24 md:pb-24 md:pt-28">
      <div className="container">
        <div className="max-w-2xl">
          <Reveal immediate>
            <SectionLabel immediate>Contact</SectionLabel>
          </Reveal>
          <Reveal delay={0.05} immediate>
            <h1 className="display-lg text-foreground">
              Let&apos;s start with a walkthrough.
            </h1>
          </Reveal>
          <Reveal delay={0.1} immediate>
            <p className="lead mt-7">
              Tell me about the home and where things stand. The first visit is
              free and there&apos;s no obligation — we&apos;ll figure out
              together whether I&apos;m the right fit.
            </p>
          </Reveal>
        </div>

        {/* `min-w-0` on the columns: a grid item defaults to `min-width:auto`,
            which refuses to shrink below its longest unbreakable string. The
            email address is one, so without this the whole page grew ~13px
            wider than a 375px phone and scrolled sideways. */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Details — set as a filled-in form, not icon tiles */}
          <div className="min-w-0">
            <Reveal>
              <RuleDraw />
              <dl>
                {details.map((d) => (
                  <div
                    key={d.label}
                    className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-rule/50 py-3.5"
                  >
                    <dt className="label-mono">{d.label}</dt>
                    <dd
                      className={
                        "min-w-0 break-words " +
                        (d.mono
                          ? "font-mono text-sm text-foreground"
                          : "text-sm leading-relaxed text-foreground")
                      }
                    >
                      {d.href ? (
                        <a
                          href={d.href}
                          className="transition-colors hover:text-stamp"
                        >
                          {d.value}
                        </a>
                      ) : (
                        d.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Well Kept Estates is a one-person operation by design, so
                there&apos;s no live chat and no phone tree — just me. That also
                means the person you talk to is the person who&apos;ll be in
                your home.
              </p>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} y={24}>
            <LeadForm variant="general" />
          </Reveal>
        </div>
      </div>
    </section>
    </>
  );
}
