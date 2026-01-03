import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles, CheckCircle2, ShieldCheck, Zap, Image as ImageIcon, Wand2 } from "lucide-react";

interface ProcessingProgressProps {
    status: "idle" | "uploading" | "processing" | "completed" | "error";
    progress?: number; // 0-100 (simulated)
}

const steps = [
    { id: 1, label: "Uploading Photo", icon: <ImageIcon className="w-4 h-4" />, threshold: 10 },
    { id: 2, label: "Removing Background", icon: <Zap className="w-4 h-4" />, threshold: 40 },
    { id: 3, label: "AI Enhancement", icon: <Wand2 className="w-4 h-4" />, threshold: 70 },
    { id: 4, label: "Finalizing", icon: <ShieldCheck className="w-4 h-4" />, threshold: 90 },
];

export function ProcessingProgress({ status, progress = 0 }: ProcessingProgressProps) {
    if (status === "idle") return null;

    const currentStepIndex = steps.findLastIndex((s) => progress >= s.threshold);
    const currentStep = steps[currentStepIndex] || steps[0];

    return (
        <div className="w-full max-w-xl mx-auto p-4 md:p-8 space-y-10">
            {/* Main Visualizer */}
            <div className="relative flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                    {status === "completed" ? (
                        <motion.div
                            key="completed"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-24 h-24 bg-green-500 shadow-xl shadow-green-500/20 flex items-center justify-center rounded-3xl"
                        >
                            <CheckCircle2 className="w-12 h-12 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="processing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="relative"
                        >
                            {/* Animated Rings */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="w-32 h-32 border-2 border-primary/10 border-t-primary rounded-full"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                    className="absolute w-28 h-28 border border-purple-500/10 border-b-purple-500 rounded-full"
                                />
                            </div>

                            {/* Center Icon */}
                            <div className="w-24 h-24 bg-gradient-to-br from-primary to-purple-600 shadow-2xl shadow-primary/20 flex items-center justify-center rounded-3xl relative z-10 overflow-hidden">
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Sparkles className="w-10 h-10 text-white" />
                                </motion.div>

                                {/* Background Shimmer */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0"
                                    animate={{ x: ['-100%', '200%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8 text-center space-y-2">
                    <h3 className="font-bold text-2xl text-gray-900 tracking-tight">
                        {status === "completed" ? "Transformation Complete!" : status === "uploading" ? "Receiving Image..." : currentStep.label}
                    </h3>
                    <p className="text-gray-500 font-medium">
                        {status === "completed" ? "Your professional photo is ready." : "We're crafting your perfect shot, please wait..."}
                    </p>
                </div>
            </div>

            {/* Premium Progress Bar */}
            <div className="space-y-6">
                <div className="relative h-3 w-full bg-gray-100 rounded-full overflow-hidden border border-gray-200/50 shadow-inner">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    />
                    <motion.div
                        className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:24px_24px] animate-[shimmer_2s_linear_infinite]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                    />
                </div>

                {/* Steps Timeline */}
                <div className="grid grid-cols-4 gap-2">
                    {steps.map((step, idx) => {
                        const isPast = progress > step.threshold;
                        const isCurrent = currentStepIndex === idx;

                        return (
                            <div key={step.id} className="relative flex flex-col items-center gap-3">
                                <motion.div
                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isPast ? "bg-primary/10 text-primary" :
                                            isCurrent ? "bg-primary text-white shadow-lg shadow-primary/20" :
                                                "bg-gray-50 text-gray-300"
                                        }`}
                                    animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : step.icon}
                                </motion.div>
                                <span className={`text-[11px] font-bold text-center leading-tight transition-colors duration-300 ${isCurrent ? "text-primary" : isPast ? "text-gray-900" : "text-gray-400"} hidden sm:block uppercase tracking-wider`}>
                                    {step.label}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
