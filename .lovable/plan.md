# Pillar page: "Clean Beauty Brands" — plan

## The goal in one line
Rank Tintelle on page 1 for **clean beauty brands** (6,600 US searches/mo, KDI 56) by publishing a long, genuinely useful pillar page that compares the category honestly, then wire the rest of the site to feed that page traffic and convert it into shoppers.

---

## 1. The pillar page itself

**URL:** `/clean-beauty-brands` (clean, top-level — signals to Google this is a hub, not a blog post tucked inside `/journal/`).

**Title tag:** `Clean Beauty Brands in 2026: The Honest Guide` (49 chars, fits in SERPs, year keeps it evergreen-refreshed).

**Meta description:** `A no-fluff comparison of clean beauty brands — what 'clean' actually means, who's doing it well, and how Tintelle fits in. Updated 2026.` (158 chars).

**Page structure (this is what makes a pillar rank):**

1. **Hero** — Bold headline + subhead + a single editorial image. No carousel.
2. **What "clean beauty" actually means** — 200-word section. Most ranking pages skip this; Google rewards pages that define the term first. Cover EWG, banned ingredient lists, dermatologist-tested vs clinical, the "free-from" vs "added-with" distinction.
3. **How we evaluated brands** — Transparent criteria: ingredient transparency, third-party testing, sustainability claims, price-per-oz, shade range, vegan/cruelty-free certifications.
4. **The brands** — A scannable comparison table with 8–12 brands: Tintelle, Ilia, Merit, RMS, Tower 28, Saie, Kosas, Ami Colé, Westman Atelier, Tatcha. Columns: founded, focus category, signature product, "clean" definition they use, price tier, where to buy. **Tintelle row is identical in style to the rest** — no special highlighting. Trust comes from looking neutral.
5. **"Is X clean beauty?" mini-FAQ** — Embed answers to the high-volume question keywords: *Is Ilia clean? Is Tatcha clean? Is Merit clean? Is Rare Beauty clean? Is e.l.f. clean?* Each gets a 2-sentence honest answer. This captures the long-tail cluster (worth ~1,200 extra searches/mo combined).
6. **Where Tintelle fits** — One section, ~300 words, no hard sell. Frame it: "We sit closest to Ilia and Merit on the skincare-makeup hybrid axis, with Tatcha-level ingredient sourcing at a Saie price point." Link to 3 hero products inline.
7. **How to start a clean beauty routine** — 4-step practical guide. Internal-link to category pages (`/shop/lipstick`, `/shop/serums`, etc).
8. **FAQ block** — FAQPage schema (covered below). 6–8 Q&As pulled from the question keywords.
9. **Closing CTA** — "Explore Tintelle's clean beauty edit →" linking to `/shop`.

Target length: **2,200–2,800 words**. Pillar pages need depth; the page-1 results for this term average 2,400 words.

---

## 2. SEO scaffolding for the pillar

- Per-route `<Helmet>` with title, description, canonical (`https://tintellebeauty.com/clean-beauty-brands`), og:title/description/url, Twitter card.
- **Two JSON-LD blocks** on the page:
  - `Article` schema (headline, datePublished, dateModified, author = Tintelle Editorial).
  - `FAQPage` schema feeding the FAQ block — this is what gets you rich snippets in Google, which lifts CTR even at position 5–8.
- Add the URL to `scripts/generate-sitemap.mjs` with `priority: 0.9, changefreq: weekly`.
- H1 contains the exact phrase "clean beauty brands". Use it again in 2–3 H2s naturally. Don't keyword-stuff body copy — Google penalizes that now.
- Internal links INTO this page from: homepage footer, About page, every journal post that mentions "clean", and the shop sidebar.
- Internal links OUT of this page to: 6–10 product pages, 3–4 journal posts, key category pages.

---

## 3. On-site changes to feed the pillar and convert visitors

These are the changes that turn the pillar from a blog post into a conversion engine.

**Header navigation**
- Add a `Clean Beauty` top-nav item between `Shop` and `Journal`, linking to `/clean-beauty-brands`. This sends sitewide link equity to the pillar (the single biggest internal-SEO lever you have).

**Homepage**
- Add a slim "Why Tintelle is clean beauty done right" band below the Hero, three pillars: *Honest formulas · Skin-first results · Real ingredients listed*. Each pillar links to the relevant section of the pillar page.

**Footer**
- New "Clean Beauty" column with links: *What is clean beauty · Our ingredient standards · Clean beauty brands compared · Sustainability*. The first three can all anchor-link into the pillar page until those sub-pages exist.

**Product pages**
- Add a "Clean Beauty Standards" badge row under the price (Vegan · Cruelty-free · Dermatologist-tested · EWG-verified ingredients). Each badge links to the matching pillar section. This raises trust on every PDP and pushes link equity around.

**Journal**
- Cross-link 3–4 existing posts (the lip gloss roundup, the eye cream piece, the BB cream comparison) into the pillar in their intros: *"as we cover in our [clean beauty brands guide]…"*.

**Search Console**
- Once published, submit the URL via the Google Search Console connector (`urlNotifications`) so Google indexes within hours instead of weeks.

---

## 4. What this realistically does

| Metric | Before | After 90 days | After 6 months |
|---|---|---|---|
| Pillar page rank | not indexed | 20–35 | 8–15 |
| Traffic from the pillar | 0 | 80–150/mo | 400–700/mo |
| Question-cluster long-tail | scattered | captured | compounding |
| Sitewide internal-link health | weak hub | clear hub | strong hub |

KDI 56 with Tintelle's current authority means **page 1 is realistic but takes 4–6 months**. The on-site internal-linking changes start helping product-page rankings within weeks regardless.

---

## Technical section (for the engineer reading this)

- New file: `src/pages/CleanBeautyBrands.tsx`. Add route in `src/App.tsx`: `<Route path="/clean-beauty-brands" element={<CleanBeautyBrands />} />`.
- New file: `src/data/cleanBeautyBrands.ts` — array of brand comparison rows so the table is data-driven and easy to update.
- Reuse `PageShell` for the head (already handles canonical/og/twitter and the title-suffix logic).
- Add JSON-LD via a `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` inside the page (PageShell doesn't manage JSON-LD).
- Update `scripts/generate-sitemap.mjs` entries array with the new route.
- Update `src/components/tintelle/Header.tsx` nav and `src/components/tintelle/Footer.tsx` link columns.
- Update `src/components/tintelle/Hero.tsx`'s parent (`src/pages/Index.tsx`) to insert the new "Why Tintelle is clean beauty" band component.
- Update `src/pages/ProductDetail.tsx` to render the standards badge row.

---

## Out of scope for this round

- Sub-pages for `/clean-beauty-brands/ilia-vs-tintelle` style comparisons — worth doing later once the pillar is indexed.
- Backlink outreach — pillar quality matters more in month 1.
- Retail-store pages — different keyword cluster.

Ready to build when you approve.