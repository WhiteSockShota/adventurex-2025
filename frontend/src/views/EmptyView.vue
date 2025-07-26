<script setup lang="ts">
import { sleep } from '@/utils/async'
import { useAudioEffects } from '@/utils/audioEffect'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const text = ref()

const isFlashing = ref(false)

onMounted(async () => {
  const path = decodeURI(route.query.to?.toString() ?? '')
  const flashing = route.query.flashing
  isFlashing.value = flashing === undefined ? true : flashing === 'true'
  await sleep(3000)
  text.value.style.display = 'none'
  isFlashing.value = false
  await sleep(2000)
  document.body.style.filter = 'invert(0)'
  document.body.style.backgroundColor = 'white'
  router.push(path)
})

onMounted(async () => {
  while (true) {
    if (isFlashing.value) {
      const random = Math.random()
      if (random > 0.5) {
        document.body.style.filter = 'invert(1)'
        document.body.style.backgroundColor = 'black'
      } else {
        document.body.style.filter = 'invert(0)'
        document.body.style.backgroundColor = 'white'
      }
    }
    await sleep(40)
  }
})

const { playKernelPanic } = useAudioEffects()
playKernelPanic()
</script>

<template>
  <div
    class="w-full h-full bg-black color-white font-[JetbrainsMono] flex items-center justify-center"
  >
    <p class="text-center m0" ref="text">
      KERNAL PANIC<br />
      内核恐慌<br />
      커널 패닉<br />
      カーネルパニック<br />
      Panique du noyau<br />
      Паника ядра<br />
      Pánico del núcleo
    </p>
  </div>
</template>
