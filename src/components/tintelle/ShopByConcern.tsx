const concerns = [
  { label: "Even Skin Tone", color: "bg-petal" },
  { label: "Hydrate Lips", color: "bg-coral" },
  { label: "Add a Flush", color: "bg-primary" },
  { label: "Brighten Eyes", color: "bg-sage" },
];

export const ShopByConcern = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-taupe">Shop by concern</p>
          <h2 className="font-serif text-3xl md:text-4xl text-mauve mt-3">Find Your Tint</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {concerns.map((c) => (
            <a
              key={c.label}
              href="#bestsellers"
              className="group flex flex-col items-center gap-4 text-center"
            >
              <div
                className={`${c.color} aspect-square w-32 md:w-40 rounded-full transition-transform duration-500 group-hover:scale-105`}
                aria-hidden
              />
              <span className="font-serif text-mauve text-lg">{c.label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
