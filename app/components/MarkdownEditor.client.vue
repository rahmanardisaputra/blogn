<template>
  <div ref="editorRoot"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import Editor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const editorRoot = ref(null)
let editor = null

onMounted(() => {
  editor = new Editor({
    el: editorRoot.value,
    height: '500px',
    initialEditType: 'markdown',
    previewStyle: 'vertical',
    initialValue: props.modelValue || ''
  })

  editor.on('change', () => {
    emit('update:modelValue', editor.getMarkdown())
  })
})

watch(() => props.modelValue, value => {
  if (!editor) return
  if (value !== editor.getMarkdown()) {
    editor.setMarkdown(value || '')
  }
})

onBeforeUnmount(() => {
  editor?.destroy()
})
</script>
