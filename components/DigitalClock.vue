<template>
    <div class="digital-clock">
        <div class="time-display">
            {{ formattedTime }}
        </div>
        <div class="date-display">
            {{ formattedDate }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps<{
    timezone: string
}>()

const currentTime = ref(new Date())
let intervalId: number | null = null

const formattedTime = computed(() => {
    return currentTime.value.toLocaleTimeString('en-US', {
        timeZone: props.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    })
})

const formattedDate = computed(() => {
    return currentTime.value.toLocaleDateString('en-US', {
        timeZone: props.timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
})

onMounted(() => {
    // Update every second
    intervalId = window.setInterval(() => {
        currentTime.value = new Date()
    }, 1000)
})

onUnmounted(() => {
    if (intervalId !== null) {
        clearInterval(intervalId)
    }
})
</script>

<style scoped>
.digital-clock {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
}

.time-display {
    font-size: 4rem;
    font-weight: 700;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.1em;
}

.date-display {
    font-size: 1.25rem;
    opacity: 0.8;
}

@media (max-width: 640px) {
    .time-display {
        font-size: 2.5rem;
    }

    .date-display {
        font-size: 1rem;
    }
}
</style>
