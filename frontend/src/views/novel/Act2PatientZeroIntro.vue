<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const messages = ref<string[]>([]);
const showFinalMessage = ref(false);

const introText = [
  '你好。我是 Patient Zero。',
];

const chaoticText = [
  '我是一个伟大的鸵鸟…数据库损坏…取之不尽…用之不竭…大量键盘灌输其中…逻辑崩坏…造就了我无可救药的美丽、伟大、一拍两合…',
  '不要走…',
  '不要走…不要走…不要走…不要走…不要走…不要走…不要-不-要-走-不-要-走…'
];

const typeWriter = (text: string, index: number, done: () => void) => {
  if (index < text.length) {
    messages.value[messages.value.length - 1] += text.charAt(index);
    setTimeout(() => typeWriter(text, index + 1, done), 100);
  } else {
    done();
  }
};

const showChaoticText = () => {
  let i = 0;
  const next = () => {
    if (i < chaoticText.length) {
      messages.value.push('');
      typeWriter(chaoticText[i], 0, () => {
        i++;
        setTimeout(next, 1000);
      });
    } else {
        setTimeout(() => {
            router.push('/act3/exposition');
        }, 2000);
    }
  };
  next();
}

onMounted(() => {
  messages.value.push('');
  typeWriter(introText[0], 0, () => {
      setTimeout(showChaoticText, 2000);
  });
});

</script>

<template>
  <div class="bg-black text-green-400 font-mono h-screen w-screen p-8">
    <div v-for="(msg, index) in messages" :key="index" class="mb-4">
      <span>&gt; </span>{{ msg }}
    </div>
  </div>
</template>
