import { BookingBar } from "@/components/BookingBar";
import { BoardingSection } from "@/components/BoardingSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ImageConstellation } from "@/components/ImageConstellation";
import { MobileStickyBookButton } from "@/components/MobileStickyBookButton";
import { Navbar } from "@/components/Navbar";
import { PackageCards } from "@/components/PackageCards";
import { RanchStory } from "@/components/RanchStory";
import { ServicesGrid } from "@/components/ServicesGrid";
import { TeamSpotlight } from "@/components/TeamSpotlight";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { TrustPolicyStrip } from "@/components/TrustPolicyStrip";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <BookingBar />
        <section id="ranch-gallery" className="gallery-section px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-[1180px]">
            <ImageConstellation />
          </div>
        </section>
        <ServicesGrid />
        <PackageCards />
        <BoardingSection />
        <TrustPolicyStrip />
        <RanchStory />
        <TeamSpotlight />
        <TestimonialCarousel />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyBookButton />
    </>
  );
}
