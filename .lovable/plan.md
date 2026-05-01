# Magazine-Style Editorial Redesign — "The Edit" Section

Move away from the "four equal squares" look into an **asymmetric editorial spread** — same family as the Campaign Foundation block, but distinct enough that the page doesn't feel repetitive.

## The core idea

Use a **12-column asymmetric grid**, mixing portrait and landscape image sizes so no two tiles share the same shape. A small "editorial sidebar" on one side carries the section title + intro copy, the way fashion magazines lead an editorial page.

## Desktop layout (12-col grid)

```text
┌────────────────────┬──────────────────────────────────────────┐
│                    │   ┌──────────────┐  ┌─────────────────┐  │
│  THE EDIT          │   │              │  │                 │  │
│  Four to           │   │  LIP LINER   │  │   BLUSH         │  │
│  fall for.         │   │  Raspberry   │  │   PALETTE       │  │
│                    │   │  (3:4 tall)  │  │   Kissable      │  │
│  Intro copy here   │   │              │  │   (4:3 wide)    │  │
│  about hand-       │   │              │  └─────────────────┘  │
│  picked staples.   │   │              │  ┌─────────────────┐  │
│                    │   │              │  │                 │  │
│  Discover all →    │   │              │  │   BB CREAM      │  │
│  (sidebar = 3 col) │   └──────────────┘  │   Pearly        │  │
│                    │                     │   (tall)        │  │
│                    │   ┌─────────────┐   │                 │  │
│                    │   │             │   └─────────────────┘  │
│                    │   │  LIP GLOSS  │                        │
│                    │   │  Brick      │                        │
│                    │   │  (4:5 wide) │                        │
│                    │   └─────────────┘                        │
└────────────────────┴──────────────────────────────────────────┘
   3 cols                 4 cols              5 cols
```

Result: **no two tiles are the same size**, sidebar text anchors the left, images breathe with offsets and varied aspect ratios — that's the magazine feel.

### Specifics

- **Left sidebar (col-span-3)**: sticky-feeling text block with eyebrow `THE EDIT`, big serif `Four to fall for.`, short intro paragraph, and a `Shop the edit →` link. Vertically centered.
- **Tile 1 — Lip Liner Raspberry (col-span-4)**: tall 3:4 portrait, spans full section height. Caption overlaid bottom-left in a small backdrop-blur chip.
- **Tile 2 — Blush Palette Kissable (col-span-5, top)**: short landscape 4:3, sits at the top of the right column.
- **Tile 3 — BB Cream Pearly (col-span-5, bottom)**: portrait 3:4, sits below blush. Slight horizontal offset (small left margin) to break alignment.
- **Tile 4 — Lip Gloss Brick (col-span-4, bottom)**: 4:5 portrait sitting under Lip Liner with a top margin gap, deliberately misaligned with the right column to feel hand-laid.

### Magazine touches

- Tiny **N° numerals** ("N° 01", "N° 02"…) on each caption — same typographic system as the Campaign block.
- A **thin horizontal hairline rule** between sidebar text and the link.
- **Caption style**: bottom-left chip on the image with `CATEGORY — Shade` in 10px tracked uppercase mauve on translucent background — same vocabulary as Campaign tiles.
- **Hover**: image scales 1.04 over ~1400ms (slow, luxe), and the small `Discover →` underneath each tile draws its underline.
- A **soft petal/cream gradient wash** behind the section (same trick as Campaign) so the white background isn't flat.
- Generous vertical breathing room (`py-20 md:py-32`) and `max-w-6xl` container so it reads as an editorial spread, not a product grid.

## Mobile layout

The sidebar collapses to the top (centered text). Below it, tiles stack in a **single column with alternating offsets** — odd-numbered tiles full-width, even-numbered tiles indented 8% from the right — keeping the asymmetric, hand-laid feel without a busy grid.

## What stays / what changes

- **Files edited**: only `src/components/tintelle/ShopByCategory.tsx`.
- **Images**: reuse the four WebPs already in `src/assets/`.
- **Tokens**: only semantic tokens (`mauve`, `taupe`, `cream`, `petal`, `background`).
- **Routing & data**: identical — each tile still links to `/shop?category=...`.

## Why this works

It mirrors the **structural rhythm** of Campaign Foundation (asymmetric grid + sidebar + caption chips + slow hover) without copying it: Campaign features one product in three shades; this section features four different categories. Same luxury vocabulary, different story.

Awaiting approval before implementing.