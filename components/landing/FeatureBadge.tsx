"use client";

import { ReactNode } from "react";

interface FeatureBadgeProps {
    children: ReactNode;
    className?: string;
    position?: "left" | "right";
}

export function FeatureBadge({ children, className = "", position = "left" }: FeatureBadgeProps) {
    // В референсе бейджи белые с розовой обводкой и розовой точкой/линией
    // Они выглядят как "выноски"

    return (
        <div
            className={`
                absolute 
                group
                flex items-center gap-2
                bg-white 
                border border-primary/20
                text-gray-900 
                px-4 py-2.5 rounded-2xl 
                text-sm font-semibold
                shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)]
                animate-in fade-in slide-in-from-bottom-2
                hover:scale-105 transition-transform
                cursor-default
                z-20
                ${className}
            `}
        >
            {/* Pink dot indicator */}
            <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(254,69,132,0.5)]" />
            {children}
        </div>
    );
}
