<template>
    <div class="w-full space-y-4">
        <!-- Auto-Speak Checkbox -->
        <div class="flex items-center gap-3">
            <input
                id="auto-speak-checkbox"
                v-model="localEnabled"
                type="checkbox"
                class="w-5 h-5 text-indigo-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-2 cursor-pointer"
                @change="handleEnabledChange"
            />
            <label
                for="auto-speak-checkbox"
                class="text-base font-medium text-gray-900 dark:text-gray-100 cursor-pointer select-none"
            >
                Automatically speak the time
            </label>
        </div>

        <!-- Repeat Cycle Selector (only shown when enabled) -->
        <div v-if="localEnabled" class="ml-8 space-y-2">
            <label for="repeat-cycle-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Repeat cycle:
            </label>
            <select
                id="repeat-cycle-select"
                v-model="localRepeatCycle"
                class="block w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
                @change="handleRepeatCycleChange"
            >
                <option value="hour">Closed hour (every hour)</option>
                <option value="half-hour">Every half hour</option>
                <option value="quarter">Quarter hour (every 15 minutes)</option>
                <option value="ten-minutes">1/6 hour (every 10 minutes)</option>
                <option value="even-hours">Even hours</option>
                <option value="odd-hours">Odd hours</option>
            </select>

            <!-- Visual Indicator -->
            <div class="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400">
                <span class="inline-block w-2 h-2 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-pulse"></span>
                <span>Auto-speak active</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

import { type RepeatCycle, useAutoSpeak } from '@/composables/useAutoSpeak';

const props = defineProps<{
    enabled: boolean;
    repeatCycle: RepeatCycle;
}>();

const emit = defineEmits<{
    'update:enabled': [value: boolean];
    'update:repeatCycle': [value: RepeatCycle];
}>();

const localEnabled = ref(props.enabled);
const localRepeatCycle = ref(props.repeatCycle);

watch(
    () => props.enabled,
    (newValue) => {
        localEnabled.value = newValue;
    }
);

watch(
    () => props.repeatCycle,
    (newValue) => {
        localRepeatCycle.value = newValue;
    }
);

const handleEnabledChange = () => {
    emit('update:enabled', localEnabled.value);
};

const handleRepeatCycleChange = () => {
    emit('update:repeatCycle', localRepeatCycle.value);
};
</script>
