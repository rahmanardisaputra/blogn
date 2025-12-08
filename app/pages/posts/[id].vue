<script setup>
import { useNuxtApp, useRoute } from "#app";
import { doc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore";

const { $db } = useNuxtApp();
const route = useRoute();

const title = ref("");
const categoryId = ref("");
const content = ref("");
const categories = ref([]);

onMounted(async () => {
  const snap = await getDoc(doc($db, "posts", route.params.id));
  const data = snap.data();

  title.value = data.title;
  categoryId.value = data.categoryId;
  content.value = data.content;

  const catSnap = await getDocs(collection($db, "categories"));
  categories.value = catSnap.docs.map(d => ({ id: d.id, ...d.data() }));
});

const save = async () => {
  await updateDoc(doc($db, "posts", route.params.id), {
    title: title.value,
    slug: title.value.toLowerCase().replace(/ /g, "-"),
    categoryId: categoryId.value,
    content: content.value,
    updatedAt: new Date()
  });

  navigateTo("/posts");
};
</script>

<template>
  <div style="padding:20px;">
    <h2>Edit Post</h2>

    <input v-model="title" />
    <select v-model="categoryId">
      <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
    </select>

    <ClientOnly>
    <MarkdownEditor v-model="content" />
    </ClientOnly>

    <button @click="save">Update</button>
  </div>
</template>
