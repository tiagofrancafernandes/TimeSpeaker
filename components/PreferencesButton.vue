<template>
    <button class="preferences-button" @click="handleSave">
        <span class="icon">💾</span>
        <span class="text">Save as Default Preferences</span>
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

<style scoped>
.preferences-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1.75rem;
    font-size: 1rem;
    font-weight: 600;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.preferences-button:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.05);
    transform: translateY(-1px);
}

.icon {
    font-size: 1.25rem;
    line-height: 1;
}

@media (max-width: 640px) {
    .preferences-button {
        padding: 0.75rem 1.5rem;
        font-size: 0.875rem;
    }

    .icon {
        font-size: 1rem;
    }
}
</style>
