import { detectSession } from '../utils/sessionDetector';

/**
 * GET /api/session
 * Returns current session information (language, timezone, current time)
 */
export default defineEventHandler((event) => {
    // Detect language and timezone from request
    const { language, timezone } = detectSession(event);

    // Get current time in the detected timezone
    const currentTime = new Date().toLocaleString('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });

    // Format as ISO-like string with timezone info
    const date = new Date(currentTime);
    const isoTime = date.toISOString();

    return {
        language,
        timezone,
        currentTime: isoTime,
    };
});
