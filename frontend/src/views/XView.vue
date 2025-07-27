<script setup lang="ts">
import { Home, IconoirProvider, Mail } from '@iconoir/vue'
import { posts } from '@/entity/Post.ts'
import type { Post } from '@/entity/Post.ts'

import TwitterThread from '@/views/main/scene1/twitter/home/components/TwitterThread.vue'
import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { sleep } from '@/utils/async'
import Obserable from '@/components/Obserable.vue'
import { useRouter } from 'vue-router'
import { useGameManager } from '@/stores/gameStore'
import intro from '@/entity/audio/subtitles/intro.srt?raw'
import introGlitch from '@/entity/audio/subtitles/intro-glitch.srt?raw'
import introDisqualify from '@/entity/audio/subtitles/intro-disqualify.srt?raw'
import { parseSRT } from '@/entity/audio/subtitle'

const gameManager = useGameManager()

const router = useRouter()

const mockData: Ref<Post[]> = ref(posts)

onMounted(() => {
    gameManager.playSubtitle(parseSRT(intro))
})

onUnmounted(() => {
})

async function appendMockData() {
    mockData.value = mockData.value.concat(posts)
}
</script>

<template>
    <div class="max-w-full max-h-full overflow-y-auto" id="container">
        <IconoirProvider :icon-props="{
            color: '#000',
            'stroke-width': 2,
            width: '1em',
            height: '1em',
        }" class="max-w-full">
            <div id="container">
                <TwitterThread v-for="mock in mockData" :content="mock.content" :nickname="mock.nickname"
                    :username="mock.username" class="w-full"
                    />
                <Obserable @appear="appendMockData()">
                    <p class="opacity-0">LOADING</p>
                </Obserable>
            </div>
        </IconoirProvider>
    </div>
</template>
