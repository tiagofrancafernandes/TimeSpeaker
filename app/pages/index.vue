<template>
    <div
        class="min-h-screen flex items-center justify-center p-0 bg-linear-to-b from-indigo-100 to-indigo-900 dark:from-indigo-800 dark:to-gray-950 py-3"
    >
        <div
            class="relative w-full md:max-w-4xl px-8 rounded-3xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 py-6 shadow-2xl"
        >
            <!-- Dark Mode Toggle Button -->
            <button
                @click="toggleDarkMode"
                class="absolute top-4 right-4 p-2.5 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 shadow-md"
                aria-label="Toggle dark mode"
            >
                <span v-if="isDark" class="text-xl">☀️</span>
                <span v-else class="text-xl">🌙</span>
            </button>

            <header class="mb-8 pt-2">
                <h1 class="text-4xl md:text-5xl font-bold text-center mb-2 text-indigo-600 dark:text-indigo-400">
                    TimeSpeaker
                </h1>
                <p class="text-center text-gray-600 dark:text-gray-400 text-lg">
                    Listen to the current time in your language
                </p>
            </header>

            <div>{{ { currentLanguage, currentTimezone } }}</div>

            <main class="px-2 md:px-4 pb-2 md:pb-4 space-y-8" v-if="currentLanguage && currentTimezone">

                    <!-- Digital Clock -->
                    <div class="flex justify-center">
                        <DigitalClock :timezone="currentTimezone" />
                    </div>

                    <!-- Play Button -->
                    <div class="flex justify-center">
                        <PlayButton :language="currentLanguage" :timezone="currentTimezone" />
                    </div>

                    <!-- Settings -->
                    <div class="space-y-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <LanguageSelector v-model="currentLanguage" @change="handleLanguageChange" />
                            <TimezoneSelector v-model="currentTimezone" @change="handleTimezoneChange" />
                        </div>

                        <div class="flex justify-center mt-6">
                            <PreferencesButton
                                :language="currentLanguage"
                                :timezone="currentTimezone"
                                @saved="handlePreferencesSaved"
                            />
                        </div>
                    </div>
            </main>

            <footer class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <p>Powered by Google Translator TTS</p>
                <p class="flex items-center justify-center gap-2">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        GitHub
                    </a>
                    <span>•</span>
                    <a
                        href="/api/session"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                        API Docs
                    </a>
                </p>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    onBeforeMount,
    onMounted,
    ref,
} from 'vue'

import DigitalClock from '@/components/DigitalClock.vue'
import LanguageSelector from '@/components/LanguageSelector.vue'
import PlayButton from '@/components/PlayButton.vue'
import PreferencesButton from '@/components/PreferencesButton.vue'
import TimezoneSelector from '@/components/TimezoneSelector.vue'
import { usePreferences } from '@/composables/usePreferences'
import { useDarkMode } from '@/composables/useDarkMode'

const { getLanguage, getTimezone, updateURL, initialize } = usePreferences();
const { isDark, toggleDarkMode, initialize: initializeDarkMode } = useDarkMode();

const currentLanguage = ref('en-US');
const currentTimezone = ref('UTC');

onBeforeMount(() => {
    initialize();
    initializeDarkMode();
    currentLanguage.value = getLanguage() || currentLanguage.value || 'en-US';
    currentTimezone.value = getTimezone() || currentTimezone.value || 'UTC';
});

onMounted(() => {
    console.log('currentLanguage.value', currentLanguage.value);
    console.log('currentTimezone.value', currentTimezone.value);
});

const handleLanguageChange = (newLanguage: string) => {
    currentLanguage.value = newLanguage;
    updateURL(currentLanguage.value, currentTimezone.value);
};

const handleTimezoneChange = (newTimezone: string) => {
    currentTimezone.value = newTimezone;
    updateURL(currentLanguage.value, currentTimezone.value);
};

const handlePreferencesSaved = () => {
    // Show a toast or notification (optional)
    console.log('Preferences saved successfully!');
};
</script>
