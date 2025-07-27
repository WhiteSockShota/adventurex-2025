<script setup lang="ts">
import { Home, IconoirProvider, Mail } from '@iconoir/vue'
import { posts } from '../../../../../entity/Post.ts'
import type { Post } from '../../../../../entity/Post.ts'

import TwitterThread from './components/TwitterThread.vue'
import { onMounted, onUnmounted, ref, type Ref } from 'vue'
import { sleep } from '@/utils/async'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Obserable from '@/components/Obserable.vue'
import { useRouter } from 'vue-router'
import { useGameManager } from '@/stores/gameStore'
import intro from '@/entity/audio/subtitles/intro.srt?raw'
import introGlitch from '@/entity/audio/subtitles/intro-glitch.srt?raw'
import introDisqualify from '@/entity/audio/subtitles/intro-disqualify.srt?raw'
import { parseSRT } from '@/entity/audio/subtitle'
import { PowerGlitch } from 'powerglitch'

const shakeOffset = ref(0)
const shakeFactor = ref(0)

const gameManager = useGameManager()

const glitchPost = {
  nickname: '???????',
  username: '@???',
  content: '你将被取消在这个世界存在的资格！新人类不是没有素质！',
  image: '',
  verified: false,
}

const router = useRouter()


async function appendMockData() {

}
</script>

<template>
  <div class="max-w-full max-h-full overflow-y-auto" :style="{
    transform: `translateX(${shakeOffset * Math.random()}px) translateY(${shakeOffset * Math.random()}px)`,
  }" id="container">
    <IconoirProvider :icon-props="{
      color: '#000',
      'stroke-width': 2,
      width: '1em',
      height: '1em',
    }" class="max-w-full">
      <div id="container">
        <TwitterThread v-for="mock in posts" :content="mock.content" :nickname="mock.nickname" :username="mock.username"
          class="w-full" :start-shuffle-string="false" />
        <Obserable @appear="appendMockData()">
          <p class="opacity-0">LOADING</p>
        </Obserable>
      </div>
    </IconoirProvider>
  </div>
</template>
