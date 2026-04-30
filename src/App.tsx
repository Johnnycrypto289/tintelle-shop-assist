import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Shop from "./pages/Shop.tsx";
import Cart from "./pages/Cart.tsx";
import Wishlist from "./pages/Wishlist.tsx";
import Search from "./pages/Search.tsx";
import Journal from "./pages/Journal.tsx";
import Post from "./pages/Post.tsx";

import Account from "./pages/Account.tsx";
import Track from "./pages/Track.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import Shipping from "./pages/Shipping.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const AppRoutes = () => {
  useCartSync();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/search" element={<Search />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/journal/:slug" element={<Post />} />
      
      <Route path="/account" element={<Account />} />
      <Route path="/track" element={<Track />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/shipping" element={<Shipping />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
