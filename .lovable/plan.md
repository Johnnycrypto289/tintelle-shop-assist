# Shop by Category — Interactive Tilt Hover

## Goal
Make the round product images in **Shop by Category** ("Explore the Collection") feel premium and tactile: when a visitor hovers a tile, the circle gently tilts in 3D toward the cursor, lifts/scales slightly, and a small floating caption follows the cursor showing the category name (e.g. "Shop Lip Gloss →"). Click behavior is unchanged — still navigates to that category in `/shop`.

The reference component (TiltedCard) is the right interaction pattern. We will **not** copy its black/white styling, hard tooltip pill, or "optimized for desktop" warning. Instead we adapt the motion to Tintelle's brand: cream/mauve/petal palette, serif type, soft shadows, no harsh edges.

## What changes visually

- Each circular category tile gains a subtle 3D parallax tilt that follows the cursor (max ~10° — softer than the reference's 14° to feel elegant, not gimmicky).
- On hover: tile lifts gently (scale ~1.06), a soft mauve-tinted shadow blooms underneath the circle.
- A small caption floats near the cursor with the category name in serif italic + a thin underline, tinted `text-mauve` on a translucent cream background — no hard pill, no drop-shadow box.
- On mobile (touch / `<md`): tilt and cursor caption are **disabled**; tiles keep the existing simple `scale-105` hover so nothing breaks on phones.
- The category label below the circle stays exactly where it is.

## Technical section

**New component**: `src/components/tintelle/TiltedCategoryTile.tsx`
- Adapted from the provided TiltedCard, stripped to what we need.
- Uses `framer-motion` (already installed via existing project deps — verify; if missing, add it).
- Props: `imageUrl`, `imageAlt`, `name`, `to` (link href).
- Renders a `<Link>` wrapping a `motion.div` with `transformStyle: 'preserve-3d'` and motion values for `rotateX`, `rotateY`, `scale`. Inside: the circular image (`rounded-full`, `aspect-square`) with `translateZ(30px)` so it pops forward, and the existing `<span>` label below (kept outside the tilt for legibility).
- Cursor caption: a `motion.figcaption` positioned `fixed`/absolute that tracks `mouseX`/`mouseY`, fades in on enter, says `Shop {name}` in `font-serif italic text-mauve text-sm` on a `bg-cream/90 backdrop-blur` chip with a thin `border-mauve/20`. No drop shadow.
- Mobile guard: detect via `useMediaQuery('(hover: hover) and (pointer: fine)')` (or simple `matchMedia` check) — if false, render the current static markup with no motion handlers.
- Spring config tuned softer than reference: `{ damping: 28, stiffness: 90, mass: 1.4 }` for a calm, expensive feel.
- No "mobile warning" overlay. No external tooltip library.

**Edit**: `src/components/tintelle/ShopByCategory.tsx`
- Replace the inner `<Link>` block (lines ~62–80) with `<TiltedCategoryTile />`.
- Keep grid, spacing, loading state, and empty state untouched.

**Brand tokens used** (from existing `index.css` / `tailwind.config.ts`): `cream`, `mauve`, `taupe`, `petal`, `border`. No new colors introduced.

**Files touched**
- New: `src/components/tintelle/TiltedCategoryTile.tsx`
- Edit: `src/components/tintelle/ShopByCategory.tsx`

## Out of scope
- No changes to colors, typography, layout, category data, or routing.
- No tilt effect on product cards in Shop / Bestsellers (this request is scoped to Shop by Category only).
- No mobile-specific tilt — mobile keeps current behavior.
