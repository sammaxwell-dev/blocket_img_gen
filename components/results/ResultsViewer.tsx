"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface Variation {
    name: string;
    imageUrl: string;
}

interface ImageResult {
    original: string;
    variations: Variation[];
}

interface ResultsViewerProps {
    results: ImageResult[];
    onSelect?: (imageIndex: number, variationIndex: number) => void;
}

export function ResultsViewer({ results, onSelect }: ResultsViewerProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedVariation, setSelectedVariation] = useState(0);
    const [showOriginal, setShowOriginal] = useState(false);
    const [selectedImages, setSelectedImages] = useState<Map<number, number>>(new Map());

    if (!results || results.length === 0) return null;

    const currentResult = results[currentImageIndex];
    const currentVariations = currentResult?.variations || [];
    const hasMultipleImages = results.length > 1;

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev + 1) % results.length);
        setSelectedVariation(0);
        setShowOriginal(false);
    };

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev - 1 + results.length) % results.length);
        setSelectedVariation(0);
        setShowOriginal(false);
    };

    const handleSelectVariation = (index: number) => {
        setSelectedVariation(index);
        setSelectedImages(prev => new Map(prev).set(currentImageIndex, index));
        onSelect?.(currentImageIndex, index);
    };

    const displayImage = showOriginal
        ? currentResult.original
        : currentVariations[selectedVariation]?.imageUrl || currentResult.original;

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6">
            {/* Main Image Display */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl aspect-square md:aspect-[4/3] flex items-center justify-center">
                {/* Image */}
                <div className="relative w-full h-full flex items-center justify-center p-4">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={`${currentImageIndex}-${selectedVariation}-${showOriginal}`}
                            src={displayImage}
                            alt={showOriginal ? "Original" : `Variation ${selectedVariation + 1}`}
                            className="max-h-full max-w-full object-contain shadow-lg rounded-lg"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        />
                    </AnimatePresence>

                    {/* Before/After Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm ${showOriginal
                                ? "bg-gray-800/80 text-white"
                                : "bg-green-500/90 text-white"
                            }`}>
                            {showOriginal ? "Original" : currentVariations[selectedVariation]?.name || "Enhanced"}
                        </span>
                    </div>
                </div>

                {/* Navigation Arrows (for multiple images) */}
                {hasMultipleImages && (
                    <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={handlePrev}
                            className="pointer-events-auto h-12 w-12 rounded-full shadow-xl bg-white/90 hover:bg-white"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </Button>
                        <Button
                            variant="secondary"
                            size="icon"
                            onClick={handleNext}
                            className="pointer-events-auto h-12 w-12 rounded-full shadow-xl bg-white/90 hover:bg-white"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </Button>
                    </div>
                )}

                {/* Image Counter */}
                {hasMultipleImages && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                        {currentImageIndex + 1} / {results.length}
                    </div>
                )}
            </div>

            {/* Toggle Before/After */}
            <div className="flex justify-center">
                <Button
                    variant={showOriginal ? "default" : "outline"}
                    size="lg"
                    onClick={() => setShowOriginal(!showOriginal)}
                    className={`h-12 px-6 rounded-full font-semibold transition-all ${showOriginal
                            ? "bg-gray-800 hover:bg-gray-700 text-white"
                            : "border-2 border-gray-300 hover:border-gray-400"
                        }`}
                >
                    {showOriginal ? (
                        <>
                            <EyeOff className="w-5 h-5 mr-2" />
                            Showing Original
                        </>
                    ) : (
                        <>
                            <Eye className="w-5 h-5 mr-2" />
                            Show Original
                        </>
                    )}
                </Button>
            </div>

            {/* Variation Thumbnails */}
            {currentVariations.length > 0 && (
                <div className="space-y-3">
                    <p className="text-center text-sm text-gray-500 font-medium">
                        Choose your favorite style
                    </p>
                    <div className="flex justify-center gap-3">
                        {currentVariations.map((variation, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelectVariation(index)}
                                className={`relative group rounded-xl overflow-hidden transition-all duration-200 ${selectedVariation === index
                                        ? "ring-4 ring-[#EF3024] ring-offset-2 scale-105"
                                        : "ring-2 ring-gray-200 hover:ring-gray-300 hover:scale-102"
                                    }`}
                            >
                                <img
                                    src={variation.imageUrl}
                                    alt={variation.name}
                                    className="w-20 h-20 md:w-24 md:h-24 object-cover"
                                />
                                {/* Style Name Overlay */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-1.5">
                                    <p className="text-[10px] md:text-xs text-white font-medium text-center truncate">
                                        {variation.name}
                                    </p>
                                </div>
                                {/* Selected Checkmark */}
                                {selectedVariation === index && (
                                    <div className="absolute top-1 right-1 bg-[#EF3024] rounded-full p-0.5">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
