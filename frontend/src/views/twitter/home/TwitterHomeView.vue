<script setup lang="ts">
import { Home, IconoirProvider, Mail } from '@iconoir/vue';
import mocks from './mock.json'
import TwitterThread from './components/TwitterThread.vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { sleep } from '@/utils/async';
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger';
import Obserable from '@/components/Obserable.vue';
import { useRouter } from 'vue-router';

const shakeOffset = ref(0)
const shakeFactor = ref(0)

const router = useRouter()

const mockData = ref(mocks)

async function startShaking() {
    while (true) {
        shakeOffset.value = Math.random() * shakeFactor.value - shakeFactor.value / 2
        await sleep(1)
        //console.log(shakeFactor.value)
    }
}


onMounted(() => {
    startShaking()
})

const mockCount = ref(0)

async function appendMockData() {
    mockData.value = mockData.value.concat(mocks)
    console.log(mockData.value.length)
    mockCount.value++
    shakeFactor.value = mockCount.value * 50
    if (mockCount.value > 3) {
        router.push('/dialog?id=1')
    }
}

</script>

<template>
    <div class="min-w-full max-h-full overflow-y-auto" :style="{
        transform: `translateX(${shakeOffset * Math.random()}px) translateY(${shakeOffset * Math.random()}px)`
    }" id="container">
        <IconoirProvider :icon-props="{
            'color': '#000',
            'stroke-width': 2,
            'width': '1em',
            'height': '1em',
        }" class="w-full">
            <div id="container">
                <TwitterThread v-for="mock in mockData" :content="mock.content" :nickname="mock.nickname"
                    :username="mock.username" class="w-full" :start-shuffle-string="(mockCount > 1)" />
                <Obserable @appear="appendMockData()">
                    <p class="opacity-0">LOADING</p>
                </Obserable>
            </div>
        </IconoirProvider>
    </div>
</template>