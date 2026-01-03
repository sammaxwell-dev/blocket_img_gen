'use client'

import { useEffect, useState } from 'react'
import { useFingerprint } from '@/lib/fingerprint'
import { Zap, Infinity as InfinityIcon } from 'lucide-react'

interface UsageData {
    used: number
    limit: number
    remaining: number
    tier: string
}

export function UsageCounter() {
    const { fingerprint } = useFingerprint()
    const [usage, setUsage] = useState<UsageData | null>(null)
    const [loading, setLoading] = useState(true)

    const fetchUsage = async () => {
        try {
            const res = await fetch('/api/usage', {
                headers: fingerprint ? { 'x-fingerprint': fingerprint } : {},
            })
            if (res.ok) {
                const data = await res.json()
                setUsage(data)
            }
        } catch (error) {
            console.error('Failed to fetch usage:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsage()
    }, [fingerprint])

    // Позволяем внешним компонентам обновлять счётчик
    useEffect(() => {
        const handler = () => fetchUsage()
        window.addEventListener('usage-updated', handler)
        return () => window.removeEventListener('usage-updated', handler)
    }, [fingerprint])

    if (loading || !usage || usage.tier === 'anonymous') {
        return null;
    }

    const isPro = usage.tier === 'pro'
    const percentage = isPro ? 100 : Math.max(0, (usage.remaining / usage.limit) * 100)
    const isLow = !isPro && usage.remaining <= 2

    return (
        <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${isPro
                ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 border border-purple-200/50'
                : isLow
                    ? 'bg-red-50 text-red-700 border border-red-200/50'
                    : 'bg-gray-50 text-gray-700 border border-gray-200/50'
                }`}
        >
            {isPro ? (
                <>
                    <InfinityIcon className="w-4 h-4 text-purple-500" />
                    <span>Pro</span>
                </>
            ) : (
                <>
                    <Zap className={`w-4 h-4 ${isLow ? 'text-red-500' : 'text-primary'}`} />
                    <span>
                        {usage.remaining}/{usage.limit} photos
                    </span>
                </>
            )}
        </div>
    )
}

// Хелпер для обновления счётчика извне
export function triggerUsageUpdate() {
    window.dispatchEvent(new Event('usage-updated'))
}
