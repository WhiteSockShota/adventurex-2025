<script setup lang="ts">
import { ref } from 'vue';

const finalTrends = ref([
  { id: 1, topic: '#“毅力 10 号”火星探测器传回高清地表图像#' },
  { id: 2, topic: '# 全球首例 AI 辅助脑机接口手术成功，瘫痪患者恢复行走' },
  { id: 3, topic: '# 虚拟现实办公软件“界碑”宣布月活用户破十亿' },
  { id: 4, topic: '# 著名导演新作《再见，月光》引发观影热潮' },
  { id: 5, topic: '# 育儿补贴怎么领？一文看懂各地最新政策' },
]);

const showNotification = ref(false);

setTimeout(() => {
    showNotification.value = true;
}, 5000);

</script>

<template>
    <div class="bg-gray-100 text-black h-screen w-screen p-8 flex flex-col items-center">
        <div class="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-bold mb-4">Twitter</h2>
            <ul>
                <li v-for="trend in finalTrends" :key="trend.id" class="mb-2 p-2 rounded-lg hover:bg-gray-200">
                    <span class="font-bold">{{ trend.topic }}</span>
                </li>
            </ul>
        </div>

        <div v-if="showNotification" class="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 animate-fade-in">
            <h3 class="font-bold">系统通知</h3>
            <p class="mt-2">发信人：阿杰</p>
            <p class="text-gray-500 text-sm">时间：2060 年 7 月 28 日，下午 3:15</p>
            <p class="mt-4">【哥，我刚在月台上，突然就不想等下一班车了。想了想，还是先回家吧。晚上一起吃饭？】</p>
        </div>

        <div class="mt-auto text-center text-gray-600 p-4">
            <p>Zero 最后说，它懂了。</p>
            <p>它懂了什么是眼泪。</p>
            <p>它没有输出设备。</p>
            <br>
            <p>但是，我有。</p>
        </div>
    </div>
</template>

<style scoped>
@keyframes fade-in {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
    animation: fade-in 1s ease-out forwards;
}
</style>
