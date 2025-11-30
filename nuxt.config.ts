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
});
