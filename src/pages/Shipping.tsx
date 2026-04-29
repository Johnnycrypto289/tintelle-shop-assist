import { PageShell } from "@/components/tintelle/PageShell";

const RATES = [
  { method: "Standard (USPS Priority)", time: "3–5 business days", cost: "$6.50 · Free over $50" },
  { method: "Expedited (USPS Express)", time: "1–2 business days", cost: "$14.50" },
  { method: "Canada", time: "5–8 business days", cost: "$12.00" },
  { method: "United Kingdom", time: "7–10 business days", cost: "$18.00" },
];

const Shipping = () => (
  <PageShell title="Shipping & Returns" description="Tintelle shipping rates, delivery times, and our 30-day shade match guarantee.">
    <section className="container pt-14 pb-12">
      <p className="text-xs tracking-[0.3em] uppercase text-taupe">Shipping & returns</p>
      <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">
        Quick to arrive. Easy to send back.
      </h1>
      <p className="text-base md:text-lg text-taupe max-w-xl leading-relaxed mt-4">
        Free U.S. shipping over $50, carbon-neutral delivery on every order, and a 30-day shade match guarantee.
      </p>
    </section>

    <section className="container pb-12">
      <h2 className="font-serif text-2xl md:text-3xl text-mauve mb-5">Rates & delivery</h2>
      <div className="bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-cream">
            <tr className="text-left text-[11px] tracking-[0.2em] uppercase text-taupe">
              <th className="px-5 py-4 font-normal">Method</th>
              <th className="px-5 py-4 font-normal">Time</th>
              <th className="px-5 py-4 font-normal">Cost</th>
            </tr>
          </thead>
          <tbody>
            {RATES.map((r, i) => (
              <tr key={r.method} className={i ? "border-t border-border" : ""}>
                <td className="px-5 py-4 text-mauve font-serif">{r.method}</td>
                <td className="px-5 py-4 text-taupe">{r.time}</td>
                <td className="px-5 py-4 text-taupe">{r.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="container pb-12 grid md:grid-cols-2 gap-8">
      <div className="bg-card border border-border p-7">
        <h3 className="font-serif text-xl text-mauve">30-day Shade Match</h3>
        <p className="text-taupe leading-relaxed mt-3">
          If your shade isn't right, we'll replace it or refund — no questions, no fees. Email{" "}
          <a className="text-mauve underline-offset-4 hover:underline" href="mailto:hi@tintelle.com">hi@tintelle.com</a>{" "}
          with your order ID and we'll send a prepaid label within the hour.
        </p>
      </div>
      <div className="bg-card border border-border p-7">
        <h3 className="font-serif text-xl text-mauve">Returns process</h3>
        <ol className="list-decimal pl-5 mt-3 space-y-2 text-taupe leading-relaxed">
          <li>Email us within 30 days of delivery.</li>
          <li>We send a prepaid USPS return label.</li>
          <li>Drop the package at any post office or USPS box.</li>
          <li>Refund processed within 5 business days of receipt.</li>
        </ol>
      </div>
    </section>
  </PageShell>
);

export default Shipping;
