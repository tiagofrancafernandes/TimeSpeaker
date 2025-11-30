import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    css: ['./app/assets/css/main.css'],

    typescript: {
        strict: true,
        typeCheck: false,
    },

    runtimeConfig: {
        appEnv: process.env.APP_ENV || 'production',
        isDevelopment: process.env.APP_ENV === 'development',
        audioCacheDir: process.env.AUDIO_CACHE_DIR || './public/audio-cache',
        rateLimitUnauth: parseInt(process.env.RATE_LIMIT_UNAUTH || '5'),
        enableDevBypassLimit: Boolean(process.env.ENABLE_DEV_BYPASS_LIMIT ?? process.env.APP_ENV === 'development'),
        devBypassLimit: parseInt(process.env.DEV_BYPASS_LIMIT || '120'),
        rateLimitAuth: parseInt(process.env.RATE_LIMIT_AUTH || '20'),
        defaultLanguage: process.env.DEFAULT_LANGUAGE || 'en',
        defaultTimezone: process.env.DEFAULT_TIMEZONE || 'UTC',
        ttsSpeed: parseFloat(process.env.TTS_SPEED || '0.5'),
    },

    modules: [
        '@nuxt/content',
        '@nuxt/scripts',
        '@nuxt/test-utils',
        '@nuxt/ui',
        '@nuxtjs/color-mode',
        '@vite-pwa/nuxt',
        //
    ],

    colorMode: {
        preference: 'light', // default value of $colorMode.preference
        fallback: 'light', // fallback value if not system preference found
        globalName: '__NUXT_COLOR_MODE__',
        componentName: 'ColorScheme',
        classPrefix: '',
        classSuffix: '',
        storage: 'localStorage', // or 'sessionStorage' or 'cookie'
        storageKey: 'nuxt-color-mode',
    },

    ui: {
        icons: {
            light: 'i-ph-sun',
            dark: 'i-ph-moon',
        },
        theme: {
            colors: [
                'primary',
                'secondary',
                'tertiary',
                'info',
                'success',
                'warning',
                'error',
                //
            ],
        },
    },

    vite: {
        plugins: [
            tailwindcss(),
            //
        ],
    },

    nitro: {
        experimental: {
            openAPI: true,
        },
    },

    pwa: {
        registerType: 'autoUpdate',
        manifest: {
            name: 'TimeSpeaker',
            short_name: 'TimeSpeaker',
            description: 'Listen to the current time in your language with automatic announcements',
            theme_color: '#6366f1',
            background_color: '#ffffff',
            display: 'standalone',
            orientation: 'portrait',
            scope: '/',
            start_url: '/',
            icons: [
                {
                    src: '/icon-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: '/icon-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: '/icon-maskable-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                    purpose: 'maskable',
                },
                {
                    src: '/icon-maskable-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
            ],
        },
        workbox: {
            navigateFallback: '/',
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
            cleanupOutdatedCaches: true,
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/translate\.googleapis\.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'google-tts-cache',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
            ],
        },
        devOptions: {
            enabled: true,
            type: 'module',
        },
    },
});
