import { Link } from "react-router-dom";
import { Heart, Search, User } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import { useCustomer } from "@/hooks/useCustomer";

export const Header = () => {
  const { isSignedIn } = useCustomer();
  const linkCls = "text-mauve hover:text-primary transition-colors text-sm";
  const iconCls = "p-2 text-mauve hover:text-primary transition-colors inline-flex items-center";

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="container flex items-center justify-between h-20">
        <nav className="hidden md:flex items-center gap-10 flex-1">
          <Link to="/shop" className={linkCls}>Shop</Link>
          <Link to="/about" className={linkCls}>About</Link>
          <a href="/#routine" className={linkCls}>Routine</a>
          <Link to="/journal" className={linkCls}>Journal</Link>
        </nav>
        <Link
          to="/"
          className="font-serif text-2xl md:text-[28px] font-medium tracking-[0.25em] text-mauve flex-1 text-center"
          aria-label="Tintelle home"
        >
          TINTELLE
        </Link>
        <div className="flex items-center gap-1 md:gap-2 flex-1 justify-end">
          <Link to="/search" aria-label="Search" className={iconCls}>
            <Search className="h-5 w-5" strokeWidth={1.5} />
          </Link>
          <Link to="/wishlist" aria-label="Wishlist" className={iconCls}>
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
