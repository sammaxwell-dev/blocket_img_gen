"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-extrabold text-primary tracking-tight">
                        BlocketPhoto
                    </Link>

                    {/* Navigation - Centered */}
                    <nav className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2">
                        {["Features", "Pricing", "Blog", "About"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="flex items-center gap-4">
                        <Button className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 h-10 rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
                            Try now for free
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
