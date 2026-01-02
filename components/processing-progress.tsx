import { motion } from "framer-motion";
import { Loader2, Sparkles, CheckCircle2 } from "lucide-react";

interface ProcessingProgressProps {
    status: "idle" | "uploading" | "processing" | "completed" | "error";
    progress?: number; // 0-100 (simulated)
}

const steps = [
    { id: 1, label: "Загрузка фото", threshold: 10 },
    { id: 2, label: "Удаление фона (AI)", threshold: 40 },
    { id: 3, label: "Улучшение качества", threshold: 70 },
    { id: 4, label: "Финализация", threshold: 90 },
];

export function ProcessingProgress({ status, progress = 0 }: ProcessingProgressProps) {
    if (status === "idle") return null;

    const currentStep = steps.findLast((s) => progress >= s.threshold) || steps[0];

    return (
        <div className="w-full max-w-md mx-auto p-6 space-y-6">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                    {status === "completed" ? (
                        <div className="bg-green-100 flex items-center justify-center p-4 rounded-full">
                            <CheckCircle2 className="w-8 h-8 text-green-600" />
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 animate-ping opacity-20 bg-primary rounded-full" />
                            <div className="bg-primary/10 p-4 rounded-full relative">
                                <Loader2 className="w-8 h-8 text-primary animate-spin" />
                            </div>
                        </>
                    )}
                </div>

                <div className="text-center space-y-1">
                    <h3 className="font-semibold text-lg text-foreground">
                        {status === "completed" ? "Готово!" : status === "uploading" ? "Загрузка..." : currentStep.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {status === "completed" ? "Фото успешно обработано" : "Делаем магию, подождите немного..."}
                    </p>
                </div>
            </div>

            <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Steps visualization */}
            <div className="flex justify-between px-2">
                {steps.map((step) => {
                    const isActive = progress >= step.threshold;
                    return (
                        <div key={step.id} className="flex flex-col items-center gap-1">
                            <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? "bg-primary" : "bg-muted"}`} />
                            <span className="text-[10px] text-muted-foreground hidden sm:block">{step.label}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
