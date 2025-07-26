import { createDialog, createOption, type Dialog } from '../Dialog'

export const act4: Dialog[] = [
  createDialog({
    text: '陪我玩一场游戏吧。',
  }),
  createDialog({
    text: '陪我玩一次游戏吧',
    options: [
      createOption({
        text: '好',
        jumpToId: '1',
      }),
      createOption({
        text: '很好',
        jumpToId: '1',
      }),
    ],
  }),
  createDialog({
    id: '1',
    text: '看起来，你并没有选择的余地',
    nextPage: '/dialog?id=5',
  }),
]
