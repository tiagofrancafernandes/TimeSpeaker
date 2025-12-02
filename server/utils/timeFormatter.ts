import { getLanguageConfig } from '../config/languages';

/**
 * Format time to spoken text in the specified language
 * @param date - Date object with the time
 * @param language - Language code (pt-BR, en, es)
 * @returns Formatted time text
 */
export function formatTime(date: Date, language: string): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const config = getLanguageConfig(language);
    return config.formatTime(hours, minutes);
}

/**
 * Get current time in specified timezone and format it
 * @param timezone - IANA timezone identifier (e.g., "America/Sao_Paulo", "UTC")
 * @param language - Language code
 * @returns Formatted time text
 */
export function getCurrentTimeFormatted(timezone: string, language: string): string {
    // Get current time in specified timezone
    const date = new Date(
        new Date().toLocaleString('en-US', {
            timeZone: timezone,
        })
    );

    return formatTime(date, language);
}
