"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { CompareSlider } from "./CompareSlider";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] mix-blend-multiply animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px] mix-blend-multiply animate-pulse delay-700" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px] mix-blend-multiply animate-pulse delay-1000" />
            </div>

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
                    {/* Left column - Text content */}
                    <div className="space-y-8 max-w-2xl relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-black/5 backdrop-blur-sm shadow-sm text-sm font-medium text-gray-600">
                                <Sparkles size={14} className="text-primary fill-primary/20" />
                                <span>AI Photo Editor for Sellers</span>
                            </div>

                            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-gray-950 leading-[1.05]">
                                Make Your Photos{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600 animate-gradient bg-300%">
                                    Impossible to Ignore
                                </span>
                            </h1>

                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-lg">
                                Stop scrolling. Start selling. SnapturaAI transforms standard phone shots into professional listings that command attention on any marketplace.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <Button size="lg" className="rounded-full text-base h-14 px-10 shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 text-white hover:-translate-y-0.5 transition-all duration-300">
                                Enhance Photos Now <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full text-base h-14 px-10 bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white/80 transition-all duration-300">
                                View Gallery
                            </Button>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex items-center gap-4 pt-4"
                        >
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm overflow-hidden relative first:z-40 second:z-30 third:z-20 fourth:z-10"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="w-4 h-4 text-orange-400 fill-orange-400">★</div>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600">
                                    Trusted by <span className="font-semibold text-gray-900">2,000+ sellers</span>
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right column - Before/After Comparison */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative perspective-1000"
                    >
                        {/* Decorative glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-tr from-primary/20 via-transparent to-blue-500/20 blur-[80px] rounded-full -z-10 opacity-60" />

                        <div className="relative z-10 transform transition-transform hover:scale-[1.01] duration-700 ease-out preserve-3d">
                            <CompareSlider
                                beforeImage="/hero-before.png"
                                afterImage="/hero-after.png"
                                beforeLabel="Before"
                                afterLabel="After"
                                className="shadow-2xl shadow-gray-900/10 rounded-2xl border-4 border-white/50 backdrop-blur-sm"
                            />

                            {/* Floating badges */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1, duration: 0.6 }}
                                className="absolute -left-8 top-16 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Effect</p>
                                        <p className="text-sm font-bold text-gray-900">Studio Lighting</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.2, duration: 0.6 }}
                                className="absolute -right-8 bottom-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">AI Magic</p>
                                        <p className="text-sm font-bold text-gray-900">HD Details</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

