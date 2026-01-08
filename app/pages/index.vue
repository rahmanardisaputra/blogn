<!-- pages/index.vue -->
<script setup>
import { useNuxtApp } from "#app";
import { collection, getDocs } from "firebase/firestore";

definePageMeta({
  layout: "public",
});

const { $db } = useNuxtApp();
const categories = ref([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;

  // Ambil semua post
  const snap = await getDocs(collection($db, "posts"));
  
  // Ekstrak kategori unik
  const allPosts = snap.docs.map(doc => doc.data());
  const uniqueCategories = [...new Set(allPosts.map(p => p.categoryName).filter(Boolean))];

  categories.value = uniqueCategories.sort();
  loading.value = false;
});
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Project Blog</h1>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="list">
      <div class="card skeleton" v-for="n in 4" :key="n">
        <div class="sk-title"></div>
      </div>
    </div>

    <!-- Daftar Kategori -->
    <div v-else class="list">
      <NuxtLink
        v-for="cat in categories"
        :key="cat"
        :to="`/view/kategori/${encodeURIComponent(cat)}`"
        class="card category-link"
      >
        {{ cat }}
        
      </NuxtLink>
    </div>
  </div>
</template>

<script>
// Helper untuk hitung jumlah post per kategori (opsional)
export default {
  methods: {
    postsByCategory(categoryName) {
      // Jika kamu mau tampilkan jumlah, kamu perlu simpan semua post
      // Tapi biar ringan, kita skip dulu atau ambil di halaman kategori saja
      // Untuk sekarang, kita kosongkan dulu logika ini
      return []; // placeholder
    }
  }
}
</script>

<style scoped>
.wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 25px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.category-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-radius: 12px;
  text-decoration: none;
  color: #111827;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.2s;
}

.category-link:hover {
  background: #f0f9ff;
  color: #0ea5e9;
  transform: translateY(-2px);
}

.count {
  background: #e0f2fe;
  color: #0284c7;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
}

/* Skeleton */
.skeleton {
  background: #f1f5f9;
  padding: 16px 20px;
  border-radius: 12px;
}
.sk-title {
  height: 20px;
  background: #dbe1e8;
  border-radius: 6px;
  width: 70%;
}
</style>