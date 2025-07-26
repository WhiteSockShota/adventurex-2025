<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="close"
    >
      <div class="bg-white w-full h-full max-w-full p-4 overflow-auto relative">
        <!-- 关闭按钮 -->
        <button
          class="absolute top-4 right-4 text-gray-600 hover:text-black text-xl"
          @click="close"
        >
          ×
        </button>

        <!-- 插槽内容 -->
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)
</script>
