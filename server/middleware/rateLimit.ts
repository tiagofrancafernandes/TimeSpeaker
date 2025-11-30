import type { H3Event } from 'h3'

// In-memory rate limit store
// In production, use Redis or similar distributed cache
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

/**
 * Rate limiting middleware
 * Sliding window algorithm based on IP address
 */
export default defineEventHandler((event: H3Event) => {
    const config = useRuntimeConfig()
    const isAuthenticated = event.context.isAuthenticated || false

    // Get rate limits from config
    const limitUnauth = config.rateLimitUnauth || 5
    const limitAuth = config.rateLimitAuth || 20
    const limit = isAuthenticated ? limitAuth : limitUnauth

    // Get client identifier (IP address)
    const clientIp = getRequestIP(event, { xForwardedFor: true }) || 'unknown'
    const now = Date.now()
    const windowMs = 60 * 1000 // 1 minute window

    // Get or create rate limit entry
    let entry = rateLimitStore.get(clientIp)

    // Reset if window expired
    if (!entry || now > entry.resetTime) {
        entry = {
            count: 0,
            resetTime: now + windowMs,
        }
        rateLimitStore.set(clientIp, entry)
    }

    // Increment request count
    entry.count++

    // Check if limit exceeded
    if (entry.count > limit) {
        setResponseStatus(event, 429, 'Too Many Requests')
        setResponseHeaders(event, {
            'Retry-After': Math.ceil((entry.resetTime - now) / 1000).toString(),
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': entry.resetTime.toString(),
        })

        throw createError({
            statusCode: 429,
            statusMessage: 'Too Many Requests',
            data: {
                error: 'Rate limit exceeded',
                limit,
                retryAfter: Math.ceil((entry.resetTime - now) / 1000),
            },
        })
    }

    // Add rate limit headers
    setResponseHeaders(event, {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': (limit - entry.count).toString(),
        'X-RateLimit-Reset': entry.resetTime.toString(),
    })
})

/**
 * Clean up expired entries periodically
 * This prevents memory leaks in long-running processes
 */
setInterval(
    () => {
        const now = Date.now()
        for (const [key, value] of rateLimitStore.entries()) {
            if (now > value.resetTime) {
                rateLimitStore.delete(key)
            }
        }
    },
    5 * 60 * 1000
) // Run every 5 minutes
