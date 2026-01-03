"use client";

import { Wand2, Image as ImageIcon, Crop, Sparkles, Zap, DollarSign, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const features = [
    {
        icon: Wand2,
        title: "Studio Lighting AI",
        description: "Transform amateur shots into professional studio photography. Our localized lighting engine fixes shadows and highlights automatically.",
        className: "md:col-span-2",
        gradient: "from-pink-500/20 via-rose-500/20 to-red-500/20"
    },
    {
        icon: ImageIcon,
        title: "Clean Backgrounds",
        description: "Remove messy rooms and clutter. Get a pure white background that meets marketplace standards.",
        className: "md:col-span-1",
        gradient: "from-blue-500/20 via-cyan-500/20 to-teal-500/20"
    },
    {
        icon: Crop,
        title: "Smart Framing",
        description: "AI centers your item and crops specifically for Blocket & Tradera.",
        className: "md:col-span-1",
        gradient: "from-purple-500/20 via-violet-500/20 to-indigo-500/20"
    },
    {
        icon: Zap,
        title: "Instant Processing",
        description: "Get results in seconds. List items while motivation is high.",
        className: "md:col-span-2",
        gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20"
    },
    {
        icon: Sparkles,
        title: "Detail Enhancement",
        description: "Sharpen textures and clarify details so buyers see exactly what they're paying for.",
        className: "md:col-span-1",
        gradient: "from-green-500/20 via-emerald-500/20 to-lime-500/20"
    },
    {
        icon: DollarSign,
        title: "Sell for More",
        description: "Professional photos increase perceived value and sell items up to 3x faster.",
        className: "md:col-span-2",
        gradient: "from-indigo-500/20 via-blue-500/20 to-sky-500/20"
    }
];

export function Features() {
    return (
        <section className="py-24 md:py-32 bg-white relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                    >
                        Everything you need to <span className="text-primary relative inline-block">
                            sell faster
                            <motion.svg
                                initial={{ pathLength: 0 }}
                                whileInView={{ pathLength: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="absolute -bottom-2 left-0 w-full h-3 text-primary/30 -z-10"
                                viewBox="0 0 100 10"
                                preserveAspectRatio="none"
                            >
                                <motion.path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="transparent" />
                            </motion.svg>
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-gray-500 text-lg md:text-xl"
                    >
                        Power-features designed specifically for second-hand sellers who want pro results without pro gear.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "group relative overflow-hidden rounded-3xl p-8 border border-gray-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500",
                                feature.className
                            )}
                        >
                            <div className={cn(
                                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br",
                                feature.gradient
                            )} />

                            <div className="relative z-10 h-full flex flex-col justify-between">
                                <div className="mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-900 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 mb-6 group-hover:bg-white/80">
                                        <feature.icon size={24} className="group-hover:text-primary transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-gray-900 leading-tight">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed text-sm md:text-base group-hover:text-gray-700 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>

                                <div className="flex justify-end opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <div className="w-8 h-8 rounded-full bg-white/50 backdrop-blur-sm flex items-center justify-center">
                                        <ArrowUpRight size={16} className="text-gray-900" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
