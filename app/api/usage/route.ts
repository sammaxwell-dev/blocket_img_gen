import { NextRequest, NextResponse } from 'next/server'
import { getUsage, getUserTier, RATE_LIMITS } from '@/lib/rate-limit'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
    try {
        const fingerprint = req.headers.get('x-fingerprint')
        const supabase = await createClient()
        const { data: { user } } = await supabase.auth.getUser()

        // Определяем идентификатор и тип
        let identifier: string
        let identifierType: 'user' | 'fingerprint'
        let tier = await getUserTier(user?.id)

        if (user) {
            identifier = user.id
            identifierType = 'user'
        } else if (fingerprint) {
            identifier = fingerprint
            identifierType = 'fingerprint'
            tier = 'anonymous'
        } else {
            return NextResponse.json({
                used: 0,
                limit: RATE_LIMITS.anonymous,
                remaining: RATE_LIMITS.anonymous,
                tier: 'anonymous',
            })
        }

        const usage = await getUsage(identifier, identifierType, tier)

        return NextResponse.json({
            used: usage.used,
            limit: usage.limit,
            remaining: usage.remaining,
            tier,
        })
    } catch (error: any) {
        console.error('Usage API error:', error)
        return NextResponse.json(
            { error: 'Failed to get usage' },
            { status: 500 }
        )
    }
}
