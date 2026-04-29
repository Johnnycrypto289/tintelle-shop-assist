## Tintelle — Shopify Store Build Plan

Premium tinted skincare-makeup brand. Connect the user's existing Shopify store, then build the homepage following the supplied brand blueprint, palette, and mockup.

---

### 1. Connect existing Shopify store
- Trigger the Shopify "connect existing store" flow so the user can paste their Shopify admin link.
- Once connected, Lovable can read/write products, inventory and orders against the live store (with confirmation on writes).
- The storefront we build in Lovable can later replace the existing storefront, deploy to a subdomain, or live as a standalone campaign site — user's choice at deploy time.

### 2. Design system (from brand blueprint)
Tokenize the full palette in `index.css` (HSL) and `tailwind.config.ts`, plus typography:

- Backgrounds: Soft Ivory `#FBF8F4` (page), Warm Cream `#F5EDE3` (sections)
- Brand: Tintelle Blush `#D4A0A0` (primary CTA), Champagne Gold `#C9A96E` (accent/ratings)
- Text: Deep Mauve `#6B4C4C` (headings), Rose Taupe `#8B6F6F` (subhead), Charcoal `#2D2926` (body)
- Accents: Soft Coral, Sage Mist, Petal Pink, Warm Gray, Cloud
- Fonts: **Playfair Display** (serif headings), **Inter** (body/nav) — loaded via Google Fonts in `index.html`
- Reusable semantic tokens (`--primary`, `--background`, `--accent`, etc.) — no hardcoded hex in components

### 3. Homepage sections (in order, per blueprint)
Build in `src/pages/Index.tsx` with focused components in `src/components/tintelle/`:

1. **AnnouncementBar** — "Free shipping on all orders over $50 | Clean, Vegan, Cruelty-Free" (blush bg, white text)
2. **Header** — TINTELLE wordmark (serif), nav: Shop / About / Routine / Journal, search + account + cart icons (cart count)
3. **Hero** — Split layout, H1 "Skincare that shows. Color that cares.", subtext, "Shop the Collection" CTA, lifestyle image placeholder right
4. **ShopByConcern** — "Find Your Tint": 4 circular tiles (Even Skin Tone, Hydrate Lips, Add a Flush, Brighten Eyes)
5. **Bestsellers** — "The Essentials": 3 product cards (Skin Tint SPF 30 $38, Peptide Lip Tint $24, Glow Cheek Tint $28) with 5-star gold ratings + Add to Cart
6. **TrustBanner** — 3 columns: Dermatologist Tested, Clean & Vegan, 30-Day Shade Match Guarantee
7. **RoutineUpsell** — Bundle promo split layout, "Shop the Set – $75"
8. **Footer** — Shop / About / Support columns + newsletter signup

### 4. Product data
After Shopify is connected, populate the 5 products from the blueprint into the connected store (with user confirmation since it's a live store):
- Skin Tint SPF 30 — $38 (12 shades)
- Peptide Lip Tint — $24 (6 shades)
- Glow Cheek Tint — $28 (4 shades)
- Tinted Eye Serum — $32
- The Tintelle Routine (bundle) — $75

Bestseller cards on the homepage will be wired to read from the live Shopify catalog once products exist.

### 5. SEO
- `<title>`: "Tintelle — Skincare that shows. Color that cares."
- Meta description, single H1, semantic sections, alt text on imagery, responsive viewport.

### 6. Out of scope for this first pass
Product detail pages, collection pages, cart drawer logic, reviews, cross-sell, sticky mobile ATC — these are noted in the blueprint and will be built in follow-up steps after the homepage and Shopify connection are in place.

---

### Technical notes
- Stack stays React + Vite + Tailwind + shadcn/ui.
- All colors via CSS variables in `index.css`; Tailwind extended to expose tokens (`bg-cream`, `text-mauve`, etc.).
- Components small and focused; no monolithic Index file.
- Images: lifestyle/product placeholders generated with `imagegen` matching the warm minimalist aesthetic.
