<script setup lang="ts">
defineProps({
    name: String
})
</script>

<template>
    <div class="flex items-center space-x-1rem">
        <slot></slot>
        <p class="font-bold text-1.5rem">{{ name }}</p>
    </div>
</template>