import { describe, it, expect } from 'vitest'
import { formatTime, getCurrentTimeFormatted } from '../../server/utils/timeFormatter'

describe('Time Formatter', () => {
    describe('formatTime - Portuguese (pt-BR)', () => {
        it('should format hour only (minutes = 0)', () => {
            const date1 = new Date('2025-11-30T01:00:00')
            const date2 = new Date('2025-11-30T02:00:00')
            const date23 = new Date('2025-11-30T23:00:00')

            expect(formatTime(date1, 'pt-BR')).toBe('uma hora')
            expect(formatTime(date2, 'pt-BR')).toBe('dois horas')
            expect(formatTime(date23, 'pt-BR')).toBe('vinte e três horas')
        })

        it('should format hour with minutes', () => {
            const date1 = new Date('2025-11-30T01:32:00')
            const date15 = new Date('2025-11-30T15:05:00')
            const date2 = new Date('2025-11-30T02:25:00')

            expect(formatTime(date1, 'pt-BR')).toBe('uma hora e trinta e dois minutos')
            expect(formatTime(date15, 'pt-BR')).toBe('quinze horas e cinco minutos')
            expect(formatTime(date2, 'pt-BR')).toBe('dois horas e vinte e cinco minutos')
        })

        it('should handle one minute specially', () => {
            const date = new Date('2025-11-30T10:01:00')
            expect(formatTime(date, 'pt-BR')).toBe('dez horas e um minuto')
        })
    })

    describe('formatTime - English (en)', () => {
        it("should format hour only with o'clock", () => {
            const date1 = new Date('2025-11-30T01:00:00')
            const date2 = new Date('2025-11-30T02:00:00')
            const date12 = new Date('2025-11-30T12:00:00')

            expect(formatTime(date1, 'en')).toBe("one o'clock")
            expect(formatTime(date2, 'en')).toBe("two o'clock")
            expect(formatTime(date12, 'en')).toBe("twelve o'clock")
        })

        it('should format hour with minutes', () => {
            const date1 = new Date('2025-11-30T01:32:00')
            const date3 = new Date('2025-11-30T03:15:00')
            const date10 = new Date('2025-11-30T10:45:00')

            expect(formatTime(date1, 'en')).toBe('one thirty-two')
            expect(formatTime(date3, 'en')).toBe('three fifteen')
            expect(formatTime(date10, 'en')).toBe('ten forty-five')
        })
    })

    describe('formatTime - Spanish (es)', () => {
        it('should format hour only', () => {
            const date1 = new Date('2025-11-30T01:00:00')
            const date2 = new Date('2025-11-30T02:00:00')
            const date20 = new Date('2025-11-30T20:00:00')

            expect(formatTime(date1, 'es')).toBe('una hora')
            expect(formatTime(date2, 'es')).toBe('dos horas')
            expect(formatTime(date20, 'es')).toBe('veinte horas')
        })

        it('should format hour with minutes', () => {
            const date1 = new Date('2025-11-30T01:32:00')
            const date15 = new Date('2025-11-30T15:05:00')
            const date3 = new Date('2025-11-30T03:25:00')

            expect(formatTime(date1, 'es')).toBe('una hora y treinta y dos minutos')
            expect(formatTime(date15, 'es')).toBe('quince horas y cinco minutos')
            expect(formatTime(date3, 'es')).toBe('tres horas y veinticinco minutos')
        })

        it('should handle one minute specially', () => {
            const date = new Date('2025-11-30T10:01:00')
            expect(formatTime(date, 'es')).toBe('diez horas y un minuto')
        })
    })

    describe('getCurrentTimeFormatted', () => {
        it('should return formatted time string', () => {
            // This test will use current system time
            const result = getCurrentTimeFormatted('UTC', 'en')

            // Just verify it returns a non-empty string
            expect(result).toBeTruthy()
            expect(typeof result).toBe('string')
        })

        it('should work with different timezones', () => {
            const resultUTC = getCurrentTimeFormatted('UTC', 'pt-BR')
            const resultSP = getCurrentTimeFormatted('America/Sao_Paulo', 'pt-BR')

            // Both should return non-empty strings
            expect(resultUTC).toBeTruthy()
            expect(resultSP).toBeTruthy()
        })
    })

    describe('Edge cases', () => {
        it('should handle midnight (00:00)', () => {
            const date = new Date('2025-11-30T00:00:00')

            expect(formatTime(date, 'pt-BR')).toBe('zero horas')
            expect(formatTime(date, 'en')).toBe("zero o'clock")
            expect(formatTime(date, 'es')).toBe('cero horas')
        })

        it('should handle noon (12:00)', () => {
            const date = new Date('2025-11-30T12:00:00')

            expect(formatTime(date, 'pt-BR')).toBe('doze horas')
            expect(formatTime(date, 'en')).toBe("twelve o'clock")
            expect(formatTime(date, 'es')).toBe('doce horas')
        })

        it('should default to English for unknown language', () => {
            const date = new Date('2025-11-30T14:30:00')
            const result = formatTime(date, 'fr') // Unknown language

            expect(result).toBe('fourteen thirty')
        })
    })
})
