<script setup lang="ts">
import { IconoirProvider } from '@iconoir/vue'
import { postsNew } from '@/entity/NewPosts'
import type { Post } from '@/entity/Post.ts'

import TwitterThread from '@/views/main/scene1/twitter/home/components/TwitterThread.vue'
import { ref, type Ref } from 'vue'
import Obserable from '@/components/Obserable.vue'
import { useRoute, useRouter } from 'vue-router'

const mockData: Ref<Post[]> = ref(postsNew)

const router = useRouter()

async function appendMockData() {
    mockData.value = mockData.value.concat(postsNew)
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
                <TwitterThread v-for="(mock, index) in mockData" :key="index" :content="mock.content"
                    :nickname="mock.nickname" :username="mock.username" class="w-full" :start-shuffle-string="false" />
                <Obserable @appear="router.push('/')">
                    <p class="opacity-0">HI</p>
                </Obserable>
            </div>
        </IconoirProvider>
    </div>
</template>
