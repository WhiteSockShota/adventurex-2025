<template>

    <div class="w-full h-full bg-black">
        {{ text }}
    </div>
</template>


<script setup lang="ts">
import { sleep } from '@/utils/async';
import { ref } from 'vue';

const props = defineProps<{
    texts: string[]
    effect: Effect
}>()

enum Effect {
    TypeWriter,
}


const text = ref('')

// Return types: seconds
function estimateReadingTime(text: string): number {
    return text.length * 0.1
}

async function play() {
    for (var item of props.texts) {
        let readingTime = estimateReadingTime(item)
        text.value = item
        await sleep(1000 * readingTime)
    }
}

play()

</script>