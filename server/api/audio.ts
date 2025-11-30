import { getOrCreateCache } from '../utils/audioCache'
import { generateAudio, getTTSLanguageCode } from '../utils/googleTTS'
import { detectSession } from '../utils/sessionDetector'
import { getCurrentTimeFormatted } from '../utils/timeFormatter'

/**
 * GET /api/audio
 * Generates or retrieves cached audio of current time
 */
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event) || {}

        // Detect language and timezone from request
        const { language, timezone } = detectSession(event)

        let requestURL = getRequestURL(event)
        let baseUrl = String(requestURL || '')?.split('/api/audio')[0] || ''

        let outputType =
            (query['type'] ?? null) && typeof query['type'] === 'string'
                ? (query['type'] ?? '').trim()
                : null

        outputType = ['json', 'json-file', 'mp3', 'audio', 'file', 'mp3-file'].includes(outputType)
            ? outputType
            : null

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

        if (!outputType) {
            outputType = acceptHeader.includes('application/json') ? 'json' : 'mp3-file'
        }

        if (['json', 'json-file'].includes(outputType)) {
            // Return JSON response with audio URL
            const audioUrl = `/audio-cache/${hash}.mp3`

            let getUrlForResponseAs = (url, type = 'json') => {
                type = ['audio', 'json'].includes(type) ? type : 'json'
                url = new URL(String(url))
                url.searchParams.set('type', 'audio')

                return url.toString()
            }

            const now = new Date()

            const getIsoDate = (date = null, timeZone = 'UTC') => {
                date = date || now
                timeZone = timeZone || 'UTC'

                const parts = new Intl.DateTimeFormat('en-CA', {
                    timeZone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                }).formatToParts(date)

                const get = (type) => parts.find((p) => p.type === type).value

                return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}:${get('second')}`
            }

            return {
                path: audioUrl,
                language,
                timezone,
                time: new Date().toLocaleString('en-US', { timeZone: timezone }),
                localeTime: new Date().toLocaleString(language, { timeZone: timezone }),
                isoDate: getIsoDate(now, timezone),
                utcTime: new Date().toLocaleString('en-US', { timeZone: 'UTC' }),
                utcIsoTime: getIsoDate(now, 'UTC'),
                text: timeText,
                baseUrl,
                outputType,
                requestURL,
                url: `${baseUrl}${audioUrl}`,
                responseAsAudio: getUrlForResponseAs(requestURL, 'audio'),
                responseAsJson: getUrlForResponseAs(requestURL, 'json'),
                cached,
            }
        }

        // Return audio file directly
        setResponseHeaders(event, {
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': `inline; filename="${hash}.mp3"`,
            'Cache-Control': 'public, max-age=' + 60 * 5, // Cache for 5 minutes
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
