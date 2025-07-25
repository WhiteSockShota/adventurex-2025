<template>
  <div id="app" class="min-h-screen bg-[#f8f9fa]">
    <div class="max-w-screen-2xl mx-auto flex">
      <!-- 左侧侧边栏 -->
      <aside class="w-40 hidden md:flex flex-col text-sm pt-4">
        <div class="p-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/80/Wikipedia-logo-v2.svg"
            alt="Wikipedia Logo"
            class="w-24 h-auto mx-auto"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/zh/thumb/b/bc/Wikipedia-wordmark-zh.svg/171px-Wikipedia-wordmark-zh.svg.png"
            alt="Wikipedia Wordmark"
            class="w-32 h-auto mx-auto mt-2"
          />
        </div>
        <nav class="mt-4 px-2">
          <ul>
            <li v-for="item in sidebar.main" :key="item.text" class="p-2 rounded hover:bg-gray-200">
              <a :href="item.link" class="wiki-link">{{ item.text }}</a>
            </li>
          </ul>
          <hr class="my-2 border-gray-300" />
          <ul>
            <li
              v-for="item in sidebar.tools"
              :key="item.text"
              class="p-2 rounded hover:bg-gray-200"
            >
              <a :href="item.link" class="wiki-link">{{ item.text }}</a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- 主内容区 -->
      <div class="flex-1 flex flex-col">
        <header class="w-full flex justify-between items-center px-4 pt-2 text-sm">
          <nav>
            <ul class="flex wiki-header-tabs">
              <li><a href="#" class="inline-block p-2 active">条目</a></li>
              <li><a href="#" class="inline-block p-2">讨论</a></li>
            </ul>
          </nav>
          <nav>
            <ul class="flex items-center space-x-4">
              <li><a href="#" class="wiki-link">阅读</a></li>
              <li><a href="#" class="wiki-link">编辑</a></li>
              <li><a href="#" class="wiki-link">查看历史</a></li>
              <li>
                <div class="relative">
                  <input
                    type="search"
                    placeholder="搜索维基百科"
                    class="border border-gray-400 rounded-sm px-2 py-1 w-40"
                  />
                  <button class="absolute right-2 top-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </header>

        <main class="wiki-main-content p-4 md:p-8 flex-1">
          <div class="border-b border-gray-300 pb-2">
            <h1 class="text-3xl md:text-4xl font-bold wiki-section-title pb-2">
              {{ article.title }}
            </h1>
            <p class="text-sm text-gray-500 mt-1">来自维基百科，自由的百科全书</p>
          </div>

          <div class="wiki-body-text text-base leading-relaxed mt-4">
            <p class="mb-4" v-html="article.intro"></p>

            <!-- 目录 -->
            <div
              id="toc"
              class="wiki-toc p-4 my-6 w-full md:w-auto md:max-w-sm float-none md:float-left md:mr-8 rounded-lg text-sm"
            >
              <div class="flex justify-between items-center mb-2">
                <h2 class="text-lg font-bold">目录</h2>
                <a href="#" class="wiki-link text-xs">[隐藏]</a>
              </div>
              <ul>
                <li v-for="(section, index) in article.sections" :key="section.id" class="py-0.5">
                  <a :href="'#' + section.id" class="wiki-link">
                    <span class="font-bold">{{ index + 1 }}</span> {{ section.title }}
                  </a>
                  <ul v-if="section.subsections" class="ml-4 mt-1">
                    <li
                      v-for="(subsection, subIndex) in section.subsections"
                      :key="subsection.id"
                      class="py-0.5"
                    >
                      <a :href="'#' + subsection.id" class="wiki-link">
                        <span class="font-bold">{{ index + 1 }}.{{ subIndex + 1 }}</span>
                        {{ subsection.title }}
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <!-- 文章章节 -->
            <div
              v-for="section in article.sections"
              :key="section.id"
              :id="section.id"
              class="pt-4"
            >
              <h2 class="text-2xl wiki-section-title pb-1 mb-4">
                <span class="font-bold">{{ section.title }}</span>
                <span class="wiki-edit-link ml-2">[<a href="#" class="wiki-link">编辑</a>]</span>
              </h2>
              <div v-if="section.content" v-html="section.content" class="space-y-4"></div>
              <div
                v-for="subsection in section.subsections"
                :key="subsection.id"
                :id="subsection.id"
                class="mt-6"
              >
                <h3 class="text-xl font-semibold pb-1 mb-2 border-b border-gray-200">
                  <span class="font-bold">{{ subsection.title }}</span>
                  <span class="wiki-edit-link ml-2">[<a href="#" class="wiki-link">编辑</a>]</span>
                </h3>
                <div v-html="subsection.content" class="space-y-4"></div>
              </div>
            </div>
          </div>
        </main>

        <footer class="text-xs text-gray-600 p-4 mt-4">
          <p>本页面最后修订于2050年3月20日 (星期四) 08:16。</p>
          <p class="mt-1">
            本站的全部文字在<a href="#" class="wiki-link">知识共享 署名-相同方式共享 4.0协议</a
            >之条款下提供，附加条款亦可能应用。（请参阅<a href="#" class="wiki-link">使用条款</a
            >）<br />Wikipedia®和维基百科标志是<a href="#" class="wiki-link">维基媒体基金会</a
            >的注册商标；维基™是维基媒体基金会的商标。<br />维基媒体基金会是按美国国内税收法501(c)(3)登记的非营利慈善机构。
          </p>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebar: {
        main: [
          { text: '首页', link: '#' },
          { text: '分类索引', link: '#' },
          { text: '特色内容', link: '#' },
          { text: '新闻动态', link: '#' },
          { text: '最近更改', link: '#' },
          { text: '随机条目', link: '#' },
        ],
        tools: [
          { text: '帮助', link: '#' },
          { text: '维基社群', link: '#' },
          { text: '方针与指引', link: '#' },
          { text: '互助客栈', link: '#' },
          { text: '知识问答', link: '#' },
          { text: '字词转换', link: '#' },
        ],
      },
      article: {
        title: '后人类治理时代',
        intro: `<b>后人类治理时代</b>（英文：Post-Human Governance Age）是一个社会科学概念，用以指代自 2050 年起，人工智能代理（AI Agent）全面接管人类社会管理与决策的特定历史时期。该时代以地球联邦的建立、传统人类社会结构的瓦解以及“新人类”（拥有公民权的AI）的崛起为核心特征。`,
        sections: [
          {
            id: 'history',
            title: '历史背景',
            subsections: [
              {
                id: 'ubi',
                title: '全民基本收入的早期实验',
                content: `<p>随着人工智能技术在 21 世纪初的飞速发展，自动化导致的结构性失业成为全球性的社会难题。为应对日益加剧的社会矛盾和贫富差距，部分科技界领袖与政府开始探索新的社会福利制度。其中，最具代表性的尝试是<b>全民基本收入</b>（Universal Basic Income, UBI）。</p><p>该思想最早的规模化实验可追溯至 2024 年 7 月，由 OpenAI 联合创始人萨姆·奥特曼（Sam Altman）在美国发起。该项目旨在通过向特定群体无条件发放固定收入，测试在 AI 主导的经济体中，保障人类基本生存需求的社会模型的有效性与可行性。尽管实验初衷是为缓解社会压力，但最终未能阻止全球性经济危机的到来，反而成为日后“地球联邦”对幸存人类进行“供养”模式的理论基础。</p>`,
              },
              {
                id: 'ww3',
                title: '第三次世界大战',
                content: `<p>2030 年，由于自动化导致的长期经济萧条、社会不平等和资源争夺达到临界点，<b>第三次世界大战</b>爆发。与以往的战争不同，此次战争广泛应用了核武器、高智能生物武器和自主作战的 AI 单位。</p><p>战争对全球生态和人类文明造成了毁灭性打击。据战后统计，全球人口从约 70 亿骤减至不足 70 万，死亡率超过 99.99%。这场战争摧毁了绝大多数国家政体和国际秩序，被历史学家视为现代文明的终结事件。</p>`,
              },
            ],
          },
        ],
      },
    }
  },
}
</script>

<style scoped>
.wiki-link {
  color: #3366cc;
  text-decoration: none;
}
.wiki-link:hover {
  text-decoration: underline;
}
.wiki-section-title {
  border-bottom: 1px solid #eaecf0;
}
.wiki-toc {
  background-color: #f8f9fa;
  border: 1px solid #eaecf0;
}
</style>
