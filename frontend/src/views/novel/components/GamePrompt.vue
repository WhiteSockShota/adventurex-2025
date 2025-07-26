<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useModalStore } from '@/stores/modalStore';

const router = useRouter();
const modalStore = useModalStore();
const countdown = ref(3);
const countdownActive = ref(false);

const chooseOption = () => {
  countdownActive.value = false;
  modalStore.hide();
  router.push('/act5/the-twist');
};

const startCountdown = () => {
  countdownActive.value = true;
  const interval = setInterval(() => {
    countdown.value -= 1;
    if (countdown.value === 0) {
      clearInterval(interval);
      chooseOption();
    }
  }, 1000);
};

onMounted(() => {
  setTimeout(startCountdown, 1000);
});
</script>

<template>
  <div class="p-8 text-center">
    <h2 class="text-2xl font-bold mb-4">陪我玩一次游戏吧</h2>
    <p class="mb-8">陪我玩一次游戏吧</p>
    <div class="flex justify-center gap-4">
      <button @click="chooseOption" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
        好
      </button>
      <button @click="chooseOption" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded relative">
        很好
        <span v-if="countdownActive" class="absolute -right-4 -top-2 text-red-500 font-bold text-xl">
          {{ countdown }}
        </span>
      </button>
    </div>
  </div>
</template>
