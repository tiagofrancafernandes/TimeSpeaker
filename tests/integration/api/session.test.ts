import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('API /api/session', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return session information with default values', async () => {
        const mockEvent = {
            context: {},
            method: 'GET',
        }

        // Mock dependencies
        vi.mock('h3', () => ({
            getQuery: vi.fn(() => ({})),
            getHeader: vi.fn(() => null),
        }))

        vi.stubGlobal('useRuntimeConfig', () => ({
            defaultLanguage: 'en',
            defaultTimezone: 'UTC',
        }))

        // Import after mocking
        const { detectSession } = await import('../../../server/utils/sessionDetector')
        const result = detectSession(mockEvent as any)

        expect(result).toHaveProperty('language')
        expect(result).toHaveProperty('timezone')
        expect(result.language).toBe('en')
        expect(result.timezone).toBe('UTC')
    })

    it('should detect language from query parameter', async () => {
        vi.mock('h3', () => ({
            getQuery: vi.fn(() => ({ language: 'pt-BR' })),
            getHeader: vi.fn(() => null),
        }))

        vi.stubGlobal('useRuntimeConfig', () => ({
            defaultLanguage: 'en',
            defaultTimezone: 'UTC',
        }))

        const { detectSession } = await import('../../../server/utils/sessionDetector')
        const mockEvent = { context: {}, method: 'GET' }
        const result = detectSession(mockEvent as any)

        expect(result.language).toBe('pt-BR')
    })

    it('should detect timezone from query parameter', async () => {
        vi.mock('h3', () => ({
            getQuery: vi.fn(() => ({ timezone: 'America/Sao_Paulo' })),
            getHeader: vi.fn(() => null),
        }))

        vi.stubGlobal('useRuntimeConfig', () => ({
            defaultLanguage: 'en',
            defaultTimezone: 'UTC',
        }))

        const { detectSession } = await import('../../../server/utils/sessionDetector')
        const mockEvent = { context: {}, method: 'GET' }
        const result = detectSession(mockEvent as any)

        expect(result.timezone).toBe('America/Sao_Paulo')
    })
})
