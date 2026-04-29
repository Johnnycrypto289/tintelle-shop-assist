import { AnnouncementBar } from "@/components/tintelle/AnnouncementBar";
import { Header } from "@/components/tintelle/Header";
import { Hero } from "@/components/tintelle/Hero";
import { ShopByConcern } from "@/components/tintelle/ShopByConcern";
import { Bestsellers } from "@/components/tintelle/Bestsellers";
import { TrustBanner } from "@/components/tintelle/TrustBanner";
import { RoutineUpsell } from "@/components/tintelle/RoutineUpsell";
import { Footer } from "@/components/tintelle/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <ShopByConcern />
        <Bestsellers />
        <TrustBanner />
        <RoutineUpsell />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
