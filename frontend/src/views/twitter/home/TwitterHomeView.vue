<script setup lang="ts">
import { Home, IconoirProvider, Mail } from '@iconoir/vue'
import mocks from '../data/post.json'
import TwitterThread from './components/TwitterThread.vue'
import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { sleep } from '@/utils/async'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Obserable from '@/components/Obserable.vue'
import { useRouter } from 'vue-router'
import type { Post } from '../types'

const shakeOffset = ref(0)
const shakeFactor = ref(0)


const glitchPost = {
    "nickname": "???????",
    "username": "@???",
    "content": "你将被取消在这个世界存在的资格！新人类不是没有素质！",
    "image": "",
    "verified": false
}

const router = useRouter()

const mockData: Ref<Post[]> = ref(mocks)

async function startShaking() {
    while (true) {
        shakeOffset.value = Math.random() * shakeFactor.value - shakeFactor.value / 2
        await sleep(1)
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
    if (mockCount.value > 2) {
        for (let i = 0; i < 10; i++) {
            mockData.value.push(glitchPost)
        }
    }
    if (mockCount.value > 3) {
        document.body.style.filter = 'invert(1)'
        document.body.style.backgroundColor = 'black'
    }
    if (mockCount.value > 4) {
        gsap.to('#container', {
            display: 'none',
        })
        document.body.style.filter = 'invert(0)'
        router.push('empty?to=' + encodeURI('/dialog?id=1'))
    }
}
</script>

<template>
    <div class="min-w-full max-h-full overflow-y-auto" :style="{
        transform: `translateX(${shakeOffset * Math.random()}px) translateY(${shakeOffset * Math.random()}px)`,
    }" id="container">
        <IconoirProvider :icon-props="{
            color: '#000',
            'stroke-width': 2,
            width: '1em',
            height: '1em',
        }" class="w-full">
            <div id="container">
                <TwitterThread v-for="mock in mockData" :content="mock.content" :nickname="mock.nickname"
                    :username="mock.username" class="w-full"
                    :start-shuffle-string="mockCount > 1 && mock.username != '@???'" />
                <Obserable @appear="appendMockData()">
                    <p class="opacity-0">LOADING</p>
                </Obserable>
            </div>
        </IconoirProvider>
    </div>
</template>