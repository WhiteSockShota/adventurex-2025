<template>
  <div ref="target">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits } from 'vue'

const target = ref<HTMLElement | null>(null)
const emits = defineEmits<{
  (e: 'appear'): void
  (e: 'disappear'): void
}>()

let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!target.value) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        emits('appear')
      } else {
        emits('disappear')
      }
    },
    {
      threshold: 0.1, // 可以根据需要调整
    }
  )

  observer.observe(target.value)
})

onUnmounted(() => {
  if (observer && target.value) {
    observer.unobserve(target.value)
  }
  observer = null
})
</script>