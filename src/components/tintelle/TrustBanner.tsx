import { Leaf, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Dermatologist Tested", body: "Formulated and reviewed by board-certified dermatologists." },
  { icon: Leaf, label: "Clean & Vegan", body: "Plant-based, cruelty-free, never silicones or parabens." },
  { icon: Sparkles, label: "30-Day Shade Match", body: "Find your shade — or send it back, no questions asked." },
];

export const TrustBanner = () => (
  <section className="bg-cream py-14 md:py-20">
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
      {items.map(({ icon: Icon, label, body }) => (
        <div key={label} className="space-y-3">
          <Icon className="h-8 w-8 mx-auto text-accent" strokeWidth={1.5} />
          <h3 className="font-serif text-xl text-mauve">{label}</h3>
          <p className="text-sm text-taupe max-w-xs mx-auto leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  </section>
);
