"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

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

    const handleMouseDown = useCallback(() => {
        setIsResizing(true);
    }, []);

    const handleMouseUp = useCallback(() => {
        setIsResizing(false);
    }, []);

    const handleMouseMove = useCallback(
        (e: MouseEvent | React.MouseEvent) => {
            if (!isResizing || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const x = (e as MouseEvent).clientX - rect.left;
            const position = Math.max(0, Math.min(100, (x / rect.width) * 100));

            setSliderPosition(position);
        },
        [isResizing]
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent | React.TouchEvent) => {
            if (!isResizing || !containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const touch = (e as TouchEvent).touches[0];
            const x = touch.clientX - rect.left;
            const position = Math.max(0, Math.min(100, (x / rect.width) * 100));

            setSliderPosition(position);
        },
        [isResizing]
    );

    useEffect(() => {
        if (isResizing) {
            window.addEventListener("mousemove", handleMouseMove as any);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchmove", handleTouchMove as any);
            window.addEventListener("touchend", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove as any);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove as any);
            window.removeEventListener("touchend", handleMouseUp);
        };
    }, [isResizing, handleMouseMove, handleMouseUp, handleTouchMove]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-e-resize select-none border-4 border-white shadow-2xl",
                className
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
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
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                    {afterLabel}
                </div>
            </div>

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
            >
                <Image
                    src={beforeImage}
                    alt="Before processing"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
                    {beforeLabel}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-primary">
                    <GripVertical size={16} />
                </div>
            </div>
        </div>
    );
}
