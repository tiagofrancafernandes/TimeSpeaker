import { describe, it, expect, vi } from 'vitest';

describe('API /api/audio', () => {
    it('should generate audio hash correctly', async () => {
        const { generateHash } = await import('../../../server/utils/hash');

        const hash = generateHash('duas horas', 'pt-BR');

        expect(hash).toBeTruthy();
        expect(typeof hash).toBe('string');
        expect(hash.length).toBe(32); // MD5 hash length
    });

    it('should format time correctly for different languages', async () => {
        const { formatTime } = await import('../../../server/utils/timeFormatter');

        const date = new Date('2025-11-30T14:30:00');

        const ptBR = formatTime(date, 'pt-BR');
        const en = formatTime(date, 'en');
        const es = formatTime(date, 'es');

        expect(ptBR).toContain('quatorze');
        expect(ptBR).toContain('trinta');
        expect(en).toContain('fourteen');
        expect(en).toContain('thirty');
        expect(es).toContain('catorce');
        expect(es).toContain('treinta');
    });

    it('should handle hour-only times', async () => {
        const { formatTime } = await import('../../../server/utils/timeFormatter');

        const date = new Date('2025-11-30T14:00:00');

        const ptBR = formatTime(date, 'pt-BR');
        const en = formatTime(date, 'en');

        expect(ptBR).toBe('quatorze horas');
        expect(en).toBe("fourteen o'clock");
    });

    it('should map language codes correctly for TTS', async () => {
        const { getTTSLanguageCode } = await import('../../../server/utils/googleTTS');

        expect(getTTSLanguageCode('pt-BR')).toBe('pt');
        expect(getTTSLanguageCode('en-US')).toBe('en');
        expect(getTTSLanguageCode('es-ES')).toBe('es');
        expect(getTTSLanguageCode('pt')).toBe('pt');
        expect(getTTSLanguageCode('en')).toBe('en');
    });
});
