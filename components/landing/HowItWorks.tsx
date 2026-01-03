import { UploadCloud, Wand2, Download, ArrowRight } from "lucide-react";

const steps = [
    {
        icon: UploadCloud,
        title: "1. Upload Photos",
        description: "Drag & drop your raw phone photos. We support batch uploading for faster listing.",
        color: "bg-blue-50 text-blue-600"
    },
    {
        icon: Wand2,
        title: "2. AI Magic",
        description: "Our AI analyzes each image, removing clutter and enhancing lighting in seconds.",
        color: "bg-purple-50 text-purple-600"
    },
    {
        icon: Download,
        title: "3. Ready to Sell",
        description: "Download your professional studio-quality photos and upload to Blocket instantly.",
        color: "bg-green-50 text-green-600"
    },
];

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-gray-50">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-gray-900">
                        From messy room to <span className="text-primary">sold</span> in 3 steps
                    </h2>
                    <p className="text-gray-500 md:text-lg max-w-2xl mx-auto">
                        We've optimized the process to be as fast as possible for volume sellers.
                    </p>
                </div>

                <div className="relative grid gap-8 md:grid-cols-3">
                    {/* Connecting line for desktop */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-gray-200 via-primary/20 to-gray-200 -z-10" />

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="relative flex flex-col items-center text-center space-y-4"
                        >
                            <div className={`w-24 h-24 rounded-3xl ${step.color} flex items-center justify-center mb-4 shadow-sm border border-white`}>
                                <step.icon className="w-10 h-10" />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                            <p className="text-gray-500 max-w-xs mx-auto leading-relaxed">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
