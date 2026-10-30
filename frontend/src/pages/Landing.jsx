import { useLenis } from "@/hooks/useLenis";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Collections } from "@/components/landing/Collections";
import { Categories } from "@/components/landing/Categories";
import { TryOn } from "@/components/landing/TryOn";
import { Arrivals } from "@/components/landing/Arrivals";
import { Occasions } from "@/components/landing/Occasions";
import { Testimonials } from "@/components/landing/Testimonials";
import { Stores } from "@/components/landing/Stores";
import { Footer } from "@/components/landing/Footer";

export default function Landing() {
  useLenis();
  return (
    <main data-testid="landing-page">
      <Nav />
      <Hero />
      <Marquee />
      <Collections />
      <Categories />
      <TryOn />
      <Arrivals />
      <Occasions />
      <Testimonials />
      <Stores />
      <Footer />
    </main>
  );
}
