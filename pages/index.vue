<template>
    <div class="container">
        <div class="content">
            <header class="header">
                <h1 class="title">TimeSpeaker</h1>
                <p class="subtitle">Listen to the current time in your language</p>
            </header>

            <main class="main">
                <!-- Digital Clock -->
                <div class="clock-section">
                    <DigitalClock :timezone="currentTimezone" />
                </div>

                <!-- Play Button -->
                <div class="play-section">
                    <PlayButton :language="currentLanguage" :timezone="currentTimezone" />
                </div>

                <!-- Settings -->
                <div class="settings-section">
                    <div class="settings-grid">
                        <LanguageSelector v-model="currentLanguage" @change="handleLanguageChange" />
                        <TimezoneSelector v-model="currentTimezone" @change="handleTimezoneChange" />
                    </div>

                    <div class="preferences-section">
                        <PreferencesButton
                            :language="currentLanguage"
                            :timezone="currentTimezone"
                            @saved="handlePreferencesSaved"
                        />
                    </div>
                </div>
            </main>

            <footer class="footer">
                <p>Powered by Google Translator TTS</p>
                <p class="links">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                    •
                    <a href="/api/session" target="_blank" rel="noopener noreferrer">API Docs</a>
                </p>
            </footer>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePreferences } from '../composables/usePreferences'
import DigitalClock from '../components/DigitalClock.vue'
import PlayButton from '../components/PlayButton.vue'
import LanguageSelector from '../components/LanguageSelector.vue'
import TimezoneSelector from '../components/TimezoneSelector.vue'
import PreferencesButton from '../components/PreferencesButton.vue'

const { getLanguage, getTimezone, updateURL, initialize } = usePreferences()

const currentLanguage = ref('')
const currentTimezone = ref('')

onMounted(() => {
    initialize()
    currentLanguage.value = getLanguage()
    currentTimezone.value = getTimezone()
})

const handleLanguageChange = (newLanguage: string) => {
    currentLanguage.value = newLanguage
    updateURL(currentLanguage.value, currentTimezone.value)
}

const handleTimezoneChange = (newTimezone: string) => {
    currentTimezone.value = newTimezone
    updateURL(currentLanguage.value, currentTimezone.value)
}

const handlePreferencesSaved = () => {
    // Show a toast or notification (optional)
    console.log('Preferences saved successfully!')
}
</script>

<style scoped>
.container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.content {
    width: 100%;
    max-width: 800px;
    background: white;
    border-radius: 1.5rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    padding: 3rem;
}

.header {
    text-align: center;
    margin-bottom: 3rem;
}

.title {
    font-size: 3rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
}

.subtitle {
    font-size: 1.125rem;
    color: rgba(0, 0, 0, 0.6);
}

.main {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.clock-section {
    text-align: center;
}

.play-section {
    display: flex;
    justify-content: center;
}

.settings-section {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.settings-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.preferences-section {
    display: flex;
    justify-content: center;
}

.footer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(0, 0, 0, 0.1);
    text-align: center;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.6);
}

.links {
    margin-top: 0.5rem;
}

.links a {
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
}

.links a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .content {
        padding: 2rem;
    }

    .title {
        font-size: 2rem;
    }

    .subtitle {
        font-size: 1rem;
    }

    .settings-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 640px) {
    .container {
        padding: 1rem;
    }

    .content {
        padding: 1.5rem;
    }

    .main {
        gap: 2rem;
    }
}
</style>
