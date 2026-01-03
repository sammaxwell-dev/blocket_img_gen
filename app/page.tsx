import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/layout/Footer";
import { UploadSection } from "@/components/upload/UploadSection";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <UploadSection />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}
