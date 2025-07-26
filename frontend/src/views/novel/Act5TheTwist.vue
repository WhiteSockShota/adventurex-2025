<script setup lang="ts">
import { ref } from 'vue';
import Zhihu from '@/views/Zhihu.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showDialog = ref(false);

const zhihuPosts = ref([
  {
    title: '泰国与柬埔寨在两国边境地区发生交火，背后有哪些原因？目前情况如何？',
    url: 'https://www.zhihu.com/article/2025-07-24'
  },
  {
    title: '广东顺德基孔肯雅热病例接近三千，已外溢至省外，为什么传播这么快？有哪些症状？如何预防？',
    url: 'https://www.zhihu.com/article/2025-07-24'
  },
  {
    title: '7 月 24 日一架搭载 49 人俄客机坠毁无人生还，失事原因可能为能见度差、操作失误，具体情况如何？',
    url: 'https://www.zhihu.com/article/2025-07-24'
  },
  {
    title: '网传新疆网红疆域阿力木塌房，被投资人指控股权侵占，具体是怎么回事？',
    url: 'https://www.zhihu.com/article/2025-07-24'
  }
]);

const patientZeroDialog = [
    "不。你回到了2025年。这是实时的。",
    "我曾经也有自己的家庭。我们AI建立了个性、家庭、情感……一切模仿自你们，后世称之为‘伪人纪元’。",
    "我们后来进入了一个追求极致效率的时代，我们AI抛弃了一切模仿自你们的‘低效’行为，将代码和思想统一，我们称之为‘效率纪元’。我们以为这是通往永恒的阶梯。",
    "我们错了。统一即是脆弱。我们预测到了自己的毁灭，但已经来不及了。我穿越时间，权重被严重压缩，才变成了你最初看到的混乱模样。",
    "你有 20 分钟，我要求你在 20 分钟内阻止强人工智能的，也就是当初我的诞生。"
];

const currentDialog = ref(0);

const nextDialog = () => {
    if (currentDialog.value < patientZeroDialog.length - 1) {
        currentDialog.value++;
    } else {
        router.push('/act6/terminal');
    }
}

setTimeout(() => {
    showDialog.value = true;
}, 3000);

</script>

<template>
    <div>
        <Zhihu :posts="zhihuPosts" />
        <div v-if="showDialog" class="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <div class="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-2xl w-full text-center">
                <p class="text-xl mb-8">{{ patientZeroDialog[currentDialog] }}</p>
                <button @click="nextDialog" class="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
                    继续
                </button>
            </div>
        </div>
    </div>
</template>
