"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Erik Andersson",
        role: "Power Seller on Blocket",
        avatar: "/avatars/erik.jpg", // Placeholder
        content: "I used to spend hours editing photos. Now it takes seconds. My sales increased by 40% in the first month.",
        rating: 5
    },
    {
        name: "Sofia Lindberg",
        role: "Vintage Shop Owner",
        avatar: "/avatars/sofia.jpg", // Placeholder
        content: "The studio lighting feature is incredible. It makes my vintage clothes look brand new and premium.",
        rating: 5
    },
    {
        name: "Johan Berg",
        role: "Tech Reseller",
        avatar: "/avatars/johan.jpg", // Placeholder
        content: "Clean backgrounds are a game changer for electronics. Buyers trust the listings way more now.",
        rating: 5
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Trusted by top sellers
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
                        Join thousands of successful sellers who use AI to boost their listings.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-gray-50 rounded-2xl p-8 relative"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(t.rating)].map((_, i) => (
                                    <Star key={i} size={18} className="fill-orange-400 text-orange-400" />
                                ))}
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                "{t.content}"
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400" />
                                    {/* <Image src={t.avatar} alt={t.name} fill className="object-cover" /> */}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900">{t.name}</p>
                                    <p className="text-sm text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
