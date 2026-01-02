import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/layout/Footer";
import { UploadSection } from "@/components/upload/UploadSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <main className="flex-1">
        <Hero />
        <UploadSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
