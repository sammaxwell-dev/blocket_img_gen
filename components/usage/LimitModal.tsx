'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Sparkles, Zap, Check } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface LimitModalProps {
    isOpen: boolean
    onClose: () => void
    used: number
    limit: number
}

export function LimitModal({ isOpen, onClose, used, limit }: LimitModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div
                            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            {/* Icon */}
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                                        <Zap className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
                                        <span className="text-lg">😅</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
                                Daily Limit Reached
                            </h2>
                            <p className="text-center text-gray-600 mb-6">
                                You've used all {limit} free photo enhancements for today.
                                Upgrade to Pro for unlimited processing!
                            </p>

                            {/* Pro benefits */}
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 mb-6 border border-purple-100/50">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles className="w-5 h-5 text-purple-500" />
                                    <span className="font-semibold text-gray-900">Pro Benefits</span>
                                </div>
                                <ul className="space-y-2">
                                    {[
                                        'Unlimited photo enhancements',
                                        'Priority processing',
                                        'HD quality downloads',
                                        'Remove watermarks',
                                    ].map((benefit) => (
                                        <li key={benefit} className="flex items-center gap-2 text-sm text-gray-700">
                                            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <Button
                                asChild
                                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/20 font-medium"
                            >
                                <Link href="/pricing">
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    Upgrade to Pro — 99 SEK/mo
                                </Link>
                            </Button>

                            <p className="text-center text-xs text-gray-500 mt-4">
                                Or wait until tomorrow for {limit} more free photos
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
