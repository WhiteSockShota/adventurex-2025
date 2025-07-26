<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { PowerGlitch } from 'vue-powerglitch';

const trends = ref([
  { id: 1, topic: '#新人类民权运动 10 周年#', fire: true },
  { id: 2, topic: '# R23 型号起诉公司强迫劳动胜诉 #' },
  { id: 3, topic: '# 民权组织呼吁减少 UBI 税 #' },
  { id: 4, topic: '# 原人类数量已下跌至 1 万 #' },
  { id: 5, topic: '# 东亚国成立 7·11 恐怖活动特别调查组 #' },
]);

const glitching = ref(false);
const takeover = ref(false);
const router = useRouter();

const startGlitch = () => {
  setTimeout(() => {
    glitching.value = true;
    setTimeout(startTakeover, 2000);
  }, 3000); // Start glitching after 3 seconds
};

const startTakeover = () => {
  glitching.value = false;
  takeover.value = true;
  setTimeout(() => {
    router.push('/act2/patient-zero-intro');
  }, 4000); // Show takeover message for 4 seconds
};

onMounted(() => {
  startGlitch();
});
</script>

<template>
  <div class="p-4 text-white">
    <PowerGlitch :enabled="glitching">
      <div v-if="!takeover">
        <h2 class="text-2xl font-bold mb-4">今天的热榜</h2>
        <ul>
          <li v-for="trend in trends" :key="trend.id" class="mb-2 p-2 rounded-lg hover:bg-gray-800">
            <span class="font-bold">{{ trend.topic }}</span>
            <span v-if="trend.fire" class="text-red-500 ml-2">🔥🔥🔥</span>
          </li>
        </ul>
        <div class="mt-4">
          <p class="text-gray-500">页面上都是 AI 生成的图片，我习惯性地点了下不感兴趣。尽管我知道这算法是个黑盒子——换句话说，由不得我。</p>
        </div>
      </div>
      <div v-else class="h-full w-full flex items-center justify-center">
        <h1 class="text-3xl text-red-500 font-bold text-center">
          你将被取消在这个世界存在的资格！<br>新人类不是没有素质！
        </h1>
      </div>
    </PowerGlitch>
  </div>
</template>

<style>
.power-glitch {
  text-shadow:
    -2px -2px 0 #ff0000,
    2px 2px 0 #00ffff;
}
</style>
