<template>
    <div class="timezone-selector">
        <div v-if="!isEditing" class="display-mode">
            <div class="current-timezone">
                <span class="label">Timezone:</span>
                <span class="value">{{ modelValue }}</span>
            </div>
            <button class="edit-button" @click="startEditing">Edit</button>
        </div>

        <div v-else class="edit-mode">
            <label for="timezone-select" class="label">Select Timezone</label>
            <select id="timezone-select" v-model="selectedTimezone" class="select">
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
            <div class="buttons">
                <button class="save-button" @click="saveTimezone">Save</button>
                <button class="cancel-button" @click="cancelEditing">Cancel</button>
            </div>
        </div>
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

const isEditing = ref(false)
const selectedTimezone = ref(props.modelValue)

watch(
    () => props.modelValue,
    (newValue) => {
        selectedTimezone.value = newValue
    }
)

const startEditing = () => {
    isEditing.value = true
    selectedTimezone.value = props.modelValue
}

const saveTimezone = () => {
    emit('update:modelValue', selectedTimezone.value)
    emit('change', selectedTimezone.value)
    isEditing.value = false
}

const cancelEditing = () => {
    selectedTimezone.value = props.modelValue
    isEditing.value = false
}
</script>

<style scoped>
.timezone-selector {
    width: 100%;
}

.display-mode {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
}

.current-timezone {
    display: flex;
    gap: 0.5rem;
}

.label {
    font-size: 0.875rem;
    font-weight: 600;
    opacity: 0.8;
}

.value {
    font-size: 0.875rem;
    font-weight: 500;
}

.edit-button {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    border: none;
    border-radius: 0.375rem;
    background: #667eea;
    color: white;
    cursor: pointer;
    transition: background 0.2s ease;
}

.edit-button:hover {
    background: #5568d3;
}

.edit-mode {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.select {
    padding: 0.75rem 1rem;
    font-size: 1rem;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
}

.select:focus {
    outline: none;
    border-color: #667eea;
}

.buttons {
    display: flex;
    gap: 0.75rem;
}

.save-button,
.cancel-button {
    flex: 1;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.save-button {
    background: #48bb78;
    color: white;
}

.save-button:hover {
    background: #38a169;
}

.cancel-button {
    background: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.7);
}

.cancel-button:hover {
    background: rgba(0, 0, 0, 0.15);
}
</style>
