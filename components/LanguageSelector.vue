<template>
    <div class="language-selector">
        <label for="language-select" class="label">Language</label>
        <select id="language-select" v-model="selectedLanguage" class="select" @change="handleChange">
            <option value="en">English</option>
            <option value="pt-BR">Português (Brasil)</option>
            <option value="es">Español</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
    change: [value: string]
}>()

const selectedLanguage = ref(props.modelValue)

watch(
    () => props.modelValue,
    (newValue) => {
        selectedLanguage.value = newValue
    }
)

const handleChange = () => {
    emit('update:modelValue', selectedLanguage.value)
    emit('change', selectedLanguage.value)
}
</script>

<style scoped>
.language-selector {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.label {
    font-size: 0.875rem;
    font-weight: 600;
    opacity: 0.8;
}

.select {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    transition: border-color 0.2s ease;
}

.select:hover {
    border-color: rgba(102, 126, 234, 0.5);
}

.select:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
</style>
