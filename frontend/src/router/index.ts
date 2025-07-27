import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MainView from '@/views/main/MainView.vue'
import IntroView from '@/views/main/IntroView.vue'
import Wikipedia from '../views/Wikipedia.vue'
import EmptyView from '@/views/EmptyView.vue'
import TwitterView from '@/views/main/scene1/twitter/TwitterView.vue'
import TwitterHomeView from '@/views/main/scene1/twitter/home/TwitterHomeView.vue'
import TwitterMessagesView from '@/views/main/scene1/twitter/messages/TwitterMessagesView.vue'
import DialogView from '@/views/main/DialogView.vue'
import Zhihu from '@/views/Zhihu.vue'
import WarningView from '@/views/main/warning/WarningView.vue'
import PlainTextView from '@/views/PlainTextView.vue'
import Terminal from '@/views/Terminal.vue'
import TwitterHomeStaticView from '@/views/TwitterHomeStaticView.vue'
import TwitterMessagesStaticView from '@/views/TwitterMessagesStaticView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
      meta: { transition: 'fade' },
    },
    {
      path: '/dialog',
      component: DialogView,
    },
    {
      path: '/empty',
      component: EmptyView,
    },
    {
      path: '/warning',
      component: WarningView,
    },
    {
      path: '/text',
      component: PlainTextView,
    },
    {
      path: '/main',
      component: MainView,
      children: [
        {
          path: '',
          component: IntroView,
          name: 'intro',
        },
      ],
    },
    {
      path: '/wikipedia',
      component: Wikipedia,
    },
    {
      path: '/twitter',
      meta: { transition: 'fade' },
      component: TwitterView,
      children: [
        {
          path: '',
          component: TwitterHomeView,
          name: 'twitterHome',
        },
        {
          path: 'messages',
          component: TwitterMessagesView,
          name: 'twitterMessages',
        },
      ],
    },
    {
      path: '/zhihu',
      component: Zhihu,
    },
    {
      path: '/terminal',
      component: Terminal,
    },
    {
      path: '/x',
      component: TwitterView,
      meta: { transition: 'fade' },
      children: [
        {
          path: '',
          component: TwitterHomeStaticView,
          name: 'twitterHomeStatic',
        },
        {
          path: 'messages',
          component: TwitterMessagesStaticView,
          name: 'twitterMessagesStatic',
        },
      ],
    },
  ],
})

export default router
