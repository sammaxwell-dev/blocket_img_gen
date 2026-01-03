import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/layout/Footer";

export const metadata = {
    title: "Pricing - BlocketGen",
    description: "Choose the perfect plan for your AI photo enhancement needs.",
};

export default function PricingPage() {
    return (
        <main className="min-h-screen pt-20">
            <Pricing />
            <Footer />
        </main>
    );
}
