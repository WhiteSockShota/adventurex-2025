<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { sleep } from '@/utils/async'

const router = useRouter()
const route = useRoute()

onMounted(async () => {
  await gsap.fromTo('.epilepsy-warning', { opacity: 0 }, { opacity: 1, duration: 1 }).then()
  await sleep(1000)
  await gsap.fromTo('.epilepsy-warning', { opacity: 1 }, { opacity: 0, duration: 1 }).then()
  router.push(route.query.next as string)
})
</script>

<template>
  <div class="w-full h-full flex items-center justify-center bg-black text-white p-8">
    <div class="max-w-xl text-center space-y-6 epilepsy-warning">
      <h1 class="text-3xl font-bold">光敏性癫痫警告</h1>
      <p>
        本游戏包含快速闪烁的图像、强烈的光影变化与图案，可能会引起光敏性癫痫发作。
        如果你或你的家人曾经有癫痫史，请在游玩前咨询医生。
      </p>
      <p>
        请在光线充足的房间中游玩，并保持适当距离。如在游玩过程中感到头晕、视力模糊、抽搐或意识丧失，请立即停止游戏并寻求医疗帮助。
      </p>
    </div>
  </div>
</template>