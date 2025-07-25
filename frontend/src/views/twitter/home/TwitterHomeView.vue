<script setup lang="ts">
import { Home, IconoirProvider, Mail } from '@iconoir/vue';
import mocks from './mock.json'
import TwitterThread from './components/TwitterThread.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { sleep } from '@/utils/async';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';

const shakeOffset = ref(0)
const shakeFactor = ref(500)

async function startShaking() {
    while (true) {
        shakeOffset.value = Math.random() * shakeFactor.value - shakeFactor.value / 2
        await sleep(100)
        //console.log(shakeFactor.value)
    }
}

function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    shakeFactor.value = progress;
    console.log('原生监听进度:', progress.toFixed(3));
}

onMounted(() => {
    startShaking()
})

// onMounted(() => {
//     gsap.registerPlugin(ScrollTrigger)

//     ScrollTrigger.create({
//         trigger: '#container',
//         start: 'top top',
//         end: 'bottom 50%+=100px',
//         onToggle: (self) => console.log('toggled, isActive:', self.isActive),
//         onUpdate: (self) => {
//             console.log(
//                 'progress:',
//                 self.progress.toFixed(3),
//                 'direction:',
//                 self.direction,
//                 'velocity',
//                 self.getVelocity()
//             );
//         }
//     });
// })

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <div class="min-w-full h-full" :style="{
        transform: `translateX(${shakeOffset * Math.random()}px) translateY(${shakeOffset * Math.random()}px)`
    }">
        <IconoirProvider :icon-props="{
            'color': '#000',
            'stroke-width': 2,
            'width': '1em',
            'height': '1em',
        }" class="w-full">
            <div id="container">
                <TwitterThread v-for="mock in mocks" :content="mock.content" :nickname="mock.nickname"
                    :username="mock.username" class="w-full" />
            </div>
        </IconoirProvider>
    </div>
</template>