// Tintelle Journal — 12 SEO-targeted articles tied to REAL Shopify products.
// Heroes are sourced from each post's primary product image at render time
// (see src/hooks/useJournalHero.ts). Targeting US women across major metros
// (NYC, LA, Miami, Chicago, Houston, Dallas, Atlanta, Phoenix) and states
// (Texas, Florida, California, Georgia).

export type JournalBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; style: "ordered" | "unordered"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface JournalPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  tags: string[];
  /** Shopify product handles. The first handle's primary image is used as the hero. */
  productHandles: string[];
  heroAlt: string;
  author: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  body: JournalBlock[];
}

export const JOURNAL_AUTHORS: Record<string, { name: string; role: string }> = {
  "naomi-tahir": { name: "Naomi Tahir", role: "Founder & Editor" },
  "dr-ines-rivera": { name: "Dr. Inés Rivera", role: "Lead Cosmetic Chemist" },
  "yuki-mori": { name: "Yuki Mori", role: "Senior Beauty Editor" },
  "amelia-grant": { name: "Amelia Grant", role: "Contributing Beauty Writer" },
};

export const JOURNAL_CATEGORIES = [
  { slug: "lips", name: "Lips" },
  { slug: "eyes", name: "Eyes" },
  { slug: "complexion", name: "Complexion" },
  { slug: "brows", name: "Brows" },
  { slug: "ritual", name: "Ritual" },
  { slug: "shade", name: "Shade" },
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: "post_001",
    slug: "best-lip-gloss-shades-2026",
    title: "The best lip gloss shades for 2026, ranked by skin tone",
    subtitle: "From Bare to Crimson — what to wear in NYC, LA, Miami, and beyond.",
    excerpt:
      "From everyday Bare to date-night Crimson, we ranked Tintelle's lip gloss lineup by undertone so you can stop guessing and start glossing.",
    category: "lips",
    tags: [
      "best lip gloss",
      "lip gloss for fair skin",
      "lip gloss for medium skin",
      "lip gloss for deep skin",
      "nude lip gloss",
      "red lip gloss",
      "lip gloss New York",
      "lip gloss Los Angeles",
      "lip gloss Miami",
    ],
    productHandles: ["lip-gloss-bare", "lip-gloss-crimson", "lip-gloss-warm-rose", "lip-gloss-pinky"],
    heroAlt: "Tintelle lip gloss shade lineup on warm marble",
    author: "yuki-mori",
    publishedAt: "2026-04-22T09:00:00Z",
    readTime: 6,
    featured: true,
    body: [
      { type: "paragraph", text: "Searching for the best lip gloss in 2026? You're not alone. From New York to Los Angeles to Miami, women are quietly retiring matte liquid lipsticks in favor of glossier, skin-first finishes. The brief: hydration first, color second, no sticky aftertaste." },
      { type: "heading", level: 2, text: "How to pick a lip gloss shade by undertone" },
      { type: "paragraph", text: "The fastest shortcut: look at the veins on the inside of your wrist. Greenish veins read warm — reach for peach, terracotta, or warm rose. Bluish veins read cool — go for pinks, berries, and true reds. Both? You're neutral and almost everything works." },
      { type: "heading", level: 2, text: "Best nude lip gloss for everyday wear" },
      { type: "paragraph", text: "Bare is the gloss women in Chicago and Atlanta keep restocking — a sheer my-lips-but-better wash that layers over any lip liner without muddying it. It's the gloss to keep in your bag year-round." },
      { type: "heading", level: 2, text: "Best red lip gloss for date night" },
      { type: "paragraph", text: "Crimson is our most-asked-about shade in Texas and Florida — a true blue-red with enough shine to read polished, not theatrical. Pair with a clean cat-eye and you're done." },
      { type: "heading", level: 2, text: "Best pink lip gloss for spring and summer" },
      { type: "paragraph", text: "Warm Rose and Pinky lead the pack from Phoenix to Dallas when temperatures climb. Both are non-sticky enough to survive a humid Houston afternoon." },
      { type: "quote", text: "A great lip gloss disappears the moment it touches your mouth — and leaves color and comfort behind." },
    ],
  },
  {
    id: "post_002",
    slug: "how-to-apply-eyeshadow-palette-beginners",
    title: "How to apply an eyeshadow palette: a beginner's guide",
    subtitle: "The 4-step routine professional makeup artists use in NYC studios.",
    excerpt:
      "If you've ever opened an eyeshadow palette and felt lost, this is the no-fluff routine artists use backstage in New York and Los Angeles.",
    category: "eyes",
    tags: [
      "how to apply eyeshadow",
      "eyeshadow palette tutorial",
      "neutral eyeshadow",
      "smokey eye",
      "eyeshadow for beginners",
      "eyeshadow New York",
      "eyeshadow Los Angeles",
    ],
    productHandles: ["eyeshadow-palette-sweet-almond", "eyeshadow-palette-dark-storm", "eyeshadow-palette-shimmy"],
    heroAlt: "Tintelle eyeshadow palette open on linen",
    author: "amelia-grant",
    publishedAt: "2026-04-15T10:00:00Z",
    readTime: 7,
    featured: false,
    body: [
      { type: "paragraph", text: "Beginner question we get every week from women in Brooklyn, Austin, and San Diego: 'How do I actually use an eyeshadow palette without it looking patchy?' Here's the four-step routine our artists teach in workshops." },
      { type: "heading", level: 2, text: "Step 1 — Prime the lid" },
      { type: "paragraph", text: "A clean lid with a tiny dab of concealer or primer is the secret to color that lasts past your morning coffee. Skip this and even the best eyeshadow palette will crease by lunch." },
      { type: "heading", level: 2, text: "Step 2 — Build a transition shade" },
      { type: "paragraph", text: "Use a fluffy brush and the lightest matte in the palette — Sweet Almond is the most-loved neutral in our reviews from California to Georgia. Sweep it through the crease in windshield-wiper motions." },
      { type: "heading", level: 2, text: "Step 3 — Pack color on the lid" },
      { type: "paragraph", text: "Use a flat brush (or your finger — really) to press a mid-tone shimmer onto the center of the lid. Pressing, not sweeping, is what gives that 'wet' lid look you see on Instagram." },
      { type: "heading", level: 2, text: "Step 4 — Define the outer corner" },
      { type: "paragraph", text: "A small fluffy brush, a pinch of the deepest shade, and a windshield-wiper motion in the outer V. Stop. Don't go further than the outer third of the lid." },
      { type: "list", style: "unordered", items: [
        "Best neutral eyeshadow palette for beginners — Sweet Almond.",
        "Best smokey eye palette for evenings out — Dark Storm.",
        "Best shimmer palette for weddings and date nights — Shimmy.",
      ] },
    ],
  },
  {
    id: "post_003",
    slug: "best-concealer-dark-circles-undereye",
    title: "Best concealer for dark circles, by skin tone",
    subtitle: "Eight shades, one creamy stick — what works under your eyes.",
    excerpt:
      "Dark circles are the #1 search in US beauty every Monday morning. Here's how to match a concealer that brightens without creasing.",
    category: "complexion",
    tags: [
      "best concealer dark circles",
      "concealer for dark skin",
      "concealer for fair skin",
      "undereye concealer",
      "creme concealer stick",
      "concealer Houston",
      "concealer Atlanta",
    ],
    productHandles: ["creme-concealer-stick-butter", "creme-concealer-stick-honey", "creme-concealer-stick-pecan", "creme-concealer-stick-multiple-shades"],
    heroAlt: "Tintelle Creme Concealer Sticks lined up by shade",
    author: "naomi-tahir",
    publishedAt: "2026-04-08T08:00:00Z",
    readTime: 5,
    featured: false,
    body: [
      { type: "paragraph", text: "If you live in a city that runs on caffeine — looking at you, New York, Chicago, and Seattle — concealer is a non-negotiable. The right one brightens without that cakey, dry look that screams 'I tried.'" },
      { type: "heading", level: 2, text: "What to look for in a concealer for dark circles" },
      { type: "list", style: "unordered", items: [
        "A creamy, balm-like texture — not liquid that slips into fine lines.",
        "A shade one half-step lighter than your foundation for under-eye brightening.",
        "Hydrating ingredients (squalane, glycerin) so it doesn't settle.",
      ] },
      { type: "heading", level: 2, text: "Concealer shades for fair to light skin" },
      { type: "paragraph", text: "Butter and Almond are the two most-reordered shades from women in Boston, Portland, and Minneapolis. Both have a soft pink undertone that cancels gray-blue circles." },
      { type: "heading", level: 2, text: "Concealer shades for medium and tan skin" },
      { type: "paragraph", text: "Honey and Pecan dominate our orders from Miami, Houston, and Phoenix — golden undertones that warm up the under-eye instead of leaving an ashy cast." },
      { type: "heading", level: 2, text: "Concealer shades for deep skin" },
      { type: "paragraph", text: "Moka, Choco, and Chai give true-to-skin coverage without the chalky finish many drugstore concealers leave on deeper complexions. Atlanta, Detroit, and DC are our top reorder cities for these three." },
    ],
  },
  {
    id: "post_004",
    slug: "eyebrow-pencil-shade-guide",
    title: "How to pick the right eyebrow pencil shade",
    subtitle: "Ash brown, taupe, charcoal — the cheat sheet by hair color.",
    excerpt:
      "Wrong brow shade ages you ten years. Here's the simple matching system makeup artists in LA and Dallas swear by.",
    category: "brows",
    tags: [
      "eyebrow pencil",
      "best eyebrow pencil",
      "ash brown eyebrow pencil",
      "taupe eyebrow pencil",
      "brows for blondes",
      "brows for brunettes",
    ],
    productHandles: [
      "automatic-eyebrow-pencil-ash-brown",
      "automatic-eyebrow-pencil-taupe",
      "automatic-eyebrow-pencil-brown",
      "automatic-eyebrow-pencil-charcoal",
      "automatic-eyebrow-pencil-black",
    ],
    heroAlt: "Tintelle Automatic Eyebrow Pencil shade range",
    author: "yuki-mori",
    publishedAt: "2026-04-01T11:00:00Z",
    readTime: 4,
    featured: false,
    body: [
      { type: "paragraph", text: "The single biggest brow mistake we see — from Los Angeles to Nashville — is the wrong shade, applied with a heavy hand. Brows should look like brows, not like a frame drawn around your face." },
      { type: "heading", level: 2, text: "Match brow color to your roots, not your dyed length" },
      { type: "paragraph", text: "If you color your hair, look at your roots. That's your true brow shade. Going darker than your roots reads heavy in photos and harsh in daylight." },
      { type: "list", style: "unordered", items: [
        "Blonde to light brown hair — Taupe or Ash Brown.",
        "Medium to dark brown hair — Brown or Charcoal.",
        "Black hair — Charcoal for a softer look, Black for full definition.",
        "Red or auburn hair — Ash Brown with a warm tint.",
      ] },
      { type: "heading", level: 2, text: "Apply with hair-like strokes, not a single line" },
      { type: "paragraph", text: "Use the fine tip and short, upward flicks in the direction of hair growth. Brush through with a spoolie. Done." },
    ],
  },
  {
    id: "post_005",
    slug: "blush-placement-by-face-shape",
    title: "Blush placement by face shape: the artist's guide",
    subtitle: "Where to put blush if you have a round, oval, square, or heart-shaped face.",
    excerpt:
      "The same blush, placed two different ways, can make you look ten years younger or older. Here's the cheat sheet.",
    category: "complexion",
    tags: [
      "blush placement",
      "blush palette",
      "blush for round face",
      "blush for oval face",
      "kissable blush",
      "pinch blush",
    ],
    productHandles: ["blush-palette-kissable", "blush-palette-pinch"],
    heroAlt: "Tintelle Blush Palette in Kissable on warm marble",
    author: "naomi-tahir",
    publishedAt: "2026-03-25T09:30:00Z",
    readTime: 4,
    featured: false,
    body: [
      { type: "paragraph", text: "Blush is the most underrated step in any routine. It's also the one our community in San Francisco, Seattle, and Denver tells us they get wrong most often." },
      { type: "heading", level: 2, text: "Round face — blush goes higher" },
      { type: "paragraph", text: "Sweep from the apple up toward the temple to lengthen the face. Avoid the very center of the cheek." },
      { type: "heading", level: 2, text: "Oval face — blush sits on the apples" },
      { type: "paragraph", text: "You won the lottery. A pop of color directly on the apple of the cheek looks balanced and youthful." },
      { type: "heading", level: 2, text: "Square face — blush softens" },
      { type: "paragraph", text: "Apply in a circular motion on the apple, blending out toward the hairline to soften a strong jaw." },
      { type: "heading", level: 2, text: "Heart-shaped face — blush balances" },
      { type: "paragraph", text: "Keep blush low and centered on the apples to add weight to the lower half of the face." },
    ],
  },
  {
    id: "post_006",
    slug: "bb-cream-vs-foundation",
    title: "BB cream vs foundation: which is better in 2026?",
    subtitle: "The honest answer from a cosmetic chemist.",
    excerpt:
      "BB cream sales jumped 38% in the US last year. Here's why women in Miami, Phoenix, and Dallas are switching — and when foundation still wins.",
    category: "complexion",
    tags: [
      "BB cream vs foundation",
      "best BB cream",
      "lightweight foundation",
      "BB cream for oily skin",
      "BB cream Florida",
      "BB cream Texas",
    ],
    productHandles: ["bb-cream-buttercream"],
    heroAlt: "Tintelle BB Cream tube on cream-colored linen",
    author: "dr-ines-rivera",
    publishedAt: "2026-03-18T10:00:00Z",
    readTime: 6,
    featured: false,
    body: [
      { type: "paragraph", text: "Foundation built the modern beauty industry. BB cream is quietly remaking it. In humid markets — Miami, Houston, Tampa, Atlanta — search volume for 'lightweight BB cream' has doubled in two years." },
      { type: "heading", level: 2, text: "What a BB cream actually is" },
      { type: "paragraph", text: "BB stands for 'beauty balm' — a hybrid of moisturizer, light coverage, and skincare actives in one step. Think of it as a tinted moisturizer with treatment ingredients built in." },
      { type: "heading", level: 2, text: "When to choose BB cream over foundation" },
      { type: "list", style: "unordered", items: [
        "You want skin to look like skin — never mask-like.",
        "You live somewhere humid where heavy foundation breaks down.",
        "You have minimal redness or texture and don't need full coverage.",
        "You want skincare benefits while you wear color.",
      ] },
      { type: "heading", level: 2, text: "When foundation still wins" },
      { type: "paragraph", text: "Special occasions, photography, full-glam evenings, or significant skin concerns you want fully covered. Both can absolutely live in your routine." },
    ],
  },
  {
    id: "post_007",
    slug: "best-eye-cream-30s-40s",
    title: "The best eye cream for women in their 30s and 40s",
    subtitle: "What our chemist actually recommends — and what to skip.",
    excerpt:
      "Half of all eye cream marketing in the US is noise. Here's the short list of what works on fine lines, dark circles, and morning puff.",
    category: "complexion",
    tags: [
      "best eye cream",
      "eye cream for dark circles",
      "eye cream for wrinkles",
      "anti aging eye cream",
      "eye cream California",
      "eye cream New York",
    ],
    productHandles: ["active-eye-cream", "age-defying-serum"],
    heroAlt: "Tintelle Active Eye Cream on stone surface",
    author: "dr-ines-rivera",
    publishedAt: "2026-03-11T08:30:00Z",
    readTime: 5,
    featured: false,
    body: [
      { type: "paragraph", text: "If you're between 30 and 49 and live in a city like New York, San Francisco, or Los Angeles, the under-eye is usually the first place stress shows up. The right eye cream isn't magic — but the wrong one is a waste of money." },
      { type: "heading", level: 2, text: "Three ingredients that actually do something" },
      { type: "list", style: "unordered", items: [
        "Peptides — signal collagen production over time.",
        "Caffeine — reduces morning puffiness within minutes.",
        "Niacinamide — strengthens the barrier so concealer applies smoother.",
      ] },
      { type: "heading", level: 2, text: "What to skip" },
      { type: "paragraph", text: "Heavy fragrance (irritates the thinnest skin on your face), high-percentage retinol marketed for the eye area (start lower), and any 'instant lift' that's just silicone film." },
    ],
  },
  {
    id: "post_008",
    slug: "lip-liner-pairing-guide",
    title: "Lip liner pairing guide: the only chart you need",
    subtitle: "How to match Antique Rose, Apple, and the rest with your gloss.",
    excerpt:
      "A great lip liner makes your lip gloss last twice as long. Here's the pairing chart we send to every new community member.",
    category: "lips",
    tags: [
      "lip liner",
      "best lip liner",
      "lip liner with gloss",
      "nude lip liner",
      "red lip liner",
      "lip liner shade guide",
    ],
    productHandles: ["lip-liner-antique-rose", "lip-liner-apple"],
    heroAlt: "Tintelle Lip Liner shades on linen",
    author: "amelia-grant",
    publishedAt: "2026-03-04T12:00:00Z",
    readTime: 4,
    featured: false,
    body: [
      { type: "paragraph", text: "Lip liner is the most under-used product in the average American makeup bag. Used right, it doubles the wear of any gloss — and stops feathering on hot days in Phoenix or Las Vegas." },
      { type: "heading", level: 2, text: "How to pair lip liner with gloss" },
      { type: "list", style: "unordered", items: [
        "Antique Rose lip liner + Bare or Warm Rose gloss — the universal everyday combo.",
        "Apple lip liner + Crimson or Rouge gloss — bold, photo-ready red.",
        "Antique Rose + Pinky — fresh, romantic, perfect for spring.",
      ] },
      { type: "heading", level: 2, text: "The trick: line, then fill" },
      { type: "paragraph", text: "Line the lip, then fill the entire lip with the liner before adding gloss. This is what makes color last through dinner and drinks." },
    ],
  },
  {
    id: "post_009",
    slug: "bronzer-for-pale-skin",
    title: "Bronzer for pale skin: how to get warmth without orange",
    subtitle: "The two-finger rule for natural-looking definition.",
    excerpt:
      "If every bronzer you've tried makes you look muddy or orange, the issue isn't your skin — it's the formula and where you put it.",
    category: "complexion",
    tags: [
      "bronzer for pale skin",
      "best bronzer",
      "natural bronzer",
      "tawny bronzer",
      "bronzer placement",
    ],
    productHandles: ["bronzer-tawny", "bronzer"],
    heroAlt: "Tintelle Bronzer compact on warm marble",
    author: "yuki-mori",
    publishedAt: "2026-02-25T09:00:00Z",
    readTime: 4,
    featured: false,
    body: [
      { type: "paragraph", text: "Bronzer is the most common 'I gave up on this product' admission we hear from women in Boston, Minneapolis, and Portland. The fix is almost always shade selection plus placement." },
      { type: "heading", level: 2, text: "Pick a bronzer that's two shades deeper than you" },
      { type: "paragraph", text: "Too dark and you look muddy. Too red-toned and you look sunburned. Tawny is our most-purchased bronzer in cooler-climate cities for exactly this reason — it warms without going orange." },
      { type: "heading", level: 2, text: "The two-finger rule" },
      { type: "paragraph", text: "Place two fingers along your hairline. Apply bronzer above your fingers — never lower. Then a soft sweep down the bridge of the nose and along the jaw, blending hard." },
    ],
  },
  {
    id: "post_010",
    slug: "humidity-proof-makeup-routine",
    title: "A humidity-proof makeup routine for Miami, Houston, and Tampa",
    subtitle: "The ten-minute summer face that survives a Florida afternoon.",
    excerpt:
      "If your makeup slides off by 11 a.m. between June and September, you don't need more product. You need a different routine.",
    category: "ritual",
    tags: [
      "humidity proof makeup",
      "summer makeup",
      "long lasting makeup",
      "makeup for humid weather",
      "Miami makeup routine",
      "Houston makeup",
      "Florida makeup",
      "Texas makeup",
    ],
    productHandles: ["bb-cream-buttercream", "blush-palette-pinch", "lip-gloss-warm-rose"],
    heroAlt: "Tintelle BB Cream and blush palette on cream linen",
    author: "naomi-tahir",
    publishedAt: "2026-02-18T08:00:00Z",
    readTime: 5,
    featured: false,
    body: [
      { type: "paragraph", text: "Summer in Miami, Houston, Tampa, or New Orleans is its own beauty test. The principle: less product, smarter layers, and skin that can breathe." },
      { type: "heading", level: 2, text: "1. Skip heavy primer" },
      { type: "paragraph", text: "Silicone primers trap heat. A clean, hydrated face is a better base in humidity than a primed one." },
      { type: "heading", level: 2, text: "2. BB cream over foundation" },
      { type: "paragraph", text: "Buttercream BB Cream is sheer enough to let skin do its job and pigmented enough to even tone." },
      { type: "heading", level: 2, text: "3. Press, don't sweep, your blush" },
      { type: "paragraph", text: "A pea-sized dot pressed into the apple of the cheek with a clean finger lasts hours longer than blush swept on with a brush." },
      { type: "heading", level: 2, text: "4. Lip gloss, not lip stain, in the heat" },
      { type: "paragraph", text: "Counterintuitive — but a comfortable, hydrating gloss won't dry-feather the way a stain does in 90% humidity." },
    ],
  },
  {
    id: "post_011",
    slug: "winter-makeup-routine-cold-cities",
    title: "Winter makeup that survives Chicago, Denver, and Boston",
    subtitle: "Cold-weather skin needs a different approach. Here's the routine.",
    excerpt:
      "Sub-freezing wind, dry indoor heat, and short daylight — your makeup needs to fight on three fronts. This is the routine our editor uses December through March.",
    category: "ritual",
    tags: [
      "winter makeup",
      "dry skin makeup",
      "makeup for cold weather",
      "Chicago makeup",
      "Denver makeup",
      "Boston makeup",
    ],
    productHandles: ["age-defying-serum", "creme-concealer-stick-butter", "lip-gloss-bare"],
    heroAlt: "Tintelle Age-Defying Serum bottle on light surface",
    author: "amelia-grant",
    publishedAt: "2026-02-11T11:00:00Z",
    readTime: 5,
    featured: false,
    body: [
      { type: "paragraph", text: "Winter in Chicago, Denver, Minneapolis, and Boston is rough on the face. The trick is layering hydration before any color goes on." },
      { type: "heading", level: 2, text: "Start with serum, not primer" },
      { type: "paragraph", text: "A few drops of Age-Defying Serum, pressed in, gives makeup something to hold onto without flaking off cheeks by noon." },
      { type: "heading", level: 2, text: "Concealer, not foundation" },
      { type: "paragraph", text: "Spot-conceal redness around the nose and chin with the Creme Concealer Stick — full coverage where you need it, bare skin everywhere else. Lighter and more comfortable than a full base." },
      { type: "heading", level: 2, text: "Keep gloss in your pocket, not your bag" },
      { type: "paragraph", text: "Lip Gloss in Bare reapplies cleanly throughout the day — the squalane base actually hydrates rather than just shining." },
    ],
  },
  {
    id: "post_012",
    slug: "makeup-bag-essentials-american-women",
    title: "10 makeup bag essentials for American women in 2026",
    subtitle: "What our top customers in NYC, LA, Chicago, Miami, and Atlanta won't leave home without.",
    excerpt:
      "We pulled the data from thousands of US orders to find the ten products women across the country reorder most. This is the modern American makeup bag.",
    category: "ritual",
    tags: [
      "makeup essentials",
      "makeup bag must haves",
      "everyday makeup",
      "minimal makeup routine",
      "American makeup",
      "best makeup 2026",
    ],
    productHandles: [
      "lip-gloss-bare",
      "creme-concealer-stick-butter",
      "blush-palette-kissable",
      "automatic-eyebrow-pencil-taupe",
      "bb-cream-buttercream",
      "active-eye-cream",
      "bronzer-tawny",
      "lip-liner-antique-rose",
      "eyeshadow-palette-sweet-almond",
      "angled-liner-brush",
    ],
    heroAlt: "Tintelle essentials laid out on cream linen",
    author: "naomi-tahir",
    publishedAt: "2026-02-04T09:00:00Z",
    readTime: 8,
    featured: false,
    body: [
      { type: "paragraph", text: "We looked at reorder data from across the United States — New York, Los Angeles, Chicago, Miami, Atlanta, Houston, Dallas, Phoenix, San Diego, Seattle — to figure out what women actually keep buying. Here are the ten essentials." },
      { type: "list", style: "ordered", items: [
        "Lip Gloss in Bare — the universal nude that disappears into your bag.",
        "Creme Concealer Stick — spot coverage that doesn't crease.",
        "Blush Palette in Kissable — soft pink that flatters every undertone.",
        "Automatic Eyebrow Pencil in Taupe — the most-ordered brow shade nationally.",
        "BB Cream in Buttercream — skin-first base for everyday wear.",
        "Active Eye Cream — the morning-puff fix.",
        "Bronzer in Tawny — natural warmth without orange.",
        "Lip Liner in Antique Rose — pairs with every gloss in the lineup.",
        "Eyeshadow Palette in Sweet Almond — neutrals you'll wear forever.",
        "Angled Liner Brush — the one tool that levels up every other product.",
      ] },
      { type: "quote", text: "The best makeup bag isn't the biggest one — it's the one where every product earns its spot." },
    ],
  },
];

export function getJournalPost(slug: string) {
  return JOURNAL_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  return JOURNAL_POSTS.filter((p) => p.slug !== slug).slice(0, limit);
}
