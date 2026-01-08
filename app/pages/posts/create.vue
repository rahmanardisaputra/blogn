<script setup>
import { useNuxtApp } from "#app";
import { collection, addDoc, getDocs } from "firebase/firestore";

const { $db } = useNuxtApp();

const title = ref("");
const categoryId = ref("");
const content = ref("");
const categories = ref([]);

onMounted(async () => {
  const snap = await getDocs(collection($db, "categories"));
  categories.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
});

const save = async () => {
  if (!title.value || !categoryId.value) {
    alert("Judul dan kategori wajib diisi!");
    return;
  }

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
  <div class="page">

    <!-- HEADER -->
    <div class="header">
      <div>
        <h1 class="title">Buat Post Baru</h1>
        <p class="subtitle">Tambahkan artikel baru ke dalam blog Anda</p>
      </div>

      <NuxtLink to="/posts" class="btn-secondary">Kembali</NuxtLink>
    </div>

    <!-- FORM WRAPPER -->
    <div class="card">

      <!-- JUDUL -->
      <label class="label">Judul Post</label>
      <input v-model="title" class="input" placeholder="Judul post..." />

      <!-- KATEGORI -->
      <label class="label">Project</label>
      <select v-model="categoryId" class="select">
        <option disabled value="">-- Pilih kategori --</option>
        <option v-for="c in categories" :value="c.id">
          {{ c.name }}
        </option>
      </select>

      <!-- KONTEN -->
      <label class="label">Konten</label>
      <ClientOnly>
        <MarkdownEditor v-model="content" />
      </ClientOnly>

      <!-- BUTTON -->
      <button @click="save" class="btn-primary mt20">Simpan Post</button>
    </div>

  </div>
</template>

<style scoped>
/* --- PAGE WRAPPER --- */
.page {
  padding: 20px;
}

/* --- HEADER --- */
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

/* --- FORM CARD --- */
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

/* --- BUTTONS --- */
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
