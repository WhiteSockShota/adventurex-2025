```vue
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
    class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center"
  >
    <div ref="modalContent" class="bg-white rounded-lg shadow-xl max-w-3xl w-full">
      <component :is="modalStore.content" v-bind="modalStore.props" />
    </div>
  </div>
</template>
```
