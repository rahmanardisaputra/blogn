<template>
  <div ref="viewerRoot"></div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

const props = defineProps({
  content: {
    type: String,
    default: ""
  }
});

const viewerRoot = ref(null);

onMounted(() => {
  new Viewer({
    el: viewerRoot.value,
    initialValue: props.content || "",
  });
});
</script>
