<template>
    <div class="w-full">
        <div v-if="!isEditing" class="w-full">
            <label class="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Timezone:</label>
            <div
                class="flex items-center justify-between gap-3 px-4 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
            >
                <span class="text-gray-900 dark:text-gray-100 font-medium">{{ modelValue }}</span>
                <button
                    class="px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-gray-600 border border-indigo-300 dark:border-indigo-500 rounded-md transition-colors cursor-pointer"
                    @click="startEditing"
                >
                    Edit
                </button>
            </div>
        </div>

        <div v-else class="w-full space-y-3">
            <label for="timezone-select" class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Select Timezone
            </label>
            <div class="flex flex-col sm:flex-row gap-2">
                <select
                    id="timezone-select"
                    v-model="selectedTimezone"
                    class="flex-1 block px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400"
                >
                    <option value="UTC">UTC</option>
                    <option value="America/Sao_Paulo">São Paulo (BRT)</option>
                    <option value="America/New_York">New York (EST)</option>
                    <option value="America/Los_Angeles">Los Angeles (PST)</option>
                    <option value="Europe/London">London (GMT)</option>
                    <option value="Europe/Paris">Paris (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Asia/Shanghai">Shanghai (CST)</option>
                    <option value="Australia/Sydney">Sydney (AEDT)</option>
                </select>
                <div class="flex gap-2">
                    <button
                        class="px-4 py-2 text-sm text-white bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 border border-indigo-600 dark:border-indigo-500 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800 shadow-sm font-medium rounded-lg transition-colors cursor-pointer"
                        @click="saveTimezone"
                    >
                        Save
                    </button>
                    <button
                        class="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 shadow-sm font-medium rounded-lg transition-colors cursor-pointer"
                        @click="cancelEditing"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
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

const isEditing = ref(false);
const selectedTimezone = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newValue) => {
        selectedTimezone.value = newValue;
    }
);

const startEditing = () => {
    isEditing.value = true;
    selectedTimezone.value = props.modelValue;
};

const saveTimezone = () => {
    emit('update:modelValue', selectedTimezone.value);
    emit('change', selectedTimezone.value);
    isEditing.value = false;
};

const cancelEditing = () => {
    selectedTimezone.value = props.modelValue;
    isEditing.value = false;
};
</script>
