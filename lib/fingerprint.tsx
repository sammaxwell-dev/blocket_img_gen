'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

// FingerprintJS Pro не нужен для MVP, используем простой fingerprint
async function generateFingerprint(): Promise<string> {
    // Собираем данные браузера для создания уникального отпечатка
    const components = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        screen.colorDepth,
        new Date().getTimezoneOffset(),
        navigator.hardwareConcurrency || 'unknown',
        // Canvas fingerprint
        await getCanvasFingerprint(),
    ]

    // Создаем хеш из компонентов
    const fingerprint = await hashString(components.join('|'))
    return fingerprint
}

async function getCanvasFingerprint(): Promise<string> {
    try {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) return 'no-canvas'

        ctx.textBaseline = 'top'
        ctx.font = '14px Arial'
        ctx.fillStyle = '#f60'
        ctx.fillRect(125, 1, 62, 20)
        ctx.fillStyle = '#069'
        ctx.fillText('FP', 2, 15)

        return canvas.toDataURL().slice(-50)
    } catch {
        return 'canvas-error'
    }
}

async function hashString(str: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(str)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

interface FingerprintContextType {
    fingerprint: string | null
    loading: boolean
}

const FingerprintContext = createContext<FingerprintContextType>({
    fingerprint: null,
    loading: true,
})

export function FingerprintProvider({ children }: { children: ReactNode }) {
    const [fingerprint, setFingerprint] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Проверяем localStorage сначала
        const cached = localStorage.getItem('device_fingerprint')
        if (cached) {
            setFingerprint(cached)
            setLoading(false)
            return
        }

        // Генерируем новый fingerprint
        generateFingerprint().then((fp) => {
            localStorage.setItem('device_fingerprint', fp)
            setFingerprint(fp)
            setLoading(false)
        })
    }, [])

    return (
        <FingerprintContext.Provider value={{ fingerprint, loading }}>
            {children}
        </FingerprintContext.Provider>
    )
}

export function useFingerprint() {
    return useContext(FingerprintContext)
}
