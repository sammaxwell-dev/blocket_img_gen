"use client";

import { useState } from "react";
import { UploadZone } from "./UploadZone";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Compass, Camera, Sparkles } from "lucide-react";
import { ProcessingProgress } from "@/components/processing-progress";
import { ResultsViewer } from "@/components/results/ResultsViewer";
import { downloadZip } from "@/lib/zip-utils";
import { useFingerprint } from "@/lib/fingerprint";
import { LimitModal } from "@/components/usage/LimitModal";
import { triggerUsageUpdate } from "@/components/usage/UsageCounter";
import { LoginRequiredModal } from "@/components/auth/LoginRequiredModal";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

type ProcessingMode = "angles" | "studio";

interface Variation {
    name: string;
    imageUrl: string;
}

interface ImageResult {
    original: string;
    variations: Variation[];
}

const MODES: Array<{
    id: ProcessingMode;
    name: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
}> = [
        {
            id: "angles",
            name: "Pro Angles",
            description: "Professional camera angles. Same background, dramatically better lighting.",
            icon: <Compass className="w-5 h-5" />,
            badge: "Keep Background"
        },
        {
            id: "studio",
            name: "Studio",
            description: "Complete transformation with professional studio backgrounds.",
            icon: <Camera className="w-5 h-5" />,
            badge: "New Background"
        }
    ];

export function UploadSection() {
    const [files, setFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "completed" | "error">("idle");
    const [progress, setProgress] = useState(0);
    const [processedResults, setProcessedResults] = useState<ImageResult[]>([]);
    const [selectedVariations, setSelectedVariations] = useState<Map<number, number>>(new Map());
    const [selectedMode, setSelectedMode] = useState<ProcessingMode>("angles");
    const { fingerprint } = useFingerprint();
    const [usageLimit, setUsageLimit] = useState<{ used: number, limit: number } | null>(null);
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data: { user: currentUser } } = await supabase.auth.getUser();
            setUser(currentUser);
        };
        getUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleFilesSelected = (selectedFiles: File[]) => {
        if (!user) {
            setIsLoginModalOpen(true);
            return;
        }
        setFiles(selectedFiles);
        setStatus("idle");
        setProgress(0);
        setProcessedResults([]);
        setSelectedVariations(new Map());
    };

    const handleUpload = async () => {
        if (!user) {
            setIsLoginModalOpen(true);
            return;
        }
        if (files.length === 0) return;

        setStatus("uploading");
        setProgress(0);

        const results: ImageResult[] = [];
        const totalFiles = files.length;

        try {
            for (let i = 0; i < totalFiles; i++) {
                const file = files[i];
                const startProgress = (i / totalFiles) * 100;
                setProgress(startProgress);

                // Show "processing" status after a brief upload simulation
                setTimeout(() => setStatus("processing"), 500);

                const formData = new FormData();
                formData.append("file", file);
                formData.append("mode", selectedMode);
                if (fingerprint) {
                    formData.append("fingerprint", fingerprint);
                }

                const interval = setInterval(() => {
                    setProgress(prev => Math.min(prev + 1, ((i + 1) / totalFiles) * 100 - 5));
                }, 500);

                const response = await fetch("/api/process", {
                    method: "POST",
                    body: formData,
                });

                clearInterval(interval);

                if (!response.ok) {
                    if (response.status === 429) {
                        const data = await response.json();
                        setUsageLimit(data.usage);
                        setIsLimitModalOpen(true);
                        setStatus("idle");
                        return;
                    }
                    console.error("Failed to process file", file.name);
                    throw new Error(`Failed to process ${file.name}`);
                } else {
                    const data = await response.json();
                    if (data.variations && data.original) {
                        results.push({
                            original: data.original,
                            variations: data.variations
                        });
                    }
                    triggerUsageUpdate();
                }

                setProgress(((i + 1) / totalFiles) * 100);
            }

            setProcessedResults(results);
            setStatus("completed");
        } catch (error) {
            console.error("Error processing:", error);
            setStatus("error");
            alert("Failed to process files. Please try again.");
        }
    };

    const handleVariationSelect = (imageIndex: number, variationIndex: number) => {
        setSelectedVariations(prev => new Map(prev).set(imageIndex, variationIndex));
    };

    const handleDownloadZip = async () => {
        if (processedResults.length === 0) return;

        const images = processedResults.map((result, index) => {
            const selectedVarIndex = selectedVariations.get(index) ?? 0;
            const variation = result.variations[selectedVarIndex];
            return {
                url: variation?.imageUrl || result.original,
                name: `snaptura_photo_${index + 1}_${variation?.name?.replace(/\s+/g, '_') || 'enhanced'}.jpg`
            };
        });

        await downloadZip(images);
    };

    const handleReset = () => {
        setStatus("idle");
        setFiles([]);
        setProcessedResults([]);
        setSelectedVariations(new Map());
    };

    return (
        <section id="upload" className="py-24 bg-white border-y border-gray-100">
            <div className="container px-4 mx-auto max-w-5xl">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {status === "completed" ? "Photo Transformation Complete!" : "Start Enhancing Photos"}
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        {status === "completed"
                            ? "Review your favorite variations and download the high-quality results."
                            : "Upload your product photos and let SnapturaAI create magazine-quality shots."}
                    </p>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 p-6 md:p-12">
                    {status === "idle" || status === "error" ? (
                        <>
                            <UploadZone onFilesSelected={handleFilesSelected} />

                            {files.length > 0 && (
                                <div className="mt-12 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
                                    {/* Mode Selection */}
                                    <div className="space-y-6">
                                        <h3 className="text-lg font-bold text-gray-900 text-center tracking-tight">
                                            SELECT PROCESSING STYLE
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
                                            {MODES.map((mode) => (
                                                <button
                                                    key={mode.id}
                                                    onClick={() => setSelectedMode(mode.id)}
                                                    className={`relative p-6 rounded-[2rem] border-2 text-left transition-all duration-300 ${selectedMode === mode.id
                                                        ? "border-primary bg-primary/[0.02] shadow-xl shadow-primary/10 ring-4 ring-primary/5"
                                                        : "border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
                                                        }`}
                                                >
                                                    {mode.badge && (
                                                        <span className={`absolute -top-3 right-6 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${selectedMode === mode.id
                                                            ? "bg-primary text-white"
                                                            : "bg-gray-100 text-gray-500"
                                                            }`}>
                                                            {mode.badge}
                                                        </span>
                                                    )}
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className={`p-3.5 rounded-2xl transition-colors duration-300 ${selectedMode === mode.id
                                                            ? "bg-primary text-white"
                                                            : "bg-gray-100 text-gray-600"
                                                            }`}>
                                                            {mode.icon}
                                                        </div>
                                                        <span className={`text-xl font-bold tracking-tight ${selectedMode === mode.id
                                                            ? "text-primary"
                                                            : "text-gray-900"
                                                            }`}>
                                                            {mode.name}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                                                        {mode.description}
                                                    </p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Upload Button */}
                                    <div className="flex justify-center pt-4">
                                        <Button
                                            size="lg"
                                            onClick={handleUpload}
                                            className="h-16 px-12 text-xl font-black bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/30 min-w-[320px] rounded-[1.5rem] transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            <Sparkles className="w-6 h-6 mr-3" />
                                            CREATE PRO PHOTOS
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-12 space-y-12">
                            {status === "processing" || status === "uploading" ? (
                                <ProcessingProgress status={status} progress={progress} />
                            ) : (
                                <div className="animate-in fade-in zoom-in-95 duration-700 space-y-12">
                                    <ResultsViewer
                                        results={processedResults}
                                        onSelect={handleVariationSelect}
                                    />

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                        <Button
                                            size="lg"
                                            onClick={handleDownloadZip}
                                            className="h-16 px-10 text-lg font-bold bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20 rounded-2xl min-w-[240px]"
                                        >
                                            <Download className="w-6 h-6 mr-3" />
                                            DOWNLOAD ALL
                                        </Button>

                                        <Button
                                            size="lg"
                                            variant="outline"
                                            onClick={handleReset}
                                            className="h-16 px-10 text-lg font-bold border-2 border-gray-100 hover:bg-gray-50 rounded-2xl"
                                        >
                                            <RotateCcw className="w-6 h-6 mr-3" />
                                            START NEW
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <LimitModal
                isOpen={isLimitModalOpen}
                onClose={() => setIsLimitModalOpen(false)}
                used={usageLimit?.used || 0}
                limit={usageLimit?.limit || 3}
            />

            <LoginRequiredModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </section>
    );
}
