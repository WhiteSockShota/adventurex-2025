<script setup lang="ts">
import type { Dialog } from '@/entity/Dialog';
import { useGameManager } from '@/stores/gameStore';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin';

const gameManager = useGameManager()

const route = useRoute()

const dialog = ref<Dialog[]>([])
const currentDialogIndex = ref(0)
const currentDialog = computed(() => {
    return dialog.value[currentDialogIndex.value]
})

onMounted(() => {
    const id = route.query.id
    if (id != undefined) {
        const dialogId = Number.parseInt(id.toString())
        console.log(dialogId)
        dialog.value = gameManager.getDialog(dialogId)
    }
})

onMounted(() => {
    gsap.registerPlugin(TextPlugin)
})

function nextDialog() {
    if (currentDialog.value.options.length != 0) {
        const options = currentDialog.value.options
        if (options.map((option) => option.text).includes(input.value)) {
            const selectedOption = input.value
            chooseOption(selectedOption)
        }
    }
    else {
        if (currentDialog.value.nextId == undefined || currentDialog.value.nextId?.length == 0) {
            currentDialogIndex.value++
        }
        else {
            const targetIndex = dialog.value.findIndex((dialog) => dialog.id == currentDialog.value.nextId)
            currentDialogIndex.value = targetIndex
        }
    }
    input.value = ''
}

function chooseOption(nextId: string) {
    const targetIndex = dialog.value.findIndex((dialog) => dialog.id == nextId)
    currentDialogIndex.value = targetIndex
}

const question = ref()

const input = ref("")
const inputBar = ref()

watch(currentDialog, async (newDialog, _) => {
    console.log(newDialog)
    if (question.value && newDialog) {
        question.value.textContent = ''

        var newText = newDialog.text + '<br>' + newDialog.options.map((option) => `选项：${option.text}`).join('<br>')

        if (newDialog.options.length != 0) {
            newText += '<br>在下方输入后按回车以选择'
        }

        gsap.to(question.value, {
            text: newText,
            duration: newText.length * 0.02,
            ease: 'none'
        })

        inputBar.value.focus()
    }
}, { immediate: true })

</script>

<template>
    <div class="w-full h-full flex flex-col items-center justify-center bg-white font-[JetbrainsMono,MiSans]">
        <div class="w-full h-full flex flex-col color-white bg-black">
            <div class="color-emerald text-1rem p2 flex items-center justify-between border-b-solid">
                <p class="m0">CONNECTED</p>
                <p class="m0">SEC_LEVEL: HIGH</p>
                <p class="m0">2060-7-25</p>
            </div>
            <p ref="question" class="font-[JetbrainsMono,MiSans] text-1rem flex-[1] m2"></p>
            <div class="flex items-center p2 border-t-solid">
                <p class="promptArrow m0 text-1rem">></p>
                <input type="text"
                    class="outline-none border-none font-[JetbrainsMono,MiSans] text-1rem bg-black color-white w-full"
                    @keydown.enter="nextDialog()" v-model="input" ref="inputBar" />
            </div>
        </div>
    </div>
</template>