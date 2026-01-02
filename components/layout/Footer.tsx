import Link from "next/link";
import { BigLogo } from "@/components/landing/BigLogo";

export function Footer() {
    return (
        <footer className="bg-white overflow-hidden">
            {/* Big Logo */}
            <BigLogo />

            {/* Footer content */}
            <div className="border-t border-gray-100">
                <div className="container px-4 md:px-6 py-8 mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">Blocket Photo</span>
                        </div>

                        <div className="flex gap-6 text-sm text-gray-500">
                            <Link href="/terms" className="hover:text-primary transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/privacy" className="hover:text-primary transition-colors">
                                Privacy Policy
                            </Link>
                        </div>

                        <div className="text-sm text-gray-500">
                            © {new Date().getFullYear()} All rights reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
