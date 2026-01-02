import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white dark:bg-gray-950 dark:border-gray-800">
            <div className="container px-4 md:px-6 py-12 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">Blocket Photo Optimizer</span>
                    </div>

                    <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <Link href="/terms" className="hover:text-blue-600 transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                            Privacy Policy
                        </Link>
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
