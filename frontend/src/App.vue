<script setup lang="ts">
import 'virtual:uno.css'
import { IconoirProvider } from '@iconoir/vue'
import { useGameManager } from './stores/gameStore'
import { onMounted } from 'vue'

const gameManager = useGameManager()

onMounted(() => {
  gameManager.refreshSubtitle()
})
</script>

<template>
  <div class="w-full h-full relative items-center justify-center overflow-auto flex">
    <IconoirProvider
      :icon-props="{
        color: '#000000',
        'stroke-width': 2,
        width: '2rem',
        height: '2rem',
      }"
    >
      <router-view v-slot="{ Component, route }" class="w-screen h-screen">
        <transition :name="route.meta.transition as string" class="w-screen h-screen" mode="out-in">
          <component :is="Component" class="w-screen h-screen" />
        </transition>
      </router-view>
    </IconoirProvider>
    <p
      class="absolute bottom-4rem m0 bg-black/50 px2 py-1 rounded-sm color-white font-[JetbrainsMono]"
      v-if="gameManager.currentSubtitleLine"
    >
      {{ gameManager.currentSubtitleLine.text }}
    </p>
  </div>
</template>
