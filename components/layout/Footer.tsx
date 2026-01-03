import Link from "next/link";


export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="container px-4 md:px-6 py-12 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            Blocket<span className="text-primary">Gen</span>
                        </span>
                    </div>

                    <div className="flex gap-8 text-sm font-medium text-gray-500">
                        <Link href="/terms" className="hover:text-primary transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/privacy" className="hover:text-primary transition-colors">
                            Privacy Policy
                        </Link>
                    </div>

                    <div className="text-sm text-gray-400">
                        © {new Date().getFullYear()} BlocketGen. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
}
