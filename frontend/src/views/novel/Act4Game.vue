<script setup lang="ts">
import { onMounted } from 'vue';
import { useModalStore } from '@/stores/modalStore';
import GamePrompt from './components/GamePrompt.vue';

const modalStore = useModalStore();

onMounted(() => {
  modalStore.show(GamePrompt);
});
</script>

<template>
  <div class="w-screen h-screen bg-gray-800">
    <!-- This view is just a trigger for the modal -->
  </div>
</template>
