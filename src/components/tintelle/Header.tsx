import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/60">
      <div className="container flex items-center justify-between h-20">
        <nav className="hidden md:flex items-center gap-10 text-sm tracking-wide text-mauve flex-1">
          <Link to="/" className="hover:text-primary transition-colors">Shop</Link>
          <a href="#about" className="hover:text-primary transition-colors">About</a>
          <a href="#routine" className="hover:text-primary transition-colors">Routine</a>
          <a href="#journal" className="hover:text-primary transition-colors">Journal</a>
        </nav>
        <Link
          to="/"
          className="font-serif text-2xl md:text-3xl tracking-[0.25em] text-mauve flex-1 text-center"
          aria-label="Tintelle home"
        >
          TINTELLE
        </Link>
        <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end text-mauve">
          <button aria-label="Search" className="p-2 hover:text-primary transition-colors">
            <Search className="h-5 w-5" />
          </button>
          <button aria-label="Account" className="p-2 hover:text-primary transition-colors hidden sm:inline-flex">
            <User className="h-5 w-5" />
          </button>
          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
