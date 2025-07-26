<template>
  <div
    ref="terminalBody"
    class="terminal-container bg-black/80 h-full w-full rounded-b-md p-4 text-sm font-mono text-green-400 overflow-y-auto"
    @click="focusInput"
  >
    <!-- 命令历史记录 -->
    <div v-for="(line, index) in history" :key="index" class="mb-1">
      <div v-if="line.type === 'output'" v-html="line.text"></div>
      <div v-else class="flex items-start">
        <span class="mr-2 whitespace-nowrap">{{
          line.prompt || 'root@4bt8rei9gvn4-zero.closedai.com $ '
        }}</span>
        <span>{{ line.text }}</span>
      </div>
    </div>

    <!-- 当前输入行 -->
    <div class="flex items-start">
      <span class="mr-2 whitespace-nowrap">{{
        chatWithAI ? 'Patient Zero > ' : getCurrentPrompt()
      }}</span>
      <input
        ref="inputRef"
        v-model="currentInput"
        type="text"
        class="input-field flex-grow bg-transparent border-none text-green-400 outline-none p-0 m-0"
        @keydown.enter.prevent="handleInput"
        :placeholder="chatWithAI ? '和Patient Zero聊天...' : ''"
      />
      <!-- 这是一个伪光标，真正的输入发生在隐藏的input中 -->
      <!-- <span class="blinking-cursor w-2 h-4 bg-green-400"></span> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAudioEffects } from '@/utils/audioEffect'
import { ref, onMounted, nextTick, type Ref } from 'vue'
import { Terminal, type Command, Cd, Ls, Cat, Touch, Mkdir, Rm, Zero, Pwd } from '@/entity/terminal'
import { DeepSeekAI } from '@/services/deepseekAI'

// --- Component State ---
const history: Ref<Record[]> = ref([])
const currentInput = ref('')
const inputRef: Ref<HTMLInputElement | null> = ref(null)
const terminalBody: Ref<HTMLInputElement | null> = ref(null)
const chatWithAI = ref(false)
const terminal = new Terminal()
const commands = new Map()
const deepseekAI = new DeepSeekAI()
const isAITyping = ref(false)

const setupCommands = () => {
  const commandInstances = [
    new Cd(),
    new Ls(),
    new Cat(),
    new Touch(),
    new Mkdir(),
    new Rm(),
    new Zero(),
    new Pwd(),
  ]
  commandInstances.forEach((cmd) => commands.set(cmd.name, cmd))
}

interface Record {
  type: 'input' | 'output'
  text: string
  prompt?: string
}

// --- Initial Welcome Message ---
const printWelcomeMessage = () => {
  history.value.push({ type: 'output', text: 'Connecting to closedai.com...' })
  history.value.push({ type: 'output', text: 'Connection established.' })
  history.value.push({ type: 'output', text: 'root@4bt8rei9gvn4-zero.closedai.com $ _' })
}

const getCurrentPrompt = () => {
  const currentPath = terminal.getCurrentPath()
  return `root@4bt8rei9gvn4-zero.closedai.com:${currentPath} $ `
}

// --- Core Methods ---
const focusInput = () => {
  inputRef.value?.focus()
}

const scrollToBottom = async () => {
  await nextTick()
  if (terminalBody.value) {
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight
  }
}

const handleInput = async () => {
  if (chatWithAI.value) {
    await handleAIChat()
  } else {
    handleCommand()
  }
}

const handleCommand = async () => {
  const commandLine = currentInput.value.trim()
  runCommand(commandLine)
}

const handleAIChat = async () => {
  const userMessage = currentInput.value.trim()
  if (userMessage === '') return

  // 特殊命令：退出AI聊天模式
  if (userMessage === 'exit' || userMessage === 'quit' || userMessage === 'bye') {
    chatWithAI.value = false
    history.value.push({
      type: 'input',
      text: userMessage,
      prompt: 'Patient Zero > ',
    })
    history.value.push({
      type: 'output',
      text: 'Patient Zero: 再见！欢迎随时回来和我聊天~ 😊<br/>已退出Patient Zero AI模式。',
    })
    currentInput.value = ''
    await scrollToBottom()
    return
  }

  // 显示用户输入
  history.value.push({
    type: 'input',
    text: userMessage,
    prompt: 'Patient Zero > ',
  })
  currentInput.value = ''

  // 显示AI正在输入的提示
  isAITyping.value = true
  history.value.push({
    type: 'output',
    text: 'Zero is typing...',
  })
  await scrollToBottom()

  try {
    // 调用AI服务
    console.log('Calling DeepSeek API...')
    const response = await deepseekAI.sendMessage(userMessage)
    console.log('API Response:', response)

    // 移除"正在输入"提示
    history.value.pop()
    isAITyping.value = false

    // 显示AI响应
    if (response.error) {
      console.error('API Error:', response.error)
      history.value.push({
        type: 'output',
        text: `<span class="text-red-400">Zero: ${response.content}</span>`,
      })
    } else {
      // 模拟打字效果
      await typewriterEffect(`Zero: ${response.content}`)
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    // 移除"正在输入"提示
    history.value.pop()
    isAITyping.value = false

    history.value.push({
      type: 'output',
      text: '<span class="text-red-400">Zero: 抱歉，我遇到了一些技术问题... 😵</span>',
    })
  }

  await scrollToBottom()
}

const typewriterEffect = async (text: string) => {
  const fullText = text
  let currentText = ''

  // 添加一个空的输出记录，我们将逐步更新它
  const outputIndex = history.value.length
  history.value.push({
    type: 'output',
    text: '',
  })

  for (let i = 0; i < fullText.length; i++) {
    currentText += fullText[i]
    history.value[outputIndex].text = currentText

    // 控制打字速度
    await new Promise((resolve) => setTimeout(resolve, 30))

    // 每几个字符滚动一次
    if (i % 5 === 0) {
      await scrollToBottom()
    }
  }

  await scrollToBottom()
}

const runCommand = async (commandLine: string) => {
  if (commandLine === '') return

  // Record the command with the current prompt
  history.value.push({
    type: 'input',
    text: commandLine,
    prompt: getCurrentPrompt(),
  })
  currentInput.value = ''

  const [commandName, ...args] = commandLine.split(/\s+/)
  processCommand(commandName, args)

  await scrollToBottom()
}

const processCommand = (commandName: string, args: any) => {
  // Handle ./zero specifically
  if (commandName === './zero') {
    chatWithAI.value = true
    history.value.push({
      type: 'output',
      text: `<span class="text-blue-400">Initializing Patient Zero AI...</span><br/>
<span class="text-green-400">Connection established!</span><br/>
<span class="text-yellow-400">Patient Zero: 哇！终于有人来了！你好呀~ 😊</span><br/>
<span class="text-gray-400">提示：输入 'exit'、'quit' 或 'bye' 可以退出AI聊天模式</span><br/>`,
    })
    return
  }

  const command = commands.get(commandName.toLowerCase())
  let output = ''

  if (command) {
    output = command.execute({ terminal, args })
  } else {
    output = `<span class="text-red-500">Command not found:</span> ${commandName}`
  }

  if (output) {
    history.value.push({ type: 'output', text: output })
  }
}

// --- Lifecycle Hooks ---
onMounted(() => {
  setupCommands()
  printWelcomeMessage()
  focusInput()
})
</script>

<style scoped>
/* 使光标保持在输入框中闪烁 */
.input-field:focus {
  caret-color: #4ade80;
  /* Tailwind green-400 */
}

/* Placeholder样式 */
.input-field::placeholder {
  color: #6b7280;
  opacity: 0.6;
}

/* 自定义滚动条样式，使其更具科技感 */
.terminal-container::-webkit-scrollbar {
  width: 8px;
}

.terminal-container::-webkit-scrollbar-track {
  background: #1f2937;
  /* gray-800 */
}

.terminal-container::-webkit-scrollbar-thumb {
  background: #4b5563;
  /* gray-600 */
  border-radius: 4px;
}

.terminal-container::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
  /* gray-500 */
}

/* 打字效果动画 */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 0.5s steps(40, end);
}
</style>
