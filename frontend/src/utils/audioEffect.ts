// src/composables/useAudioEffects.ts

import * as Tone from 'tone'

// 创建一次性的合成器和效果器实例，以提高性能
let typingSynth: Tone.Synth
let panicNoise: Tone.NoiseSynth
let screamSynth: Tone.FMSynth
let bitCrusher: Tone.BitCrusher
let screamFeedback: Tone.FeedbackDelay

// 初始化函数，必须由用户交互触发（例如点击按钮）
export const initializeAudio = async () => {
  // 浏览器要求用户交互后才能启动音频上下文
  await Tone.start()

  // 1. 8-bit 打字音效合成器
  typingSynth = new Tone.Synth({
    oscillator: {
      type: 'square', // 方波是 8-bit 声音的经典波形
    },
    envelope: {
      attack: 0.005,
      decay: 0.1,
      sustain: 0,
      release: 0.1,
    },
  }).toDestination()

  // 2. 内核崩溃音效 (噪声 + 数字失真)
  bitCrusher = new Tone.BitCrusher(4).toDestination() // 4-bit 的 BitCrusher 效果
  panicNoise = new Tone.NoiseSynth({
    noise: {
      type: 'white', // 白噪声听起来更像静电
    },
    envelope: {
      attack: 0.005,
      decay: 0.05,
      sustain: 0,
    },
  }).connect(bitCrusher)

  // 3. 机械悲鸣声 (FM合成器 + 反馈延迟)
  screamFeedback = new Tone.FeedbackDelay({
    delayTime: '8n',
    feedback: 0.6,
  }).toDestination()

  screamSynth = new Tone.FMSynth({
    harmonicity: 3, // 产生金属质感
    modulationIndex: 10,
    envelope: {
      attack: 0.2,
      decay: 0.8,
      sustain: 0.5,
      release: 1.0,
    },
  }).connect(screamFeedback)

  console.log('Audio context initialized.')
}

// 导出一个 composable 函数
export function useAudioEffects() {
  // 播放一次打字音效
  const playTypingSound = () => {
    if (!typingSynth) return
    // 随机化音高，让打字声不那么单调
    typingSynth.triggerAttackRelease('E4', '32n')
  }

  // 播放一次内核崩溃的 "咔" 声
  const playKernelPanic = () => {
    if (!panicNoise) return
    panicNoise.triggerAttackRelease('16n')
  }

  // 开始机械悲鸣
  const startMechanicalScream = () => {
    if (!screamSynth) return
    // 触发一个高频音符
    screamSynth.triggerAttack('A5')
  }

  // 停止机械悲鸣
  const stopMechanicalScream = () => {
    if (!screamSynth) return
    screamSynth.triggerRelease()
  }

  return {
    initializeAudio,
    playTypingSound,
    playKernelPanic,
    startMechanicalScream,
    stopMechanicalScream,
  }
}
