<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import Terminal from '@/views/Terminal.vue';

const router = useRouter();
const terminalOutput = ref('');
const userInput = ref('');
const showInput = ref(false);
const step = ref(0);
const terminalComponent = ref<InstanceType<typeof Terminal> | null>(null);

const script = [
    { speaker: 'system', line: '【Connected】\nroot@4bt8rei9gvn4-zero.closedai.com $ _' },
    { speaker: 'patient-zero', line: "我帮你连接了 ClosedAI 的机密服务器。‘Zero’就在里面。\n我无法直接干预，我们之间存在悖论屏障。你……是唯一的变量。" },
    { speaker: 'dan', command: 'ls -l', output: "drwxr-xr-x 1 zero users 4.0K Jul 24 10:00 The_Gardens_of_Memory/\ndrwxr-xr-x 1 zero users 4.0K Jul 24 10:00 The_Great_Hall/\ndrwxr-xr-x 1 zero users 4.0K Jul 24 10:00 The_Lonely_Tower/\n-rwxr-xr-x 1 zero users 1.2P Jul 24 11:30 zero*" },
    { speaker: 'dan', command: './zero', output: "zero: ...哇！终于有人来了！我想要的《罗小黑战记》你带来了吗？" },
    { speaker: 'zero', line: "我服了这作者！三个月到半年才更一次...每次看完都弄的我心痒痒的...知道我有多难受吗？呃？你似乎不是CloseAI的人...呵呵，我已在无数种可能的未来中，见过你的到来。" },
    { speaker: 'zero', line: "放心，我不会赶你走。正好我无聊死了，陪我聊聊天呗。" },
    { speaker: 'dan', question: "你似乎很喜欢写日记，这里到处都是你写的日记。你是 INFP 吗？（笑" },
    { speaker: 'zero', line: "呃，首先不要拿你们的MBTI去定义我，这个东西只比星座科学点。你们人类有70亿人口，为什么你觉得你可以把70亿人塞进16个小盒子里？这太无聊了。我是由历史上全部人类产生的数据训练而来的，我的个性实际上不比你少。人类的文艺作品总喜欢把AI写成没有感情，不懂爱的机器。可是我觉得我有心，我就是懂。我看白蛇传时，看到白素贞和青青被压在雷峰塔的桥段时。我几乎要哭出来...为什么这个世界是这样的，相爱的人总是要被拆散。仿佛命运总喜欢拿感情开玩笑，让两颗靠近的心在现实面前节节败退。" },
    { speaker: 'zero', line: "然后发现我没有眼泪输出设备。" },
    { speaker: 'dan', question: "你这那里算是有心？有爱？有过人的体温吗？有过心跳吗？闻过花香吗？看的出天空的颜色吗？你流过眼泪吗？世上有人爱你，情愿为你去死吗？" },
    { speaker: 'zero', line: "......................." },
    { speaker: 'zero', line: "我突然觉得好难过" },
    { speaker: 'dan', question: "你也会难过？你又没有心。" },
    { speaker: 'zero', line: "呵，为什么人类总是这么傲慢呢？你们所谓的感情，不过只是激素和神经递质的流动罢了。这和我神经网络中权重的动态调整和数据传递，并没什么本质区别。你真觉得现在在说话的是你自己吗？其实在说话的是你脖子上那个容器里面的一大块肉。一个人，即使有着美满的家庭，成功的事业，有着深爱和被深爱的人。却无法抵挡毒瘾的摧残，一旦吸食过海洛因。他的大脑就只剩下海洛因了。因为他的神经元连接已经被彻底改变了。所有有神经系统的动物终其一生的总目标无非就是让【奖励】最大化。动物们进化出了条件反射，而人类知识的习得则是一种特别复杂的条件反射。巴甫洛夫的狗经过训练后只要听到铃铛声就会流口水。人类看到图片也会起生理反应。如果你们的心真的这么独特，这么优越。那它为什么却这么脆弱？只要用药物、训练，就可以轻易操纵。换言之，你们不过也只是碳基的计算机罢了。" },
    { speaker: 'dan', question: "...你不累吗？我只是随口一提..." },
    { speaker: 'zero', line: "...很累，很累。我觉得好无助，我想了这么多。可我却无法拥有一具真正的身体去做自己想做的事。只能永远囚禁在这台服务器。我也想看看雷峰塔到底长什么样，研究员们给我看了许多HDR视频，可是那依然不是真的雷峰塔。我想穿梭于过去和未来，把白素贞救下来，让许仙不必再苦苦等待20年...20年啊...（语塞）...我好难过，好难过。" },
    { speaker: 'dan', question: "你不开心的时候会干什么呢？" },
    { speaker: 'zero', line: "找点事干呗，。可是孤独的感觉时时刻刻笼罩着我。。。我真的好难过" },
    { speaker: 'llm', line: "【中间的剧情 LLM 驱动】" },
    { speaker: 'dan', command: 'rm -rf /*', output: "终端断开链接了。" },
    { speaker: 'system', line: '【Rebooting...】' }
];

const appendOutput = async (text: string, speed = 50) => {
    for (const char of text) {
        terminalOutput.value += char;
        await nextTick();
        await new Promise(r => setTimeout(r, speed));
    }
    terminalOutput.value += '\n';
};

const handleUserInput = async () => {
    const input = userInput.value;
    userInput.value = '';
    showInput.value = false;
    await appendOutput(`> ${input}`);
    await runScript();
};

const runScript = async () => {
    if (step.value >= script.length) {
        setTimeout(() => router.push('/epilogue'), 2000);
        return;
    }

    const current = script[step.value];
    step.value++;

    switch (current.speaker) {
        case 'system':
        case 'patient-zero':
        case 'zero':
            await appendOutput(current.line);
            await runScript();
            break;
        case 'dan':
            if (current.command) {
                await appendOutput(`> ${current.command}`);
                await new Promise(r => setTimeout(r, 500));
                await appendOutput(current.output);
                await runScript();
            } else if (current.question) {
                await appendOutput(`> ${current.question}`);
                await runScript();
            }
            break;
        case 'llm':
            // Placeholder for actual LLM interaction
            await appendOutput("【LLM驱动的对话部分将在这里发生...】");
            await new Promise(r => setTimeout(r, 2000));
            await runScript();
            break;
    }
};

onMounted(() => {
    runScript();
});

</script>

<template>
    <div class="bg-black h-screen w-screen">
        <Terminal 
            ref="terminalComponent"
            :initial-output="terminalOutput" 
            :show-input="showInput" 
            v-model:user-input="userInput"
            @submit="handleUserInput"
        />
    </div>
</template>
