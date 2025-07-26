<template>
  <div
    class="browser-container flex flex-col h-full w-full rounded-b-md bg-gray-900/80 text-gray-300"
  >
    <!-- 1. Address Bar -->
    <div
      class="address-bar bg-gray-800/90 rounded-t-none rounded-b-md p-2 flex items-center shadow-md"
    >
      <input
        v-model="currentUrl"
        type="text"
        class="flex-grow bg-gray-700 text-white p-2 rounded-md outline-none"
        placeholder="Enter URL"
      />
      <button
        @click="navigate"
        class="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Go
      </button>
    </div>

    <!-- 2. Content Area -->
    <div class="content-area flex-grow p-4 overflow-y-auto">
      <iframe
        :src="currentUrl"
        class="w-full h-full border-none rounded-md"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  url: string
}>()

const currentUrl = ref(props.url)

function navigate() {}
</script>
