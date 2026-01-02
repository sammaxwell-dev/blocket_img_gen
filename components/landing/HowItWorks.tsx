import { UploadCloud, Wand2, Download } from "lucide-react";

const steps = [
    {
        icon: UploadCloud,
        title: "1. Upload Photos",
        description: "Drag & drop photos or select from gallery. We support up to 10 images at once.",
    },
    {
        icon: Wand2,
        title: "2. AI Magic",
        description: "We remove boring backgrounds, fix lighting, and crop to Blocket standards.",
    },
    {
        icon: Download,
        title: "3. Ready to Sell",
        description: "Download ready photos as a ZIP archive and upload directly to your listing.",
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-gray-900/50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How it works</h2>
                    <p className="text-gray-500 md:text-lg dark:text-gray-400 max-w-2xl mx-auto">
                        Three simple steps to make your listing attractive
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center space-y-4 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-full text-blue-600 dark:text-blue-400">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
