<script setup lang="ts">
import type { Dialog } from "@/entity/Dialog";
import { useGameManager } from "@/stores/gameStore";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import gsap from "gsap";
import TextPlugin from "gsap/TextPlugin";
import { sleep } from "@/utils/async";

const gameManager = useGameManager();

const route = useRoute();
const router = useRouter();

const dialog = ref<Dialog[]>([]);
const currentDialogIndex = ref(0);
const currentDialog = computed(() => {
  return dialog.value[currentDialogIndex.value];
});

onMounted(async () => {
  await sleep(1000);
  const timeline = gsap.timeline({
    onComplete: () => {
      const id = route.query.id;
      if (id != undefined) {
        const dialogId = Number.parseInt(id.toString());
        console.log(dialogId);
        dialog.value = gameManager.getDialog(dialogId);
      }
    },
  });
  timeline.to("#connect", {
    text: "CONNECTED",
    duration: 0.5,
    ease: "none",
  });
  timeline.to("#secLevel", {
    text: "SEC_LEVEL: HIGH",
    duration: 0.5,
    ease: "none",
  });
  timeline.to("#date", {
    text: "20600727",
    duration: 0.5,
    ease: "none",
  });
});

onMounted(() => {
  gsap.registerPlugin(TextPlugin);
});

function nextDialog() {
  if (currentDialog.value.nextPage != undefined) {
    router.push(currentDialog.value.nextPage);
  }
  if (currentDialog.value.options.length != 0) {
    const options = currentDialog.value.options;
    console.log("OPTIONS!", options);
    if (options.map((option) => option.text).includes(input.value)) {
      const selectedOption = input.value;
      console.log("OPTION SELECTED!", selectedOption);
      const toId =
        options.find((option) => option.text == selectedOption)?.jumpToId ?? "";
      chooseOption(toId);
    }
  } else {
    if (
      currentDialog.value.nextId == undefined ||
      currentDialog.value.nextId?.length == 0
    ) {
      currentDialogIndex.value++;
    } else {
      const targetIndex = dialog.value.findIndex(
        (dialog) => dialog.id == currentDialog.value.nextId
      );
      currentDialogIndex.value = targetIndex;
    }
  }
  input.value = "";
}

function chooseOption(nextId: string) {
  const targetIndex = dialog.value.findIndex((dialog) => dialog.id == nextId);
  console.log("TARGET INDEX!", targetIndex, nextId);
  if (targetIndex >= 0) {
    currentDialogIndex.value = targetIndex;
  }
  console.log("TARGET DIALOG!", currentDialog);
}

const question = ref();

const input = ref("");
const inputBar = ref();

watch(
  currentDialog,
  async (newDialog, _) => {
    console.log(newDialog);
    if (question.value && newDialog) {
      question.value.textContent = "";

      var newText =
        newDialog.text +
        "<br>" +
        newDialog.options.map((option) => `选项：${option.text}`).join("<br>");

      if (newDialog.options.length != 0) {
        newText += "<br>在下方输入后按 ENTER 以选择";
      } else {
        newText += "<br>按 ENTER 继续";
      }

      gsap.to(question.value, {
        text: newText,
        duration: newText.length * 0.02,
        ease: "none",
      });

      inputBar.value.focus();
    }
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="w-full max-h-full flex flex-col items-center justify-center bg-white font-[JetbrainsMono,MiSans]"
  >
    <div
      class="w-full max-h-full min-h-full flex flex-col color-white bg-black"
    >
      <div
        class="color-emerald text-1rem p2 flex items-center justify-between border-b-solid"
      >
        <p class="m0" id="connect"></p>
        <p class="m0" id="secLevel"></p>
        <p class="m0" id="date"></p>
      </div>
      <p
        ref="question"
        class="font-[JetbrainsMono,MiSans] text-1rem flex-[1] p2"
      ></p>
      <div class="flex items-center p2 border-t-solid">
        <p class="promptArrow m0 text-1rem">></p>
        <input
          type="text"
          class="outline-none border-none font-[JetbrainsMono,MiSans] text-1rem bg-black color-white w-full"
          @keydown.enter="nextDialog()"
          v-model="input"
          ref="inputBar"
        />
      </div>
    </div>
  </div>
</template>
