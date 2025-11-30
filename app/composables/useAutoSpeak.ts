import { ref, watch, onMounted, onUnmounted } from 'vue'

export type RepeatCycle = 'hour' | 'half-hour' | 'quarter' | 'ten-minutes' | 'even-hours' | 'odd-hours'

export interface AutoSpeakConfig {
    enabled: boolean
    repeatCycle: RepeatCycle
}

const isEnabled = ref(false)
const repeatCycle = ref<RepeatCycle>('hour')
const lastSpokenTime = ref<string | null>(null)
let checkInterval: NodeJS.Timeout | null = null

export function useAutoSpeak() {
    /**
     * Check if the current time matches the repeat cycle pattern
     */
    const shouldSpeak = (date: Date, cycle: RepeatCycle): boolean => {
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()

        // Only speak at the exact second (0) to avoid multiple triggers
        if (seconds !== 0) return false

        switch (cycle) {
            case 'hour':
                // Every hour on the hour (14:00, 15:00, etc)
                return minutes === 0

            case 'half-hour':
                // Every half hour (14:00, 14:30, 15:00, 15:30)
                return minutes === 0 || minutes === 30

            case 'quarter':
                // Every quarter hour (14:00, 14:15, 14:30, 14:45)
                return minutes % 15 === 0

            case 'ten-minutes':
                // Every 10 minutes (14:00, 14:10, 14:20, 14:30, 14:40, 14:50)
                return minutes % 10 === 0

            case 'even-hours':
                // Even hours only at the top of the hour (00:00, 02:00, 04:00, etc)
                return minutes === 0 && hours % 2 === 0

            case 'odd-hours':
                // Odd hours only at the top of the hour (01:00, 03:00, 05:00, etc)
                return minutes === 0 && hours % 2 !== 0

            default:
                return false
        }
    }

    /**
     * Get current time as a comparable string (HH:MM)
     */
    const getCurrentTimeKey = (date: Date): string => {
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        return `${hours}:${minutes}`
    }

    /**
     * Start the auto-speak interval checker
     */
    const startAutoSpeak = (onSpeak: () => void) => {
        if (checkInterval) {
            stopAutoSpeak()
        }

        // Check every second if we should speak
        checkInterval = setInterval(() => {
            if (!isEnabled.value) return

            const now = new Date()
            const currentTimeKey = getCurrentTimeKey(now)

            // Check if we should speak and haven't spoken this minute yet
            if (shouldSpeak(now, repeatCycle.value) && lastSpokenTime.value !== currentTimeKey) {
                lastSpokenTime.value = currentTimeKey
                onSpeak()
            }
        }, 1000)
    }

    /**
     * Stop the auto-speak interval checker
     */
    const stopAutoSpeak = () => {
        if (checkInterval) {
            clearInterval(checkInterval)
            checkInterval = null
        }
    }

    /**
     * Enable auto-speak
     */
    const enableAutoSpeak = (cycle: RepeatCycle = 'hour') => {
        isEnabled.value = true
        repeatCycle.value = cycle
        savePreferences()
    }

    /**
     * Disable auto-speak
     */
    const disableAutoSpeak = () => {
        isEnabled.value = false
        savePreferences()
    }

    /**
     * Update repeat cycle
     */
    const setRepeatCycle = (cycle: RepeatCycle) => {
        repeatCycle.value = cycle
        savePreferences()
    }

    /**
     * Save preferences to localStorage
     */
    const savePreferences = () => {
        if (typeof localStorage === 'undefined') return

        const config: AutoSpeakConfig = {
            enabled: isEnabled.value,
            repeatCycle: repeatCycle.value,
        }

        localStorage.setItem('autoSpeak', JSON.stringify(config))
    }

    /**
     * Load preferences from localStorage
     */
    const loadPreferences = () => {
        if (typeof localStorage === 'undefined') return

        const saved = localStorage.getItem('autoSpeak')
        if (!saved) return

        try {
            const config: AutoSpeakConfig = JSON.parse(saved)
            isEnabled.value = config.enabled
            repeatCycle.value = config.repeatCycle
        } catch (error) {
            console.error('Failed to load auto-speak preferences:', error)
        }
    }

    /**
     * Get human-readable label for repeat cycle
     */
    const getRepeatCycleLabel = (cycle: RepeatCycle): string => {
        const labels: Record<RepeatCycle, string> = {
            hour: 'Hora fechada (a cada hora)',
            'half-hour': 'A cada meia hora',
            quarter: 'Quarto de hora (a cada 15 minutos)',
            'ten-minutes': '1/6 de hora (a cada 10 minutos)',
            'even-hours': 'Horas pares',
            'odd-hours': 'Horas ímpares',
        }
        return labels[cycle]
    }

    return {
        isEnabled,
        repeatCycle,
        shouldSpeak,
        startAutoSpeak,
        stopAutoSpeak,
        enableAutoSpeak,
        disableAutoSpeak,
        setRepeatCycle,
        loadPreferences,
        savePreferences,
        getRepeatCycleLabel,
    }
}
