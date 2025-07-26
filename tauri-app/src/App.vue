<script setup lang="ts">
import 'virtual:uno.css'
import { IconoirProvider } from '@iconoir/vue'
import { useGameManager } from './stores/gameStore';
import { onMounted, Transition } from 'vue';

const gameManager = useGameManager()

onMounted(() => {
  gameManager.refreshSubtitle()
})
</script>

<template>
  <div class="w-full h-full relative items-center justify-center overflow-auto flex">
    <IconoirProvider :icon-props="{
      color: '#000000',
      'stroke-width': 2,
      width: '2rem',
      height: '2rem',
    }">
      <RouterView v-slot="{ Component, route }">
        <!-- Use a custom transition or fallback to `fade` -->
        <Transition :name="(route.meta.transition as string)">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </IconoirProvider>
    <p class="absolute bottom-4rem m0 bg-black/50 px2 py-1 rounded-sm color-white font-[JetbrainsMono]"
      v-if="gameManager.currentSubtitleLine">{{ gameManager.currentSubtitleLine.text }}</p>
  </div>
</template>
