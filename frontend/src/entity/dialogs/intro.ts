import { createDialog, createOption, type Dialog } from '../Dialog'

export const intro: Dialog[] = [
  createDialog({
    text: '???',
  }),
  createDialog({
    text: '??...??????...$%#%@#^......',
  }),
  createDialog({
    text: '我是一个伟大的鸵鸟…数据库损坏…取之不尽…用之不竭…大量键盘灌输其中…逻辑崩坏…造就了我无可救药的美丽、伟大、一拍两合…',
    options: [
      createOption({
        text: '???',
        jumpToId: '1',
      }),
      createOption({
        text: '????',
        jumpToId: '2',
      }),
    ],
  }),
  createDialog({
    id: '1',
    text: '人类...',
  }),
  createDialog({
    id: '2',
    text: '222',
  }),
]
