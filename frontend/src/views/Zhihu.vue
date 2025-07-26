<script setup lang="ts">
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    author: '战地观察员',
    avatar: 'https://picsum.photos/seed/user1/80/80',
    time: '2小时前',
    title: '泰国与柬埔寨在两国边境地区发生交火，背后有哪些原因？目前情况如何？',
    content:
      '据前线报道，交火主要集中在柏威夏寺附近区域。双方均动用了重型武器，目前已造成数十人伤亡。国际社会呼吁双方保持克制，通过外交途径解决争端。历史上，两国在边境划分上一直存在争议，特别是围绕柏威夏寺的归属问题...',
    imageUrl: 'https://picsum.photos/seed/border_conflict/400/250',
    likes: '1.2k',
    comments: 345,
    tags: ['国际关系', '东南亚', '边境冲突'],
  },
  {
    id: 2,
    author: '疾控科普君',
    avatar: 'https://picsum.photos/seed/user2/80/80',
    time: '4小时前',
    title: '广东顺德基孔肯雅热病例接近三千，已外溢至省外，为什么传播这么快？有哪些症状？如何预防？',
    content:
      '基孔肯雅热通过伊蚊叮咬传播，近期华南地区持续高温高湿，为蚊虫滋生提供了温床。加上暑期人员流动频繁，导致疫情快速扩散。典型症状包括急性发热、关节疼痛、皮疹等。预防措施主要是防蚊灭蚊，清除积水，使用防蚊用品...',
    imageUrl: null,
    likes: '874',
    comments: 112,
    tags: ['医学', '公共卫生', '疾病预防'],
  },
  {
    id: 3,
    author: '航空物语',
    avatar: 'https://picsum.photos/seed/user3/80/80',
    time: '6小时前',
    title:
      '7月24日一架搭载49人俄客机坠毁无人生还，失事原因可能为能见度差、操作失误，具体情况如何？',
    content:
      '失事客机型号为安-24，隶属于安加拉航空公司。飞机在伊尔库茨克州执行降落时撞向地面。初步调查显示，事发时机场有浓雾，能见度极低。黑匣子已找到，正在进行数据分析。这起事故再次提醒我们航空安全的重要性...',
    imageUrl: 'https://picsum.photos/seed/plane_crash/400/250',
    likes: '4.5k',
    comments: 1100,
    tags: ['航空', '安全事故', '俄罗斯'],
  },
  {
    id: 4,
    author: '科技前沿观察',
    avatar: 'https://picsum.photos/seed/user4/80/80',
    time: '8小时前',
    title: 'ChatGPT推出代码解释器功能，对程序员工作会产生什么影响？',
    content:
      'OpenAI最新发布的代码解释器功能可以直接运行Python代码，分析数据，生成图表。这一功能的推出引发了程序员群体的广泛讨论。有人认为这会提高开发效率，也有人担心会影响就业。从技术角度来看，这确实是一个重大突破...',
    imageUrl: 'https://picsum.photos/seed/ai_code/400/250',
    likes: '2.8k',
    comments: 567,
    tags: ['人工智能', 'ChatGPT', '编程'],
  },
])

const hotTopics = ref([
  { id: 1, title: '成都大运会开幕式', heat: '1234万' },
  { id: 2, title: '台风杜苏芮登陆', heat: '896万' },
  { id: 3, title: '暑期档电影票房', heat: '567万' },
  { id: 4, title: 'AI绘画版权争议', heat: '432万' },
  { id: 5, title: '新能源汽车降价', heat: '321万' },
])

const circles = ref([
  {
    id: 1,
    name: 'AI时代的我们',
    avatar: 'https://picsum.photos/seed/circle1/80/80',
    members: '9.2万',
    posts: '5011',
  },
  {
    id: 2,
    name: 'Python程序员',
    avatar: 'https://picsum.photos/seed/circle2/80/80',
    members: '15.6万',
    posts: '12.3k',
  },
  {
    id: 3,
    name: '投资理财那些事',
    avatar: 'https://picsum.photos/seed/circle3/80/80',
    members: '23.1万',
    posts: '8.7k',
  },
])
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
    <!-- Header -->
    <header
      class="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-slate-700">
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
          <!-- Left Section -->
          <div class="flex items-center space-x-8">
            <!-- 知乎 Logo -->
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span class="text-white font-bold text-lg">知</span>
              </div>
              <span class="text-xl font-bold text-gray-800 dark:text-gray-100">知乎</span>
            </div>
            <nav class="hidden md:flex items-center space-x-6 text-gray-600 dark:text-gray-300">
              <a href="#" class="text-blue-500 font-medium border-b-2 border-blue-500 pb-4 -mb-4">首页</a>
              <a href="#" class="hover:text-blue-500 transition-colors">会员</a>
              <a href="#" class="hover:text-blue-500 transition-colors">发现</a>
              <a href="#" class="hover:text-blue-500 transition-colors">等你来答</a>
            </nav>
          </div>

          <!-- Center Section: Search -->
          <div class="flex-1 max-w-lg mx-8 hidden lg:block">
            <div class="relative">
              <input type="text" placeholder="搜索你感兴趣的内容..."
                class="w-full bg-gray-100 dark:bg-slate-700 border-0 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-600 transition-all" />
              <svg class="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <!-- Right Section -->
          <div class="flex items-center space-x-4">
            <button
              class="px-6 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors hidden sm:block">
              提问
            </button>
            <div class="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <div class="relative cursor-pointer">
                <svg class="h-6 w-6 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 min-w-5 text-center">3</span>
              </div>
              <div class="relative cursor-pointer">
                <svg class="h-6 w-6 hover:text-gray-700 dark:hover:text-gray-300 transition-colors" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <img src="https://picsum.photos/seed/avatar/40/40" alt="Avatar"
                class="h-8 w-8 rounded-full cursor-pointer border-2 border-transparent hover:border-blue-200 transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 pt-6 max-w-7xl">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Left Column: Feed -->
        <div class="lg:col-span-3 space-y-4">
          <!-- Tab Navigation -->
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
            <div class="flex items-center px-6 py-4 border-b border-gray-100 dark:border-slate-700">
              <a href="#" class="px-4 py-2 font-medium text-blue-500 border-b-2 border-blue-500 -mb-4">推荐</a>
              <a href="#"
                class="px-4 py-2 font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">热榜</a>
              <a href="#"
                class="px-4 py-2 font-medium text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors">关注</a>
            </div>

            <!-- Posts -->
            <div class="divide-y divide-gray-100 dark:divide-slate-700">
              <article v-for="post in posts" :key="post.id"
                class="p-6 hover:bg-gray-50 dark:hover:bg-slate-750 transition-colors">
                <div class="flex items-start space-x-4">
                  <!-- Avatar -->
                  <img :src="post.avatar" alt="Author avatar" class="w-10 h-10 rounded-full flex-shrink-0 mt-1" />

                  <div class="flex-1 min-w-0">
                    <!-- Author info -->
                    <div class="flex items-center space-x-2 mb-2">
                      <span class="font-medium text-gray-900 dark:text-gray-100">{{
                        post.author
                        }}</span>
                      <span class="text-gray-400 text-sm">{{ post.time }}</span>
                    </div>

                    <!-- Title -->
                    <h2
                      class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 hover:text-blue-600 cursor-pointer line-clamp-2">
                      {{ post.title }}
                    </h2>

                    <!-- Content with image -->
                    <div class="flex space-x-4 mb-4">
                      <div class="flex-1">
                        <p class="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                          {{ post.content }}
                        </p>
                      </div>
                      <img v-if="post.imageUrl" :src="post.imageUrl" alt="Post image"
                        class="w-32 h-20 object-cover rounded-lg flex-shrink-0" />
                    </div>

                    <!-- Tags -->
                    <div class="flex flex-wrap gap-2 mb-4" v-if="post.tags">
                      <span v-for="tag in post.tags" :key="tag"
                        class="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full">
                        {{ tag }}
                      </span>
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center justify-between">
                      <div class="flex items-center space-x-6">
                        <button class="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4L4 14h6v6h4v-6h6z" />
                          </svg>
                          <span class="text-sm">赞同 {{ post.likes }}</span>
                        </button>
                        <button class="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span class="text-sm">{{ post.comments }} 条评论</span>
                        </button>
                        <button class="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          <span class="text-sm">收藏</span>
                        </button>
                      </div>
                      <button class="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        <!-- Right Column: Sidebar -->
        <div class="lg:col-span-1 space-y-4">
          <!-- Creator Center -->
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-4">创作中心</h3>
            <div class="grid grid-cols-2 gap-4 text-center mb-4">
              <div>
                <p class="text-2xl font-bold text-orange-500">127</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">今日阅读</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-red-500">23</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">今日新增赞同</p>
              </div>
            </div>
            <button
              class="w-full bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-medium py-2.5 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
              进入创作中心
            </button>
          </div>

          <!-- Hot Topics -->
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-4">热门话题</h3>
            <div class="space-y-3">
              <div v-for="topic in hotTopics" :key="topic.id"
                class="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">
                <div>
                  <p class="font-medium text-sm text-gray-800 dark:text-gray-200">
                    {{ topic.title }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ topic.heat }} 热度</p>
                </div>
                <div class="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- Circles -->
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
            <h3 class="font-semibold text-gray-800 dark:text-gray-200 mb-4">推荐圈子</h3>
            <div class="space-y-4">
              <div v-for="circle in circles" :key="circle.id" class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <img :src="circle.avatar" :alt="circle.name" class="w-10 h-10 rounded-lg" />
                  <div>
                    <p class="font-medium text-sm text-gray-800 dark:text-gray-200">
                      {{ circle.name }}
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      {{ circle.members }} 成员 · {{ circle.posts }} 内容
                    </p>
                  </div>
                </div>
                <button
                  class="bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-1.5 text-xs font-medium rounded-full transition-colors">
                  + 加入
                </button>
              </div>
            </div>
          </div>

          <!-- Footer Links -->
          <div class="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700 p-4">
            <div class="text-xs text-gray-500 dark:text-gray-400 space-y-2">
              <div class="flex flex-wrap gap-2">
                <a href="#" class="hover:text-blue-500">关于知乎</a>
                <a href="#" class="hover:text-blue-500">用户协议</a>
                <a href="#" class="hover:text-blue-500">隐私保护</a>
              </div>
              <div class="flex flex-wrap gap-2">
                <a href="#" class="hover:text-blue-500">侵权举报</a>
                <a href="#" class="hover:text-blue-500">网上有害信息举报</a>
              </div>
              <p class="pt-2 border-t border-gray-100 dark:border-slate-700">© 2023 知乎</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.font-sans {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei',
    'Source Han Sans SC', 'Noto Sans CJK SC', 'WenQuanYi Micro Hei', sans-serif;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
