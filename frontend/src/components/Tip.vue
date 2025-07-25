<template>
  <div class="border border-white p-4 bg-black shadow-md text-white">
    <p>{{ $props.title }}</p>
    <div><slot /></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
