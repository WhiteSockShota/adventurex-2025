<script setup lang="ts">
import { useAudioStore } from '@/stores/audioStore';
import { useGameManager } from '@/stores/gameStore';
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const gameManager = useGameManager()
const audioStore = useAudioStore()
const router = useRouter()

onMounted(() => {
  gameManager.playSubtitle(undefined)
})

const username = ref("")

function handleStartClick() {
  audioStore.pause()
  if (username.value.length !== 0) {
    gameManager.setUsername(username.value)
    const nextUrl = encodeURIComponent('/text?text=2060.07.26&to=/twitter')
    router.push('/warning?next=' + nextUrl)
  }
}
</script>

<!-- src/components/StartScreen.vue -->
<template>
  <div class="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"
    @click="audioStore.play('/audio/2060Blues.mp3')">
    <!-- 背景特效 -->
    <div class="absolute inset-0 animate-pulse opacity-10 bg-gradient-to-br from-red-500 via-black to-blue-500"></div>

    <!-- 标题 -->
    <h1 class="text-6xl font-bold tracking-widest z-10">Patient Zero</h1>

    <!-- 副标题 -->
    <p class="mt-4 text-lg z-10 text-gray-300">2060 年 7 月 27 日</p>

    <input v-model="username"
      class="outline-none border-none z-10 border-none bg-transparent border-b-solid text-white font-[MiSans] text-1rem text-center"></input>

    <p class="text-1.2rem z-2">⬆️为你的角色起个名字⬆️</p>

    <!-- 开始按钮 -->
    <div
      class="mt-12 px-8 py-3 text-xl font-semibold bg-white text-black rounded hover:bg-gray-200 transition z-10 decoration-none"
      to="/twitter" @click="handleStartClick">
      ▶ 开始游戏
    </div>

    <!-- 底部信息 -->
    <span class="absolute bottom-3rem text-xs text-gray-500 z-10">
      AdventureX 2025 ·
      <p class="font-[JetbrainsMono] inline">wss://</p>
      team
    </span>
  </div>
</template>
