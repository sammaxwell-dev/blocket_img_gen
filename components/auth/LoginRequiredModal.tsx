'use client'

import { Button } from '@/components/ui/button'
import { X, LogIn, UserPlus, ShieldCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

interface LoginRequiredModalProps {
    isOpen: boolean
    onClose: () => void
}

export function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed inset-0 z-[61] flex items-center justify-center p-4"
                    >
                        <div
                            className="bg-white rounded-[2rem] shadow-2xl max-w-lg w-full p-8 md:p-12 relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Background gradient blur */}
                            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
                            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />

                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            <div className="relative z-10 text-center">
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-purple-600 mb-8 shadow-xl shadow-primary/20 ring-8 ring-primary/5">
                                    <ShieldCheck className="w-10 h-10 text-white" />
                                </div>

                                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
                                    Sign In to Continue
                                </h2>
                                <p className="text-gray-500 text-lg mb-10 leading-relaxed">
                                    Join SnapturaAI to transform your product photos.
                                    Get <span className="text-primary font-bold">3 free generations</span> every day.
                                </p>

                                <div className="space-y-4">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    >
                                        <Link href="/login">
                                            <LogIn className="w-5 h-5 mr-3" />
                                            Log In to Your Account
                                        </Link>
                                    </Button>

                                    <Button
                                        asChild
                                        variant="outline"
                                        size="lg"
                                        className="w-full h-14 rounded-2xl border-2 border-gray-100 hover:bg-gray-50 text-gray-900 text-lg font-bold transition-all"
                                    >
                                        <Link href="/login">
                                            <UserPlus className="w-5 h-5 mr-3" />
                                            Create Free Account
                                        </Link>
                                    </Button>
                                </div>

                                <div className="mt-10 flex items-center justify-center gap-6 text-sm font-medium text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-primary" />
                                        <span>Free Forever</span>
                                    </div>
                                    <div className="w-1 h-1 bg-gray-200 rounded-full" />
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-primary" />
                                        <span>Secure Access</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
