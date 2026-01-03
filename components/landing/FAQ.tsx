"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
    {
        question: "How does the AI lighting work?",
        answer: "Our AI analyzes the geometry of your object and simulates a professional 3-point studio lighting setup, fixing harsh shadows and uneven exposure automatically."
    },
    {
        question: "Is it free to use?",
        answer: "Yes, you can start with our Free plan which includes 5 photos per month. For heavy users, we offer Pro and Business plans with higher limits."
    },
    {
        question: "Does it work for clothes?",
        answer: "Absolutely! Our AI is trained on massive datasets of fashion photography to ensure fabrics look natural and textures are preserved."
    },
    {
        question: "Can I use the photos on other platforms?",
        answer: "Yes, the photos are yours to use anywhere. The aspect ratios and quality are optimized for Blocket, Tradera, Facebook Marketplace, and eBay."
    }
];

export function FAQ() {
    return (
        <section className="py-24 bg-gray-50">
            <div className="container px-4 md:px-6 mx-auto max-w-3xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-500 text-lg">
                        Everything you need to know about the product and billing.
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`}>
                                <AccordionTrigger className="text-left text-lg font-medium text-gray-900">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-500 text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
