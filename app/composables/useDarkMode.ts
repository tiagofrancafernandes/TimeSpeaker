import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)
const isInitialized = ref(false)

export function useDarkMode() {
    const toggleDarkMode = () => {
        isDark.value = !isDark.value
        updateDOM()
        savePreference()
    }

    const setDarkMode = (value: boolean) => {
        isDark.value = value
        updateDOM()
        savePreference()
    }

    const updateDOM = () => {
        if (typeof document === 'undefined') return

        if (isDark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    const savePreference = () => {
        if (typeof localStorage === 'undefined') return
        localStorage.setItem('darkMode', isDark.value ? 'dark' : 'light')
    }

    const loadPreference = () => {
        if (typeof localStorage === 'undefined') return

        const savedMode = localStorage.getItem('darkMode')

        if (savedMode) {
            isDark.value = savedMode === 'dark'
        } else {
            // Check system preference
            if (typeof window !== 'undefined' && window.matchMedia) {
                isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
            }
        }

        updateDOM()
    }

    const initialize = () => {
        if (isInitialized.value) return

        loadPreference()
        isInitialized.value = true

        // Watch for system preference changes
        if (typeof window !== 'undefined' && window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
            const handleChange = (e: MediaQueryListEvent) => {
                // Only update if user hasn't set a preference
                if (!localStorage.getItem('darkMode')) {
                    isDark.value = e.matches
                    updateDOM()
                }
            }

            mediaQuery.addEventListener('change', handleChange)

            // Cleanup on unmount would need to be handled by the component
        }
    }

    return {
        isDark,
        toggleDarkMode,
        setDarkMode,
        initialize,
    }
}
