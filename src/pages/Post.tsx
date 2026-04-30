import { Link, useParams } from "react-router-dom";
import { PageShell } from "@/components/tintelle/PageShell";
import { Breadcrumbs } from "@/components/tintelle/Breadcrumbs";
import { JournalHeroImage } from "@/components/tintelle/JournalHeroImage";
import {
  JOURNAL_AUTHORS,
  JournalBlock,
  getJournalPost,
  getRelatedPosts,
} from "@/data/journal";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

const renderBlock = (block: JournalBlock, i: number) => {
  switch (block.type) {
    case "heading":
      return (
        <h2 key={i} className="font-serif text-2xl md:text-3xl text-mauve mt-10 mb-4 leading-tight">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p key={i} className="text-base md:text-lg text-foreground leading-[1.8] mb-5">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="font-serif text-2xl md:text-3xl text-primary italic leading-snug border-l-2 border-primary pl-6 my-10"
        >
          “{block.text}”
        </blockquote>
      );
    case "list":
      return (
        <ul key={i} className="list-disc pl-6 space-y-2 my-6 text-foreground leading-relaxed">
          {block.items.map((item, j) => (
            <li key={j}>{item}</li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure key={i} className="my-10">
          <img src={block.src} alt={block.alt} className="w-full" />
          {block.caption && <figcaption className="text-xs tracking-[0.18em] uppercase text-taupe mt-3 text-center">{block.caption}</figcaption>}
        </figure>
      );
  }
};

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getJournalPost(slug) : undefined;
  const related = slug ? getRelatedPosts(slug, 3) : [];

  if (!post) {
    return (
      <PageShell title="Post not found">
        <div className="container py-32 text-center">
          <h1 className="font-serif text-3xl text-mauve">Post not found.</h1>
          <Link to="/journal" className="text-primary mt-4 inline-block">Back to the Journal →</Link>
        </div>
      </PageShell>
    );
  }

  const author = JOURNAL_AUTHORS[post.author];

  return (
    <PageShell title={post.title} description={post.excerpt.slice(0, 155)}>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/journal" }, { label: post.category }]} />

      <article className="max-w-3xl mx-auto px-6 pb-16">
        <p className="text-[11px] tracking-[0.3em] uppercase text-primary">{post.category}</p>
        <h1 className="font-serif text-4xl md:text-6xl text-mauve mt-4 leading-[1.05]">{post.title}</h1>
        <p className="text-lg md:text-xl text-taupe mt-4 leading-relaxed">{post.subtitle}</p>
        <p className="text-xs tracking-[0.18em] uppercase text-taupe mt-6">
          {author?.name} · {author?.role} · {formatDate(post.publishedAt)} · {post.readTime} min
        </p>
      </article>

      <div className="max-w-4xl mx-auto px-6 mb-14">
        <div className="aspect-[16/9] bg-cream overflow-hidden">
          <JournalHeroImage
            handle={post.productHandles[0]}
            alt={post.heroAlt}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 pb-20">
        {post.body.map(renderBlock)}
      </article>

      {related.length > 0 && (
        <section className="bg-cream py-16 md:py-20">
          <div className="container">
            <p className="text-xs tracking-[0.3em] uppercase text-taupe">Keep reading</p>
            <h2 className="font-serif text-3xl md:text-4xl text-mauve mt-3 mb-8">More from the Journal</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {related.map((p) => (
                <Link key={p.id} to={`/journal/${p.slug}`} className="group block bg-card border border-border">
                  <div className="aspect-[4/3] bg-cream overflow-hidden">
                    <JournalHeroImage
                      handle={p.productHandles[0]}
                      alt={p.heroAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-taupe">{p.category}</p>
                    <h3 className="font-serif text-lg text-mauve mt-2 leading-snug">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
};

export default Post;
