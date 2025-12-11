<script setup>
import { useNuxtApp, useRoute, navigateTo } from "#app";
import { ref, onMounted, nextTick } from "vue";
import { collection, query, where, getDocs } from "firebase/firestore";

definePageMeta({ layout: "public" });

const { $db, $hljs } = useNuxtApp();
const route = useRoute();

const post = ref(null);
const loading = ref(true);

onMounted(async () => {
  const q = query(
    collection($db, "posts"),
    where("slug", "==", route.params.slug)
  );

  const snap = await getDocs(q);

  if (!snap.empty) {
    post.value = snap.docs[0].data();
  } else {
    navigateTo("/404");
    return;
  }

  loading.value = false;

  await nextTick();

  // highlight semua <code>
  document.querySelectorAll("pre code").forEach(block => {
    $hljs.highlightElement(block);
  });

  setupCopyButtons();
});

function setupCopyButtons() {
  const blocks = document.querySelectorAll("pre");

  blocks.forEach(pre => {
    if (pre.querySelector(".copy-btn")) return;

    pre.style.position = "relative";

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.innerHTML = "Copy 📋";

    btn.onclick = () => {
      const code = pre.querySelector("code")?.innerText || "";
      navigator.clipboard.writeText(code);

      btn.innerHTML = "Copied ✔️";
      btn.classList.add("copied");

      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = "Copy 📋";
      }, 1500);
    };

    pre.appendChild(btn);
  });
}
</script>

<template>
  <div class="wrapper">
    <div v-if="loading" class="loading">Loading...</div>

    <template v-else>
      <h1 class="title">{{ post.title }}</h1>

      <p class="meta">
        Kategori: <b>{{ post.categoryName }}</b>
      </p>

      <hr class="divider" />

      <div class="tutorial-content">
        <ClientOnly>
          <MarkdownViewer :content="post.content" />
        </ClientOnly>
      </div>
    </template>
  </div>
</template>

<style>
.wrapper {
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
}

.title {
  font-size: 32px;
  font-weight: 800;
}

.meta {
  margin-top: 8px;
  color: #6b7280;
}

.divider {
  margin: 20px 0;
  border-color: #e5e7eb;
}

.tutorial-content pre {
  background: #0f172a;
  color: #e2e8f0 !important;
  padding: 18px;
  border-radius: 10px;
  margin: 20px 0;
  overflow-x: auto;
  position: relative;
}

/* ————— COPY BUTTON ————— */
.copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #1e293b;
  border: none;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 5px;
  cursor: pointer;
  opacity: 0.8;
}

.copy-btn:hover {
  opacity: 1;
}

.copy-btn.copied {
  background: #10b981 !important;
}

.tutorial-content blockquote {
  background: #f1f5f9;
  border-left: 5px solid #2563eb;
  padding: 12px 16px;
  border-radius: 6px;
  margin: 18px 0;
  font-style: italic;
}
</style>
