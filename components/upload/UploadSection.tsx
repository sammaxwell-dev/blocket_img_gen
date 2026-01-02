"use client";

import { useState } from "react";
import { UploadZone } from "./UploadZone";
import { Button } from "@/components/ui/button";
import { Loader2, Download, RotateCcw } from "lucide-react";
import { ProcessingProgress } from "@/components/processing-progress";
import { ResultsViewer } from "@/components/results/ResultsViewer";
import { downloadZip } from "@/lib/zip-utils";

interface Variation {
    name: string;
    imageUrl: string;
}

interface ImageResult {
    original: string;
    variations: Variation[];
}

export function UploadSection() {
    const [files, setFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<"idle" | "uploading" | "processing" | "completed" | "error">("idle");
    const [progress, setProgress] = useState(0);
    const [processedResults, setProcessedResults] = useState<ImageResult[]>([]);
    const [selectedVariations, setSelectedVariations] = useState<Map<number, number>>(new Map());

    const handleFilesSelected = (selectedFiles: File[]) => {
        setFiles(selectedFiles);
        setStatus("idle");
        setProgress(0);
        setProcessedResults([]);
        setSelectedVariations(new Map());
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        setStatus("uploading");
        setProgress(0);

        // Быстро переключаемся на "processing"
        setTimeout(() => setStatus("processing"), 1000);

        const results: ImageResult[] = [];
        const totalFiles = files.length;

        try {
            for (let i = 0; i < totalFiles; i++) {
                const file = files[i];
                const startProgress = (i / totalFiles) * 100;
                setProgress(startProgress);

                const formData = new FormData();
                formData.append("file", file);

                // Симуляция прогресса
                const interval = setInterval(() => {
                    setProgress(prev => Math.min(prev + 1, ((i + 1) / totalFiles) * 100 - 5));
                }, 500);

                const response = await fetch("/api/process", {
                    method: "POST",
                    body: formData,
                });

                clearInterval(interval);

                if (!response.ok) {
                    console.error("Failed to process file", file.name);
                } else {
                    const data = await response.json();
                    if (data.variations && data.original) {
                        results.push({
                            original: data.original,
                            variations: data.variations
                        });
                    }
                }

                setProgress(((i + 1) / totalFiles) * 100);
            }

            setProcessedResults(results);
            setStatus("completed");
            console.log("Processed results:", results);

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

        // Скачиваем выбранные вариации (или первую по умолчанию)
        const images = processedResults.map((result, index) => {
            const selectedVarIndex = selectedVariations.get(index) ?? 0;
            const variation = result.variations[selectedVarIndex];
            return {
                url: variation?.imageUrl || result.original,
                name: `blocket_photo_${index + 1}_${variation?.name?.replace(/\s+/g, '_') || 'enhanced'}.jpg`
            };
        });

        await downloadZip(images);
    };

    return (
        <section id="upload" className="py-24 bg-white border-y border-gray-100">
            <div className="container px-4 mx-auto max-w-5xl">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        {status === "completed" ? "Your Photos are Ready!" : "Start Uploading"}
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        {status === "completed"
                            ? "Choose your favorite style for each photo, then download."
                            : "Select up to 10 photos. We'll generate 3 professional variations for each."}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1 md:p-8">
                    {status === "idle" || status === "error" ? (
                        <>
                            <UploadZone onFilesSelected={handleFilesSelected} />
                            {files.length > 0 && (
                                <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-bottom-4">
                                    <Button
                                        size="lg"
                                        onClick={handleUpload}
                                        className="h-14 px-8 text-xl font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 min-w-[200px] rounded-full"
                                    >
                                        Optimise Photos for Blocket
                                    </Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-8 space-y-8">
                            {status === "processing" || status === "uploading" ? (
                                <ProcessingProgress status={status} progress={progress} />
                            ) : (
                                <div className="animate-in fade-in zoom-in duration-500 space-y-8">
                                    <ResultsViewer
                                        results={processedResults}
                                        onSelect={handleVariationSelect}
                                    />

                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                        <Button
                                            size="lg"
                                            onClick={handleDownloadZip}
                                            className="h-14 px-8 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white min-w-[200px]"
                                        >
                                            <Download className="w-5 h-5 mr-2" />
                                            Download Selected
                                        </Button>

                                        <Button
                                            size="lg"
                                            variant="outline"
                                            onClick={() => setStatus("idle")}
                                            className="h-14 px-8 text-lg"
                                        >
                                            <RotateCcw className="w-5 h-5 mr-2" />
                                            Start Over
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
