import { act6 } from './../entity/dialogs/act6'
import { act5 } from './../entity/dialogs/act5'
import { act4 } from './../entity/dialogs/act4'
import { act3 } from './../entity/dialogs/act3'
import type { Line, Subtitle } from '@/entity/audio/subtitle'
import type { Dialog } from '@/entity/Dialog'
import { help } from '@/entity/dialogs/help'
import { intro } from '@/entity/dialogs/intro'
import { thankYou } from '@/entity/dialogs/thankyou'
import { sleep } from '@/utils/async'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGameManager = defineStore('gameManager', () => {
  const dialogs = new Map<number, Dialog[]>([
    [1, thankYou],
    [2, intro],
    [3, act3],
    [4, act4],
    [5, act5],
    [6, act6],
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
