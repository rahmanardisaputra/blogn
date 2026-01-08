<!-- pages/view/kategori/[slug].vue -->
<script setup>
import { useNuxtApp } from "#app";
import { collection, query, where, getDocs } from "firebase/firestore";

definePageMeta({
  layout: "public",
});

const route = useRoute();
const { $db } = useNuxtApp();

// Ambil nama kategori dari URL (decode karena mungkin mengandung spasi/UTF-8)
const categoryName = decodeURIComponent(route.params.slug);

const posts = ref([]);
const loading = ref(true);

onMounted(async () => {
  loading.value = true;

  try {
    // Query hanya post dengan categoryName yang cocok
    const q = query(
      collection($db, "posts"),
      where("categoryName", "==", categoryName)
    );
    const snap = await getDocs(q);

    // Delay kecil biar skeleton terlihat (opsional)
    await new Promise(resolve => setTimeout(resolve, 600));

    posts.value = snap.docs.map(doc => doc.data())
    .sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    posts.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="wrapper">
    <h1 class="title">Project: {{ categoryName }}</h1>

    <!-- LOADING STATE (SKELETON) -->
    <div v-if="loading" class="list">
      <div class="card skeleton" v-for="n in 4" :key="n">
        <div class="sk-title"></div>
        <div class="sk-badge"></div>
        <div class="sk-button"></div>
      </div>
    </div>

    <!-- DATA SIAP -->
    <div v-else class="list">
      <div v-for="p in posts" :key="p.slug" class="card">
        <div class="info">
          <!-- KATEGORI (bisa tetap sebagai teks, atau jadikan link) -->
          <span class="badge">{{ p.categoryName }}</span>

          <!-- JUDUL -->
          <NuxtLink :to="`/post/${p.slug}`" class="post-title">
            {{ p.title }}
          </NuxtLink>

          <!-- BUTTON -->
          <NuxtLink :to="`/post/${p.slug}`" class="readmore">
            Baca selengkapnya →
          </NuxtLink>
        </div>
      </div>

      <!-- Jika tidak ada post -->
      <div v-if="posts.length === 0" class="empty-state">
        Tidak ada artikel di kategori ini.
      </div>
    </div>

    <!-- Opsional: tombol kembali -->
    <NuxtLink to="/" class="back-link">← Kembali ke Beranda</NuxtLink>
  </div>
</template>

<style scoped>
/* Salin SEMUA style dari index.vue yang kamu kirim — biar tampilan 100% konsisten */
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

/* LIST */
.list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* CARD */
.card {
  background: white;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  transition: .2s;
}

.card:hover {
  transform: translateY(-3px);
}

/* CATEGORY BADGE */
.badge {
  display: inline-block;
  background: #e0f2fe;
  color: #0284c7;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

/* TITLE */
.post-title {
  display: block;
  font-size: 20px;
  font-weight: 700;
  color: #111827;
  text-decoration: none;
  margin: 8px 0 10px;
}

.post-title:hover {
  color: #0ea5e9;
}

/* READ MORE */
.readmore {
  color: #0284c7;
  font-size: 14px;
  text-decoration: none;
}

.readmore:hover {
  text-decoration: underline;
}

/* Empty state */
.empty-state {
  text-align: center;
  color: #64748b;
  padding: 40px 0;
  font-style: italic;
}

.back-link {
  display: inline-block;
  margin-top: 30px;
  color: #0ea5e9;
  text-decoration: none;
}

/* ========================== */
/* 🔥 SKELETON LOADING STYLE  */
/* ========================== */

.skeleton {
  position: relative;
  overflow: hidden;
  background: #f1f5f9;
}

.skeleton::after {
  content: "";
  position: absolute;
  top: 0;
  left: -150px;
  height: 100%;
  width: 150px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255,255,255,0.6),
    transparent
  );
  animation: loading 1.2s infinite;
}

@keyframes loading {
  0% { left: -150px; }
  100% { left: 100%; }
}

.sk-title {
  width: 60%;
  height: 20px;
  background: #dbe1e8;
  border-radius: 6px;
  margin-bottom: 10px;
}

.sk-badge {
  width: 100px;
  height: 16px;
  background: #dbe1e8;
  border-radius: 6px;
  margin-bottom: 12px;
}

.sk-button {
  width: 140px;
  height: 16px;
  background: #dbe1e8;
  border-radius: 6px;
}
</style>