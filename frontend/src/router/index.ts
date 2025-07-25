import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TwitterView from '@/views/twitter/TwitterView.vue'
import TwitterHomeView from '@/views/twitter/home/TwitterHomeView.vue'
import TwitterMessagesView from '@/views/twitter/messages/TwitterMessagesView.vue'
import MainView from '@/views/main/MainView.vue'
import IntroView from '@/views/main/IntroView.vue'
import Wikipedia from '../views/Wikipedia.vue'
import Zhihu from '../views/Zhihu.vue'
import DialogView from '@/views/main/DialogView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/dialog',
      component: DialogView,
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
  ],
})

export default router
