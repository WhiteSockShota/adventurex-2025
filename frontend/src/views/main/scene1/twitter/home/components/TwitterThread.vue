<script setup lang="ts">
import { sleep } from '@/utils/async'
import { IconoirProvider, Post, Reply, ThumbsUp, Link } from '@iconoir/vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
    content: String,
    username: String,
    nickname: String,
    startShuffleString: Boolean,
})

const param = ref(0)

function randomString(param: number, string: string): string {
    var newString = ''

    for (const char of string) {
        const newCharPoint = (char.codePointAt(0) ?? 0) + param
        const newChar = String.fromCodePoint(newCharPoint)
        newString += newChar
    }

    return newString
}

onMounted(async () => {
    while (true) {
        if (props.startShuffleString) {
            param.value++
        } else {
            param.value = 0
        }
        await sleep(1)
    }
})
</script>

<template>
    <div class="flex max-w-full border-b border-gray-200 mx-auto bg-white border-b-solid break-words">
        <div class="w-full m4 flex">
            <div class="flex-shrink-0">
                <img class="size-3.5rem rounded-full"
                    src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                    alt="avatar" />
            </div>
            <div class="flex-[1] max-w-full ml-3">
                <div class="flex items-center text-sm text-gray-500">
                    <span class="font-medium text-black text-1rem me-2">{{
                        randomString(param, nickname ?? '')
                        }}</span>
                    <span>{{ randomString(param, username ?? '') }}</span>
                    <span class="mx-1">·</span>
                    <span>2h</span>
                </div>
                <div class="mt-1 text-base w-full text-black break-words" :style="{
                    color: username == '@???' ? 'red' : 'black'
                }">
                    {{ randomString(param, content ?? '') }}
                </div>
                <div class="flex gap-8 opacity-50 w-full text-sm mt-2">
                    <span class="cursor-pointer flex items-center gap-1">
                        <Post /> {{ Math.floor(Math.random() * 1001) }}
                    </span>
                    <span class="cursor-pointer flex items-center gap-1">
                        <Reply /> 34
                    </span>
                    <span class="cursor-pointer flex items-center gap-1">
                        <ThumbsUp /> 56
                    </span>
                    <span class="cursor-pointer flex items-center gap-1">
                        <Link />
                    </span>
                </div>
            </div>

        </div>
    </div>
</template>
