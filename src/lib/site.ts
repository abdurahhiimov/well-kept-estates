/**
 * Canonical facts about the site itself — the single source that metadata,
 * sitemap, robots and structured data all read from, so a URL or a profile
 * link can never drift between them.
 */
import { commission, contact, serviceArea } from "@/lib/content";

export const site = {
  url: "https://wellkeptestates.space",
  name: "Well Kept Estates",
  shortDescription:
    "Estate sales across the San Fernando Valley, with a written settlement report on every sale.",
  /**
   * Profiles we control. `sameAs` is how a search engine or an assistant
   * confirms that the business on this page and the business on that profile
   * are the same entity — it's the main thing that turns a name into something
   * an answer can safely cite.
   *
   * TODO: add the Google Business Profile URL once the listing is claimed.
   */
  sameAs: ["https://www.instagram.com/wellkeptestates"],
  /** Roughly the centre of the service area — Encino. */
  geo: { latitude: 34.1595, longitude: -118.5012 },
} as const;

export const routes = [
  { path: "/", priority: 1, changeFrequency: "monthly" as const },
  { path: "/the-record", priority: 0.9, changeFrequency: "yearly" as const },
  { path: "/for-attorneys", priority: 0.8, changeFrequency: "yearly" as const },
  { path: "/about", priority: 0.6, changeFrequency: "yearly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" as const },
];

const cities = [...serviceArea.core, ...serviceArea.extended];

/**
 * The business itself. `ProfessionalService` rather than `LocalBusiness`:
 * there's no storefront to visit, and a service-area business that publishes
 * a street address gets treated as one that lies about having premises.
 */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.shortDescription,
    url: site.url,
    telephone: contact.phone,
    email: contact.email,
    image: `${site.url}/opengraph-image`,
    priceRange: "30% of gross sales, $1,500 minimum",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Debit Card",
    sameAs: [...site.sameAs],
    areaServed: cities.map((city) => ({
      "@type": "City",
      name: city,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Los Angeles County, California",
      },
    })),
    // No street address on purpose: the work happens at the client's home.
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: site.geo.latitude,
        longitude: site.geo.longitude,
      },
      geoRadius: "32000",
    },
    knowsLanguage: ["en", "ru"],
    makesOffer: {
      "@type": "Offer",
      name: "Full-service estate sale",
      description:
        "Sorting, pricing, research, staging and running the sale, with a written settlement report and same-day proceeds.",
      priceSpecification: {
        "@type": "PriceSpecification",
        description: `${commission.rateLabel} of gross sales, ${commission.minimumLabel} minimum`,
        minPrice: commission.minimum,
        priceCurrency: "USD",
      },
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: "en-US",
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  };
}

export function articleSchema(a: {
  headline: string;
  description: string;
  path: string;
  published: string;
  modified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.headline,
    description: a.description,
    url: `${site.url}${a.path}`,
    mainEntityOfPage: `${site.url}${a.path}`,
    datePublished: a.published,
    dateModified: a.modified,
    // Attributed to the business, not a named person — the entity that needs
    // to be recognisable here is the company.
    author: { "@id": `${site.url}/#business` },
    publisher: { "@id": `${site.url}/#business` },
    inLanguage: "en-US",
  };
}
