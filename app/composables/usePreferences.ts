import { computed, ref } from 'vue';

import { useRoute, useRouter } from 'vue-router';

export const usePreferences = () => {
    const route = useRoute();
    const router = useRouter();

    const language = ref<string>('');
    const timezone = ref<string>('');

    /**
     * Get language with priority: query → localStorage → cookie → default
     */
    const getLanguage = (): string => {
        // 1. Query parameter
        if (route.query.language && typeof route.query.language === 'string') {
            return route.query.language;
        }

        // 2. localStorage
        if (typeof window !== 'undefined') {
            const storedLanguage = localStorage.getItem('language');
            if (storedLanguage) {
                return storedLanguage;
            }

            // 3. Cookie
            const cookieLanguage = document.cookie
                .split('; ')
                .find((row) => row.startsWith('language='))
                ?.split('=')[1];
            if (cookieLanguage) {
                return cookieLanguage;
            }
        }

        // 4. Default
        return 'en';
    };

    /**
     * Get timezone with priority: query → localStorage → cookie → browser → default
     */
    const getTimezone = (): string => {
        // 1. Query parameter
        if (route.query.timezone && typeof route.query.timezone === 'string') {
            return route.query.timezone;
        }

        // 2. localStorage
        if (typeof window !== 'undefined') {
            const storedTimezone = localStorage.getItem('timezone');
            if (storedTimezone) {
                return storedTimezone;
            }

            // 3. Cookie
            const cookieTimezone = document.cookie
                .split('; ')
                .find((row) => row.startsWith('timezone='))
                ?.split('=')[1];
            if (cookieTimezone) {
                return cookieTimezone;
            }

            // 4. Browser timezone
            try {
                const browserTimezone = Intl?.DateTimeFormat()?.resolvedOptions().timeZone;
                if (browserTimezone) {
                    return browserTimezone;
                }
            } catch {
                // Fallback to default
                return Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || 'UTC';
            }
        }

        // 5. Default
        return Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone || 'UTC';
    };

    /**
     * Save preferences to localStorage and cookie
     */
    const savePreferences = (lang: string, tz: string) => {
        if (typeof window === 'undefined') return;

        // Save to localStorage
        localStorage.setItem('language', lang);
        localStorage.setItem('timezone', tz);

        // Save to cookie (expires in 1 year)
        const expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);

        document.cookie = `language=${lang}; expires=${expiryDate.toUTCString()}; path=/`;
        document.cookie = `timezone=${tz}; expires=${expiryDate.toUTCString()}; path=/`;

        // Update refs
        language.value = lang;
        timezone.value = tz;
    };

    /**
     * Update URL query params without navigation
     */
    const updateURL = (lang: string, tz: string) => {
        router.push({
            query: {
                language: lang,
                timezone: tz,
            },
        });
    };

    /**
     * Initialize preferences
     */
    const initialize = () => {
        language.value = getLanguage();
        timezone.value = getTimezone();
    };

    /**
     * Current preferences as computed
     */
    const currentLanguage = computed(() => language.value || getLanguage());
    const currentTimezone = computed(() => timezone.value || getTimezone());

    return {
        language: currentLanguage,
        timezone: currentTimezone,
        getLanguage,
        getTimezone,
        savePreferences,
        updateURL,
        initialize,
    };
};
