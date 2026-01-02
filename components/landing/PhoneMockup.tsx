"use client";

import Image from "next/image";

interface PhoneMockupProps {
    imageSrc?: string;
    className?: string;
}

export function PhoneMockup({ imageSrc, className = "" }: PhoneMockupProps) {
    return (
        <div className={`relative ${className} perspective-[2000px]`}>
            {/* Phone frame container with tilt */}
            <div
                className="
                    relative w-[300px] md:w-[340px]
                    aspect-[9/19.5]
                    rounded-[3.5rem]
                    bg-[#1a1a1a]
                    p-3
                    shadow-[0_50px_100px_-20px_rgba(50,50,93,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)]
                    transform rotate-[-8deg] rotate-y-12 rotate-x-6
                    transition-all duration-700 ease-out
                    hover:rotate-0 hover:rotate-y-0 hover:rotate-x-0 hover:translate-y-[-10px]
                "
                style={{
                    transformStyle: 'preserve-3d',
                }}
            >
                {/* Side buttons */}
                <div className="absolute top-24 -left-[2px] w-[2px] h-8 bg-gray-800 rounded-l-md" />
                <div className="absolute top-36 -left-[2px] w-[2px] h-14 bg-gray-800 rounded-l-md" />
                <div className="absolute top-28 -right-[2px] w-[2px] h-20 bg-gray-800 rounded-r-md" />

                {/* Main Screen */}
                <div className="relative w-full h-full rounded-[3rem] overflow-hidden bg-white border border-gray-800">

                    {/* Dynamic Island / Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-20 flex items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-full bg-black blur-md opacity-50 absolute" />
                    </div>

                    {/* Status Bar Mockup */}
                    <div className="absolute top-0 w-full px-8 py-3 flex justify-between items-center z-10 text-[10px] font-medium text-gray-900">
                        <span>9:41</span>
                        <div className="flex gap-1.5 grayscale opacity-80">
                            <div className="w-4 h-2.5 bg-current rounded-sm" />
                            <div className="w-3 h-2.5 bg-current rounded-sm" />
                        </div>
                    </div>

                    {/* App Content */}
                    <div className="w-full h-full bg-[#FAFAFA] flex flex-col">

                        {/* Header Area */}
                        <div className="pt-14 pb-4 px-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 leading-tight">Good morning,<br />Alex!</h3>
                                    <p className="text-xs text-primary font-medium mt-1">Time to list on Blocket!</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm" />
                            </div>

                            {/* Pink Stats Card */}
                            <div className="bg-primary text-white p-4 rounded-2xl shadow-lg shadow-primary/30 mb-6 relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-medium opacity-90">Total Value</span>
                                        <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">New</span>
                                    </div>
                                    <div className="text-2xl font-bold">4,250 kr</div>
                                    <div className="text-[10px] opacity-80 mt-1">From 3 active listings</div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Photos List (Mock) */}
                        <div className="flex-1 bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] p-6">
                            <div className="flex justify-between items-center mb-4 px-1">
                                <h4 className="font-bold text-gray-900 text-sm">Recent Optimizations</h4>
                                <span className="text-xs text-gray-400">View all</span>
                            </div>

                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3 items-center p-2 rounded-xl hover:bg-gray-50 transition-colors">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 relative overflow-hidden">
                                            {/* Mock image content */}
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-[8px]">
                                                IMG_0{i}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-gray-900">Vintage Lamp</div>
                                            <div className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                Ready to sell
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400">
                                            →
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Floating Action Button Mock */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                                <div className="bg-gray-900 text-white px-5 py-2.5 rounded-full flex items-center gap-2 shadow-xl shadow-gray-900/20 text-xs font-medium">
                                    <span>+ New Photo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
