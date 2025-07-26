import type { Line, Subtitle } from '@/entity/audio/subtitle'
import type { Dialog } from '@/entity/Dialog'
import { intro } from '@/entity/dialogs/thankyou'
import { sleep } from '@/utils/async'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameManager = defineStore('gameManager', () => {
  var currentSubtitle: Subtitle | undefined = undefined
  var currentSubtitleLine = ref<Line | undefined>()
  var currentSubtitleStartTimestamp = 0

  function getDialog(id: number): Dialog[] {
    return intro
  }

  async function refreshSubtitle() {
    while (true) {
      if (currentSubtitle != undefined) {
        const currentTime = Date.now()
        const elapsedTime = currentTime - currentSubtitleStartTimestamp
        console.log(currentSubtitleStartTimestamp, currentTime, elapsedTime)
        currentSubtitleLine.value = currentSubtitle.lines.find(
          (line) => elapsedTime > line.start && elapsedTime < line.end,
        )
      }
      await sleep(40)
    }
  }

  function playSubtitle(subtitle: Subtitle) {
    console.log(subtitle)
    currentSubtitleStartTimestamp = Date.now()
    currentSubtitle = subtitle
    currentSubtitleLine.value = undefined
  }

  return {
    getDialog,
    currentSubtitleLine,
    playSubtitle,
    refreshSubtitle,
  }
})
