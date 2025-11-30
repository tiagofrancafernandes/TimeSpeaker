/**
 * Generate audio using Google Translator TTS API
 * @param text - Text to be spoken
 * @param language - Language code (pt, en, es)
 * @returns Audio buffer (MP3)
 */
export async function generateAudio(text: string, language: string): Promise<Buffer> {
    const config = useRuntimeConfig()
    const ttsSpeed = config.ttsSpeed || 0.5

    // Encode text for URL
    const encodedText = encodeURIComponent(text)

    // Build Google TTS URL
    const url = `https://translate.googleapis.com/translate_tts?client=gtx&q=${encodedText}&tl=${language}&ttsspeed=${ttsSpeed}`

    try {
        // Fetch audio from Google TTS
        const response = await fetch(url, {
            headers: {
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
            },
        })

        if (!response.ok) {
            throw new Error(`Google TTS API returned ${response.status}: ${response.statusText}`)
        }

        // Convert response to buffer
        const arrayBuffer = await response.arrayBuffer()
        return Buffer.from(arrayBuffer)
    } catch (error) {
        throw new Error(
            `Failed to generate audio: ${error instanceof Error ? error.message : 'Unknown error'}`
        )
    }
}

/**
 * Map language codes to TTS language codes
 */
export function getTTSLanguageCode(language: string): string {
    const languageMap: Record<string, string> = {
        'pt-BR': 'pt',
        'en-US': 'en',
        'es-ES': 'es',
        pt: 'pt',
        en: 'en',
        es: 'es',
    }

    return languageMap[language] || 'en'
}
