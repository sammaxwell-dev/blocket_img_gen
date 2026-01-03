'use client'

import { FingerprintProvider } from '@/lib/fingerprint'
import { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
    return (
        <FingerprintProvider>
            {children}
        </FingerprintProvider>
    )
}
