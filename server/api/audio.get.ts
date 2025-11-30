import { detectSession } from '../utils/sessionDetector'
import { getCurrentTimeFormatted } from '../utils/timeFormatter'
import { generateAudio, getTTSLanguageCode } from '../utils/googleTTS'
import { getOrCreateCache } from '../utils/audioCache'

/**
 * GET /api/audio
 * Generates or retrieves cached audio of current time
 */
export default defineEventHandler(async (event) => {
    try {
        // Detect language and timezone from request
        const { language, timezone } = detectSession(event)

        // Get current time formatted in the detected language
        const timeText = getCurrentTimeFormatted(timezone, language)

        // Get TTS language code
        const ttsLanguage = getTTSLanguageCode(language)

        // Get or create cached audio
        const { buffer, hash, cached } = await getOrCreateCache(timeText, language, async () => {
            return await generateAudio(timeText, ttsLanguage)
        })

        // Check Accept header to determine response type
        const acceptHeader = getHeader(event, 'Accept') || getHeader(event, 'accept') || ''

        if (acceptHeader.includes('application/json')) {
            // Return JSON response with audio URL
            const audioUrl = `/audio-cache/${hash}.mp3`

            return {
                url: audioUrl,
                language,
                timezone,
                time: new Date().toLocaleString('en-US', { timeZone: timezone }),
                text: timeText,
                cached,
            }
        }

        // Return audio file directly
        setResponseHeaders(event, {
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': `inline; filename="${hash}.mp3"`,
            'Cache-Control': 'public, max-age=60', // Cache for 1 minute
        })

        return buffer
    } catch (error) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            data: {
                error: 'Failed to generate audio',
                message: error instanceof Error ? error.message : 'Unknown error',
            },
        })
    }
})
