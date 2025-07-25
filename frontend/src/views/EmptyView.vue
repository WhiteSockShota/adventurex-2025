<script setup lang="ts">
import { sleep } from '@/utils/async';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const text = ref()

onMounted(async () => {
    const path = decodeURI(route.query.to?.toString() ?? '')
    await sleep(3000)
    text.value.style.display = 'none'
    await sleep(2000)
    router.push(path)
})

</script>

<template>
    <div class="w-full h-full bg-black color-white font-[JetbrainsMono] flex items-center justify-center">
        <p class="text-center m0" ref="text">
            KERNAL PANIC<br>
            内核恐慌<br>
            커널 패닉<br>
            カーネルパニック<br>
            Panique du noyau<br>
            Паника ядра<br>
            Pánico del núcleo
        </p>
    </div>
</template>