<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
import Tip from '@/components/Tip.vue'
import { ref } from 'vue'
</script>

<template>
  <main class="flex items-center justify-center" ref="main">
    <router-link to="/twitter" class="decoration-none color-#FF0000">
      <p class="text-5rem">始めましょ</p>
      <Tip title="Tip">Hello, this is a tip</Tip>
    </router-link>
  </main>
</template>
