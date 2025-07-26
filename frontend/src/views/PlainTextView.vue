<script setup lang="ts">
import { sleep } from '@/utils/async';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin';

const router = useRouter()
const route = useRoute()

onMounted(async () => {
    gsap.registerPlugin(TextPlugin)
    await sleep(700)
    await gsap.to("#text", {
        text: route.query.text as string,
        duration: 1
    }).then()
    await sleep(700)
    router.push(route.query.to as string)
})

</script>

<template>
    <div class="bg-black color-white flex items-center justify-center">
        <p class="font-[JetbrainsMono,MiSans] text-2.5rem tracking-widest" id="text"></p>
    </div>
</template>