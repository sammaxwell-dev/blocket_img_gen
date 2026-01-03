"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { CompareSlider } from "./CompareSlider";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-[#FAFAFA]">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">
                    {/* Left column - Text content */}
                    <div className="space-y-8 max-w-xl relative z-10">

                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                <Sparkles size={16} />
                                <span>AI Photo Editor for Sellers</span>
                            </div>

                            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl text-gray-950 leading-[1.1]">
                                Turn Phone Photos into{" "}
                                <span className="text-primary">Studio Quality</span>
                            </h1>

                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                                Don't let bad photos kill your sales. Our AI automatically removes backgrounds, fixes lighting, and makes your items pop on Blocket & Tradera.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button size="lg" className="rounded-full text-base h-12 px-8 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white">
                                Enhance Photos Now <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full text-base h-12 px-8 bg-white/50 backdrop-blur-sm">
                                View Examples
                            </Button>
                        </div>

                        {/* Social proof */}
                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-300" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-600">
                                Used by <span className="font-semibold text-gray-900">500+ sellers</span> today
                            </p>
                        </div>
                    </div>

                    {/* Right column - Before/After Comparison */}
                    <div className="relative">
                        {/* Decorative elements */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-primary/10 via-purple-500/5 to-blue-500/10 blur-[60px] rounded-full -z-10" />

                        <div className="relative z-10 transform transition-transform hover:scale-[1.01] duration-500">
                            <CompareSlider
                                beforeImage="/hero-before.png"
                                afterImage="/hero-after.png"
                                beforeLabel="Phone Photo"
                                afterLabel="AI Studio"
                                className="shadow-2xl shadow-gray-200/50 rotate-1 border-[6px]"
                            />

                            {/* Floating badges */}
                            <div className="absolute -left-6 top-12 bg-white p-3 rounded-xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-semibold text-gray-700">Auto-Lighting</span>
                                </div>
                            </div>

                            <div className="absolute -right-6 bottom-12 bg-white p-3 rounded-xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-right-4 duration-700 delay-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                    <span className="text-xs font-semibold text-gray-700">Background Removed</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

