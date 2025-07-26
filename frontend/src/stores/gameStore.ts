import type { Line, Subtitle } from '@/entity/audio/subtitle'
import type { Dialog } from '@/entity/Dialog'
import { intro } from '@/entity/dialogs/intro'
import { thankYou } from '@/entity/dialogs/thankyou'
import { sleep } from '@/utils/async'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameManager = defineStore('gameManager', () => {
  const dialogs = new Map([
    [1, thankYou],
    [2, intro],
  ])

  var currentSubtitle: Subtitle | undefined = undefined
  var currentSubtitleLine = ref<Line | undefined>()
  var currentSubtitleStartTimestamp = 0

  const username = ref('')

  const tags = ref<string[]>()

  function getDialog(id: number): Dialog[] {
    return dialogs.get(id) ?? []
  }

  async function refreshSubtitle() {
    while (true) {
      if (currentSubtitle != undefined) {
        const currentTime = Date.now()
        const elapsedTime = currentTime - currentSubtitleStartTimestamp
        currentSubtitleLine.value = currentSubtitle.lines.find(
          (line) => elapsedTime > line.start && elapsedTime < line.end,
        )
      }
      await sleep(40)
    }
  }

  function setUsername(name: string) {
    username.value = name
  }

  function playSubtitle(subtitle: Subtitle | undefined) {
    console.log(subtitle)
    if (!subtitle) {
      currentSubtitle = {
        lines: [],
      }
      return
    }
    var temp = subtitle
    temp.lines = temp.lines.map((line) => ({
      text: line.text.replace('${username}', username.value),
      start: line.start,
      end: line.end,
    }))
    currentSubtitleStartTimestamp = Date.now()
    currentSubtitle = temp
    currentSubtitleLine.value = undefined
  }

  return {
    getDialog,
    currentSubtitleLine,
    playSubtitle,
    refreshSubtitle,
    setUsername,
    username,
  }
})
