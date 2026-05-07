import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { CTASection } from "@/components/landing/CTASection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <Hero />
      <Features />
      <CTASection />
    </div>
  );
}
