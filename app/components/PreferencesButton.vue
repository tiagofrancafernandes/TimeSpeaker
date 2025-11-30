<template>
    <button
        class="flex items-center justify-center gap-3 px-6 py-3.5 text-base font-semibold border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer transition-all duration-300 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
        @click="handleSave"
    >
        <span class="text-xl leading-none">💾</span>
        <span>Save as Default Preferences</span>
    </button>
</template>

<script setup lang="ts">
import { usePreferences } from '../composables/usePreferences'

const props = defineProps<{
    language: string
    timezone: string
}>()

const emit = defineEmits<{
    saved: []
}>()

const { savePreferences } = usePreferences()

const handleSave = () => {
    savePreferences(props.language, props.timezone)
    emit('saved')
}
</script>
