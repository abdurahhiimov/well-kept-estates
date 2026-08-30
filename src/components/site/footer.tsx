import Image from "next/image";
import Link from "next/link";
import { business, contact, nav, serviceArea } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const cities = [...serviceArea.core, ...serviceArea.extended];

  return (
    <footer data-surface="dark" className="border-t border-border bg-background">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* Full badge here rather than the wordmark: at this size the
              lettering is legible, and the cream arch on the dark ground reads
              as a seal pressed at the end of a document — which is the whole
              argument the site is making. */}
          <Image
            src="/logo-badge.png"
            alt="Well Kept Estates"
            width={440}
            height={480}
            className="h-32 w-auto"
          />
          <p className="mt-4 max-w-xs font-display text-base leading-snug text-foreground/90">
            {business.motto}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {business.tagline} With a written record of where everything went.
          </p>
          <p className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">
            {business.processChain}
          </p>
        </div>

        <div>
          <h3 className="label-mono">
            Pages
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {[...nav, { label: "About", href: "/about" }].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label-mono">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-foreground/80">
            <li>
              <a href={contact.phoneHref} className="hover:text-foreground">
                {contact.phone}
              </a>
            </li>
            <li className="min-w-0 break-words">
              <a href={`mailto:${contact.email}`} className="hover:text-foreground">
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.sameAs[0]}
                rel="me noopener"
                target="_blank"
                className="hover:text-foreground"
              >
                Instagram
              </a>
            </li>
            <li className="pt-1 text-muted-foreground">
              Serving {cities.slice(0, -1).join(", ")}, and{" "}
              {cities[cities.length - 1]}.
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-start justify-between gap-2 py-6 font-mono text-[0.68rem] text-muted-foreground md:flex-row md:items-center">
          <p>
            © {year} {business.name}. San Fernando Valley, California.
          </p>
          <p>By appointment — one estate at a time.</p>
        </div>
      </div>
    </footer>
  );
}
