"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import { FeatureBadge } from "./FeatureBadge";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-[#FAFAFA]">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                    {/* Left column - Text content */}
                    <div className="space-y-8 max-w-xl relative z-10">

                        <div className="space-y-4">
                            {/* Eyebrow text similar to "Organize your skincare routine..." */}
                            <p className="text-gray-500 text-lg">
                                Take perfectly lit photos with your phone
                                <br />
                                and sell faster. <span className="text-primary font-medium">Easily.</span>
                            </p>

                            {/* Main heading - Bold, tighter tracking */}
                            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl text-gray-950 leading-[1.1]">
                                Sell on Blocket{" "}
                                <br />
                                <span className="relative inline-block">
                                    faster with AI
                                    {/* Underline decoration */}
                                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.8" />
                                    </svg>
                                </span>
                            </h1>
                        </div>

                        {/* Social proof box matching reference */}
                        <div className="inline-flex items-center gap-4 p-4 pr-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden relative"
                                    >
                                        {/* Placeholder avatars */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm">
                                <p className="font-semibold text-gray-900">Trusted by 500+ sellers</p>
                                <p className="text-gray-500 text-xs">on Blocket & Tradera</p>
                            </div>
                        </div>
                    </div>

                    {/* Right column - Phone mockup with badges */}
                    <div className="relative flex justify-center lg:justify-end">
                        {/* Decorative background glow behind phone */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full -z-10" />

                        <div className="relative z-10 scale-[0.85] sm:scale-100 transform translate-x-4">
                            <PhoneMockup />

                            {/* Feature badges positioned exactly like markers */}

                            {/* "Compatibility Checker" equivalent */}
                            <FeatureBadge
                                position="left"
                                className="absolute top-24 -left-12 md:-left-28"
                            >
                                Studio Lighting
                            </FeatureBadge>

                            {/* "AI Skin Analysis" equivalent - bottom left */}
                            <FeatureBadge
                                position="left"
                                className="absolute bottom-32 -left-8 md:-left-24"
                            >
                                Background Removal
                            </FeatureBadge>

                            {/* "Routine Builder" equivalent - middle right */}
                            <FeatureBadge
                                position="right"
                                className="absolute top-1/2 -right-4 md:-right-20 translate-y-12"
                            >
                                Blocket Ready
                            </FeatureBadge>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
