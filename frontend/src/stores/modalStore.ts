import { defineStore } from 'pinia'
import { ref, type Component } from 'vue'

export const useModalStore = defineStore('modal', () => {
  const isVisible = ref(false)
  const content = ref<Component | null>(null)
  const props = ref<any>({})

  function show(component: Component, componentProps: any = {}) {
    content.value = component
    props.value = componentProps
    isVisible.value = true
  }

  function hide() {
    isVisible.value = false
    content.value = null
    props.value = {}
  }

  return { isVisible, content, props, show, hide }
})
