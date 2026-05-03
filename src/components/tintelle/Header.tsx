import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, Search, User, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { AnnouncementBar } from "./AnnouncementBar";
import { SocialLinks } from "./SocialLinks";
import { useCustomer } from "@/hooks/useCustomer";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import tintelleLogo from "@/assets/tintelle-logo.webp";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
];

export const Header = () => {
  const { isSignedIn } = useCustomer();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const linkCls = "text-mauve hover:text-primary transition-colors text-sm font-medium";
  const iconCls =
    "h-11 w-11 inline-flex items-center justify-center text-mauve hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/60">
      <div className="container flex items-center justify-between h-16 md:h-24 gap-2">
        {/* Mobile: hamburger */}
        <div className="flex-1 flex md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className={iconCls}>
                <Menu className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85vw] max-w-sm bg-background p-0 flex flex-col">
              <div className="flex items-center px-5 h-16 border-b border-border">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center" aria-label="Tintelle home">
                  <img src={tintelleLogo} alt="Tintelle Beauty" className="h-10 w-auto object-contain" />
                </Link>
              </div>
              <nav className="flex flex-col py-4">
                {NAV.map((n) => {
                  const active = location.pathname === n.to;
                  return (
                    <Link
                      key={n.to}
                      to={n.to}
                      onClick={() => setOpen(false)}
                      className={`px-6 py-4 font-serif text-2xl border-b border-border/40 transition-colors ${
                        active ? "text-primary" : "text-mauve hover:text-primary"
                      }`}
                    >
                      {n.label}
                    </Link>
                  );
                })}
                <Link
                  to="/account"
                  onClick={() => setOpen(false)}
                  className="px-6 py-4 font-serif text-2xl text-mauve hover:text-primary border-b border-border/40"
                >
                  {isSignedIn ? "Account" : "Sign In"}
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setOpen(false)}
                  className="px-6 py-4 font-serif text-2xl text-mauve hover:text-primary border-b border-border/40"
                >
                  Wishlist
                </Link>
                <Link
                  to="/track"
                  onClick={() => setOpen(false)}
                  className="px-6 py-4 font-serif text-2xl text-mauve hover:text-primary"
                >
                  Track Order
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10 flex-1">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} className={linkCls}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Logo (centered) */}
        <Link
          to="/"
          className="flex items-center justify-center md:flex-1"
          aria-label="Tintelle Beauty home"
        >
          <img
            src={tintelleLogo}
            alt="Tintelle Beauty"
            className="h-12 md:h-44 w-auto object-contain md:scale-150 origin-center"
            loading="eager"
            decoding="sync"
            // @ts-ignore
            fetchpriority="high"
          />
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-0 sm:gap-1 flex-1 justify-end">
          <Link to="/search" aria-label="Search" className={iconCls}>
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className={`${iconCls} hidden sm:inline-flex`}>
            <Heart className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link
            to="/account"
            aria-label={isSignedIn ? "Account (signed in)" : "Account"}
            className={`${iconCls} hidden sm:inline-flex ${isSignedIn ? "text-primary" : ""}`}
          >
            <User
              className="h-5 w-5"
              strokeWidth={1.5}
              fill={isSignedIn ? "currentColor" : "none"}
            />
          </Link>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
