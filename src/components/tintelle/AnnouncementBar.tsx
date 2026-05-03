import { SocialLinks } from "./SocialLinks";

export const AnnouncementBar = () => (
  <div className="bg-primary text-primary-foreground py-2.5">
    <div className="container flex items-center justify-center gap-4 md:justify-between">
      <p className="text-xs tracking-[0.2em] uppercase text-center md:text-left">
        Free shipping on US orders over $99 · Clean · Vegan · Cruelty-Free
      </p>
      <div className="hidden md:block">
        <SocialLinks iconClassName="h-4 w-4 text-primary-foreground hover:text-primary-foreground/80" />
      </div>
    </div>
  </div>
);
