import { createDialog, createOption, type Dialog } from '../Dialog'

export const thankYou: Dialog[] = [
  createDialog({
    text: '谢...Thank yo....あり...がとう...谢你',
    nextPage: '/dialog?id=2',
  }),
]
