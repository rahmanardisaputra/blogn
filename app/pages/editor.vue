<script setup>
import { ref } from 'vue'

const content = ref('# Halo dari Toast UI 👋\n\nTulis markdown di sini...')
</script>

<template>
  <div style="max-width: 900px; margin: 40px auto;">
    <h1>Test Markdown Editor</h1>

    <!-- Biar Toast UI cuma jalan di client -->
    <ClientOnly>
      <MarkdownEditor v-model="content" />

      <template #fallback>
        <p>Sedang memuat editor...</p>
      </template>
    </ClientOnly>

    <h3 style="margin-top: 24px;">Preview nilai v-model (teks mentah):</h3>
    <pre
      style="background:#0f172a; color:#fff; padding:12px; border-radius:8px; white-space:pre-wrap;"
    >{{ content }}</pre>
  </div>
</template>
