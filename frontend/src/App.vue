<script setup lang="ts">
import 'virtual:uno.css'
import { IconoirProvider } from '@iconoir/vue';
</script>

<template>
  <IconoirProvider :icon-props="{
    'color': '#000000',
    'stroke-width': 2,
    'width': '2rem',
    'height': '2rem',
  }">
    <RouterView class="w-screen h-screen"></RouterView>
  </IconoirProvider>
</template>