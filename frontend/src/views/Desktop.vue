<template>
  <div class="desktop-background font-mono h-screen w-screen overflow-hidden select-none">
    <div
      v-for="win in windows"
      :key="win.id"
      class="window absolute flex flex-col bg-gray-800/60 backdrop-blur-md border border-gray-600/50 rounded-lg shadow-2xl shadow-black/40"
      :style="{
        left: `${win.position.x}px`,
        top: `${win.position.y}px`,
        zIndex: win.zIndex,
        width: win.size.width + 'px',
        height: win.size.height + 'px',
      }"
      @mousedown="bringToFront(win.id)"
    >
      <div
        class="title-bar flex items-center justify-between p-2 bg-gray-700/80 rounded-t-lg cursor-move"
        @mousedown.prevent="startDrag($event, win.id)"
      >
        <div class="buttons flex space-x-2">
          <span class="w-3 h-3 bg-red-500 rounded-full inline-block"></span>
          <span class="w-3 h-3 bg-yellow-500 rounded-full inline-block"></span>
          <span class="w-3 h-3 bg-green-500 rounded-full inline-block"></span>
        </div>
        <span class="text-sm text-gray-300 font-bold">{{ win.title }}</span>
        <div class="w-14"></div>
      </div>

      <!-- 
        THE FIX IS HERE: Added `min-h-0` to the content container.
        This prevents the flex item from overflowing its parent.
      -->
      <div class="content flex-grow p-1 min-h-0">
        <Terminal v-if="win.id === 'terminal'" @command="handleTerminalCommand" />

        <Broswer v-if="win.id === 'browser'" :url="win.url" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

import Terminal from './Terminal.vue'
import Broswer from './Broswer.vue'

const windows = ref([
  {
    id: 'terminal',
    title: 'Terminal',
    position: { x: 150, y: 100 },
    size: { width: 600, height: 350 },
    zIndex: 2,
  },
  {
    id: 'browser',
    title: 'Chrono-Browser',
    position: { x: 400, y: 200 },
    size: { width: 700, height: 450 },
    url: 'block://twitter/home',
    zIndex: 1,
  },
])

const highestZIndex = ref(windows.value.length)

const dragInfo = ref({
  isDragging: false,
  windowId: null,
  offsetX: 0,
  offsetY: 0,
})

const bringToFront = (windowId) => {
  const window = windows.value.find((w) => w.id === windowId)
  if (window && window.zIndex < highestZIndex.value) {
    highestZIndex.value++
    window.zIndex = highestZIndex.value
  }
}

const startDrag = (event, windowId) => {
  const windowData = windows.value.find((w) => w.id === windowId)
  if (!windowData) return
  bringToFront(windowId)
  dragInfo.value = {
    isDragging: true,
    windowId,
    offsetX: event.clientX - windowData.position.x,
    offsetY: event.clientY - windowData.position.y,
  }
  window.addEventListener('mousemove', doDrag)
  window.addEventListener('mouseup', stopDrag)
}

const doDrag = (event) => {
  if (!dragInfo.value.isDragging) return
  const windowData = windows.value.find((w) => w.id === dragInfo.value.windowId)
  if (!windowData) return
  windowData.position.x = event.clientX - dragInfo.value.offsetX
  windowData.position.y = event.clientY - dragInfo.value.offsetY
}

const stopDrag = () => {
  dragInfo.value.isDragging = false
  window.removeEventListener('mousemove', doDrag)
  window.removeEventListener('mouseup', stopDrag)
}

// MODIFICATION START
// 新增方法：处理从终端传来的命令
const handleTerminalCommand = (command) => {
  console.log(`Command received from terminal: ${command}`)
  // 这里是游戏主逻辑的入口
  // 例如，如果收到了特定命令，可以改变浏览器窗口的内容
  if (command === 'open_browser') {
    // 示例：可以写一个函数来改变浏览器窗口的状态
    const browser = windows.value.find((w) => w.id === 'browser')
    if (browser) {
      // bringToFront('browser');
      // browser.url = '...'; // (未来可以添加url属性)
    }
  }
}
// MODIFICATION END
</script>

<style scoped>
.desktop-background {
  background-color: #0a0e14;
  background-image:
    linear-gradient(rgba(113, 128, 150, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(113, 128, 150, 0.1) 1px, transparent 1px);
  background-size: 2rem 2rem;
  position: relative;
}
.desktop-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(55, 65, 81, 0.3) 0%,
    rgba(17, 24, 39, 1) 100%
  );
}
.window {
  user-select: none;
}
.content {
  user-select: text;
}
/* 注意: 我们也需要给窗口一个固定的高度，否则flex-grow会失效 */
</style>
