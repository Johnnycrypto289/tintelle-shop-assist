import { ReactNode, useEffect, useState } from "react";
import { PageShell } from "@/components/tintelle/PageShell";

interface LegalSection {
  id: string;
  title: string;
  content: ReactNode;
}

interface LegalLayoutProps {
  pageTitle: string;
  intro: string;
  effectiveDate: string;
  sections: LegalSection[];
  metaDescription: string;
}

export const LegalLayout = ({ pageTitle, intro, effectiveDate, sections, metaDescription }: LegalLayoutProps) => {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <PageShell title={pageTitle} description={metaDescription}>
      <section className="container pt-14 pb-10">
        <p className="text-xs tracking-[0.3em] uppercase text-taupe">Legal</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-3 leading-[1.05]">{pageTitle}</h1>
        <p className="text-base md:text-lg text-taupe max-w-2xl leading-relaxed mt-4">{intro}</p>
        <p className="text-xs tracking-[0.18em] uppercase text-taupe mt-4">Effective {effectiveDate}</p>
      </section>

      <section className="container pb-24 grid md:grid-cols-[220px_1fr] gap-10 md:gap-14">
        <aside className="md:sticky md:top-28 md:self-start">
          <p className="text-[11px] tracking-[0.2em] uppercase text-taupe mb-3">Contents</p>
          <ul className="space-y-2 text-sm">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`block transition-colors ${
                    activeId === s.id ? "text-mauve" : "text-taupe hover:text-mauve"
                  }`}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>
        <article className="space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-serif text-2xl md:text-3xl text-mauve mb-4">{s.title}</h2>
              <div className="text-foreground leading-[1.8] space-y-3">{s.content}</div>
            </section>
          ))}
        </article>
      </section>
    </PageShell>
  );
};
