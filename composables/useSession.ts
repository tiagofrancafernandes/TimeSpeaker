import { ref } from 'vue'

interface SessionData {
    language: string
    timezone: string
    currentTime: string
}

export const useSession = () => {
    const session = ref<SessionData | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    /**
     * Fetch session information from API
     */
    const fetchSession = async (language?: string, timezone?: string) => {
        loading.value = true
        error.value = null

        try {
            const query = new URLSearchParams()
            if (language) query.append('language', language)
            if (timezone) query.append('timezone', timezone)

            const queryString = query.toString()
            const url = `/api/session${queryString ? `?${queryString}` : ''}`

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`Failed to fetch session: ${response.statusText}`)
            }

            const data = await response.json()
            session.value = data
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Unknown error'
            console.error('Failed to fetch session:', err)
        } finally {
            loading.value = false
        }
    }

    /**
     * Get current time from session
     */
    const getCurrentTime = () => {
        if (!session.value) return null
        return new Date(session.value.currentTime)
    }

    return {
        session,
        loading,
        error,
        fetchSession,
        getCurrentTime,
    }
}
