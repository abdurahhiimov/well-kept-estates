import type { MetadataRoute } from "next";
import { routes, site } from "@/lib/site";

/**
 * `lastModified` is a real input for crawlers deciding whether to re-read a
 * page, so it uses build time rather than a hardcoded date — a redeploy is the
 * only moment the content can actually have changed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const builtAt = new Date();
  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: builtAt,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
