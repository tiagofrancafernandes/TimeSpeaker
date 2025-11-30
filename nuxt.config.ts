import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    css: ['./app/assets/css/main.css'],

    typescript: {
        strict: true,
        typeCheck: true
    },

    runtimeConfig: {
        audioCacheDir: process.env.AUDIO_CACHE_DIR || './public/audio-cache',
        rateLimitUnauth: parseInt(process.env.RATE_LIMIT_UNAUTH || '5'),
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
        //
    ],

    ui: {
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
            openAPI: true
        }
    }
});
