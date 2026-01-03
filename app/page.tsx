import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Footer } from "@/components/layout/Footer";
import { UploadSection } from "@/components/upload/UploadSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-white">
      <main className="flex-1">
        <Hero />
        <div id="features">
          <Features />
        </div>
        <UploadSection />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
