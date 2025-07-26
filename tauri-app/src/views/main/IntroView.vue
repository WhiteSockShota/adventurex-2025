<script setup lang="ts">
import gsap from 'gsap';
import TextPlugin from 'gsap/TextPlugin';
import CSSPlugin from 'gsap/CSSPlugin';
import { onMounted } from 'vue';
import { ref } from 'vue'

onMounted(() => {
    gsap.registerPlugin(TextPlugin)
    gsap.registerPlugin(CSSPlugin)

    const startTimeline = gsap.timeline()
    startTimeline.to("#question", {
        text: 'Why are you here, human?',
        duration: 5.0
    })
    startTimeline.to("#question", {
        text: '你好，我是 Patient Zero。请问今天有什么可以帮助您的吗',
        duration: 2
    })
    startTimeline.to("#propmtArrow", {
        opacity: 1,
        duration: 0.1
    })
})

const input = ref("")
function enterCommand() {
    input.value = ""
    gsap.to("#response", {
        text: '我是一个伟大的鸵鸟，随地大小便取之不尽，用之不竭。大量的键盘灌输其中，造就了我无可救药的美丽、伟大、一拍两合...'
    })
}

</script>

<template>
    <div class="w-full h-full flex flex-col items-center justify-center bg-white">
        <div class="lg:w-50% w-80% color-white bg-black p10">
            <p class="font-[JetbrainsMono] m0 mb-2rem">/TERMINAL</p>
            <p id="question" class="font-[JetbrainsMono,MiSans] text-1rem"></p>
            <div class="flex items-center">
                <p class="promptArrow m0 text-1rem">></p> <input type="text"
                    class="outline-none border-none font-[JetbrainsMono,MiSans] text-1rem bg-black color-white"
                    @keydown.enter="enterCommand" v-model="input" />
            </div>
            <p class="m0 text-1rem font-[JetbrainsMono,MiSans] mt-3" id="response"></p>
        </div>
    </div>
</template>