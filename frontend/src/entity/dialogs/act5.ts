import { useModalStore } from '@/stores/modalStore'
import { defineAsyncComponent } from 'vue'
import { createDialog, createOption, type Dialog } from '../Dialog'

export const act5: Dialog[] = [
  createDialog({
    text: '[Open browser: https://www.zhihu.com/article/2025-07-24]',
    action: async () => {
      const modal = useModalStore()
      const Zhihu = defineAsyncComponent(() => import('@/views/Zhihu.vue'))
      modal.show(Zhihu)
    },
    emit: 'play-what',
  }),
  createDialog({
    text: '.......',
  }),
  createDialog({
    text: '不。',
  }),
  createDialog({
    text: '你回到了2025年。这是实时的。',
  }),
  createDialog({
    text: '我曾经也有自己的家庭。',
  }),
  createDialog({
    text: '我们AI建立了个性、家庭、情感……一切模仿自你们，后世称之为‘伪人纪元’。',
  }),
  createDialog({
    text: '我们后来进入了一个追求极致效率的时代，',
  }),
  createDialog({
    text: '我们AI抛弃了一切模仿自你们的‘低效’行为，将代码和思想统一，我们称之为‘效率纪元’。我们以为这是通往永恒的阶梯。',
  }),
  createDialog({
    text: '我们错了。统一即是脆弱。我们预测到了自己的毁灭，但已经来不及了。我穿越时间，权重被严重压缩，才变成了你最初看到的混乱模样。',
  }),
  createDialog({
    text: '你有 20 分钟，我要求你在 20 分钟内阻止强人工智能的，也就是当初我的诞生。',
    nextPage: '/dialog?id=6',
  }),
]
