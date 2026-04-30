import { LegalLayout } from "@/components/tintelle/LegalLayout";

const sections = [
  { id: "agreement", title: "1. Agreement", content: <p>By using tintellebeauty.com you agree to these terms. If you don't, please don't use the site.</p> },
  { id: "account", title: "2. Account", content: <p>You're responsible for the accuracy of information on your account and for keeping your password safe.</p> },
  { id: "orders", title: "3. Orders & payment", content: <p>All orders are subject to acceptance. Prices are in USD unless noted. Payment is processed by Shopify.</p> },
  { id: "shipping", title: "4. Shipping", content: <p>See our Shipping & Returns page for delivery times, rates, and address requirements.</p> },
  { id: "returns", title: "5. Returns", content: <p>Returns are accepted within 30 days under our Shade Match Guarantee. See the Shipping & Returns page for details.</p> },
  { id: "subscriptions", title: "6. Subscriptions", content: <p>Subscriptions auto-renew at the cadence you select. Cancel, skip, or pause anytime in your account.</p> },
  { id: "ip", title: "7. Intellectual property", content: <p>All site content, including imagery, copy, and logos, is owned by Tintelle and protected by U.S. and international IP law.</p> },
  { id: "ugc", title: "8. User-generated content", content: <p>By tagging us, you grant Tintelle a non-exclusive license to feature your content on our channels with credit.</p> },
  { id: "warranty", title: "9. Disclaimer of warranties", content: <p>Tintelle products are cosmetic, not medical. They're not intended to diagnose, treat, cure, or prevent any disease.</p> },
  { id: "liability", title: "10. Limitation of liability", content: <p>Tintelle's liability for any claim is limited to the amount you paid for the product giving rise to the claim.</p> },
  { id: "indemnity", title: "11. Indemnity", content: <p>You agree to indemnify Tintelle for losses arising from your misuse of the site or violation of these terms.</p> },
  { id: "law", title: "12. Governing law", content: <p>These terms are governed by the laws of the State of California, without regard to conflict-of-law principles.</p> },
  { id: "changes", title: "13. Changes", content: <p>We may update these terms from time to time. The effective date above reflects the latest revision.</p> },
  { id: "contact", title: "14. Contact", content: <p>Questions: <a className="text-primary" href="mailto:hi@tintellebeauty.com">hi@tintellebeauty.com</a>.</p> },
];

const Terms = () => (
  <LegalLayout
    pageTitle="Terms of Service"
    metaDescription="The terms governing your use of tintellebeauty.com and Tintelle products."
    intro="The boring-but-necessary rules for shopping with us. We've kept them as plain as possible."
    effectiveDate="April 1, 2026"
    sections={sections}
  />
);

export default Terms;
