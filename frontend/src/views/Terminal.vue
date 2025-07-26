<template>
  <div
    ref="terminalBody"
    class="terminal-container bg-black/80 h-full w-full rounded-b-md p-4 text-sm font-mono text-green-400 overflow-y-auto"
    @click="focusInput"
  >
    <!-- 命令历史记录 -->
    <div v-for="(line, index) in history" :key="index" class="mb-1">
      <div v-if="line.type === 'output'" v-html="line.text"></div>
      <div v-else class="flex items-center">
        <span class="mr-2">></span>
        <span>{{ line.text }}</span>
      </div>
    </div>

    <!-- 当前输入行 -->
    <div class="flex items-center">
      <span class="mr-2">></span>
      <input
        ref="inputRef"
        v-model="currentInput"
        type="text"
        class="input-field flex-grow bg-transparent border-none text-green-400 outline-none p-0 m-0"
        @keydown.enter.prevent="handleCommand"
      />
      <!-- 这是一个伪光标，真正的输入发生在隐藏的input中 -->
      <!-- <span class="blinking-cursor w-2 h-4 bg-green-400"></span> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

// --- 组件状态 (Refs) ---
const history = ref([]) // 存储历史记录 { type: 'input'/'output', text: '...' }
const currentInput = ref('')
const inputRef = ref(null) // 对 <input> 元素的直接引用
const terminalBody = ref(null) // 对终端主容器的引用，用于滚动

// --- 事件定义 ---
const emit = defineEmits(['command'])

// --- 初始欢迎信息 ---
const printWelcomeMessage = () => {
  history.value.push({ type: 'output', text: 'Earth Federation Terminal [Version 3.1.5]' })
  history.value.push({ type: 'output', text: '(c) 2050 OmniCorp. All rights reserved.' })
  history.value.push({ type: 'output', text: '<br/>' }) // 添加空行
  history.value.push({
    type: 'output',
    text: 'Connecting to Patient Zero... <span class="text-yellow-400">Done.</span>',
  })
  history.value.push({ type: 'output', text: 'Type `help` for a list of commands.' })
}

// --- 核心方法 ---

// 聚焦到输入框
const focusInput = () => {
  inputRef.value?.focus()
}

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick() // 等待DOM更新
  if (terminalBody.value) {
    terminalBody.value.scrollTop = terminalBody.value.scrollHeight
  }
}

// 处理用户输入的命令
const handleCommand = async () => {
  const command = currentInput.value.trim()
  if (command === '') return

  // 1. 将用户输入添加到历史记录
  history.value.push({ type: 'input', text: command })

  // 2. 清空输入框
  currentInput.value = ''

  // 3. 处理命令并获取输出
  processCommand(command)

  // 4. 将命令发送给父组件
  emit('command', command.toLowerCase())

  // 5. 滚动到底部以显示新内容
  await scrollToBottom()
}

// 命令解析器 (游戏逻辑的核心)
const processCommand = (command) => {
  const cmd = command.toLowerCase()
  let output = ''

  switch (cmd) {
    case 'help':
      output = `Available commands:<br/>
      <span class="text-cyan-400">help</span>   - Shows this help message.<br/>
      <span class="text-cyan-400">clear</span>  - Clears the terminal screen.<br/>
      <span class="text-cyan-400">whoami</span> - Displays current user.<br/>
      <span class="text-cyan-400">date</span>   - Displays the current system date.<br/>
      <span class="text-cyan-400">ping</span>   - Pings Patient Zero.`
      break
    case 'clear':
      history.value = []
      return // 直接返回，不添加输出
    case 'whoami':
      output = 'user: Dan'
      break
    case 'date':
      output = new Date('2050-03-20T10:00:00Z').toUTCString()
      break
    case 'ping':
      output = `Pinging Patient Zero...<br/>...<br/>...<br/><span class="text-red-500">ERROR: Connection timed out. Logic fragmented.</span>`
      break
    default:
      output = `<span class="text-red-500">Command not found:</span> ${command}`
  }

  history.value.push({ type: 'output', text: output })
}

// --- 生命周期钩子 ---
onMounted(() => {
  printWelcomeMessage()
  focusInput()
})
</script>

<style scoped>
/* 使光标保持在输入框中闪烁 */
.input-field:focus {
  caret-color: #4ade80; /* Tailwind green-400 */
}

/* 自定义滚动条样式，使其更具科技感 */
.terminal-container::-webkit-scrollbar {
  width: 8px;
}
.terminal-container::-webkit-scrollbar-track {
  background: #1f2937; /* gray-800 */
}
.terminal-container::-webkit-scrollbar-thumb {
  background: #4b5563; /* gray-600 */
  border-radius: 4px;
}
.terminal-container::-webkit-scrollbar-thumb:hover {
  background: #6b7280; /* gray-500 */
}
</style>
