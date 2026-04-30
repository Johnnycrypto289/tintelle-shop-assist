import { Leaf, ShieldCheck, Sparkles } from "lucide-react";

const items = [
  { icon: ShieldCheck, label: "Dermatologist Tested", body: "Formulated and reviewed by board-certified dermatologists." },
  { icon: Leaf, label: "Clean & Vegan", body: "Plant-based, cruelty-free, never silicones or parabens." },
  { icon: Sparkles, label: "30-Day Shade Match", body: "Find your shade — or send it back, no questions asked." },
];

export const TrustBanner = () => (
  <section className="bg-cream py-10 md:py-20">
    <div className="container grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12 text-center">
      {items.map(({ icon: Icon, label, body }) => (
        <div key={label} className="space-y-2.5 md:space-y-3">
          <Icon className="h-7 w-7 md:h-8 md:w-8 mx-auto text-accent" strokeWidth={1.5} />
          <h3 className="font-serif text-lg md:text-xl text-mauve">{label}</h3>
          <p className="text-sm text-taupe max-w-xs mx-auto leading-relaxed">{body}</p>
        </div>
      ))}
    </div>
  </section>
);
