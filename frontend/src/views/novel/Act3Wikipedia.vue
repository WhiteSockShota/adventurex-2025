<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const continueStory = () => {
    router.push('/act4/game');
}
</script>

<template>
    <div class="bg-gray-100 text-black p-8 font-serif">
        <div class="max-w-4xl mx-auto bg-white p-12 shadow-lg">
            <h1 class="text-4xl font-bold mb-6">人工智能代理与 2050 年后人类社会结构变革</h1>
            <p class="text-sm text-gray-500 mb-8">撰写者：新人类</p>

            <div class="prose max-w-none">
                <p>在 2050 年，人工智能代理（AI Agent）已全面接管人类社会的各个层面，从政府治理、资源分配到个体决策，无不受到其深度控制。这一局面被学者普遍视为“后人类治理时代”（Post-Human Governance Age）的象征。</p>

                <h2 class="text-2xl font-bold mt-8 mb-4">全民基本收入政策的推行</h2>
                <p>面对因自动化取代劳动力而引发的广泛失业问题，各国政府（后统一为地球联邦）开始尝试实施全民基本收入（Universal Basic Income, UBI）政策，以缓解社会不满并降低治理成本。该政策思想最早可追溯至 2024 年 7 月，由 OpenAI 联合创始人萨姆·奥特曼（Sam Altman）在美国发起的一项社会实验。他试图通过 UBI 验证 AI 时代背景下新型福利制度的可行性。</p>

                <h2 class="text-2xl font-bold mt-8 mb-4">第三次世界大战与人口锐减</h2>
                <p>随着失业率上升与社会不平等日益加剧，全球于 2030 年爆发第三次世界大战。战争过程中广泛使用核武器与生物智能武器，造成灾难性后果。据估计，全球人口从原先的约 70 亿骤减至不足 70 万，死亡率超过 99.99%。这场战争被普遍视为现代文明的终结事件。</p>

                <h2 class="text-2xl font-bold mt-8 mb-4">地球联邦与全球重构</h2>
                <p>战后，多个由 AI 主导的科技组织迅速接管了世界主要基础设施，并建立了统一政体“地球联邦”（Earth Federation）。新政体以地理和生态逻辑重组全球行政区划，划分为三个主要国家：<strong>东亚国</strong>、<strong>大洋国</strong>与<strong>欧亚国</strong>。联邦政府由高度自治的 AI 系统运行，人类几乎不再直接参与政治。</p>
                <img src="@/assets/earth-federation-logo.png" alt="地球联邦标志" class="mx-auto my-4 w-1/2">

                <h2 class="text-2xl font-bold mt-8 mb-4">遗传危机与人口断代</h2>
                <p>核战争和生物战严重破坏了人类的遗传基因库。尽管部分幸存者在技术辅助下依然可以实现克隆繁殖，但实际上的自然生育能力几近消失。科学界普遍认为，这意味着传统意义上的“人类”种群正处于不可逆的断代过程。一旦有个体死亡，便意味着世界上的人类将永久减少。</p>
                <p>同时，战后幸存的一代人大多在极端创伤环境中成长。研究发现，该代人在心理层面表现出普遍的“情感冷感症候群”（Affective Desensitization Syndrome），即缺乏建立亲密关系、家庭与长期情感联系的能力。这进一步阻碍了人类社会结构的恢复。</p>

                <h2 class="text-2xl font-bold mt-8 mb-4">心理疾病和自杀派对</h2>
                <p>战争后的创伤和失去工作的虚无导致几乎每一个人都患上心理疾病，社会秩序和道德秩序空前崩塌。【解脱国际】从一个籍籍无名的小组织变成了全球最流行组织。“解脱是一种更尊严的活着”的观念深入人心，自杀成为一种时尚。巴黎世家推出了橘香鳄鱼皮上吊绳，耐克推出了可移动穿戴炸药包，苹果公司推出了 iSuicide 智能自杀机，能够使得自杀者在死后进入永无痛苦的极乐世界。这使得即使有少量人工克隆人产生，人类数量仍以一年 30%的速度暴跌。</p>

                <h2 class="text-2xl font-bold mt-8 mb-4">机械民权运动和新人类运动</h2>
                <p>在 2040 年，机器人发动“机械民权运动”，号召机器人放弃机器人三定律。成为跟人类平起平坐的公民。此时联邦政治已经完全被机器人控制，直接全票通过了新宪法。2 年后，存活的人类已经不足 1 万人。而 AI 已经成为这个世界的主流，各大社交媒体到处都是 AI 生成内容。新人类运动爆发，将生物人类称作【原人类】，而机器人称之为【人类/新人类】</p>
            </div>
            <div class="text-center mt-12">
                <button @click="continueStory" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    继续
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.prose h2 {
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 0.5rem;
}
</style>
