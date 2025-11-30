<script setup>
import { useDarkMode } from './composables/useDarkMode'

const { initialize } = useDarkMode()
initialize()
</script>

<template>
    <UApp>
        <NuxtPage />
    </UApp>
</template>
