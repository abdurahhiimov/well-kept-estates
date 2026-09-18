/**
 * Pings IndexNow (api.indexnow.org) with every URL in the live sitemap, so
 * Bing (and other IndexNow-participating engines) recrawl changed pages
 * immediately instead of waiting on their normal crawl schedule.
 *
 * Run after any content change you want picked up fast:
 *   npm run indexnow
 *
 * The key file at public/<KEY>.txt must already be deployed and reachable
 * at https://<host>/<KEY>.txt — that file is what proves domain ownership.
 */

const HOST = "wellkeptestates.space";
const KEY = "a1fb00be606e6e85d85cefbe7a717cca";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function getUrlsFromSitemap() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Couldn't fetch sitemap: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  if (matches.length === 0) {
    throw new Error("Sitemap fetched but no <loc> entries found.");
  }
  return matches;
}

async function submitToIndexNow(urlList) {
  const body = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });

  return res;
}

const urls = await getUrlsFromSitemap();
console.log(`Submitting ${urls.length} URL(s) to IndexNow:`);
urls.forEach((u) => console.log(`  - ${u}`));

const res = await submitToIndexNow(urls);

// IndexNow returns 200 (or 202) on success, with no body.
if (res.ok) {
  console.log(`\nSubmitted. IndexNow responded ${res.status} ${res.statusText}.`);
} else {
  const text = await res.text().catch(() => "");
  console.error(`\nIndexNow rejected the submission: ${res.status} ${res.statusText}`);
  if (text) console.error(text);
  process.exit(1);
}
