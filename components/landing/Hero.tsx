import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden pt-16 pb-32 md:pt-24 md:pb-48">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center text-center space-y-8">
                    <div className="space-y-4 max-w-3xl">
                        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                            Sell faster on <span className="text-blue-600">Blocket</span> with perfect photos
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                            Upload ordinary photos from your phone — get professional shots in seconds.
                            We remove background, enhance lighting, and prepare the format for Blocket/Tradera.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="#upload">
                            <Button size="lg" className="h-12 px-8 text-lg gap-2">
                                <Upload className="w-5 h-5" />
                                Upload Photos
                            </Button>
                        </Link>
                        <Link href="#how-it-works">
                            <Button variant="outline" size="lg" className="h-12 px-8 text-lg gap-2">
                                How it works
                                <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-8 w-full max-w-4xl opacity-90">
                        {/* Placeholder for Before/After demo */}
                        <div className="aspect-[16/9] rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center relative overflow-hidden shadow-2xl">
                            <div className="text-gray-400 text-lg font-medium">Before/After Demo (Coming Soon)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background gradients */}
            <div className="absolute top-0 left-0 right-0 -z-10 h-full w-full bg-white dark:bg-black">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-50/50 blur-3xl rounded-full" />
            </div>
        </section>
    );
}
