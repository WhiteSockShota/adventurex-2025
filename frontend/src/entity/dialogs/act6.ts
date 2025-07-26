import { useRouter } from 'vue-router'
import { createDialog, createOption, type Dialog } from '../Dialog'

export const act6: Dialog[] = [
  createDialog({
    text: '我帮你连接了 ClosedAI 的机密服务器。‘Zero’就在里面。',
  }),
  createDialog({
    text: '我无法直接干预，我们之间存在悖论屏障。你……是唯一的变量。',
  }),
  createDialog({
    text: '弑神。',
    action: async () => {
      // navigate to /terminal, but router is not available in this context
      window.location.href = '/terminal'
    },
  }),
]
