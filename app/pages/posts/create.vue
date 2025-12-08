<script setup>
import { useNuxtApp } from "#app";
import { collection, addDoc, getDocs } from "firebase/firestore";

const { $db } = useNuxtApp();

const title = ref("");
const categoryId = ref("");
const content = ref(""); // nanti markdown
const categories = ref([]);

onMounted(async () => {
  const snap = await getDocs(collection($db, "categories"));
  categories.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
});

const save = async () => {
  const category = categories.value.find(c => c.id === categoryId.value);

  await addDoc(collection($db, "posts"), {
    title: title.value,
    slug: title.value.toLowerCase().replace(/ /g, "-"),
    categoryId: categoryId.value,
    categoryName: category?.name || "",
    content: content.value,
    createdAt: new Date()
  });

  navigateTo("/posts");
};
</script>

<template>
  <div style="padding:20px;">
    <h2>Buat Post</h2>

    <input v-model="title" placeholder="Judul" />

    <select v-model="categoryId">
      <option disabled value="">Pilih kategori</option>
      <option v-for="c in categories" :value="c.id">{{ c.name }}</option>
    </select>

    <ClientOnly>
    <MarkdownEditor v-model="content" />
    </ClientOnly>

    <button @click="save">Simpan</button>
  </div>
</template>
