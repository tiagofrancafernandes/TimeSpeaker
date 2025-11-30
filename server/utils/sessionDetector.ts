import type { H3Event } from 'h3'
import { getQuery, getHeader } from 'h3'

/**
 * Detect language from request
 * Priority chain: query → body → headers → Accept-Language → default
 */
export function detectLanguage(event: H3Event): string {
    const config = useRuntimeConfig()
    const defaultLanguage = config.defaultLanguage || 'en'

    // 1. Query parameters
    const query = getQuery(event)
    if (query.language && typeof query.language === 'string') {
        return query.language
    }

    // 2. Request body (for POST requests)
    // Note: Body reading is async and should be done in the endpoint if needed

    // 3. Custom header X-Language
    const headerLanguage = getHeader(event, 'X-Language') || getHeader(event, 'x-language')
    if (headerLanguage) {
        return headerLanguage
    }

    // 4. Accept-Language header
    const acceptLanguage =
        getHeader(event, 'Accept-Language') || getHeader(event, 'accept-language')
    if (acceptLanguage) {
        // Parse Accept-Language header (e.g., "en-US,en;q=0.9,pt-BR;q=0.8")
        const languages = acceptLanguage
            .split(',')
            .map((lang) => {
                const parts = lang.trim().split(';')
                return parts[0]
            })
            .filter(Boolean)

        if (languages.length > 0) {
            return languages[0]
        }
    }

    // 5. Default value
    return defaultLanguage
}

/**
 * Detect timezone from request
 * Priority chain: query → body → headers → default
 */
export function detectTimezone(event: H3Event): string {
    const config = useRuntimeConfig()
    const defaultTimezone = config.defaultTimezone || 'UTC'

    // 1. Query parameters
    const query = getQuery(event)
    if (query.timezone && typeof query.timezone === 'string') {
        return query.timezone
    }

    // 2. Request body (for POST requests)
    // Note: Body reading is async and should be done in the endpoint if needed

    // 3. Custom header X-Timezone
    const headerTimezone = getHeader(event, 'X-Timezone') || getHeader(event, 'x-timezone')
    if (headerTimezone) {
        return headerTimezone
    }

    // 4. Try to detect from IP (placeholder for now)
    // In a real implementation, you could use a library like geoip-lite
    // const ip = getRequestIP(event)
    // const timezone = getTimezoneFromIP(ip)
    // if (timezone) return timezone

    // 5. Default value
    return defaultTimezone
}

/**
 * Detect both language and timezone from request
 */
export function detectSession(event: H3Event): { language: string; timezone: string } {
    return {
        language: detectLanguage(event),
        timezone: detectTimezone(event),
    }
}

/**
 * Validate language code
 */
export function isValidLanguage(language: string): boolean {
    const validLanguages = ['pt-BR', 'pt', 'en', 'en-US', 'es', 'es-ES']
    return validLanguages.includes(language)
}

/**
 * Validate timezone identifier
 */
export function isValidTimezone(timezone: string): boolean {
    try {
        // Try to create a date with the timezone
        Intl.DateTimeFormat(undefined, { timeZone: timezone })
        return true
    } catch {
        return false
    }
}
