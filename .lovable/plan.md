# Mobile-First Optimization Plan

Goal: make Tintelle feel native on phones — fast, thumb-friendly, no horizontal scroll, no awkward gaps. Desktop stays intact; we just stop letting it dictate the mobile experience.

## 1. Global foundations

- **Header**: replace desktop-only nav with a mobile hamburger drawer (slide-in sheet) showing Home / Shop / About / Journal / Account. Shrink the giant logo on mobile (currently `h-32 scale-150` — eats ~190px of vertical space). Target: 56–64px header height on mobile, 96px on desktop.
- **Tap targets**: all icons and buttons → minimum 44×44px hit area.
- **Container padding**: tighten to `px-4` on mobile, `px-6 md:px-8` on larger.
- **Typography scale**: drop hero from `text-4xl` to `text-3xl` on small phones to prevent line-break ugliness; keep `md:text-6xl lg:text-7xl`.
- **Footer**: stack columns, collapse link groups into accordions on mobile.

## 2. Home page sections

- **Hero**: stack image-above-text on mobile; image fills width edge-to-edge; CTAs become full-width stacked buttons.
- **Bestsellers / ShopByCategory / ShopByConcern**: convert multi-column grids to a horizontal swipe carousel on mobile (snap-x), 2-col grid on `sm`, full grid on `md+`.
- **TrustBanner**: stack vertically on mobile with larger icons.
- **BestsellerSpotlight**: single column on mobile, image first.

## 3. Shop & Product pages

- **Shop grid**: 2 columns on mobile (not 1), 3 on tablet, 4 on desktop. Sticky filter button at bottom that opens a bottom-sheet for filters/sort instead of a sidebar.
- **ProductCard**: tighter spacing, price + title legible at small sizes, "Add to cart" as a full-width button below image on mobile.
- **ProductDetail**: image gallery becomes swipeable carousel with dots; sticky "Add to cart" bar pinned to bottom of viewport on mobile so users never lose the buy button while scrolling specs.

## 4. Cart & Checkout flow

- **Cart page**: line items as stacked cards (image left, title/price/qty right), not a wide table. Order summary pinned to bottom on mobile with a sticky "Checkout" button.
- **CartDrawer**: full-height sheet on mobile, sticky checkout CTA at bottom.
- Quantity steppers sized for thumbs (44px buttons).

## 5. Account, Auth, Forms

- **Account / Wishlist / Search / Subscribe / Contact**: single-column layouts, inputs at `h-12` with `text-base` (prevents iOS zoom-on-focus), labels above fields.
- **Track order / FAQ**: ensure no fixed-width tables; FAQ accordions already mobile-friendly, just verify spacing.

## 6. Content pages (About / Journal / Post / Legal)

- Tighten prose width, larger line-height on mobile, images full-bleed where appropriate.
- Journal grid: 1 col mobile, 2 col tablet, 3 col desktop.

## 7. Performance for mobile

- Verify all hero/product images use `loading="lazy"` except above-the-fold.
- Add `srcset` / responsive sizes where we serve large images.
- Confirm no layout shift (width/height on imgs).

## Technical notes

Tailwind breakpoints used: default (mobile) → `sm` 640 → `md` 768 → `lg` 1024.
Mobile-first means no `md:` prefix on base styles — base = phone, prefixes scale up.

Sticky bars use `sticky bottom-0` inside a relative container, or `fixed bottom-0 inset-x-0 md:hidden` for true mobile-only overlays. `safe-area-inset-bottom` padding for iPhone home indicator.

New components:
- `MobileNav.tsx` (hamburger drawer)
- `MobileFilterSheet.tsx` (shop filters bottom sheet)
- `StickyAddToCart.tsx` (product page mobile bar)

Files touched (≈18): Header, Footer, Hero, Bestsellers, BestsellerSpotlight, ShopByCategory, ShopByConcern, TrustBanner, ProductCard, CartDrawer, plus all 18 pages for layout/padding audits.

## Out of scope

- Visual redesign / color changes (keeps current palette and typography).
- Shopify checkout itself (Shopify-hosted, mobile-optimized by them).
- New features — purely responsive/UX work.
