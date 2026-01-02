
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoCarouselProps {
    images: string[]; // List of result URLs
    onClose?: () => void;
}

export function PhotoCarousel({ images, onClose }: PhotoCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto bg-black/5 rounded-2xl overflow-hidden shadow-2xl border border-white/20 aspect-[4/3] md:aspect-video flex items-center justify-center">
            {/* Viewer Area */}
            <div className="relative w-full h-full flex items-center justify-center p-4 bg-muted/20 backdrop-blur-sm">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentIndex}
                        src={images[currentIndex]}
                        alt={`Result ${currentIndex + 1}`}
                        className="max-h-full max-w-full object-contain shadow-lg rounded-md"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    />
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handlePrev}
                    className="pointer-events-auto h-12 w-12 rounded-full shadow-xl bg-white/80 hover:bg-white backdrop-blur-md"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleNext}
                    className="pointer-events-auto h-12 w-12 rounded-full shadow-xl bg-white/80 hover:bg-white backdrop-blur-md"
                >
                    <ChevronRight className="w-6 h-6" />
                </Button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Thumbnails (Optional, minimal for now) */}
        </div>
    );
}
