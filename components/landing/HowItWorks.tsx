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
        <section id="how-it-works" className="py-24 bg-white">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">How it works</h2>
                    <p className="text-gray-500 md:text-lg max-w-2xl mx-auto">
                        Three simple steps to make your listing attractive
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center text-center space-y-4 p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                        >
                            <div className="p-4 bg-primary/10 rounded-full text-primary">
                                <step.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <p className="text-gray-500">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
