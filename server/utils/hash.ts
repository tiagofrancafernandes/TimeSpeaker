import { createHash } from 'crypto';

/**
 * Generate MD5 hash from text and language
 * Used for audio cache file naming
 */
export function generateHash(text: string, language: string): string {
    const input = `${text}_${language}`;
    return createHash('md5').update(input).digest('hex');
}
