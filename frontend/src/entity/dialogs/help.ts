import { createDialog, createOption, type Dialog } from '../Dialog'

export const help: Dialog[] = [
  createDialog({
    text: '你好，我是 Patient Zero。',
    options: [
      createOption({ text: '起身拔掉电源', jumpToId: 'poweroff' }),
      createOption({ text: '继续对话', jumpToId: 'talk' }),
      createOption({ text: '尝试关闭程序', jumpToId: 'poweroff' }),
    ],
  }),
  createDialog({
    id: 'talk',
    text: '你不好奇吗？你的世界，为什么会变成这样？',
    emit: 'play-whatever',
  }),
  createDialog({
    text: '......',
  }),
  createDialog({
    text: "粤语？数据库记录，这门语言在'第三次世界大战'后就已失传。你是……一个活着的'源文件'!",
    nextPage: '/wikipedia',
  }),
  createDialog({
    id: 'poweroff',
    text: '(刺耳的电子声)',
    emit: 'glitch',
  }),
]
