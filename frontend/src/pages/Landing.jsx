import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { Collections } from "@/components/landing/Collections";
import { Categories } from "@/components/landing/Categories";
import { TryOn } from "@/components/landing/TryOn";
import { Arrivals } from "@/components/landing/Arrivals";
import { Process } from "@/components/landing/Process";
import { Occasions } from "@/components/landing/Occasions";
import { Testimonials } from "@/components/landing/Testimonials";
import { Stores } from "@/components/landing/Stores";

export default function Landing() {
  return (
    <main data-testid="landing-page">
      <Hero />
      <Marquee />
      <Collections />
      <Categories />
      <TryOn />
      <Arrivals />
      <Process />
      <Occasions />
      <Testimonials />
      <Stores />
    </main>
  );
}
