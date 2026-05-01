## Goal

Replace the current **Bestsellers ("The Essentials")** section on the home page with a new **Curated Favorites / Shop by Category** section inspired by the ILIA reference (screenshot 1). A horizontal row of category labels sits above a product grid; **hovering** any label instantly swaps the grid to show **4 products** from that category. The first tab is **Bestsellers** (always active by default), and the last item is a **Shop All** button that links to `/shop`.

This does NOT touch the existing "Explore the Collection" round-tile section above it (screenshot 2 from the previous turn) — that stays as-is. We're replacing the section directly below it.

## Layout (desktop)

```text
                       Curated Favorites
   BESTSELLERS  LIP GLOSS  LIP LINER  EYE TREATMENT  BB CREAM
   EYE MAKEUP   HYDRO PENCIL  BLUSH PALETTE  FOUNDATION   [ SHOP ALL ]
   ─────────── (thin underline beneath the active tab) ───────────

   [ product 1 ]   [ product 2 ]   [ product 3 ]   [ product 4 ]
```

- Eyebrow: `SHOP BY CATEGORY` (tracking-wide uppercase, taupe).
- Heading: `Curated Favorites` in serif mauve — matches existing section heading style.
- Tabs: uppercase, letter-spaced, taupe by default; active tab is mauve with a thin mauve underline. Hovering a tab makes it active. The active tab is "sticky" — when the cursor leaves the tab row, the last hovered tab stays selected (so the user can move down to the products without it snapping back).
- "Shop All" sits at the end of the tab row as a bordered pill button (mauve outline) — it does NOT change the grid on hover; clicking navigates to `/shop`.
- Grid: 4 products in one row on desktop (`lg:grid-cols-4`), 2 columns on mobile, using the existing `ProductCard`. A subtle fade/cross-dissolve when the active tab changes (200ms opacity transition) — no layout shift.

## Mobile behavior

Touch devices have no hover. On `<md`:
- Tabs become a horizontally scrollable row of chips (same pattern already used on `/shop` subcategory chips).
- Tap a chip to switch the grid (instead of hover).
- Grid shows 2 columns, 4 products total (one row of 2 × 2).
- Shop All chip stays at the end of the scroll row.

## Categories shown

In order:

1. **Bestsellers** — products tagged `bestseller` (existing query: `tag:bestseller`).
2. **Lip Gloss**
3. **Lip Liner**
4. **Eye Treatment**
5. **BB Cream**
6. **Eye Makeup**
7. **Hydro Pencil** (eyebrow pencil — matches the existing virtual-category logic)
8. **Blush Palette**
9. **Foundation**

Each non-bestseller tab shows up to **4 products** matching that subcategory using the same resolver logic that powers the `/shop` page (`resolveSubcategory` in `src/pages/Shop.tsx`) — title + tag based, so results match what users see when they click through.

Clicking any product card behaves exactly like today (links to `/product/[handle]`, "from category" attribution preserved).

## Data fetching

- One single fetch on mount: `useProducts(undefined, 100)` — same broad call already used by `ShopByCategory.tsx`. React Query will cache it, so the round-tile section above and this section share the same response (no extra network requests).
- For "Bestsellers" tab: filter the cached list client-side by `tags.includes("bestseller")`. Falls back gracefully if there aren't 4 — shows whatever exists (no padding with random products).
- For each subcategory tab: filter cached list with the same `resolveSubcategory` helper, then `.slice(0, 4)`.
- If a category has 0 matches, show a small "Coming soon" placeholder card (taupe italic, no broken layout).

## What gets removed

- The existing **`Bestsellers.tsx`** section ("The Essentials" — 3 products) is removed from `src/pages/Index.tsx`. The new section replaces it in the same slot.
- The `Bestsellers.tsx` file itself is left in place (not deleted) in case it's wanted again — but it's no longer rendered. Tell me if you'd rather delete it outright.

## Out of scope

- No changes to the round-tile "Explore the Collection" section above.
- No changes to `/shop`, `ProductCard`, cart, or routing.
- No new design tokens, fonts, or colors — uses existing `mauve`, `taupe`, `cream`, `border`.
- No animation library beyond the simple Tailwind opacity transition.

---

## Technical section

**New component**: `src/components/tintelle/CuratedFavorites.tsx`

- Self-contained section. Fetches products via `useProducts(undefined, 100)`.
- Defines a `TABS` constant array: `[{ key: "bestsellers", label: "Bestsellers", match: (p) => p.node.tags?.includes("bestseller") }, { key: "lip-gloss", label: "Lip Gloss", match: (p) => resolveSubcategory(p.node) === "Lip Gloss" }, ...]`.
- Reuses the existing `resolveSubcategory` function — extract it from `src/pages/Shop.tsx` into a new shared util `src/lib/categories.ts` and import from both places (no duplicated logic).
- State: `const [activeKey, setActiveKey] = useState("bestsellers")`.
- Tab buttons: `onMouseEnter={() => setActiveKey(tab.key)}` on desktop, `onClick={...}` on mobile (both handlers attached — mouseEnter is a no-op on touch).
- Active state: text color + a 1px underline (`border-b border-mauve pb-1`) on the active tab, taupe + transparent border otherwise.
- Shop All button: a bordered pill (`border border-mauve text-mauve px-4 py-1.5 rounded-full`) wrapped in `<Link to="/shop">`. No hover handler that changes activeKey.
- Grid: `grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8`. Wrap in a `<div key={activeKey} className="transition-opacity duration-200">` and use a small fade-in via remount or a `useEffect` that briefly sets `opacity-0` → `opacity-100` (simple version: rely on `key={activeKey}` remount + `animate-in fade-in` Tailwind utility from `tailwindcss-animate` already configured).
- Empty-category fallback: if filtered list is empty, render 4 placeholder tiles with `bg-cream rounded-md aspect-[3/4]` and a centered `text-taupe text-xs italic` "Coming soon".

**Edit**: `src/pages/Index.tsx`

- Remove `import { Bestsellers } from "@/components/tintelle/Bestsellers";` and its `<Bestsellers />` usage.
- Add `import { CuratedFavorites } from "@/components/tintelle/CuratedFavorites";` and render `<CuratedFavorites />` in the same position (between `ShopByCategory` and `CampaignFoundation`).

**New util**: `src/lib/categories.ts`

- Exports `resolveSubcategory(node)` (moved verbatim from `Shop.tsx`).
- `Shop.tsx` updated to import from `@/lib/categories` instead of defining it locally — pure refactor, no behavior change.

**Files touched**

- New: `src/components/tintelle/CuratedFavorites.tsx`
- New: `src/lib/categories.ts`
- Edit: `src/pages/Index.tsx` (swap one component)
- Edit: `src/pages/Shop.tsx` (import `resolveSubcategory` from new util)

---

## Open questions

1. **Final tab order** — I proposed Bestsellers → Lip Gloss → Lip Liner → Eye Treatment → BB Cream → Eye Makeup → Hydro Pencil → Blush Palette → Foundation. Want a different order (e.g., Foundation/BB Cream first since they're hero products)?
2. **Section name** — "Curated Favorites" (matches the ILIA reference) or "Shop by Category" (your phrasing)? The eyebrow above the heading already uses one — happy to use either.
3. **Old Bestsellers component** — leave the file in place unused, or delete it?