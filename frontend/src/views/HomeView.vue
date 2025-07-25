<script setup lang="ts">
import Tip from '@/components/Tip.vue'
</script>

<template>
  <main class="flex items-center justify-center">
    <router-link to="/twitter" class="decoration-none color-#FF0000">
      <p class="text-5rem">始めましょ</p>
      <Tip title="Tip">Hello, this is a tip</Tip>
    </router-link>
  </main>
</template>
