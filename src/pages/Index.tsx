import { Header } from "@/components/tintelle/Header";
import { Hero } from "@/components/tintelle/Hero";
import { CleanBeautyBand } from "@/components/tintelle/CleanBeautyBand";
import { ShopByCategory } from "@/components/tintelle/ShopByCategory";
import { CuratedFavorites } from "@/components/tintelle/CuratedFavorites";
import { CampaignFoundation } from "@/components/tintelle/CampaignFoundation";
import { SkincareRitual } from "@/components/tintelle/SkincareRitual";
import { SerumApothecary } from "@/components/tintelle/SerumApothecary";
import { HighlighterStrip } from "@/components/tintelle/HighlighterStrip";
import { LipstickWardrobe } from "@/components/tintelle/LipstickWardrobe";
import { TrustBanner } from "@/components/tintelle/TrustBanner";
import { BestsellerSpotlight } from "@/components/tintelle/BestsellerSpotlight";
import { Footer } from "@/components/tintelle/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <LipstickWardrobe />
        <ShopByCategory />
        <CuratedFavorites />
        <CampaignFoundation />
        <CleanBeautyBand />
        <HighlighterStrip />
        <SkincareRitual />
        <SerumApothecary />
        <TrustBanner />
        <BestsellerSpotlight />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
