"use client";

import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const plans = [
    {
        name: "Starter",
        price: "Free",
        description: "Perfect for testing the waters and casual selling.",
        features: [
            "5 photos per month",
            "Basic lighting correction",
            "Standard resolution",
            "Community support"
        ],
        cta: "Try for Free",
        mostPopular: false
    },
    {
        name: "Pro Seller",
        price: "$19",
        period: "/month",
        description: "For serious sellers who want maximum visibility.",
        features: [
            "100 photos per month",
            "Advanced Studio Lighting",
            "High-resolution downloads",
            "Batch processing (up to 20)",
            "Remove backgrounds",
            "Priority support"
        ],
        cta: "Get Started",
        mostPopular: true
    },
    {
        name: "Business",
        price: "$49",
        period: "/month",
        description: "Volume processing for power sellers and shops.",
        features: [
            "Unlimited photos",
            "API Access",
            "Custom backgrounds",
            "White-label options",
            "Dedicated account manager",
            "Bulk export"
        ],
        cta: "Contact Sales",
        mostPopular: false
    }
];

export function Pricing() {
    return (
        <section className="py-24 bg-gray-50/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Simple, transparent <span className="text-primary">pricing</span>
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl">
                        Choose the perfect plan for your selling volume. No hidden fees.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "relative rounded-3xl p-8 flex flex-col bg-white border transition-shadow duration-300",
                                plan.mostPopular
                                    ? "border-primary shadow-2xl shadow-primary/10 scale-105 z-10"
                                    : "border-gray-100 shadow-xl hover:shadow-2xl"
                            )}
                        >
                            {plan.mostPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full flex items-center gap-1 shadow-lg">
                                    <Sparkles size={14} /> Most Popular
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-2">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    {plan.period && <span className="text-gray-500">{plan.period}</span>}
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                                        <div className="mt-0.5 min-w-[18px] min-h-[18px] rounded-full bg-green-100 flex items-center justify-center">
                                            <Check size={12} className="text-green-600" />
                                        </div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                className={cn(
                                    "w-full rounded-full h-12 text-base font-medium transition-all duration-300",
                                    plan.mostPopular
                                        ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 hover:-translate-y-0.5"
                                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                                )}
                            >
                                {plan.cta}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
