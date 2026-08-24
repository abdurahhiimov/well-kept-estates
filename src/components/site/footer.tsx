import Link from "next/link";
import { Wordmark } from "@/components/site/wordmark";
import { business, contact, nav, serviceArea } from "@/lib/content";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const cities = [...serviceArea.core, ...serviceArea.extended];

  return (
    <footer data-surface="dark" className="border-t border-border bg-background">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {business.tagline} Sorting, pricing, staging, and running the
            sale — with a written record of where everything went.
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
            <li>
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
