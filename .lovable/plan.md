# Tintelle — Backend Wiring Plan

We'll execute in 5 phases. After each phase you test, then we move on. Each phase lists exactly what I do, what you do, and what "done" looks like.

---

## Phase 1 — Lovable Cloud + Resend (Contact form & Newsletter)

**Quickest win.** Stands up the backend we'll reuse in every later phase.

What I do:
- Enable Lovable Cloud (provisions DB, edge functions, secrets store).
- Create `newsletter_signups` table (email, source, created_at) with RLS allowing anonymous inserts only.
- Create edge function `send-contact-email` — validates with Zod (name, email, topic, message; length caps), calls Resend via the connector gateway, sends to `hi@tintelle.com`.
- Create edge function `subscribe-newsletter` — validates email, inserts row, optionally sends welcome email via Resend.
- Wire `Contact.tsx` form and the Footer newsletter input to the new functions with toast feedback + loading states.

What you do:
1. Approve the Cloud enablement prompt when it appears.
2. Approve the Resend connector prompt and pick (or create) a Resend connection. If new: sign up at resend.com (free tier covers ~3k emails/month), then come back.
3. (Optional) Verify your `tintelle.com` domain in Resend so emails come from `hi@tintelle.com` instead of `onboarding@resend.dev`. I'll give you exact DNS records to paste into your registrar.
4. Tell me the destination inbox for contact-form messages (default `hi@tintelle.com`).

Done when: submitting the contact form sends a real email; newsletter signup stores the email and confirms.

---

## Phase 2 — Shopify Customer Accounts (Account page = real auth)

What I do:
- Add Shopify Storefront API customer mutations to `src/lib/shopify.ts`: `customerCreate`, `customerAccessTokenCreate`, `customer` (fetch), `customerRecover`, `customerAccessTokenDelete`.
- Create `src/stores/authStore.ts` (Zustand + localStorage) holding `accessToken`, `expiresAt`, and `customer`.
- Rebuild `Account.tsx`: real sign-in, sign-up, forgot-password, sign-out. Dashboard pulls real `orders`, `defaultAddress`, and links to `/track`.
- Add a `useCustomer()` hook so other pages (Header, Wishlist, Track) can react to auth.
- Show the user icon in Header as filled when signed in.

What you do:
1. In Shopify Admin → **Settings → Customer accounts** → choose **Classic customer accounts** (works with Storefront API). New customer accounts use a different OAuth flow — I'll note the upgrade path but Classic is what the Storefront API supports today.
2. Confirm that's done — no keys to paste, the existing Storefront token is enough.

Done when: you can sign up, sign in, see your real order history, and sign out.

---

## Phase 3 — Track Order (real Shopify orders)

Depends on Phase 2 (needs the customer access token).

What I do:
- Replace the demo lookup in `Track.tsx`. Two paths:
  - **Signed in**: list the customer's orders + status, fulfillments, tracking URLs.
  - **Guest lookup by order # + email**: calls a new edge function `lookup-order` that hits the **Shopify Admin API** (server-side, never exposed to the browser) and returns sanitized status + tracking. This requires an Admin API access token.
- Build proper status timeline from `fulfillments[].events`.

What you do:
1. In Shopify Admin → **Settings → Apps and sales channels → Develop apps** → create a private app named "Tintelle Site". Grant Admin API scopes: `read_orders`, `read_customers`, `read_fulfillments`. Install the app, copy the **Admin API access token**.
2. I'll prompt you to paste it into `SHOPIFY_ADMIN_API_TOKEN` via the secrets tool.

Done when: signed-in dashboard shows real orders, and the guest lookup returns real tracking.

---

## Phase 4 — Shopify Subscriptions (real recurring billing)

What I do:
- Extend the product GraphQL query to fetch `sellingPlanGroups` per variant.
- Update `Subscribe.tsx` so the frequency radios map to real **selling plan IDs** (30/60/90 day cadences).
- Update the cart store's `cartCreate`/`cartLinesAdd` to send `sellingPlanId` alongside `merchandiseId` so Shopify treats it as a subscription line.
- Update the cart drawer + `/cart` to label subscription lines and show the discounted price.
- Update PDP with a "One-time / Subscribe & Save 15%" toggle.

What you do:
1. In Shopify Admin → **Apps** → install **Shopify Subscriptions** (free, first-party). 
2. For each subscribable product, create a **selling plan group** with 30/60/90-day cadences and a 15% discount. Assign it to the right products.
3. Tell me when the plans exist — no keys to paste; Storefront API exposes them automatically.

Done when: clicking "Start subscription" creates a Shopify checkout that completes as a recurring contract, visible in Admin → Subscriptions.

---

## Phase 5 — Cleanup & polish

What I do:
- Remove the in-page Shipping/Payment preview steps in `/cart` (Shopify hosts that — keeping it confuses customers). Replace with a single clean cart → "Checkout securely" handoff.
- Fix the `next-themes` console warning (wrap with ThemeProvider or hardcode light theme on Sonner).
- Remove the "Reviews coming soon" placeholder, or wire to Judge.me / Yotpo if you want real reviews (separate decision).
- Add a `/account/orders` and `/account/addresses` if Phase 2/3 surfaces enough data to warrant separate pages.
- Final pass: 404 routes, sitemap.xml, robots.txt, canonical tags per page, Open Graph defaults.

What you do:
1. Decide on reviews: skip, Judge.me (free tier), or Yotpo (paid). I'll wire whichever.
2. Final QA pass across all 17 pages signed-in and signed-out.

Done when: zero console warnings, every page works in both auth states, SEO basics shipped.

---

## Technical notes

- **Auth flow**: Storefront API `customerAccessToken` is a 30-day bearer token kept in localStorage. We'll auto-refresh on sign-in and clear on 401.
- **Edge functions used**: `send-contact-email`, `subscribe-newsletter`, `lookup-order`. All Zod-validated, rate-limited via in-memory bucket (good enough until traffic warrants Upstash).
- **Secrets needed across the whole plan**: `RESEND_API_KEY` (Phase 1, via connector — auto), `SHOPIFY_ADMIN_API_TOKEN` (Phase 3, manual paste).
- **No DB changes required** for auth/orders/subscriptions — Shopify is the source of truth. Cloud DB only stores newsletter signups (and later, maybe contact form log).

---

## Order of operations recap

```text
Phase 1  Cloud + Resend → Contact + Newsletter           [you: Cloud + Resend connection]
Phase 2  Shopify Customer Accounts                       [you: enable Classic accounts]
Phase 3  Real Track Order (depends on Phase 2)           [you: Admin API token]
Phase 4  Shopify Subscriptions                           [you: install app + create plans]
Phase 5  Cleanup, reviews decision, SEO polish           [you: pick reviews path]
```

Reply "go" and I'll start Phase 1 by enabling Lovable Cloud and prompting for the Resend connection.
