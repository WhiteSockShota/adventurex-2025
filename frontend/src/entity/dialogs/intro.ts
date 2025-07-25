import { createDialog, createOption, type Dialog } from '../Dialog'

export const intro: Dialog[] = [
  createDialog({
    text: '???',
  }),
  createDialog({
    text: '这是在什么地方？',
  }),
  createDialog({
    text: '操作',
    options: [
      createOption({
        text: '1',
        jumpToId: '1',
      }),
      createOption({
        text: '2',
        jumpToId: '2',
      }),
    ],
  }),
  createDialog({
    id: '1',
    text: '111',
  }),
  createDialog({
    id: '2',
    text: '222',
  }),
]
