<template>
    <button
        class="flex items-center justify-center gap-3 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold border-none rounded-lg cursor-pointer transition-all duration-300 text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        :class="[
            {
                'bg-linear-to-br from-purple-500 to-purple-700 hover:shadow-purple-500/40':
                    !loading && !playing,
                'bg-linear-to-br from-pink-500 to-red-500': playing,
                'bg-linear-to-br from-yellow-400 to-orange-500': loading,
            },
            !isDisabled ? 'hover:-translate-y-0.5 hover:shadow-xl' : '',
        ]"
        :disabled="isDisabled"
        @click="handlePlay"
    >
        <span v-if="loading" class="text-xl md:text-2xl leading-none">⏳</span>
        <span v-else-if="playing" class="text-xl md:text-2xl leading-none">🔊</span>
        <span v-else class="text-xl md:text-2xl leading-none">▶️</span>
        <span>
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
