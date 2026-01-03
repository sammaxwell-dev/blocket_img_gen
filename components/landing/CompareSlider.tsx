"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface CompareSliderProps {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
    className?: string;
}

export function CompareSlider({
    beforeImage,
    afterImage,
    beforeLabel = "Original",
    afterLabel = "Pro Version",
    className,
}: CompareSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Animation for initial load
    useEffect(() => {
        const timer = setTimeout(() => {
            // Animate from 0 to 50 on mount
            const start = 0;
            const end = 50;
            const duration = 1000;
            const startTime = performance.now();

            const animateSlider = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const ease = 1 - Math.pow(1 - progress, 3);

                setSliderPosition(start + (end - start) * ease);

                if (progress < 1) {
                    requestAnimationFrame(animateSlider);
                }
            };

            requestAnimationFrame(animateSlider);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const handlePointerDown = useCallback(() => {
        setIsResizing(true);
    }, []);

    const handlePointerUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    const handlePointerMove = useCallback(
        (e: PointerEvent | React.PointerEvent) => {
            if (!isResizing || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const position = Math.max(0, Math.min(100, (x / rect.width) * 100));

            setSliderPosition(position);
        },
        [isResizing]
    );

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("pointermove", handlePointerMove as any);
            window.addEventListener("pointerup", handlePointerUp);
        }
        return () => {
            window.removeEventListener("pointermove", handlePointerMove as any);
            window.removeEventListener("pointerup", handlePointerUp);
        };
    }, [isResizing, handlePointerMove, handlePointerUp]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl ring-1 ring-white/20 touch-none group",
                className
            )}
            onPointerDown={handlePointerDown}
        >
            {/* After Image (Full width background) */}
            <div className="absolute inset-0">
                <Image
                    src={afterImage}
                    alt="After processing"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 shadow-lg">
                    {afterLabel}
                </div>
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={beforeImage}
                        alt="Before processing"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute top-6 left-6 bg-black/40 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-medium border border-white/10 shadow-lg">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white z-20 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center text-primary transform transition-transform duration-200 group-active:scale-110">
                    <GripVertical size={20} />
                </div>
            </div>

            {/* Instruction Overlay (fades out) */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${isResizing || sliderPosition !== 50 ? 'opacity-0' : 'opacity-100 delay-1000'}`}>
                <div className="bg-black/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm animate-pulse border border-white/20">
                    Drag to compare
                </div>
            </div>
        </div>
    );
}
