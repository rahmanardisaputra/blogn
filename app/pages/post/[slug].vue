<script setup>
import { useNuxtApp, useRoute, navigateTo } from "#app";
import { collection, query, where, getDocs } from "firebase/firestore";

const { $db } = useNuxtApp();
const route = useRoute();

const post = ref(null);

onMounted(async () => {
  const q = query(
    collection($db, "posts"),
    where("slug", "==", route.params.slug)
  );

  const snap = await getDocs(q);

  if (!snap.empty) {
    post.value = snap.docs[0].data();
  } else {
    // redirect kalau slug tidak ditemukan
    navigateTo("/404");
  }
});
</script>

<template>
  <div style="max-width: 900px; margin: 40px auto;">
    <template v-if="post">
      <h1>{{ post.title }}</h1>

      <p style="color: gray; margin-bottom: 20px;">
        Kategori: <strong>{{ post.categoryName }}</strong>
      </p>

      <ClientOnly>
        <MarkdownViewer :content="post.content" />
      </ClientOnly>
    </template>

    <template v-else>
      <p>Loading...</p>
    </template>
  </div>
</template>
