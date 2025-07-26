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
import Desktop from '@/views/Desktop.vue'
import Zhihu from '@/views/Zhihu.vue'
import WarningView from '@/views/main/warning/WarningView.vue'
import PlainTextView from '@/views/PlainTextView.vue'
import Terminal from '@/views/Terminal.vue'

// Novel Scenes
import Act1Twitter from '@/views/novel/Act1Twitter.vue'
import DystopianTwitterHomeView from '@/views/novel/DystopianTwitterHomeView.vue'
import Act2PatientZeroIntro from '@/views/novel/Act2PatientZeroIntro.vue'
import Act3Exposition from '@/views/novel/Act3Exposition.vue'
import Act3Wikipedia from '@/views/novel/Act3Wikipedia.vue'
import Act4Game from '@/views/novel/Act4Game.vue'
import Act5TheTwist from '@/views/novel/Act5TheTwist.vue'
import Act6Terminal from '@/views/novel/Act6Terminal.vue'
import Epilogue from '@/views/novel/Epilogue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/act1/twitter',
    },
    {
      path: '/home',
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
      path: '/terminal',
      component: Terminal,
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
      path: '/desktop',
      component: Desktop,
    },
    {
      path: '/zhihu',
      component: Zhihu,
    },

    // Novel Routes
    {
      path: '/act1/twitter',
      meta: { transition: 'fade' },
      component: Act1Twitter,
      children: [
        {
          path: '',
          component: DystopianTwitterHomeView,
          name: 'dystopianTwitterHome',
        },
      ],
    },
    {
        path: '/act2/patient-zero-intro',
        component: Act2PatientZeroIntro,
    },
    {
        path: '/act3/exposition',
        component: Act3Exposition,
    },
    {
        path: '/act3/wikipedia',
        component: Act3Wikipedia,
    },
    {
        path: '/act4/game',
        component: Act4Game,
    },
    {
        path: '/act5/the-twist',
        component: Act5TheTwist,
    },
    {
        path: '/act6/terminal',
        component: Act6Terminal,
    },
    {
        path: '/epilogue',
        component: Epilogue,
    }
  ],
})

export default router
