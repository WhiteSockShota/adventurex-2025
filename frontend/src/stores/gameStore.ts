import type { Dialog } from '@/entity/Dialog'
import { intro } from '@/entity/dialogs/intro'
import { defineStore } from 'pinia'

export const useGameManager = defineStore('gameManager', () => {
  function getDialog(id: number): Dialog[] {
    return intro
  }

  return { getDialog }
})
