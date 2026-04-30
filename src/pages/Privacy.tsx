import { LegalLayout } from "@/components/tintelle/LegalLayout";

const sections = [
  { id: "scope", title: "1. Scope", content: <p>This policy explains how Tintelle collects, uses, and protects information when you visit tintellebeauty.com or buy our products.</p> },
  { id: "data", title: "2. Data we collect", content: <p>Account info (name, email, address), order history, and basic device/usage analytics. We do not collect biometric data or precise geolocation.</p> },
  { id: "use", title: "3. How we use it", content: <p>To process orders, send shipping updates, respond to support, and improve product and site experience.</p> },
  { id: "share", title: "4. When we share data", content: <p>Only with payment, shipping, email, and analytics providers strictly necessary to run the service. We never sell personal data.</p> },
  { id: "cookies", title: "5. Cookies", content: <p>We use essential cookies for cart and login, plus optional analytics. You can disable non-essential cookies from the banner.</p> },
  { id: "rights", title: "6. Your rights", content: <p>You may request access, correction, export, or deletion of your data anytime by emailing privacy@tintellebeauty.com.</p> },
  { id: "retention", title: "7. Retention", content: <p>Order records are kept for 7 years for tax and warranty. Marketing data is removed within 30 days of unsubscribe.</p> },
  { id: "security", title: "8. Security", content: <p>All traffic is encrypted in transit. Payment details are tokenized by Shopify and never stored on our servers.</p> },
  { id: "minors", title: "9. Minors", content: <p>Tintelle is not intended for children under 13. We do not knowingly collect data from minors.</p> },
  { id: "contact", title: "10. Contact", content: <p>Questions about this policy: <a className="text-primary" href="mailto:privacy@tintellebeauty.com">privacy@tintellebeauty.com</a>.</p> },
];

const Privacy = () => (
  <LegalLayout
    pageTitle="Privacy Policy"
    metaDescription="How Tintelle collects, uses, and protects your personal information."
    intro="We collect only what we need to send you product, support you well, and improve the brand. Here's the specific version."
    effectiveDate="April 1, 2026"
    sections={sections}
  />
);

export default Privacy;
