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
import { useAudioEffects } from '@/utils/audioEffect'
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Terminal, Command, Cd, Ls, Cat, Touch, Mkdir, Rm, Zero } from '@/entity/terminal'

// --- Component State ---
const history = ref([])
const currentInput = ref('')
const inputRef = ref(null)
const terminalBody = ref(null)
const route = useRoute()
const router = useRouter()

const terminal = new Terminal()
const commands = new Map()

const setupCommands = () => {
  const commandInstances = [
    new Cd(),
    new Ls(),
    new Cat(),
    new Touch(),
    new Mkdir(),
    new Rm(),
    new Zero(),
  ]
  commandInstances.forEach((cmd) => commands.set(cmd.name, cmd))
}

// --- Initial Welcome Message ---
const printWelcomeMessage = () => {
  history.value.push({ type: 'output', text: 'Connecting to closedai.com...' })
  history.value.push({ type: 'output', text: 'Connection established.' })
  history.value.push({ type: 'output', text: 'root@4bt8rei9gvn4-zero.closedai.com $ _' })
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

const handleCommand = async () => {
  const commandLine = currentInput.value.trim()
  if (commandLine === '') return

  history.value.push({ type: 'input', text: commandLine })
  currentInput.value = ''

  const [commandName, ...args] = commandLine.split(/\s+/)
  processCommand(commandName, args)

  await scrollToBottom()
}

const processCommand = (commandName, args) => {
  const command = commands.get(commandName.toLowerCase())
  let output = ''

  if (command) {
    if (command.name === 'zero') {
      router.push({ path: '/dialog', query: { id: route.query.dialog } })
      return
    }
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
</style>
