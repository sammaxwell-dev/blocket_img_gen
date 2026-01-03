"use client";

import { Wand2, Image as ImageIcon, Crop, Sparkles, Zap, DollarSign } from "lucide-react";

const features = [
    {
        icon: Wand2,
        title: "Studio Lighting AI",
        description: "Transform amateur shots into professional studio photography. Our localized lighting engine fixes shadows and highlights automatically."
    },
    {
        icon: ImageIcon,
        title: "Clean Backgrounds",
        description: "Remove messy rooms and clutter. Get a pure white background that meets marketplace standards and boosts trust."
    },
    {
        icon: Crop,
        title: "Smart Framing",
        description: "AI centers your item and crops specifically for Blocket, Tradera, and Facebook Marketplace aspect ratios."
    },
    {
        icon: Zap,
        title: "Instant Processing",
        description: "Don't wait hours for an editor. Get results in seconds and list your items while the motivation is high."
    },
    {
        icon: Sparkles,
        title: "Detail Enhancement",
        description: "Sharpen textures and clarify details so buyers can see exactly what they're paying for."
    },
    {
        icon: DollarSign,
        title: "Sell for More",
        description: "Professional photos are proven to increase perceived value and sell items up to 3x faster."
    }
];

export function Features() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Everything you need to <span className="text-primary">sell faster</span>
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl">
                        Power-features designed specifically for second-hand sellers who want pro results without pro gear.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
