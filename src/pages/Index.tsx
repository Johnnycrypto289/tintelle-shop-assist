import { AnnouncementBar } from "@/components/tintelle/AnnouncementBar";
import { Header } from "@/components/tintelle/Header";
import { Hero } from "@/components/tintelle/Hero";
import { ShopByCategory } from "@/components/tintelle/ShopByCategory";
import { Bestsellers } from "@/components/tintelle/Bestsellers";
import { TrustBanner } from "@/components/tintelle/TrustBanner";
import { BestsellerSpotlight } from "@/components/tintelle/BestsellerSpotlight";
import { Footer } from "@/components/tintelle/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <ShopByCategory />
        <Bestsellers />
        <TrustBanner />
        <BestsellerSpotlight />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
