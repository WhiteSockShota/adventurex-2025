<!-- src/components/StartScreen.vue -->
<template>
  <div
    class="w-full h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"
  >
    <!-- 背景特效 -->
    <div
      class="absolute inset-0 animate-pulse opacity-10 bg-gradient-to-br from-red-500 via-black to-blue-500"
    ></div>

    <!-- 标题 -->
    <h1 class="text-6xl font-bold tracking-widest z-10">Patient Zero</h1>

    <!-- 副标题 -->
    <p class="mt-4 text-lg z-10 text-gray-300">2060 年 7 月 27 日 · Dan 的居所</p>

    <!-- 引导文字 -->
    <p class="mt-8 text-center max-w-xl text-sm text-gray-400 z-10">「谢谢你」</p>

    <!-- 开始按钮 -->
    <RouterLink
      class="mt-12 px-8 py-3 text-xl font-semibold bg-white text-black rounded hover:bg-gray-200 transition z-10 decoration-none"
      to="/twitter"
      @click="$emit('start')"
    >
      ▶ 开始游戏
    </RouterLink>

    <!-- 底部信息 -->
    <span class="absolute bottom-3rem text-xs text-gray-500 z-10">
      AdventureX 2025 ·
      <p class="font-[JetbrainsMono] inline">wss://</p>
      team
    </span>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

// 无需额外逻辑，只是展示和触发 @start
</script>

<style scoped>
/* 可选：添加未来感动画或字体 */
</style>
