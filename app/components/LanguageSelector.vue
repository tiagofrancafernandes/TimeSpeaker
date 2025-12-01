<template>
    <div class="w-full">
        <label for="language-select" class="block mb-2.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            Language
        </label>
        <select
            id="language-select"
            v-model="selectedLanguage"
            class="block w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
            @change="handleChange"
        >
            <option value="en">English</option>
            <option value="pt-BR">Português (Brasil)</option>
            <option value="es">Español</option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: string;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: string];
    change: [value: string];
}>();

const selectedLanguage = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        selectedLanguage.value = newValue;
    }
);

const handleChange = () => {
    emit('update:modelValue', selectedLanguage.value);
    emit('change', selectedLanguage.value);
};
</script>
