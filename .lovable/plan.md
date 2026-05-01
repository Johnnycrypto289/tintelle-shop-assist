# Redesign "Shop by Category" → Editorial 4-Tile Showcase

Replace the current 8-circle "Explore the Collection" grid with a more editorial, magazine-style section featuring **4 hand-picked categories**, each with its own lifestyle image. Inspired by (but not a copy of) the second reference screenshot — softer, more curated, big-brand feel.

## The 4 featured categories

| Tile | Linked product | Routes to |
|---|---|---|
| Lip Liner | Lip Liner — Raspberry | `/shop?category=Lip%20Liner` |
| Blush Palette | Blush Palette — Kissable | `/shop?category=Blush%20Palette` |
| BB Cream | BB Cream — Pearly | `/shop?category=BB%20Cream` |
| Lip Gloss | Lip Gloss — Brick | `/shop?category=Lip%20Gloss` |

## Layout

A responsive editorial grid — not identical to the reference, but the same family:

```text
Desktop (2 × 2):
┌──────────────┬──────────────┐
│  Lip Liner   │ Blush Palette│
│  (tall img)  │  (tall img)  │
├──────────────┼──────────────┤
│   BB Cream   │  Lip Gloss   │
└──────────────┴──────────────┘

Mobile: single column, stacked.
```

Each tile contains:
- Large lifestyle image (3:4 portrait) with subtle hover zoom
- Eyebrow label (e.g. "N° 01 — LIP LINER") in spaced uppercase
- Serif heading: the shade name (e.g. "Raspberry")
- A short tag-line (one line, italic-ish serif), e.g. *"Define. Soften. Stay."*
- A "Discover →" link at the bottom of each card

A small heading bar above the grid:
- Eyebrow: `THE EDIT`
- Title (serif): `Four to fall for.`
- Sub: short line about hand-picked favorites

## Image handling

The four uploaded photos will be:
1. Copied into `src/assets/`
2. Converted to **WebP** (high quality, ~85, ~1200px wide max) for fast loading
3. Imported as ES6 modules in the component (gets bundled + hashed)

Filenames:
- `featured-lip-liner-raspberry.webp`
- `featured-blush-kissable.webp`
- `featured-bb-cream-pearly.webp`
- `featured-lip-gloss-brick.webp`

## Files

- **Edit** `src/components/tintelle/ShopByCategory.tsx` — full rewrite as an editorial 4-tile showcase (no longer auto-builds from product types).
- **Add** 4 new WebP images in `src/assets/`.
- `src/pages/Index.tsx` — no change (component name stays the same).
- The old `TiltedCategoryTile` stays in the codebase (unused here) in case it's wanted elsewhere.

## Style notes

- Reuses existing semantic tokens: `mauve`, `taupe`, `cream`, `background`.
- Generous whitespace, large serif headings (matches Hero/Campaign).
- Hover: image scale 1.04, link underline draws in.
- Fully responsive, no layout shift, lazy-loaded images.

Ready to implement on approval.