import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { H3Event } from 'h3'
import {
    detectLanguage,
    detectTimezone,
    detectSession,
    isValidLanguage,
    isValidTimezone,
} from '../../server/utils/sessionDetector'

// Mock H3 functions
vi.mock('h3', () => ({
    getQuery: vi.fn(),
    getHeader: vi.fn(),
    getRequestIP: vi.fn(),
}))

describe('Session Detector', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.stubGlobal('useRuntimeConfig', () => ({
            defaultLanguage: 'en',
            defaultTimezone: 'UTC',
        }))
    })

    describe('detectLanguage', () => {
        it('should prioritize query parameter', async () => {
            const { getQuery } = await import('h3')
            vi.mocked(getQuery).mockReturnValue({ language: 'pt-BR' })

            const event = {} as H3Event
            const result = detectLanguage(event)

            expect(result).toBe('pt-BR')
        })

        it('should use X-Language header when no query param', async () => {
            const { getQuery, getHeader } = await import('h3')
            vi.mocked(getQuery).mockReturnValue({})
            vi.mocked(getHeader).mockReturnValue('es')

            const event = {} as H3Event
            const result = detectLanguage(event)

            expect(result).toBe('es')
        })

        it('should parse Accept-Language header', async () => {
            const { getQuery, getHeader } = await import('h3')
            vi.mocked(getQuery).mockReturnValue({})
            vi.mocked(getHeader).mockImplementation((_, header) => {
                if (header === 'Accept-Language' || header === 'accept-language') {
                    return 'pt-BR,pt;q=0.9,en;q=0.8'
                }
                return null
            })

            const event = {} as H3Event
            const result = detectLanguage(event)

            expect(result).toBe('pt-BR')
        })

        it('should use default when no detection method works', async () => {
            const { getQuery, getHeader } = await import('h3')
            vi.mocked(getQuery).mockReturnValue({})
            vi.mocked(getHeader).mockReturnValue(null)

            const event = {} as H3Event
            const result = detectLanguage(event)

            expect(result).toBe('en')
        })
    })

    describe('detectTimezone', () => {
        it('should prioritize query parameter', async () => {
            const { getQuery } = await import('h3')
            vi.mocked(getQuery).mockReturnValue({ timezone: 'America/Sao_Paulo' })

            const event = {} as H3Event
            const result = detectTimezone(event)

            expect(result).toBe('America/Sao_Paulo')
        })

        it('should use X-Timezone header when no query param', async () => {
            const { getQuery, getHeader } = await import('h3')
            vi.mocked(getQuery).mockReturnValue({})
            vi.mocked(getHeader).mockReturnValue('Europe/London')

            const event = {} as H3Event
            const result = detectTimezone(event)

            expect(result).toBe('Europe/London')
        })

        it('should use default when no detection method works', async () => {
            const { getQuery, getHeader } = await import('h3')
            vi.mocked(getQuery).mockReturnValue({})
            vi.mocked(getHeader).mockReturnValue(null)

            const event = {} as H3Event
            const result = detectTimezone(event)

            expect(result).toBe('UTC')
        })
    })

    describe('detectSession', () => {
        it('should return both language and timezone', async () => {
            const { getQuery } = await import('h3')
            vi.mocked(getQuery).mockReturnValue({
                language: 'pt-BR',
                timezone: 'America/Sao_Paulo',
            })

            const event = {} as H3Event
            const result = detectSession(event)

            expect(result).toEqual({
                language: 'pt-BR',
                timezone: 'America/Sao_Paulo',
            })
        })
    })

    describe('isValidLanguage', () => {
        it('should validate supported languages', () => {
            expect(isValidLanguage('pt-BR')).toBe(true)
            expect(isValidLanguage('pt')).toBe(true)
            expect(isValidLanguage('en')).toBe(true)
            expect(isValidLanguage('en-US')).toBe(true)
            expect(isValidLanguage('es')).toBe(true)
            expect(isValidLanguage('es-ES')).toBe(true)
        })

        it('should reject invalid languages', () => {
            expect(isValidLanguage('fr')).toBe(false)
            expect(isValidLanguage('de')).toBe(false)
            expect(isValidLanguage('invalid')).toBe(false)
        })
    })

    describe('isValidTimezone', () => {
        it('should validate correct timezone identifiers', () => {
            expect(isValidTimezone('UTC')).toBe(true)
            expect(isValidTimezone('America/Sao_Paulo')).toBe(true)
            expect(isValidTimezone('Europe/London')).toBe(true)
            expect(isValidTimezone('Asia/Tokyo')).toBe(true)
        })

        it('should reject invalid timezone identifiers', () => {
            expect(isValidTimezone('Invalid/Timezone')).toBe(false)
            expect(isValidTimezone('Not_A_Timezone')).toBe(false)
        })
    })
})
