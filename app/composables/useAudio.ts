import { ref } from 'vue'

export const useAudio = () => {
    const playing = ref(false)
    const disabled = ref(false)
    const loading = ref(false)
    const error = ref<string | null>(null)
    const audioElement = ref<HTMLAudioElement | null>(null)

    /**
     * Play current time audio
     */
    const playCurrentTime = async (language?: string, timezone?: string) => {
        if (disabled.value || playing.value) return

        loading.value = true
        error.value = null

        try {
            // Build query params
            const query = new URLSearchParams()
            if (language) query.append('language', language)
            if (timezone) query.append('timezone', timezone)

            const queryString = query.toString()
            const url = `/api/audio${queryString ? `?${queryString}` : ''}`

            // Fetch audio
            const response = await fetch(url, {
                headers: {
                    Accept: 'audio/mpeg',
                },
            })

            if (!response.ok) {
                throw new Error(`Failed to fetch audio: ${response.statusText}`)
            }

            // Create audio blob
            const blob = await response.blob()
            const audioUrl = URL.createObjectURL(blob)

            // Play audio
            if (audioElement.value) {
                audioElement.value.src = audioUrl
                await audioElement.value.play()
            } else {
                const audio = new Audio(audioUrl)
                audioElement.value = audio
                await audio.play()
            }

            playing.value = true

            // Disable button for 15 seconds
            disabled.value = true
            setTimeout(() => {
                disabled.value = false
            }, 15000)

            // Listen for audio end
            audioElement.value?.addEventListener('ended', () => {
                playing.value = false
                URL.revokeObjectURL(audioUrl)
            })
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
            console.error('Failed to play audio:', err)
            disabled.value = false
        } finally {
            loading.value = false
        }
    }

    /**
     * Stop audio playback
     */
    const stop = () => {
        if (audioElement.value) {
            audioElement.value.pause()
            audioElement.value.currentTime = 0
            playing.value = false
        }
    }

    return {
        playing,
        disabled,
        loading,
        error,
        playCurrentTime,
        stop,
    }
}
