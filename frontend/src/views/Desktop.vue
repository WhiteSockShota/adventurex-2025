<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const wbRef = ref()

// WinBox options
const options = {
  title: 'Browser',
  class: 'backdrop-blur-md rounded-lg shadow-lg no-full text-black no-close',
  background: 'rgba(255, 255, 255, 0.8)',
  x: '25%',
  y: '25%',
}

// Mock apps
const apps = [
  { id: 1, name: 'Browser', icon: '🌐', action: () => openApp('Browser') },
  { id: 2, name: 'Notes', icon: '📝', action: () => alert('Notes app clicked!') },
  { id: 3, name: 'Calculator', icon: '🧮', action: () => alert('Calculator app clicked!') },
]

function openApp(appName: string) {
  if (appName === 'Browser') {
    wbRef.value.open()
  }
}
</script>

<template>
  <div id="desktop" class="flex flex-col items-center justify-center h-screen relative">
    <!-- Dock -->
    <div
      class="dock absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 bg-black/50 px-6 py-4 rounded-lg">
      <div v-for="app in apps" :key="app.id" class="dock-icon flex flex-col items-center cursor-pointer"
        @click="app.action">
        <div class="icon text-4xl">{{ app.icon }}</div>
        <div class="name text-sm mt-2 text-white">{{ app.name }}</div>
      </div>
    </div>

    <!-- WinBox -->
    <!-- <VueWinBox ref="wbRef" :options="options">
      <Browser url="/twitter"></Browser>
    </VueWinBox> -->
  </div>
</template>

<style>
#desktop {
  background-image: url('../../public/wallpaper.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.dock {
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}

.dock-icon {
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.dock-icon:hover {
  transform: scale(1.1);
}

.icon {
  font-size: 2rem;
}

.name {
  font-size: 0.8rem;
  text-align: center;
}
</style>
