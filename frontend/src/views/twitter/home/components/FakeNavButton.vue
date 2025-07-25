<script setup lang="ts">
defineProps({
  name: String,
})
</script>

<template>
  <div
    class="flex items-center justify-center space-x-1rem cursor-pointer transition-all hover:bg-black/10 rounded-full my-5 px-6 py-4 w-fit"
  >
    <slot></slot>
    <p class="font-medium text-1.5rem decoration-none m0 inline-block">{{ name }}</p>
  </div>
</template>
