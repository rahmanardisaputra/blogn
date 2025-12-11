<script setup>
import { useNuxtApp, useRoute } from "#app";
import { doc, getDoc, updateDoc, getDocs, collection } from "firebase/firestore";

const { $db } = useNuxtApp();
const route = useRoute();

const title = ref("");
const categoryId = ref("");
const content = ref("");
const categories = ref([]);
const loading = ref(true);

onMounted(async () => {
  // Ambil post
  const snap = await getDoc(doc($db, "posts", route.params.id));
  const data = snap.data();

  title.value = data.title;
  categoryId.value = data.categoryId;
  content.value = data.content;

  // Ambil categories
  const catSnap = await getDocs(collection($db, "categories"));
  categories.value = catSnap.docs.map(d => ({ id: d.id, ...d.data() }));

  loading.value = false;
});

const save = async () => {
  if (!title.value || !categoryId.value) {
    alert("Judul dan kategori harus diisi!");
    return;
  }

  await updateDoc(doc($db, "posts", route.params.id), {
    title: title.value,
    slug: title.value.toLowerCase().replace(/ /g, "-"),
    categoryId: categoryId.value,
    categoryName: categories.value.find(c => c.id === categoryId.value)?.name ?? "",
    content: content.value,
    updatedAt: new Date(),
  });

  navigateTo("/posts");
};
</script>

<template>
  <div class="page">

    <div class="header">
      <div>
        <h1 class="title">Edit Post</h1>
        <p class="subtitle">Perbarui artikel Anda</p>
      </div>

      <NuxtLink to="/posts" class="btn-secondary">Kembali</NuxtLink>
    </div>

    <div class="card" v-if="!loading">

      <!-- Judul -->
      <label class="label">Judul Post</label>
      <input v-model="title" class="input" placeholder="Masukkan judul baru..." />

      <!-- Kategori -->
      <label class="label">Kategori</label>
      <select v-model="categoryId" class="select">
        <option disabled value="">-- Pilih kategori --</option>
        <option v-for="c in categories" :key="c.id" :value="c.id">
          {{ c.name }}
        </option>
      </select>

      <!-- Konten -->
      <label class="label">Konten</label>
      <ClientOnly>
        <MarkdownEditor v-model="content" />
      </ClientOnly>

      <button @click="save" class="btn-primary mt20">Update Post</button>
    </div>

  </div>
</template>

<style scoped>
.page {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}

.title {
  font-size: 26px;
  font-weight: bold;
}

.subtitle {
  color: #64748b;
  margin-top: 4px;
}

.card {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
}

.label {
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 8px;
}

.input,
.select {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  background: #f8fafc;
  font-size: 15px;
  margin-bottom: 10px;
}

.input:focus,
.select:focus {
  outline: none;
  border-color: #0ea5e9;
  background: white;
}

.btn-primary {
  background: #0ea5e9;
  color: white;
  padding: 12px 18px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  width: 180px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #0284c7;
}

.btn-secondary {
  background: #e2e8f0;
  color: #1e293b;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
}

.btn-secondary:hover {
  background: #cbd5e1;
}

.mt20 {
  margin-top: 20px;
}
</style>
