// Generates public/sitemap.xml at build time.
// Includes static routes, journal posts, and live Shopify product handles.
import { writeFileSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const SITE = "https://www.tintellebeauty.com";
const SHOPIFY_DOMAIN = "41vquf-k2.myshopify.com";
const SHOPIFY_TOKEN = "12433f2adca16e3775b7ff86f895a875";
const SHOPIFY_API = "2025-07";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changefreq: "daily" },
  { path: "/shop", priority: 0.9, changefreq: "daily" },
  { path: "/journal", priority: 0.8, changefreq: "weekly" },
  { path: "/about", priority: 0.6, changefreq: "monthly" },
  { path: "/contact", priority: 0.5, changefreq: "monthly" },
  { path: "/faq", priority: 0.5, changefreq: "monthly" },
  { path: "/shipping", priority: 0.4, changefreq: "monthly" },
  { path: "/subscribe", priority: 0.5, changefreq: "monthly" },
  { path: "/privacy", priority: 0.3, changefreq: "yearly" },
  { path: "/terms", priority: 0.3, changefreq: "yearly" },
];

async function fetchShopifyHandles() {
  const handles = [];
  let cursor = null;
  for (let i = 0; i < 10; i++) {
    const query = `
      query($cursor: String) {
        products(first: 100, after: $cursor) {
          edges { cursor node { handle updatedAt } }
          pageInfo { hasNextPage }
        }
      }`;
    const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables: { cursor } }),
    });
    if (!res.ok) {
      console.warn("[sitemap] Shopify fetch failed:", res.status);
      return handles;
    }
    const json = await res.json();
    const edges = json?.data?.products?.edges ?? [];
    for (const e of edges) handles.push({ handle: e.node.handle, updatedAt: e.node.updatedAt });
    if (!json?.data?.products?.pageInfo?.hasNextPage) break;
    cursor = edges[edges.length - 1]?.cursor;
  }
  return handles;
}

function extractJournalSlugs() {
  try {
    const src = readFileSync(resolve(ROOT, "src/data/journal.ts"), "utf8");
    // Match slug values inside JOURNAL_POSTS (skip category slugs which are short)
    const slugs = [];
    const re = /slug:\s*"([a-z0-9-]{15,})"/g;
    let m;
    while ((m = re.exec(src))) slugs.push(m[1]);
    return [...new Set(slugs)];
  } catch (e) {
    console.warn("[sitemap] could not parse journal.ts:", e.message);
    return [];
  }
}

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ""}${changefreq ? `\n    <changefreq>${changefreq}</changefreq>` : ""}${priority != null ? `\n    <priority>${priority.toFixed(1)}</priority>` : ""}
  </url>`;
}

async function main() {
  const today = new Date().toISOString().split("T")[0];
  const entries = [];

  for (const r of STATIC_ROUTES) {
    entries.push(urlEntry({ loc: SITE + r.path, lastmod: today, changefreq: r.changefreq, priority: r.priority }));
  }

  const journalSlugs = extractJournalSlugs();
  for (const slug of journalSlugs) {
    entries.push(urlEntry({ loc: `${SITE}/journal/${slug}`, lastmod: today, changefreq: "monthly", priority: 0.7 }));
  }

  const products = await fetchShopifyHandles();
  for (const p of products) {
    const lastmod = p.updatedAt ? p.updatedAt.split("T")[0] : today;
    entries.push(urlEntry({ loc: `${SITE}/product/${p.handle}`, lastmod, changefreq: "weekly", priority: 0.8 }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</urlset>
`;
  writeFileSync(resolve(ROOT, "public/sitemap.xml"), xml, "utf8");
  console.log(`[sitemap] wrote ${entries.length} URLs (${products.length} products, ${journalSlugs.length} journal posts)`);
}

main().catch((e) => {
  console.error("[sitemap] failed:", e);
  process.exit(0); // do not block build
});
