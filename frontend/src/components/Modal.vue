<script setup lang="ts">
import { useModalStore } from '@/stores/modalStore'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const modalStore = useModalStore()
const modalContent = ref(null)

onClickOutside(modalContent, () => modalStore.hide())
</script>

<template>
  <div
    v-if="modalStore.isVisible"
    class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4"
  >
    <div
      ref="modalContent"
      class="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] relative flex flex-col"
    >
      <button
        @click="modalStore.hide()"
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white shadow-md"
      >
        ×
      </button>
      <div class="overflow-y-auto flex-1">
        <component :is="modalStore.content" v-bind="modalStore.props" />
      </div>
    </div>
  </div>
</template>
