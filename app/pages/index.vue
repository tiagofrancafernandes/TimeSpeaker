<template>
    <div
        class="min-h-screen flex items-center justify-center p-0 bg-linear-to-b from-indigo-100 to-indigo-900 dark:from-indigo-800 dark:to-gray-950 py-3"
    >
        <div
            class="relative w-full md:max-w-4xl px-8 rounded-3xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-50 py-6 shadow-2xl"
        >
            <header class="mb-8 pt-2">
                <h1 class="text-4xl md:text-5xl font-bold text-center mb-2 text-indigo-600 dark:text-indigo-400">
                    TimeSpeaker
                </h1>
                <p class="text-center text-gray-600 dark:text-gray-400 text-lg">
                    Listen to the current time in your language
                </p>
            </header>

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

                    <!-- Auto-Speak Settings -->
                    <div class="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <AutoSpeakSettings
                            :enabled="autoSpeakEnabled"
                            :repeat-cycle="autoSpeakCycle"
                            @update:enabled="handleAutoSpeakEnabledChange"
                            @update:repeat-cycle="handleRepeatCycleChange"
                        />
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

            <footer
                class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-600 dark:text-gray-400 space-y-2"
            >
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
                    <NuxtLink to="/api-docs" class="text-indigo-600 dark:text-indigo-400 hover:underline">
                        API Docs
                    </NuxtLink>
                </p>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';

import AutoSpeakSettings from '@/components/AutoSpeakSettings.vue';
import DigitalClock from '@/components/DigitalClock.vue';
import LanguageSelector from '@/components/LanguageSelector.vue';
import PlayButton from '@/components/PlayButton.vue';
import PreferencesButton from '@/components/PreferencesButton.vue';
import TimezoneSelector from '@/components/TimezoneSelector.vue';
import { useAudio } from '@/composables/useAudio';
import { type RepeatCycle, useAutoSpeak } from '@/composables/useAutoSpeak';
import { usePreferences } from '@/composables/usePreferences';

const { getLanguage, getTimezone, updateURL, initialize } = usePreferences();
const {
    isEnabled: autoSpeakEnabled,
    repeatCycle: autoSpeakCycle,
    startAutoSpeak,
    stopAutoSpeak,
    enableAutoSpeak,
    disableAutoSpeak,
    setRepeatCycle,
    loadPreferences: loadAutoSpeakPreferences,
} = useAutoSpeak();
const { playCurrentTime } = useAudio();

const tryTz = () => {
    try {
        return Intl?.DateTimeFormat()?.resolvedOptions().timeZone || 'UTC';
    } catch (error) {
        return 'UTC';
    }
};

const currentLanguage = ref('en-US');
const currentTimezone = ref(tryTz());

onBeforeMount(() => {
    initialize();
    loadAutoSpeakPreferences();
    currentLanguage.value = getLanguage() || currentLanguage.value || 'en-US';
    currentTimezone.value = getTimezone() || currentTimezone.value || 'UTC';
});

onMounted(() => {
    console.log('currentLanguage.value', currentLanguage.value);
    console.log('currentTimezone.value', currentTimezone.value);

    // Start auto-speak if enabled
    if (autoSpeakEnabled.value) {
        startAutoSpeak(() => {
            playCurrentTime(currentLanguage.value, currentTimezone.value);
        });
    }
});

onUnmounted(() => {
    stopAutoSpeak();
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

const handleAutoSpeakEnabledChange = (enabled: boolean) => {
    if (enabled) {
        enableAutoSpeak(autoSpeakCycle.value);
        startAutoSpeak(() => {
            playCurrentTime(currentLanguage.value, currentTimezone.value);
        });
    } else {
        disableAutoSpeak();
        stopAutoSpeak();
    }
};

const handleRepeatCycleChange = (cycle: RepeatCycle) => {
    setRepeatCycle(cycle);
    // Restart interval with new cycle if enabled
    if (autoSpeakEnabled.value) {
        stopAutoSpeak();
        startAutoSpeak(() => {
            playCurrentTime(currentLanguage.value, currentTimezone.value);
        });
    }
};
</script>
