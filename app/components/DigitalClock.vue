<template>
    <div class="flex flex-col items-center gap-2">
        <div class="text-5xl md:text-7xl font-bold font-mono tracking-wider text-gray-900 dark:text-gray-100">
            {{ formattedTime }}
        </div>
        <div class="text-lg md:text-xl text-gray-600 dark:text-gray-400 opacity-80">
            {{ formattedDate }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
    timezone: string;
}>();

const currentTime = ref(new Date());
let intervalId: number | null = null;

const formattedTime = computed(() => {
    return currentTime.value.toLocaleTimeString('en-US', {
        timeZone: props.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
});

const formattedDate = computed(() => {
    return currentTime.value.toLocaleDateString('en-US', {
        timeZone: props.timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
});

onMounted(() => {
    // Update every second
    intervalId = window.setInterval(() => {
        currentTime.value = new Date();
    }, 1000);
});

onUnmounted(() => {
    if (intervalId !== null) {
        clearInterval(intervalId);
    }
});
</script>
