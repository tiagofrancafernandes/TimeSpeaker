<template>
    <button
        class="play-button"
        :class="{ playing, disabled: isDisabled, loading }"
        :disabled="isDisabled"
        @click="handlePlay"
    >
        <span v-if="loading" class="icon">⏳</span>
        <span v-else-if="playing" class="icon">🔊</span>
        <span v-else class="icon">▶️</span>
        <span class="text">
            {{ buttonText }}
        </span>
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAudio } from '../composables/useAudio'

const props = defineProps<{
    language?: string
    timezone?: string
}>()

const { playing, disabled, loading, playCurrentTime } = useAudio()

const isDisabled = computed(() => disabled.value || loading.value)

const buttonText = computed(() => {
    if (loading.value) return 'Loading...'
    if (playing.value) return 'Playing...'
    if (disabled.value) return 'Wait...'
    return 'Play Current Time'
})

const handlePlay = () => {
    playCurrentTime(props.language, props.timezone)
}
</script>

<style scoped>
.play-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    font-size: 1.125rem;
    font-weight: 600;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
}

.play-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.play-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
}

.play-button.playing {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.play-button.loading {
    background: linear-gradient(135deg, #ffa751 0%, #ffe259 100%);
}

.icon {
    font-size: 1.5rem;
    line-height: 1;
}

@media (max-width: 640px) {
    .play-button {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    }

    .icon {
        font-size: 1.25rem;
    }
}
</style>
