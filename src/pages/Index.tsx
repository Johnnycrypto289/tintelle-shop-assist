import { Header } from "@/components/tintelle/Header";
import { Hero } from "@/components/tintelle/Hero";
import { ShopByCategory } from "@/components/tintelle/ShopByCategory";
import { CuratedFavorites } from "@/components/tintelle/CuratedFavorites";
import { CampaignFoundation } from "@/components/tintelle/CampaignFoundation";
import { TrustBanner } from "@/components/tintelle/TrustBanner";
import { BestsellerSpotlight } from "@/components/tintelle/BestsellerSpotlight";
import { Footer } from "@/components/tintelle/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ShopByCategory />
        <Bestsellers />
        <CampaignFoundation />
        <TrustBanner />
        <BestsellerSpotlight />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
