import { BookingBar } from "@/components/BookingBar";
import { BoardingSection } from "@/components/BoardingSection";
import { AnimatedMountainLines } from "@/components/AnimatedMountainLines";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
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
      <AnimatedMountainLines className="site-line-field fixed inset-0 z-0 h-screen w-screen" />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <BookingBar />
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
