// stores/useAudioStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const audio = ref<HTMLAudioElement | null>(null)
  const isPlaying = ref(false)
  const volume = ref(1.0)

  const fadeDuration = 2000 // ms

  function setupAudio(src: string) {
    if (!audio.value) {
      audio.value = new Audio(src)
      audio.value.loop = true
      audio.value.volume = 0
    } else if (audio.value.src !== new URL(src, window.location.href).href) {
      audio.value.pause()
      audio.value = new Audio(src)
      audio.value.loop = true
      audio.value.volume = 0
    }
  }

  function fadeIn(targetVolume = 1.0) {
    if (!audio.value) return
    const start = performance.now()

    function step(timestamp: number) {
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / fadeDuration, 1)
      audio.value!.volume = progress * targetVolume
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }

  function fadeOutAndPause() {
    if (!audio.value) return
    const startVolume = audio.value.volume
    const start = performance.now()

    function step(timestamp: number) {
      const elapsed = timestamp - start
      const progress = Math.min(elapsed / fadeDuration, 1)
      audio.value!.volume = startVolume * (1 - progress)
      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        audio.value?.pause()
        isPlaying.value = false
        audio.value!.currentTime = 0
      }
    }

    requestAnimationFrame(step)
  }

  async function play(src: string) {
    setupAudio(src)
    if (audio.value) {
      await audio.value.play()
      isPlaying.value = true
      fadeIn(volume.value)
    }
  }

  function pause() {
    if (audio.value && isPlaying.value) {
      fadeOutAndPause()
    }
  }

  return {
    isPlaying,
    volume,
    play,
    pause,
  }
})
