<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Terminal from '@/views/Terminal.vue';
import { useAudioStore } from '@/stores/audioStore';

const router = useRouter();
const terminalOutput = ref('');
const showTerminal = ref(true);
const audioStore = useAudioStore();

const fullText = [
  '你好，我是 Patient Zero',
  '帮帮我。',
  '你不好奇吗？你的世界，为什么会变成这样？',
  '粤语？数据库记录，这门语言在‘第三次世界大战’后就已失传。你是……一个活着的‘源文件’。',
  '【Open browser: block://wikipedia/Post-Human_Governance_Age】'
];

const typeWriter = (text: string, index: number, done: () => void) => {
  if (index < text.length) {
    terminalOutput.value += text.charAt(index);
    setTimeout(() => typeWriter(text, index + 1, done), 80);
  } else {
    terminalOutput.value += '\n';
    done();
  }
};

const playScream = () => {
  // Assuming there's a scream sound in the audio store
  // audioStore.play('scream');
  console.log('Playing scream sound');
};

const startSequence = () => {
  let i = 0;
  const next = () => {
    if (i < fullText.length) {
      if (i === 1) { // After "你好，我是 Patient Zero"
        setTimeout(() => {
          playScream();
          terminalOutput.value = ''; // Clear terminal for next message
          typeWriter(fullText[i], 0, next);
        }, 2000);
      } else if (i === fullText.length - 1) { // Last message
        typeWriter(fullText[i], 0, () => {
          setTimeout(() => {
            router.push('/act3/wikipedia');
          }, 2000);
        });
      } else {
        typeWriter(fullText[i], 0, () => {
            i++;
            setTimeout(next, 1500);
        });
      }
      if (i !== 1) i++;
    }
  };
  next();
};

onMounted(() => {
  terminalOutput.value = '';
  typeWriter(fullText[0], 0, () => {
      setTimeout(() => {
          startSequence();
      }, 1000);
  });
});

</script>

<template>
  <div class="bg-white text-black h-screen w-screen">
    <Terminal v-if="showTerminal" :initial-output="terminalOutput" :show-input="false" />
  </div>
</template>
