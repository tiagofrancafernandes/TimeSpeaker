import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { H3Event } from 'h3'
import { detectSession } from '../../../server/utils/sessionDetector'

// Mock H3 functions
vi.mock('h3', async () => {
    const actual = await vi.importActual('h3')
    return {
        ...actual,
        getQuery: vi.fn(),
        getHeader: vi.fn(),
    }
})

describe('API /api/session', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        vi.stubGlobal('useRuntimeConfig', () => ({
            defaultLanguage: 'en',
            defaultTimezone: 'UTC',
        }))
    })

    it('should return session information with default values', async () => {
        const { getQuery, getHeader } = await import('h3')
        vi.mocked(getQuery).mockReturnValue({})
        vi.mocked(getHeader).mockReturnValue(null)

        const mockEvent = {} as H3Event
        const result = detectSession(mockEvent)

        expect(result).toHaveProperty('language')
        expect(result).toHaveProperty('timezone')
        expect(result.language).toBe('en')
        expect(result.timezone).toBe('UTC')
    })

    it('should detect language from query parameter', async () => {
        const { getQuery, getHeader } = await import('h3')
        vi.mocked(getQuery).mockReturnValue({ language: 'pt-BR' })
        vi.mocked(getHeader).mockReturnValue(null)

        const mockEvent = {} as H3Event
        const result = detectSession(mockEvent)

        expect(result.language).toBe('pt-BR')
    })

    it('should detect timezone from query parameter', async () => {
        const { getQuery, getHeader } = await import('h3')
        vi.mocked(getQuery).mockReturnValue({ timezone: 'America/Sao_Paulo' })
        vi.mocked(getHeader).mockReturnValue(null)

        const mockEvent = {} as H3Event
        const result = detectSession(mockEvent)

        expect(result.timezone).toBe('America/Sao_Paulo')
    })
})
