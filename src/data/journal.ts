// Tintelle Journal — local feed (Shopify Articles can replace this later by swapping
// the fetch in src/hooks/useJournal.ts). Shape mirrors a CMS payload.
import heroImg from "@/assets/tintelle-hero.jpg";
import lipImg from "@/assets/product-lip-tint.jpg";
import skinImg from "@/assets/product-skin-tint.jpg";
import cheekImg from "@/assets/product-cheek-tint.jpg";
import eyeImg from "@/assets/product-eye-serum.jpg";
import routineImg from "@/assets/tintelle-routine.jpg";

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
  hero: { src: string; alt: string; credit?: string };
  author: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
  relatedHandles: string[];
  body: JournalBlock[];
}

export const JOURNAL_AUTHORS: Record<string, { name: string; role: string }> = {
  "naomi-tahir": { name: "Naomi Tahir", role: "Founder & Editor" },
  "dr-ines-rivera": { name: "Dr. Inés Rivera", role: "Lead Cosmetic Chemist" },
  "yuki-mori": { name: "Yuki Mori", role: "Senior Beauty Editor" },
};

export const JOURNAL_CATEGORIES = [
  { slug: "ritual", name: "Ritual" },
  { slug: "ingredients", name: "Ingredients" },
  { slug: "shade", name: "Shade" },
  { slug: "skin-health", name: "Skin Health" },
  { slug: "behind", name: "Behind" },
];

export const JOURNAL_POSTS: JournalPost[] = [
  {
    id: "post_001",
    slug: "the-90-second-face",
    title: "The 90-second face: Tintelle's morning shortcut",
    subtitle: "Three products, one wash of color, and skin that still looks like skin.",
    excerpt:
      "The most useful makeup ritual I know takes ninety seconds. It happens between coffee and the front door, on a morning that started with one too many snoozes.",
    category: "ritual",
    tags: ["routine", "skin-tint", "cheek-tint", "lip-tint", "everyday"],
    hero: { src: heroImg, alt: "Peach silk on a warm marble surface", credit: "Tintelle Studio" },
    author: "naomi-tahir",
    publishedAt: "2026-04-18T09:00:00Z",
    readTime: 4,
    featured: true,
    relatedHandles: ["skin-tint", "cheek-tint", "lip-tint", "the-tintelle-routine"],
    body: [
      { type: "paragraph", text: "The most useful makeup ritual I know takes ninety seconds. It happens between coffee and the front door, on a morning that started with one too many snoozes. Three products, eight blinks, done." },
      { type: "paragraph", text: "This is what I do." },
      { type: "heading", level: 2, text: "1. Skin Tint, in five places." },
      { type: "paragraph", text: "One pump, dotted on the forehead, two cheeks, nose, and chin. Press in with clean fingers — never wipe — and let the warmth of your skin do the work. The mineral SPF blends easier when it's a little warm." },
      { type: "heading", level: 2, text: "2. Cheek Tint, before powder." },
      { type: "paragraph", text: "A pea-sized dot at the apple, blended up toward the temple. The squalane keeps it dewy, so you don't need a setting step." },
      { type: "heading", level: 2, text: "3. Lip Tint, on the way out." },
      { type: "paragraph", text: "Apply in the elevator. The peptides keep working for hours; you'll feel the plump before you feel the color settle." },
      { type: "quote", text: "That's the routine. It's not less makeup — it's less effort. The skin is doing the work." },
    ],
  },
  {
    id: "post_002",
    slug: "why-peptides-belong-in-your-lip-balm",
    title: "Why peptides belong in your lip balm (and not just serums)",
    subtitle: "The science behind a softer pout.",
    excerpt:
      "Peptides have been the headline of every face serum for a decade. Here's why they finally made it into Tintelle's lip tint — and what they actually do.",
    category: "ingredients",
    tags: ["peptides", "lip-tint", "science"],
    hero: { src: lipImg, alt: "Peptide Lip Tint product shot", credit: "Tintelle Studio" },
    author: "dr-ines-rivera",
    publishedAt: "2026-03-28T14:30:00Z",
    readTime: 6,
    featured: false,
    relatedHandles: ["lip-tint", "skin-tint"],
    body: [
      { type: "paragraph", text: "Peptides have been the headline of every face serum for a decade. They're the reason your night cream costs more than your moisturizer. So why are most lip products still relying on petrolatum and a prayer?" },
      { type: "heading", level: 2, text: "Lips age faster than the rest of the face." },
      { type: "paragraph", text: "The skin on the vermilion border is three to five cell layers thinner than your cheek. It has fewer melanocytes, almost no sebaceous glands, and it bends and stretches all day." },
      { type: "paragraph", text: "Translation: lips need more help, sooner. By 35, most people have visible volume loss and barrier disruption — the chronic chap that no balm seems to fix." },
      { type: "heading", level: 2, text: "What palmitoyl tripeptide-1 actually does." },
      { type: "paragraph", text: "It's a signaling peptide — a tiny chain of three amino acids attached to a fatty acid for skin penetration. When it reaches the dermis, it tells fibroblasts to produce more collagen and elastin." },
      { type: "list", style: "unordered", items: [
        "Reduces transepidermal water loss — lips stay hydrated through coffee and conversation.",
        "Strengthens the barrier so color glides instead of feathering.",
        "Works under and through pigment — the tint is the delivery system, not a competitor.",
      ] },
      { type: "quote", text: "A lip tint with peptides isn't a stunt. It's the most efficient way to feed your lips while you wear color." },
    ],
  },
  {
    id: "post_003",
    slug: "finding-your-skin-tint",
    title: "Finding your skin tint, without trying every shade",
    subtitle: "A field guide to the hidden math of undertone.",
    excerpt:
      "Twelve shades sounds like a lot. It is and it isn't. The trick is reading two things on your own face: depth, and undertone. Here's how.",
    category: "shade",
    tags: ["shade-finder", "undertone", "skin-tint"],
    hero: { src: skinImg, alt: "Skin Tint shade lineup", credit: "Tintelle Studio" },
    author: "yuki-mori",
    publishedAt: "2026-03-12T11:00:00Z",
    readTime: 5,
    featured: false,
    relatedHandles: ["skin-tint", "eye-serum"],
    body: [
      { type: "paragraph", text: "Twelve shades sounds like a lot. It is and it isn't. The trick is reading two things on your own face: depth, and undertone." },
      { type: "heading", level: 2, text: "Depth: how light or deep your skin reads." },
      { type: "paragraph", text: "Stand in window light, no makeup, and look at the inside of your forearm. That's your truest depth — the rest of your face wears sun, sleep, and weather. Match the tint there." },
      { type: "heading", level: 2, text: "Undertone: warm, cool, or neutral." },
      { type: "paragraph", text: "Look at the veins on the underside of your wrist. Greenish? Warm. Bluish? Cool. Both? Neutral. This decides whether you reach for a peach- or rose-leaning shade." },
    ],
  },
  {
    id: "post_004",
    slug: "the-cheek-flush-rule",
    title: "The one-cheek rule for a believable flush",
    subtitle: "Why pressing color in beats sweeping it on.",
    excerpt: "If your blush ever looks like blush, you're using too much. The fix is a wash of color, applied before you set anything.",
    category: "ritual",
    tags: ["cheek-tint", "technique"],
    hero: { src: cheekImg, alt: "Glow Cheek Tint", credit: "Tintelle Studio" },
    author: "naomi-tahir",
    publishedAt: "2026-02-22T08:00:00Z",
    readTime: 3,
    featured: false,
    relatedHandles: ["cheek-tint", "skin-tint"],
    body: [
      { type: "paragraph", text: "If your blush ever looks like blush, you're using too much. A real flush — the kind that comes after a brisk walk — is uneven, slightly warm, and lives between the cheek and the eye." },
      { type: "heading", level: 2, text: "Press, don't sweep." },
      { type: "paragraph", text: "Dot one pea-sized drop on the apple of one cheek. Press in with the pad of a clean ring finger — no rubbing. Repeat on the other side. The skin warms the formula and pulls it into the surface." },
      { type: "quote", text: "Color that looks like skin still has to live on skin. Don't paint over your face — paint with it." },
    ],
  },
  {
    id: "post_005",
    slug: "what-clean-actually-means",
    title: "What 'clean' actually means at Tintelle",
    subtitle: "A short, honest list of what's in — and what isn't.",
    excerpt: "Clean beauty is mostly marketing. Here's the boring, specific version: a list of every category we won't formulate with, and why.",
    category: "skin-health",
    tags: ["clean-beauty", "ingredients"],
    hero: { src: eyeImg, alt: "Tinted Eye Serum bottle", credit: "Tintelle Studio" },
    author: "dr-ines-rivera",
    publishedAt: "2026-02-04T10:00:00Z",
    readTime: 5,
    featured: false,
    relatedHandles: ["eye-serum", "skin-tint"],
    body: [
      { type: "paragraph", text: "Clean is the most overused word in beauty. We use it because there isn't a better one — but we want to be specific about what it means here." },
      { type: "heading", level: 2, text: "What we don't formulate with." },
      { type: "list", style: "unordered", items: [
        "Parabens (methyl-, propyl-, butyl-, ethylparaben).",
        "Phthalates and DBP.",
        "Synthetic fragrance and added 'parfum'.",
        "Animal-derived ingredients of any kind.",
        "Talc, BHT, BHA, formaldehyde-releasers, oxybenzone.",
      ] },
      { type: "paragraph", text: "Everything else is a judgement call we make in the lab — peer-reviewed, formula by formula." },
    ],
  },
  {
    id: "post_006",
    slug: "behind-the-routine-bundle",
    title: "Behind the routine: how the trio came together",
    subtitle: "Two years, eleven prototypes, one bundle.",
    excerpt: "The Routine started as a question: what's the smallest number of products you actually need to look like yourself? Here's how we got to three.",
    category: "behind",
    tags: ["bundle", "behind-the-scenes"],
    hero: { src: routineImg, alt: "The Tintelle Routine trio", credit: "Tintelle Studio" },
    author: "naomi-tahir",
    publishedAt: "2026-01-15T12:00:00Z",
    readTime: 6,
    featured: false,
    relatedHandles: ["the-tintelle-routine", "skin-tint", "lip-tint", "cheek-tint"],
    body: [
      { type: "paragraph", text: "We knew the brand would launch with three products. We didn't know which three — or how they'd talk to each other on the skin." },
      { type: "heading", level: 2, text: "The shortlist." },
      { type: "paragraph", text: "Skin Tint was non-negotiable. The other two were chosen for what they fix on a tired morning: a flush of color and a soft mouth. That meant Cheek and Lip." },
      { type: "heading", level: 2, text: "What the trio shares." },
      { type: "paragraph", text: "Squalane, peptides, and a warm rosé pigment family. They're built to layer — and built so the same one-pump motion works for all three." },
    ],
  },
];

export function getJournalPost(slug: string) {
  return JOURNAL_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3) {
  return JOURNAL_POSTS.filter((p) => p.slug !== slug).slice(0, limit);
}
