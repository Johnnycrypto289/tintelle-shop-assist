# Add "The Edit" Section to the Shop Page

When a user clicks **"Shop the edit"** from the homepage, they currently land on the generic `/shop` page. We'll wire that link to a dedicated "The Edit" view that shows just the four hand-picked products from the homepage editorial.

## How it works

### Route
- Use a query param: `/shop?edit=the-edit`
- The homepage `Shop the edit →` link updates from `/shop` to `/shop?edit=the-edit`.
- (Future-proof: more curated edits could be added later, e.g. `?edit=summer-staples`.)

### The four products in The Edit
The exact same products featured on the homepage:

| N° | Product title (Shopify match) |
|---|---|
| 01 | Lip Liner — Raspberry |
| 02 | Blush Palette — Kissable |
| 03 | BB Cream — Pearly |
| 04 | Lip Gloss — Brick |

These are matched by exact title via Shopify Storefront API.

### Shop page behavior when `?edit=the-edit` is present
- Hide the Face/Lips/Eyes filter tabs and the subcategory quick-jump chips.
- Replace the page heading with an editorial intro:
  - Eyebrow: `THE EDIT`
  - Title: *"Four to fall for."*
  - Subtitle: "A hand-picked quartet of staples — the shades our community keeps coming back for."
- Show the 4 products in a clean responsive grid (same `ProductCard` component already used on Shop).
- Each card keeps its existing add-to-cart + "View" routing.
- Loading and empty states reuse existing patterns.

### Files

- **Edit** `src/pages/Shop.tsx` — read `edit` search param; when set, fetch the four titles and render the curated view (skipping filters, groups, and chips). Default behavior unchanged when `edit` isn't present.
- **Edit** `src/components/tintelle/ShopByCategory.tsx` — change the sidebar link from `/shop` to `/shop?edit=the-edit`.

### Technical detail (data fetch)
A single Storefront API query with the four titles OR'd together:
```
title:"Lip Liner - Raspberry" OR title:"Blush Palette - Kissable" OR title:"BB Cream - Pearly" OR title:"Lip Gloss - Brick"
```
Then the result is sorted into the curated order N° 01 → 04 client-side so the display always matches the homepage order, regardless of API order.

Awaiting approval before implementing.