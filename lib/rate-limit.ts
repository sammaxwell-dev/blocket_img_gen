import { createClient } from '@/lib/supabase/server'

// Лимиты по типам пользователей
export const RATE_LIMITS = {
    anonymous: 0,      // Анонимам нельзя генерировать
    free: 3,           // 3 фото/день для залогиненных Free
    pro: Infinity,     // Безлимит для Pro
} as const

export type UserTier = keyof typeof RATE_LIMITS

interface UsageResult {
    allowed: boolean
    used: number
    limit: number
    remaining: number
}

/**
 * Проверяет и инкрементирует использование
 */
export async function checkAndIncrementUsage(
    identifier: string,
    identifierType: 'user' | 'fingerprint',
    tier: UserTier = 'anonymous'
): Promise<UsageResult> {
    // Pro пользователи - всегда разрешено
    if (tier === 'pro') {
        return { allowed: true, used: 0, limit: Infinity, remaining: Infinity }
    }

    const limit = RATE_LIMITS[tier]
    const supabase = await createClient()

    const { data, error } = await supabase.rpc('check_and_increment_usage', {
        p_identifier: identifier,
        p_identifier_type: identifierType,
        p_daily_limit: limit,
    })

    if (error) {
        console.error('Rate limit check error:', error)
        // При ошибке разрешаем (fail open для лучшего UX)
        return { allowed: true, used: 0, limit, remaining: limit }
    }

    const result = data as { allowed: boolean; used: number; limit: number }
    return {
        ...result,
        remaining: Math.max(0, result.limit - result.used),
    }
}

/**
 * Получает текущее использование без инкремента
 */
export async function getUsage(
    identifier: string,
    identifierType: 'user' | 'fingerprint',
    tier: UserTier = 'anonymous'
): Promise<UsageResult> {
    if (tier === 'pro') {
        return { allowed: true, used: 0, limit: Infinity, remaining: Infinity }
    }

    const limit = RATE_LIMITS[tier]
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('usage_limits')
        .select('photos_processed, reset_date')
        .eq('identifier', identifier)
        .eq('identifier_type', identifierType)
        .single()

    if (error || !data) {
        // Нет записи = еще не использовал
        return { allowed: true, used: 0, limit, remaining: limit }
    }

    // Проверяем, не новый ли день
    const today = new Date().toISOString().split('T')[0]
    if (data.reset_date !== today) {
        return { allowed: true, used: 0, limit, remaining: limit }
    }

    const used = data.photos_processed
    return {
        allowed: used < limit,
        used,
        limit,
        remaining: Math.max(0, limit - used),
    }
}

/**
 * Определяет tier пользователя по данным из Supabase
 */
export async function getUserTier(userId?: string): Promise<UserTier> {
    if (!userId) return 'anonymous'

    const supabase = await createClient()
    const { data } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', userId)
        .single()

    if (data?.subscription_status === 'pro') return 'pro'
    return 'free'
}
