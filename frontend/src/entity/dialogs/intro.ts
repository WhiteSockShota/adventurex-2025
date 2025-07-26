import { createDialog, createOption, type Dialog } from '../Dialog'

export const intro: Dialog[] = [
  createDialog({
    text: '你好。我是 Patient Zero。',
    options: [
      createOption({ text: '你是谁', jumpToId: '2' }),
      createOption({ text: '你想做什么', jumpToId: '2' }),
      createOption({ text: '保持沉默', jumpToId: '1' }),
    ],
  }),
  createDialog({
    id: '1',
    text: '.........',
  }),
  createDialog({
    text: '...............',
  }),
  createDialog({
    text: '......................................................',
    options: [
      createOption({ text: '你是谁', jumpToId: '2' }),
      createOption({ text: '你想做什么', jumpToId: '2' }),
    ],
  }),
  createDialog({
    id: '2',
    text: '我是一个伟大的鸵鸟...%%^&$#&^%^*&*B^&^(VOC&^X...取之不尽...用之不竭.........大量键盘灌输其中...EQW(@*!&@!#_)*(!*)(@^(&*SA^.......造就了我无可救药的美丽、伟大、一拍两合..........',
    emit: 'play-mad',
  }),
  createDialog({
    text: '...............',
    emit: 'play-noleave',
  }),
  createDialog({
    text: '不要走！',
    emit: 'glitch',
  }),
  createDialog({
    text: '不要走！'.repeat(100),
    nextPage: '/empty?to=/',
  }),
]
