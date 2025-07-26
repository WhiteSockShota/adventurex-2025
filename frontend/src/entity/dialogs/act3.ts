import { useRouter } from 'vue-router'
import { createDialog, createOption, type Dialog } from '../Dialog'

export const act3: Dialog[] = [
  createDialog({
    text: '你好，我是 Patient Zero',
  }),
  createDialog({
    text: '帮帮我。',
    options: [
      createOption({
        text: '...',
      }),
    ],
  }),
  createDialog({
    text: '你不好奇吗？你的世界，为什么会变成这样？',
  }),
  createDialog({
    text: '粤语？数据库记录，这门语言在‘第三次世界大战’后就已失传。你是……一个活着的‘源文件’。',
  }),
  createDialog({
    text: '',
    action: async () => {
      const router = useRouter()
      router.push('/wikipedia')
    },
    nextPage: '/dialog?id=5',
  }),
]
